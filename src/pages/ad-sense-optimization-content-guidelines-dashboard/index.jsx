import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, DollarSign, Target, TrendingUp, Settings, AlertTriangle, CheckCircle, Eye, Clock, BarChart3, Search, FileText } from 'lucide-react';
import AdSense from '../../components/AdSense';
import PolicyComplianceChecker from './components/PolicyComplianceChecker';
import AdPlacementOptimizer from './components/AdPlacementOptimizer';
import ContentQualityMonitor from './components/ContentQualityMonitor';
import RevenueAnalytics from './components/RevenueAnalytics';
import ComplianceTracker from './components/ComplianceTracker';
import QualityAssuranceTools from './components/QualityAssuranceTools';

const AdSenseOptimizationDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [adSenseStatus, setAdSenseStatus] = useState({
    approved: true,
    revenue: 1247.83,
    impressions: 45678,
    clicks: 892,
    ctr: 1.95,
    rpm: 2.73
  });

  const [complianceScore, setComplianceScore] = useState(92);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Policy update: New content guidelines effective January 15, 2025',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'success',
      message: 'Site speed optimization completed - Loading time improved by 23%',
      timestamp: '1 day ago'
    },
    {
      id: 3,
      type: 'info',
      message: 'Monthly compliance review scheduled for next week',
      timestamp: '2 days ago'
    }
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'placement', label: 'Ad Placement', icon: Target },
    { id: 'content', label: 'Content Quality', icon: FileText },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'quality', label: 'Quality Assurance', icon: CheckCircle }
  ];

  const statsCards = [
    {
      title: 'AdSense Revenue',
      value: `$${adSenseStatus?.revenue}`,
      change: '+12.3%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Compliance Score',
      value: `${complianceScore}%`,
      change: '+2.1%',
      icon: Shield,
      color: 'text-blue-600'
    },
    {
      title: 'Page Impressions',
      value: adSenseStatus?.impressions?.toLocaleString(),
      change: '+8.7%',
      icon: Eye,
      color: 'text-purple-600'
    },
    {
      title: 'Click-Through Rate',
      value: `${adSenseStatus?.ctr}%`,
      change: '+0.3%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const quickActions = [
    { label: 'Run Compliance Check', icon: Shield, color: 'bg-blue-500' },
    { label: 'Optimize Ad Placement', icon: Target, color: 'bg-green-500' },
    { label: 'Content Audit', icon: Search, color: 'bg-purple-500' },
    { label: 'Performance Report', icon: BarChart3, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Settings className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">AdSense Optimization Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">AdSense Approved</span>
              </div>
              
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <AlertTriangle className="h-6 w-6" />
                  {notifications?.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards?.map((stat, index) => (
            <motion.div
              key={stat?.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat?.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat?.value}</p>
                  <p className={`text-sm ${stat?.color} mt-1`}>{stat?.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50`}>
                  <stat.icon className={`h-6 w-6 ${stat?.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AdSense Integration Display */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AdSense Integration</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <AdSense
                adClient={import.meta.env?.VITE_ADSENSE_CLIENT}
                adSlot="1234567890"
                adFormat="auto"
                adStyle={{ display: 'block', minHeight: '120px', backgroundColor: '#f8f9fa' }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              AdSense integration active with responsive ad units
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab?.id
                      ? 'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions?.map((action, index) => (
                    <button
                      key={action?.label}
                      className="flex flex-col items-center space-y-2 p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className={`p-3 rounded-lg ${action?.color}`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{action?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
                <div className="space-y-3">
                  {notifications?.map((notification) => (
                    <div key={notification?.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`p-1 rounded-full ${
                        notification?.type === 'warning' ? 'bg-yellow-100' :
                        notification?.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {notification?.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                        {notification?.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {notification?.type === 'info' && <Clock className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{notification?.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification?.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'compliance' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <PolicyComplianceChecker />
              <div className="mt-6">
                <ComplianceTracker />
              </div>
            </motion.div>
          )}

          {activeTab === 'placement' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AdPlacementOptimizer />
            </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ContentQualityMonitor />
            </motion.div>
          )}

          {activeTab === 'revenue' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <RevenueAnalytics />
            </motion.div>
          )}

          {activeTab === 'quality' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <QualityAssuranceTools />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdSenseOptimizationDashboard;