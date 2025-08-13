import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DashboardStats from './components/DashboardStats';
import UsageChart from './components/UsageChart';
import CustomConverterCard from './components/CustomConverterCard';
import ConversionHistory from './components/ConversionHistory';
import FavoriteConverters from './components/FavoriteConverters';
import AccountSettings from './components/AccountSettings';
import LearningRecommendations from './components/LearningRecommendations';

const UserDashboard = () => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/login');
    }
  }, [user, loading, navigate]);

  // Mock data for dashboard stats
  const dashboardStats = [
    {
      label: "Total Conversions",
      value: "2,847",
      icon: "Calculator",
      bgColor: "bg-primary/10",
      iconColor: "var(--color-primary)",
      change: { type: "increase", value: "+12% this week" }
    },
    {
      label: "Favorite Converters",
      value: "18",
      icon: "Heart",
      bgColor: "bg-error/10",
      iconColor: "var(--color-error)",
      change: { type: "increase", value: "+3 new" }
    },
    {
      label: "Custom Sets",
      value: "7",
      icon: "Layers",
      bgColor: "bg-success/10",
      iconColor: "var(--color-success)",
      change: { type: "increase", value: "+2 this month" }
    },
    {
      label: "Accuracy Rate",
      value: "99.8%",
      icon: "Target",
      bgColor: "bg-accent/10",
      iconColor: "var(--color-accent)",
      change: { type: "increase", value: "+0.2%" }
    }
  ];

  // Mock data for usage charts
  const dailyUsageData = [
    { name: 'Mon', conversions: 45 },
    { name: 'Tue', conversions: 52 },
    { name: 'Wed', conversions: 38 },
    { name: 'Thu', conversions: 61 },
    { name: 'Fri', conversions: 55 },
    { name: 'Sat', conversions: 28 },
    { name: 'Sun', conversions: 33 }
  ];

  const categoryUsageData = [
    { name: 'Length', value: 35 },
    { name: 'Weight', value: 25 },
    { name: 'Temperature', value: 20 },
    { name: 'Currency', value: 15 },
    { name: 'Volume', value: 5 }
  ];

  // Mock data for custom converters
  const customConverters = [
    {
      id: 1,
      name: "Recipe Conversions",
      description: "Cooking measurements and temperatures",
      icon: "ChefHat",
      bgColor: "bg-accent/10",
      iconColor: "var(--color-accent)",
      conversions: 234,
      lastUsed: "2 hours ago",
      accuracy: "99.9%",
      tags: ["Cooking", "Volume", "Temperature"],
      type: "recipe"
    },
    {
      id: 2,
      name: "Engineering Specs",
      description: "Technical measurements and tolerances",
      icon: "Wrench",
      bgColor: "bg-primary/10",
      iconColor: "var(--color-primary)",
      conversions: 156,
      lastUsed: "1 day ago",
      accuracy: "99.8%",
      tags: ["Engineering", "Precision", "Length"],
      type: "engineering"
    },
    {
      id: 3,
      name: "Travel Essentials",
      description: "Currency, distance, and weather conversions",
      icon: "Plane",
      bgColor: "bg-success/10",
      iconColor: "var(--color-success)",
      conversions: 89,
      lastUsed: "3 days ago",
      accuracy: "99.7%",
      tags: ["Travel", "Currency", "Distance"],
      type: "travel"
    }
  ];

  // Mock data for conversion history
  const conversionHistory = [
    {
      conversion: "100 USD to EUR",
      category: "Currency",
      result: "€92.45",
      timestamp: "2 minutes ago",
      icon: "DollarSign",
      type: "currency",
      frequency: 5
    },
    {
      conversion: "5 feet to meters",
      category: "Length",
      result: "1.524 m",
      timestamp: "15 minutes ago",
      icon: "Ruler",
      type: "length",
      frequency: 3
    },
    {
      conversion: "350°F to Celsius",
      category: "Temperature",
      result: "176.67°C",
      timestamp: "1 hour ago",
      icon: "Thermometer",
      type: "temperature",
      frequency: 8
    },
    {
      conversion: "2 cups to liters",
      category: "Volume",
      result: "0.473 L",
      timestamp: "2 hours ago",
      icon: "Beaker",
      type: "volume",
      frequency: 12
    },
    {
      conversion: "1 mile to kilometers",
      category: "Length",
      result: "1.609 km",
      timestamp: "3 hours ago",
      icon: "Ruler",
      type: "length",
      frequency: 7
    }
  ];

  // Mock data for favorite converters
  const favoriteConverters = [
    {
      id: 1,
      name: "Length Converter",
      category: "Length & Distance",
      icon: "Ruler",
      bgColor: "bg-primary/10",
      iconColor: "var(--color-primary)",
      usageCount: 145,
      lastUsed: "2 hours ago",
      usageFrequency: 35
    },
    {
      id: 2,
      name: "Currency Converter",
      category: "Currency",
      icon: "DollarSign",
      bgColor: "bg-success/10",
      iconColor: "var(--color-success)",
      usageCount: 98,
      lastUsed: "5 minutes ago",
      usageFrequency: 28
    },
    {
      id: 3,
      name: "Temperature Converter",
      category: "Temperature",
      icon: "Thermometer",
      bgColor: "bg-accent/10",
      iconColor: "var(--color-accent)",
      usageCount: 76,
      lastUsed: "1 day ago",
      usageFrequency: 22
    },
    {
      id: 4,
      name: "Weight Converter",
      category: "Weight & Mass",
      icon: "Scale",
      bgColor: "bg-error/10",
      iconColor: "var(--color-error)",
      usageCount: 54,
      lastUsed: "3 days ago",
      usageFrequency: 15
    }
  ];

  // Account settings based on user profile
  const [accountSettings, setAccountSettings] = useState({
    fullName: userProfile?.full_name || '',
    email: userProfile?.email || '',
    defaultPrecision: userProfile?.preferences?.defaultPrecision || '4',
    measurementSystem: userProfile?.preferences?.measurementSystem || 'metric',
    currencyDisplay: userProfile?.preferences?.currencyDisplay || 'symbol',
    numberFormat: userProfile?.preferences?.numberFormat || 'us',
    emailNotifications: userProfile?.preferences?.emailNotifications ?? true,
    weeklyReport: userProfile?.preferences?.weeklyReport ?? true,
    featureUpdates: userProfile?.preferences?.featureUpdates ?? false,
    educationalContent: userProfile?.preferences?.educationalContent ?? true,
    saveHistory: userProfile?.privacy_settings?.saveHistory ?? true,
    shareAnalytics: userProfile?.privacy_settings?.shareAnalytics ?? true,
    publicProfile: userProfile?.privacy_settings?.publicProfile ?? false
  });

  // Update settings when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setAccountSettings({
        fullName: userProfile?.full_name || '',
        email: userProfile?.email || '',
        defaultPrecision: userProfile?.preferences?.defaultPrecision || '4',
        measurementSystem: userProfile?.preferences?.measurementSystem || 'metric',
        currencyDisplay: userProfile?.preferences?.currencyDisplay || 'symbol',
        numberFormat: userProfile?.preferences?.numberFormat || 'us',
        emailNotifications: userProfile?.preferences?.emailNotifications ?? true,
        weeklyReport: userProfile?.preferences?.weeklyReport ?? true,
        featureUpdates: userProfile?.preferences?.featureUpdates ?? false,
        educationalContent: userProfile?.preferences?.educationalContent ?? true,
        saveHistory: userProfile?.privacy_settings?.saveHistory ?? true,
        shareAnalytics: userProfile?.privacy_settings?.shareAnalytics ?? true,
        publicProfile: userProfile?.privacy_settings?.publicProfile ?? false
      });
    }
  }, [userProfile]);

  // Mock data for learning recommendations
  const learningRecommendations = [
    {
      title: "Understanding Metric vs Imperial Systems",
      description: "Learn the historical context and practical differences between measurement systems used worldwide.",
      icon: "BookOpen",
      bgColor: "bg-primary/10",
      iconColor: "var(--color-primary)",
      readTime: "8 min read",
      difficulty: "Beginner",
      popularity: "Popular",
      isNew: false,
      progress: 65,
      link: "/knowledge-center-educational-resources-hub?article=metric-imperial",
      relatedTopics: ["History", "Culture", "Standards"]
    },
    {
      title: "Precision in Engineering Conversions",
      description: "Master the art of maintaining accuracy when converting between engineering units and tolerances.",
      icon: "Wrench",
      bgColor: "bg-success/10",
      iconColor: "var(--color-success)",
      readTime: "12 min read",
      difficulty: "Advanced",
      popularity: "Trending",
      isNew: true,
      progress: 0,
      link: "/knowledge-center-educational-resources-hub?article=engineering-precision",
      relatedTopics: ["Engineering", "Precision", "Tolerances"]
    },
    {
      title: "Currency Exchange Rate Fundamentals",
      description: "Understand how exchange rates work and factors that influence currency conversion accuracy.",
      icon: "DollarSign",
      bgColor: "bg-accent/10",
      iconColor: "var(--color-accent)",
      readTime: "10 min read",
      difficulty: "Intermediate",
      popularity: "Recommended",
      isNew: false,
      progress: 30,
      link: "/knowledge-center-educational-resources-hub?article=currency-fundamentals",
      relatedTopics: ["Finance", "Economics", "Markets"]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'converters', label: 'My Converters', icon: 'Calculator' },
    { id: 'history', label: 'History', icon: 'History' },
    { id: 'favorites', label: 'Favorites', icon: 'Heart' },
    { id: 'learning', label: 'Learning', icon: 'BookOpen' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  // Event handlers
  const handleEditConverter = (converter) => {
    alert(`Edit functionality for ${converter?.name} would be implemented here.`);
  };

  const handleDeleteConverter = (converter) => {
    if (confirm(`Are you sure you want to delete ${converter?.name}?`)) {
      alert(`Delete functionality for ${converter?.name} would be implemented here.`);
    }
  };

  const handleDuplicateConverter = (converter) => {
    alert(`Duplicate functionality for ${converter?.name} would be implemented here.`);
  };

  const handleExportHistory = (format) => {
    alert(`Export history as ${format?.toUpperCase()} would be implemented here.`);
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all conversion history?')) {
      alert('Clear history functionality would be implemented here.');
    }
  };

  const handleRemoveFavorite = (favoriteId) => {
    alert(`Remove favorite functionality for ID ${favoriteId} would be implemented here.`);
  };

  const handleUseConverter = (converter) => {
    window.location.href = `/individual-converter-focused-conversion-experience?type=${converter?.category?.toLowerCase()}`;
  };

  const handleUpdateSettings = (newSettings) => {
    setAccountSettings(newSettings);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Icon name="Loader2" size={24} className="animate-spin text-primary" />
          <span className="text-text-primary">Loading your dashboard...</span>
        </div>
      </div>
    )
  }

  // Redirect will happen in useEffect, but show nothing while redirecting
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>User Dashboard - Personalized Conversion Management | Universal Converter Hub</title>
        <meta name="description" content="Manage your personal conversion activity with usage analytics, saved conversion sets, and customization tools. Track your conversion history and preferences." />
        <meta name="keywords" content="user dashboard, conversion management, analytics, conversion history, favorites, settings" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* User Profile Header */}
        <div className="bg-gradient-to-r from-primary to-success text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 bg-white/10 flex items-center justify-center">
                {userProfile?.avatar_url ? (
                  <img
                    src={userProfile?.avatar_url}
                    alt={userProfile?.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-2xl">
                    {userProfile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{userProfile?.full_name || 'User'}</h1>
                <p className="text-white/80 mt-1">{userProfile?.email || 'user@example.com'}</p>
                <p className="text-white/60 text-sm mt-1">
                  Member since {userProfile?.created_at ? 
                    new Date(userProfile.created_at)?.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    }) : 
                    'Recently'
                  }
                </p>
                {userProfile?.role === 'admin' && (
                  <span className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium bg-white/20 text-white rounded-full">
                    <Icon name="Shield" size={12} className="mr-1" />
                    Administrator
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-card border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200
                    ${activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Dashboard Stats */}
              <DashboardStats stats={dashboardStats} />

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-lg p-6 shadow-brand">
                  <h2 className="text-xl font-semibold text-text-primary mb-4">Daily Usage</h2>
                  <UsageChart chartData={dailyUsageData} chartType="bar" />
                </div>
                <div className="bg-card border border-border rounded-lg p-6 shadow-brand">
                  <h2 className="text-xl font-semibold text-text-primary mb-4">Category Distribution</h2>
                  <UsageChart chartData={categoryUsageData} chartType="pie" />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-brand">
                <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/category-landing-comprehensive-converter-collections'}
                    iconName="Plus"
                    iconPosition="left"
                    className="h-16 flex-col space-y-2"
                  >
                    <span>Add Converter</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('converters')}
                    iconName="Layers"
                    iconPosition="left"
                    className="h-16 flex-col space-y-2"
                  >
                    <span>Create Set</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleExportHistory('csv')}
                    iconName="Download"
                    iconPosition="left"
                    className="h-16 flex-col space-y-2"
                  >
                    <span>Export Data</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/search-results-hub-ai-powered-conversion-discovery'}
                    iconName="Search"
                    iconPosition="left"
                    className="h-16 flex-col space-y-2"
                  >
                    <span>Find Converter</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'converters' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-text-primary">My Custom Converters</h1>
                <Button
                  variant="default"
                  onClick={() => alert('Create new converter functionality would be implemented here.')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create New Set
                </Button>
              </div>

              {customConverters?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Layers" size={64} className="mx-auto text-text-secondary mb-4" />
                  <h2 className="text-xl font-semibold text-text-primary mb-2">No Custom Converters Yet</h2>
                  <p className="text-text-secondary mb-6">Create your first custom conversion set to get started</p>
                  <Button
                    variant="default"
                    onClick={() => alert('Create converter functionality would be implemented here.')}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Create Your First Set
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {customConverters?.map((converter) => (
                    <CustomConverterCard
                      key={converter?.id}
                      converter={converter}
                      onEdit={handleEditConverter}
                      onDelete={handleDeleteConverter}
                      onDuplicate={handleDuplicateConverter}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-8">
              <ConversionHistory
                history={conversionHistory}
                onExport={handleExportHistory}
                onClear={handleClearHistory}
              />
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="space-y-8">
              <FavoriteConverters
                favorites={favoriteConverters}
                onRemoveFavorite={handleRemoveFavorite}
                onUseConverter={handleUseConverter}
              />
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="space-y-8">
              <LearningRecommendations recommendations={learningRecommendations} />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <AccountSettings
                settings={accountSettings}
                onUpdateSettings={handleUpdateSettings}
              />
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <Icon name="Calculator" size={20} color="white" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-text-primary">Universal Converter Hub</span>
            </div>
            <p className="text-sm text-text-secondary">
              © {new Date()?.getFullYear()} Universal Converter Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;