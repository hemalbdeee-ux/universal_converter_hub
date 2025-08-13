import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
 import Button from'../../components/ui/Button';
 import Input from'../../components/ui/Input';
 import Icon from'../../components/AppIcon';

const Signup = () => {
  const navigate = useNavigate()
  const { signUp, loading } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return false
    }

    if (!formData.username.trim()) {
      setError('Username is required')
      return false
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long')
      return false
    }

    if (!formData.email) {
      setError('Email is required')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (!formData.password) {
      setError('Password is required')
      return false
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    try {
      const result = await signUp(formData.email, formData.password, {
        fullName: formData.fullName,
        username: formData.username
      })
      
      if (result.success) {
        navigate('/user-dashboard-personalized-conversion-management')
      } else {
        setError(result.error || 'Failed to create account')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-primary/5 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Sign Up - Universal Converter Hub</title>
        <meta name="description" content="Create your Universal Converter Hub account to start building custom converters, tracking conversion history, and accessing personalized features." />
      </Helmet>
      
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-xl flex items-center justify-center">
              <Icon name="Calculator" size={24} color="white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-text-primary">Universal Converter</span>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Create Account</h1>
          <p className="mt-2 text-text-secondary">Join us to start your conversion journey</p>
        </div>

        {/* Signup Form */}
        <div className="bg-card border border-border rounded-lg shadow-brand">
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <Icon name="AlertCircle" size={20} className="text-error mr-2" />
                    <p className="text-sm text-error font-medium">{error}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  iconName="User"
                />
                <Input
                  label="Username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="johndoe"
                  required
                  iconName="AtSign"
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
                iconName="Mail"
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  required
                  iconName="Lock"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  iconName="Lock"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="rounded border-border text-primary focus:ring-primary/20"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-text-secondary">
                  I agree to the{' '}
                  <Link 
                    to="/privacy-policy-legal-compliance-center" 
                    className="text-primary hover:underline"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link 
                    to="/privacy-policy-legal-compliance-center" 
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={loading}
                iconName={loading ? 'Loader2' : 'UserPlus'}
                iconPosition="left"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </div>

          <div className="px-6 py-4 bg-surface border-t border-border rounded-b-lg">
            <p className="text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-brand">
          <h3 className="text-sm font-semibold text-text-primary mb-3">What you get with an account:</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-text-secondary">
              <Icon name="Check" size={16} className="text-success mr-2" />
              <span>Save and track conversion history</span>
            </div>
            <div className="flex items-center text-sm text-text-secondary">
              <Icon name="Check" size={16} className="text-success mr-2" />
              <span>Create custom converter sets</span>
            </div>
            <div className="flex items-center text-sm text-text-secondary">
              <Icon name="Check" size={16} className="text-success mr-2" />
              <span>Personalized recommendations</span>
            </div>
            <div className="flex items-center text-sm text-text-secondary">
              <Icon name="Check" size={16} className="text-success mr-2" />
              <span>Access to premium features</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup