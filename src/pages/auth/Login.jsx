import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
 import Button from'../../components/ui/Button';
 import Input from'../../components/ui/Input';
 import Icon from'../../components/AppIcon';

const Login = () => {
  const navigate = useNavigate()
  const { signIn, loading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Pre-filled demo credentials
  const demoCredentials = [
    { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
    { email: 'user@example.com', password: 'user123', role: 'User' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      const result = await signIn(formData.email, formData.password)
      
      if (result.success) {
        navigate('/user-dashboard-personalized-conversion-management')
      } else {
        setError(result.error || 'Failed to sign in')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    }
  }

  const fillDemoCredentials = (email, password) => {
    setFormData({ email, password })
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Sign In - Universal Converter Hub</title>
        <meta name="description" content="Sign in to your Universal Converter Hub account to access your personalized dashboard, saved conversions, and custom converter sets." />
      </Helmet>
      
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center">
              <Icon name="Calculator" size={24} color="white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-text-primary">Universal Converter</span>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Welcome Back</h1>
          <p className="mt-2 text-text-secondary">Sign in to your account to continue</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-card border border-border rounded-lg p-4 shadow-brand">
          <h2 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="Key" size={16} className="mr-2" />
            Demo Credentials
          </h2>
          <div className="space-y-2">
            {demoCredentials.map((cred, index) => (
              <button
                key={index}
                onClick={() => fillDemoCredentials(cred.email, cred.password)}
                className="w-full text-left p-2 rounded-lg bg-surface hover:bg-border transition-colors duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{cred.role} Account</p>
                    <p className="text-xs text-text-secondary">{cred.email}</p>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-text-secondary group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-text-secondary mt-2">
            Click on any demo account to auto-fill the login form
          </p>
        </div>

        {/* Login Form */}
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

              <div>
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  iconName="Mail"
                />
              </div>

              <div>
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
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
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                  <span className="ml-2 text-sm text-text-secondary">Remember me</span>
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={loading}
                iconName={loading ? 'Loader2' : 'LogIn'}
                iconPosition="left"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </div>

          <div className="px-6 py-4 bg-surface border-t border-border rounded-b-lg">
            <p className="text-center text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link
                to="/auth/signup"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-xs text-text-secondary">
            By signing in, you agree to our{' '}
            <Link to="/privacy-policy-legal-compliance-center" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy-policy-legal-compliance-center" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login