import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import StatisticsOverview from './components/StatisticsOverview';
import ConverterManagement from './components/ConverterManagement';
import RevenueAnalytics from './components/RevenueAnalytics';
import UserManagement from './components/UserManagement';
import SystemMonitoring from './components/SystemMonitoring';
import SEOTools from './components/SEOTools';
import AdSenseManagement from './components/AdSenseManagement';
import FooterManagement from './components/FooterManagement';

const AdminControlPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard', component: StatisticsOverview },
    { id: 'converters', label: 'Converters', icon: 'Calculator', component: ConverterManagement },
    { id: 'revenue', label: 'Revenue', icon: 'DollarSign', component: RevenueAnalytics },
    { id: 'adsense', label: 'AdSense', icon: 'Target', component: AdSenseManagement },
    { id: 'users', label: 'Users', icon: 'Users', component: UserManagement },
    { id: 'system', label: 'System', icon: 'Server', component: SystemMonitoring },
    { id: 'seo', label: 'SEO Tools', icon: 'Search', component: SEOTools },
    { id: 'footer', label: 'Footer', icon: 'Layout', component: FooterManagement }
  ];

  const ActiveComponent = navigationTabs?.find(tab => tab?.id === activeTab)?.component || StatisticsOverview;

  const quickActions = [
    { label: 'Export Analytics', icon: 'Download', action: () => console.log('Export analytics') },
    { label: 'System Backup', icon: 'HardDrive', action: () => console.log('System backup') },
    { label: 'Clear Cache', icon: 'RefreshCw', action: () => console.log('Clear cache') },
    { label: 'Send Notification', icon: 'Bell', action: () => console.log('Send notification') }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New user registered: sarah.johnson@email.com',
      timestamp: '2 minutes ago',
      icon: 'UserPlus',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'converter_update',
      message: 'Currency converter updated with new exchange rates',
      timestamp: '15 minutes ago',
      icon: 'RefreshCw',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'system_alert',
      message: 'High CPU usage detected on server node 2',
      timestamp: '32 minutes ago',
      icon: 'AlertTriangle',
      color: 'text-warning'
    },
    {
      id: 4,
      type: 'revenue_milestone',
      message: 'Daily revenue target achieved: $12,847',
      timestamp: '1 hour ago',
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      id: 5,
      type: 'security_event',
      message: 'SSL certificate renewed successfully',
      timestamp: '2 hours ago',
      icon: 'Shield',
      color: 'text-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Control Panel - Platform Management Dashboard | Universal Converter Hub</title>
        <meta name="description" content="Comprehensive admin dashboard for Universal Converter Hub. Manage converters, analytics, users, revenue optimization, and system monitoring." />
        <meta name="keywords" content="admin dashboard, converter management, analytics, revenue optimization, system monitoring" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-card border-r border-border transition-all duration-300 flex-shrink-0`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              {!sidebarCollapsed && (
                <h2 className="text-lg font-semibold text-text-primary">Admin Panel</h2>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                iconName={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
                iconSize={16}
              />
            </div>

            <nav className="space-y-2">
              {navigationTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-brand'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  {!sidebarCollapsed && <span>{tab?.label}</span>}
                </button>
              ))}
            </nav>

            {!sidebarCollapsed && (
              <>
                {/* Quick Actions */}
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-text-secondary mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    {quickActions?.map((action, index) => (
                      <button
                        key={index}
                        onClick={action?.action}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
                      >
                        <Icon name={action?.icon} size={14} />
                        <span>{action?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-text-secondary mb-3">Recent Activities</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {recentActivities?.map((activity) => (
                      <div key={activity?.id} className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-surface rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon name={activity?.icon} size={12} className={activity?.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-text-primary leading-relaxed">{activity?.message}</p>
                          <p className="text-xs text-text-secondary mt-1">{activity?.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">
                    {navigationTabs?.find(tab => tab?.id === activeTab)?.label || 'Overview'}
                  </h1>
                  <p className="text-text-secondary mt-1">
                    {activeTab === 'overview' && 'Real-time platform statistics and system health monitoring'}
                    {activeTab === 'converters' && 'Manage conversion factors, accuracy standards, and validation workflows'}
                    {activeTab === 'revenue' && 'AdSense analytics, placement optimization, and revenue tracking'}
                    {activeTab === 'adsense' && 'Configure Google AdSense settings, ad units, and performance monitoring'}
                    {activeTab === 'users' && 'User account management, authentication, and demographic insights'}
                    {activeTab === 'system' && 'System performance monitoring, API health, and security events'}
                    {activeTab === 'seo' && 'SEO optimization tools, meta tags, and search performance'}
                    {activeTab === 'footer' && 'Manage footer pages, links, and navigation sections for the website'}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-success">System Healthy</span>
                  </div>
                  
                  <Button variant="outline" iconName="Settings" iconPosition="left" size="sm">
                    Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="space-y-6">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-text-secondary">
                © {new Date()?.getFullYear()} Universal Converter Hub. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={14} />
                <span>Last updated: {new Date()?.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-success">
                <Icon name="Wifi" size={14} />
                <span>Connected</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminControlPanel;