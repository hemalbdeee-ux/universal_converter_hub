import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
 import Header from'../../components/ui/Header';
 import Button from'../../components/ui/Button';
 import Input from'../../components/ui/Input';
 import Icon from'../../components/AppIcon';

const UserManagement = () => {
  const { user, userProfile, getAllUsers, deleteUser, deleteAllUsers, isAdmin, loading } = useAuth()
  const navigate = useNavigate()
  
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  // Check admin access
  useEffect(() => {
    if (!loading && (!user || !isAdmin())) {
      navigate('/auth/login')
      return
    }
  }, [user, userProfile, loading, navigate, isAdmin])

  // Fetch users on component mount
  useEffect(() => {
    if (user && isAdmin()) {
      fetchUsers()
    }
  }, [user, userProfile])

  // Filter users based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter(u => 
        u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.username?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    }
  }, [searchTerm, users])

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true)
      setError('')
      
      const result = await getAllUsers()
      
      if (result.success) {
        setUsers(result.users || [])
      } else {
        setError(result.error || 'Failed to fetch users')
      }
    } catch (error) {
      setError('Failed to load users. Please try again.')
    } finally {
      setLoadingUsers(false)
    }
  }

  const handleDeleteUser = async (userId, userName) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return
    }

    try {
      setActionLoading(true)
      setError('')
      
      const result = await deleteUser(userId)
      
      if (result.success) {
        setUsers(prev => prev.filter(u => u.id !== userId))
        setSelectedUsers(prev => prev.filter(id => id !== userId))
      } else {
        setError(result.error || 'Failed to delete user')
      }
    } catch (error) {
      setError('Failed to delete user. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteAllUsers = async () => {
    if (!confirm(`Are you sure you want to delete ALL users except yourself? This will delete ${filteredUsers.filter(u => u.id !== user?.id).length} users. This action cannot be undone.`)) {
      return
    }

    try {
      setActionLoading(true)
      setError('')
      
      const result = await deleteAllUsers()
      
      if (result.success) {
        // Keep only current user
        setUsers(prev => prev.filter(u => u.id === user?.id))
        setSelectedUsers([])
      } else {
        setError(result.error || 'Failed to delete all users')
      }
    } catch (error) {
      setError('Failed to delete all users. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) {
      setError('No users selected')
      return
    }

    if (!confirm(`Are you sure you want to delete ${selectedUsers.length} selected users? This action cannot be undone.`)) {
      return
    }

    try {
      setActionLoading(true)
      setError('')
      
      const deletePromises = selectedUsers.map(userId => deleteUser(userId))
      const results = await Promise.allSettled(deletePromises)
      
      const failed = results.filter(r => r.status === 'rejected')
      
      if (failed.length === 0) {
        // All deletions successful
        setUsers(prev => prev.filter(u => !selectedUsers.includes(u.id)))
        setSelectedUsers([])
      } else {
        setError(`Failed to delete ${failed.length} out of ${selectedUsers.length} users`)
        // Refresh users to get current state
        await fetchUsers()
      }
    } catch (error) {
      setError('Failed to delete selected users. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    const selectableUsers = filteredUsers.filter(u => u.id !== user?.id)
    
    if (selectedUsers.length === selectableUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(selectableUsers.map(u => u.id))
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-error bg-error/10 border-error/20'
      case 'user': return 'text-primary bg-primary/10 border-primary/20'
      default: return 'text-text-secondary bg-surface border-border'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10 border-success/20'
      case 'inactive': return 'text-accent bg-accent/10 border-accent/20'
      case 'suspended': return 'text-error bg-error/10 border-error/20'
      default: return 'text-text-secondary bg-surface border-border'
    }
  }

  if (loading || loadingUsers) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Icon name="Loader2" size={24} className="animate-spin text-primary" />
          <span className="text-text-primary">Loading...</span>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin()) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>User Management - Admin Panel | Universal Converter Hub</title>
        <meta name="description" content="Manage user accounts, view user activity, and control access permissions in the Universal Converter Hub admin panel." />
      </Helmet>
      
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">User Management</h1>
                <p className="text-text-secondary mt-1">
                  Manage user accounts and permissions
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-sm text-text-secondary">
                  Total Users: <span className="font-semibold text-text-primary">{users?.length || 0}</span>
                </div>
                <Button
                  onClick={fetchUsers}
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  disabled={actionLoading}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon name="AlertCircle" size={20} className="text-error mr-2" />
                  <p className="text-sm text-error font-medium">{error}</p>
                </div>
                <button onClick={() => setError('')}>
                  <Icon name="X" size={20} className="text-error" />
                </button>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-brand mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search users by name, email, or username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  iconName="Search"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedUsers.length > 0 && (
                  <>
                    <span className="text-sm text-text-secondary">
                      {selectedUsers.length} selected
                    </span>
                    <Button
                      onClick={handleDeleteSelected}
                      variant="destructive"
                      size="sm"
                      iconName="Trash2"
                      iconPosition="left"
                      disabled={actionLoading}
                    >
                      Delete Selected
                    </Button>
                  </>
                )}
                
                <Button
                  onClick={handleDeleteAllUsers}
                  variant="destructive"
                  iconName="Trash"
                  iconPosition="left"
                  disabled={actionLoading || users.length <= 1}
                >
                  Delete All Users
                </Button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-card border border-border rounded-lg shadow-brand overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-primary">
                  Users ({filteredUsers?.length || 0})
                </h2>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.filter(u => u.id !== user?.id).length && filteredUsers.length > 1}
                    onChange={handleSelectAll}
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm text-text-secondary">Select All</span>
                </label>
              </div>
            </div>
            
            {filteredUsers?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Users" size={64} className="mx-auto text-text-secondary mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No Users Found</h3>
                <p className="text-text-secondary">
                  {searchTerm ? 'Try adjusting your search criteria' : 'No users available'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Select
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers?.map((userData) => (
                      <tr key={userData?.id} className="hover:bg-surface transition-colors">
                        <td className="px-6 py-4">
                          {userData?.id !== user?.id ? (
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(userData?.id)}
                              onChange={() => handleSelectUser(userData?.id)}
                              className="rounded border-border text-primary focus:ring-primary/20"
                            />
                          ) : (
                            <span className="text-text-secondary text-xs">Current</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mr-3">
                              <span className="text-white font-medium text-sm">
                                {userData?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text-primary">
                                {userData?.full_name || 'Unknown User'}
                              </p>
                              <p className="text-sm text-text-secondary">{userData?.email}</p>
                              {userData?.username && (
                                <p className="text-xs text-text-secondary">@{userData?.username}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getRoleColor(userData?.role)}`}>
                            {userData?.role || 'user'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(userData?.status)}`}>
                            {userData?.status || 'active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">
                          {formatDate(userData?.created_at)}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">
                          {formatDate(userData?.last_login_at)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {userData?.id !== user?.id ? (
                              <Button
                                onClick={() => handleDeleteUser(userData?.id, userData?.full_name)}
                                variant="destructive"
                                size="sm"
                                iconName="Trash2"
                                disabled={actionLoading}
                              >
                                Delete
                              </Button>
                            ) : (
                              <span className="text-xs text-text-secondary px-3 py-1 bg-surface rounded">
                                You
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Admin Credentials Info */}
          <div className="mt-8 bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
              <Icon name="Info" size={20} className="mr-2 text-primary" />
              Admin Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary mb-1">Admin Email:</p>
                <p className="font-mono text-primary">admin@example.com</p>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Admin Password:</p>
                <p className="font-mono text-primary">admin123</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-text-secondary">
              <p>Use these credentials to access admin features. You can create new admin users or change passwords through the user profile settings.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserManagement