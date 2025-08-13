import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';
import LogoutButton from '../LogoutButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Converters', path: '/category-landing-comprehensive-converter-collections', icon: 'Calculator' },
    { name: 'Knowledge Center', path: '/knowledge-center-educational-resources-hub', icon: 'BookOpen' },
    { name: 'Search', path: '/search-results-hub-ai-powered-conversion-discovery', icon: 'Search' },
  ];

  const isActive = (path) => location?.pathname === path;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center">
              <Icon name="Calculator" size={20} color="white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl text-text-primary hidden sm:block">
              Universal Converter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.name}
                to={item?.path}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${isActive(item?.path)
                    ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }
                `}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* Compliance Link */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200">
                <Icon name="Shield" size={16} />
                <span>Legal</span>
                <Icon name="ChevronDown" size={14} />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <Link
                    to="/privacy-policy-legal-compliance-center"
                    className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <Icon name="Shield" size={16} className="text-gray-400" />
                    <span>Privacy Policy</span>
                  </Link>
                  <Link
                    to="/advertising-disclosure-transparency-hub"
                    className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <Icon name="AlertTriangle" size={16} className="text-gray-400" />
                    <span>Terms & Conditions</span>
                  </Link>
                  <Link
                    to="/contact-support-center"
                    className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <Icon name="Mail" size={16} className="text-gray-400" />
                    <span>Contact Us</span>
                  </Link>
                  <Link
                    to="/about-us-company-information"
                    className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <Icon name="Info" size={16} className="text-gray-400" />
                    <span>About Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Side - Auth & User Menu */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-surface animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                {/* User Profile */}
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {userProfile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-text-primary">
                      {userProfile?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {userProfile?.role === 'admin' ? 'Administrator' : 'User'}
                    </p>
                  </div>
                </div>

                {/* Dashboard Link */}
                <Button
                  onClick={() => navigate('/user-dashboard-personalized-conversion-management')}
                  variant="outline"
                  size="sm"
                  iconName="LayoutDashboard"
                  className="hidden sm:flex"
                >
                  Dashboard
                </Button>

                {/* Admin Panel Link (if admin) */}
                {userProfile?.role === 'admin' && (
                  <Button
                    onClick={() => navigate('/admin/users')}
                    variant="outline"
                    size="sm"
                    iconName="Users"
                    className="hidden sm:flex"
                  >
                    Users
                  </Button>
                )}

                {/* Logout Button */}
                <LogoutButton className="hidden sm:flex" />

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                >
                  <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => navigate('/auth/login')}
                  variant="outline"
                  size="sm"
                  iconName="LogIn"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/auth/signup')}
                  variant="default"
                  size="sm"
                  iconName="UserPlus"
                  className="hidden sm:flex"
                >
                  Sign Up
                </Button>

                {/* Mobile Menu Button for non-authenticated users */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                >
                  <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Navigation Items */}
              {navigationItems?.map((item) => (
                <Link
                  key={item?.name}
                  to={item?.path}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200
                    ${isActive(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              {/* Mobile Legal Links */}
              <div className="border-t border-border pt-3 mt-3">
                <div className="px-3 py-2">
                  <h3 className="text-sm font-semibold text-text-primary mb-2">Legal</h3>
                </div>
                <Link
                  to="/privacy-policy-legal-compliance-center"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                >
                  <Icon name="Shield" size={18} />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  to="/advertising-disclosure-transparency-hub"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                >
                  <Icon name="AlertTriangle" size={18} />
                  <span>Terms & Conditions</span>
                </Link>
                <Link
                  to="/contact-support-center"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                >
                  <Icon name="Mail" size={18} />
                  <span>Contact Us</span>
                </Link>
                <Link
                  to="/about-us-company-information"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                >
                  <Icon name="Info" size={18} />
                  <span>About Us</span>
                </Link>
              </div>

              {/* User Actions */}
              {user ? (
                <div className="border-t border-border mt-3 pt-3 space-y-1">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {userProfile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {userProfile?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {userProfile?.role === 'admin' ? 'Administrator' : 'User'}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/user-dashboard-personalized-conversion-management"
                    className="flex items-center space-x-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
                  >
                    <Icon name="LayoutDashboard" size={18} />
                    <span>Dashboard</span>
                  </Link>

                  {userProfile?.role === 'admin' && (
                    <Link
                      to="/admin/users"
                      className="flex items-center space-x-3 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
                    >
                      <Icon name="Users" size={18} />
                      <span>User Management</span>
                    </Link>
                  )}

                  <div className="px-3 py-2">
                    <LogoutButton 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-center"
                      showText={true}
                    />
                  </div>
                </div>
              ) : (
                <div className="border-t border-border mt-3 pt-3 space-y-2">
                  <div className="px-3">
                    <Button
                      onClick={() => navigate('/auth/login')}
                      variant="outline"
                      size="sm"
                      className="w-full justify-center mb-2"
                      iconName="LogIn"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => navigate('/auth/signup')}
                      variant="default"
                      size="sm"
                      className="w-full justify-center"
                      iconName="UserPlus"
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;