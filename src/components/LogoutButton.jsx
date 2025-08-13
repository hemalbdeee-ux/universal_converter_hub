import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
 import Button from'./ui/Button';
 

const LogoutButton = ({ variant = 'outline', size = 'sm', className = '', showText = true }) => {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to sign out?')) {
      return
    }

    try {
      setIsLoggingOut(true)
      const result = await signOut()
      
      if (result.success) {
        navigate('/auth/login')
      } else {
        alert('Failed to sign out. Please try again.')
      }
    } catch (error) {
      alert('An error occurred while signing out. Please try again.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      size={size}
      className={className}
      disabled={isLoggingOut}
      iconName={isLoggingOut ? 'Loader2' : 'LogOut'}
      iconPosition="left"
    >
      {showText && (isLoggingOut ? 'Signing Out...' : 'Sign Out')}
    </Button>
  )
}

export default LogoutButton