import { supabase } from '../lib/supabase';

class AuthService {
  // Authentication methods
  async signUp(email, password, userData = {}) {
    try {
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
        return { success: false, error: error?.message };
      }

      return { success: true, user: data?.user };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { success: false, error: 'Cannot connect to authentication service. Please check your Supabase project status.' }
      }
      return { success: false, error: 'Failed to create account. Please try again.' }
    }
  }

  async signIn(email, password) {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      })

      if (error) {
        if (error?.message?.includes('Failed to fetch') || 
            error?.message?.includes('AuthRetryableFetchError')) {
          return { success: false, error: 'Cannot connect to authentication service. Your Supabase project may be paused or inactive.' }
        }
        return { success: false, error: error?.message };
      }

      // Update last login timestamp
      if (data?.user?.id) {
        await this.updateLastLogin(data?.user?.id)
        await this.logActivity(data?.user?.id, 'LOGIN', { method: 'email' })
      }

      return { success: true, user: data?.user };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { success: false, error: 'Network connection failed. Please try again.' }
      }
      return { success: false, error: 'Failed to sign in. Please try again.' }
    }
  }

  async signOut() {
    try {
      // Get current session to log the logout
      const { data: { session } } = await supabase?.auth?.getSession()
      
      if (session?.user?.id) {
        await this.logActivity(session?.user?.id, 'LOGOUT')
      }

      const { error } = await supabase?.auth?.signOut()
      
      if (error) {
        return { success: false, error: error?.message };
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to sign out. Please try again.' }
    }
  }

  async getCurrentUser() {
    try {
      const { data: { session }, error } = await supabase?.auth?.getSession()
      
      if (error) {
        return { success: false, error: error?.message };
      }

      return { success: true, user: session?.user || null }
    } catch (error) {
      return { success: false, error: 'Failed to get current user.' }
    }
  }

  async updatePassword(newPassword) {
    try {
      const { error } = await supabase?.auth?.updateUser({
        password: newPassword
      })

      if (error) {
        return { success: false, error: error?.message };
      }

      // Log password change
      const { data: { session } } = await supabase?.auth?.getSession()
      if (session?.user?.id) {
        await this.logActivity(session?.user?.id, 'PASSWORD_CHANGE')
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to update password. Please try again.' }
    }
  }

  // Profile management
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single()

      if (error && error?.code !== 'PGRST116') { // No rows found
        return { success: false, error: error?.message };
      }

      return { success: true, profile: data }
    } catch (error) {
      return { success: false, error: 'Failed to fetch user profile.' }
    }
  }

  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update({
          ...updates,
          updated_at: new Date()?.toISOString()
        })?.eq('id', userId)?.select()?.single()

      if (error) {
        return { success: false, error: error?.message };
      }

      await this.logActivity(userId, 'PROFILE_UPDATE', { fields: Object.keys(updates) })
      return { success: true, profile: data }
    } catch (error) {
      return { success: false, error: 'Failed to update profile. Please try again.' }
    }
  }

  // Admin methods
  async getAllUsers() {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.order('created_at', { ascending: false })

      if (error) {
        return { success: false, error: error?.message };
      }

      return { success: true, users: data }
    } catch (error) {
      return { success: false, error: 'Failed to fetch users.' }
    }
  }

  async deleteUser(userId) {
    try {
      const { error } = await supabase?.rpc('admin_delete_user', {
        target_user_id: userId
      })

      if (error) {
        return { success: false, error: error?.message };
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to delete user. Please try again.' }
    }
  }

  async deleteAllUsers(excludeCurrentUser = true) {
    try {
      const { data: { session } } = await supabase?.auth?.getSession()
      const currentUserId = session?.user?.id

      // Get all users except current user if excludeCurrentUser is true
      let query = supabase?.from('user_profiles')?.select('id')
      
      if (excludeCurrentUser && currentUserId) {
        query = query?.neq('id', currentUserId)
      }

      const { data: users, error: fetchError } = await query

      if (fetchError) {
        return { success: false, error: fetchError?.message };
      }

      if (!users || users?.length === 0) {
        return { success: true, deletedCount: 0 }
      }

      // Delete each user using the RPC function
      const deletePromises = users?.map(user => 
        supabase?.rpc('admin_delete_user', { target_user_id: user?.id })
      )

      const results = await Promise.allSettled(deletePromises)
      const failed = results?.filter(result => result?.status === 'rejected')

      if (failed?.length > 0) {
        return { 
          success: false, 
          error: `Failed to delete ${failed?.length} out of ${users?.length} users` 
        };
      }

      // Log the mass deletion
      if (currentUserId) {
        await this.logActivity(currentUserId, 'ADMIN_DELETE_ALL_USERS', { 
          count: users?.length 
        })
      }

      return { success: true, deletedCount: users?.length };
    } catch (error) {
      return { success: false, error: 'Failed to delete all users. Please try again.' }
    }
  }

  async getUserActivityLogs(userId, limit = 50) {
    try {
      const { data, error } = await supabase?.from('user_activity_logs')?.select('*')?.eq('user_id', userId)?.order('created_at', { ascending: false })?.limit(limit)

      if (error) {
        return { success: false, error: error?.message };
      }

      return { success: true, logs: data }
    } catch (error) {
      return { success: false, error: 'Failed to fetch activity logs.' }
    }
  }

  // Utility methods
  async updateLastLogin(userId) {
    try {
      await supabase?.from('user_profiles')?.update({ 
          last_login_at: new Date()?.toISOString(),
          updated_at: new Date()?.toISOString()
        })?.eq('id', userId)
    } catch (error) {
      // Silently fail - this is not critical
      console.log('Failed to update last login:', error?.message)
    }
  }

  async logActivity(userId, action, details = {}) {
    try {
      await supabase?.rpc('log_user_activity', {
        user_uuid: userId,
        action_text: action,
        activity_details: details
      })
    } catch (error) {
      // Silently fail - logging should not break user flow
      console.log('Failed to log activity:', error?.message)
    }
  }

  // Helper method to check if user is admin
  async isAdmin(userId = null) {
    try {
      let targetUserId = userId

      if (!targetUserId) {
        const { data: { session } } = await supabase?.auth?.getSession()
        targetUserId = session?.user?.id
      }

      if (!targetUserId) {
        return false
      }

      const { data, error } = await supabase?.from('user_profiles')?.select('role')?.eq('id', targetUserId)?.single()

      if (error) {
        return false
      }

      return data?.role === 'admin'
    } catch (error) {
      return false
    }
  }

  // Session management
  async getUserSessions(userId) {
    try {
      const { data, error } = await supabase?.from('user_sessions')?.select('*')?.eq('user_id', userId)?.eq('is_active', true)?.order('last_accessed_at', { ascending: false })

      if (error) {
        return { success: false, error: error?.message };
      }

      return { success: true, sessions: data }
    } catch (error) {
      return { success: false, error: 'Failed to fetch user sessions.' }
    }
  }

  async cleanupExpiredSessions() {
    try {
      const { data, error } = await supabase?.rpc('cleanup_expired_sessions')

      if (error) {
        return { success: false, error: error?.message };
      }

      return { success: true, cleanedCount: data }
    } catch (error) {
      return { success: false, error: 'Failed to cleanup expired sessions.' }
    }
  }
}

export default new AuthService()