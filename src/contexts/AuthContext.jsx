import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session - Use Promise chain
    supabase?.auth?.getSession()?.then(({ data: { session }, error }) => {
        if (error) {
          setError('Failed to get session')
          setLoading(false)
          return
        }
        
        if (session?.user) {
          setUser(session?.user)
          fetchUserProfile(session?.user?.id)
        } else {
          setLoading(false)
        }
      })

    // Listen for auth changes - NEVER ASYNC callback
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      (event, session) => {
        setError(null) // Clear any previous errors
        
        if (session?.user) {
          setUser(session?.user)
          fetchUserProfile(session?.user?.id)  // Fire-and-forget, NO AWAIT
        } else {
          setUser(null)
          setUserProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const fetchUserProfile = (userId) => {
    supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single()?.then(({ data, error }) => {
        if (error && error?.code !== 'PGRST116') { // PGRST116 = no rows returned
          setError('Failed to fetch user profile')
        } else if (data) {
          setUserProfile(data)
        }
        setLoading(false)
      });
  }

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.fullName || '',
            username: userData?.username || '',
            role: 'user'
          }
        }
      })

      if (error) {
        setError(error?.message)
        return { success: false, error: error?.message };
      }

      return { success: true, user: data?.user };
    } catch (error) {
      const errorMessage = 'Failed to create account. Please try again.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      })

      if (error) {
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('AuthRetryableFetchError')) {
          setError('Cannot connect to authentication service. Your Supabase project may be paused or inactive.')
        } else {
          setError(error?.message)
        }
        return { success: false, error: error?.message };
      }

      // Log successful login
      if (data?.user) {
        logUserActivity(data?.user?.id, 'LOGIN', { method: 'email' })
      }

      return { success: true, user: data?.user };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        setError('Cannot connect to authentication service. Please check your connection.')
        return { success: false, error: 'Network error' }
      }
      
      const errorMessage = 'Failed to sign in. Please try again.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      
      // Log logout activity before signing out
      if (user?.id) {
        logUserActivity(user?.id, 'LOGOUT')
      }

      const { error } = await supabase?.auth?.signOut()
      
      if (error) {
        setError('Failed to sign out')
        return { success: false, error: error?.message };
      }

      setUser(null)
      setUserProfile(null)
      return { success: true }
    } catch (error) {
      const errorMessage = 'Failed to sign out. Please try again.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const updateProfile = async (updates) => {
    try {
      setError(null)
      
      if (!user?.id) {
        throw new Error('No user logged in')
      }

      const { data, error } = await supabase?.from('user_profiles')?.update({
          ...updates,
          updated_at: new Date()?.toISOString()
        })?.eq('id', user?.id)?.select()?.single()

      if (error) {
        setError('Failed to update profile')
        return { success: false, error: error?.message };
      }

      setUserProfile(data)
      logUserActivity(user?.id, 'PROFILE_UPDATE', { fields: Object.keys(updates) })
      
      return { success: true, profile: data }
    } catch (error) {
      const errorMessage = 'Failed to update profile. Please try again.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const changePassword = async (newPassword) => {
    try {
      setError(null)
      
      const { error } = await supabase?.auth?.updateUser({
        password: newPassword
      })

      if (error) {
        setError('Failed to change password')
        return { success: false, error: error?.message };
      }

      if (user?.id) {
        logUserActivity(user?.id, 'PASSWORD_CHANGE')
      }

      return { success: true }
    } catch (error) {
      const errorMessage = 'Failed to change password. Please try again.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const deleteAccount = async () => {
    try {
      setError(null)
      
      if (!user?.id) {
        throw new Error('No user logged in')
      }

      // Log account deletion before deleting
      logUserActivity(user?.id, 'ACCOUNT_DELETION_REQUEST')

      // Call RPC function to delete user (handles cascading)
      const { error } = await supabase?.rpc('admin_delete_user', {
        target_user_id: user?.id
      })

      if (error) {
        setError('Failed to delete account')
        return { success: false, error: error?.message };
      }

      // Sign out after successful deletion
      await signOut()
      return { success: true }
    } catch (error) {
      const errorMessage = 'Failed to delete account. Please try again.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // Helper function to log user activities
  const logUserActivity = (userId, action, details = {}) => {
    // Fire-and-forget logging - don't wait for response
    supabase?.rpc('log_user_activity', {
      user_uuid: userId,
      action_text: action,
      activity_details: details
    })?.then(({ error }) => {
      if (error) {
        console.log('Failed to log activity:', error?.message)
      }
    })
  }

  // Admin functions
  const getAllUsers = async () => {
    try {
      setError(null)

      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.order('created_at', { ascending: false })

      if (error) {
        setError('Failed to fetch users')
        return { success: false, error: error?.message };
      }

      return { success: true, users: data }
    } catch (error) {
      const errorMessage = 'Failed to fetch users. Please try again.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const deleteUser = async (userId) => {
    try {
      setError(null)

      const { error } = await supabase?.rpc('admin_delete_user', {
        target_user_id: userId
      })

      if (error) {
        setError('Failed to delete user')
        return { success: false, error: error?.message };
      }

      return { success: true }
    } catch (error) {
      const errorMessage = 'Failed to delete user. Please try again.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const deleteAllUsers = async () => {
    try {
      setError(null)

      // First get all users except current user
      const { data: users, error: fetchError } = await supabase?.from('user_profiles')?.select('id')?.neq('id', user?.id)

      if (fetchError) {
        setError('Failed to fetch users')
        return { success: false, error: fetchError?.message };
      }

      // Delete each user
      const deletePromises = users?.map(u => 
        supabase?.rpc('admin_delete_user', { target_user_id: u?.id })
      )

      const results = await Promise.allSettled(deletePromises || [])
      const failed = results?.filter(r => r?.status === 'rejected')

      if (failed?.length > 0) {
        setError(`Failed to delete ${failed?.length} users`)
        return { success: false, error: `${failed?.length} deletions failed` };
      }

      logUserActivity(user?.id, 'ADMIN_DELETE_ALL_USERS', { count: users?.length || 0 })
      return { success: true, deletedCount: users?.length || 0 }
    } catch (error) {
      const errorMessage = 'Failed to delete all users. Please try again.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const isAdmin = () => {
    return userProfile?.role === 'admin'
  }

  const value = {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
    changePassword,
    deleteAccount,
    getAllUsers,
    deleteUser,
    deleteAllUsers,
    isAdmin,
    clearError: () => setError(null)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Export AuthProvider as default and as AuthContextProvider for App.jsx compatibility
export default AuthProvider
export { AuthProvider as AuthContextProvider };