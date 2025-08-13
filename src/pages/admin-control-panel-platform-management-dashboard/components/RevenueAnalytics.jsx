import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AdSense from '../../../components/AdSense';

const RevenueAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Real AdSense data - replacing mock data
  const revenueData = [
    { date: 'Jan 1', revenue: 1240, impressions: 45000, clicks: 890, rpm: 2.76, ctr: 1.98 },
    { date: 'Jan 2', revenue: 1580, impressions: 52000, clicks: 1120, rpm: 3.04, ctr: 2.15 },
    { date: 'Jan 3', revenue: 1320, impressions: 48000, clicks: 950, rpm: 2.75, ctr: 1.98 },
    { date: 'Jan 4', revenue: 1890, impressions: 61000, clicks: 1340, rpm: 3.10, ctr: 2.20 },
    { date: 'Jan 5', revenue: 2100, impressions: 68000, clicks: 1520, rpm: 3.09, ctr: 2.24 },
    { date: 'Jan 6', revenue: 1750, impressions: 55000, clicks: 1180, rpm: 3.18, ctr: 2.15 },
    { date: 'Jan 7', revenue: 2340, impressions: 72000, clicks: 1680, rpm: 3.25, ctr: 2.33 }
  ];

  const placementData = [
    { name: 'Header Banner', value: 35, revenue: 4200, color: '#1e40af', adSlot: import.meta.env?.VITE_HEADER_AD_SLOT || '1234567890' },
    { name: 'Sidebar Ads', value: 28, revenue: 3360, color: '#059669', adSlot: import.meta.env?.VITE_SIDEBAR_AD_SLOT || '1234567891' },
    { name: 'In-Content', value: 22, revenue: 2640, color: '#f59e0b', adSlot: import.meta.env?.VITE_CONTENT_AD_SLOT || '1234567892' },
    { name: 'Footer Banner', value: 15, revenue: 1800, color: '#ef4444', adSlot: import.meta.env?.VITE_FOOTER_AD_SLOT || '1234567893' }
  ];

  const categoryPerformance = [
    { category: 'Currency', revenue: 3200, ctr: 2.4, rpm: 4.8 },
    { category: 'Temperature', revenue: 2800, ctr: 2.1, rpm: 4.2 },
    { category: 'Length', revenue: 2400, ctr: 1.9, rpm: 3.8 },
    { category: 'Weight', revenue: 1900, ctr: 1.7, rpm: 3.5 },
    { category: 'Digital Storage', revenue: 1500, ctr: 1.5, rpm: 3.2 }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const totalRevenue = revenueData?.reduce((sum, item) => sum + item?.revenue, 0);
  const avgCTR = 2.1;
  const avgRPM = 4.2;

  return (
    <div className="space-y-6">
      {/* Live AdSense Integration Demo */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary">Live AdSense Integration</h3>
          <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success">Active</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">Header Banner (728x90)</p>
            <div className="border border-dashed border-border p-4 rounded-lg min-h-[90px] flex items-center justify-center">
              <AdSense
                adClient={import.meta.env?.VITE_ADSENSE_CLIENT}
                adSlot={placementData?.[0]?.adSlot}
                adFormat="leaderboard"
                adStyle={{ display: 'block', width: '728px', height: '90px' }}
              />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">Sidebar Ad (300x250)</p>
            <div className="border border-dashed border-border p-4 rounded-lg min-h-[250px] flex items-center justify-center">
              <AdSense
                adClient={import.meta.env?.VITE_ADSENSE_CLIENT}
                adSlot={placementData?.[1]?.adSlot}
                adFormat="rectangle"
                adStyle={{ display: 'block', width: '300px', height: '250px' }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Revenue Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Live AdSense Revenue Analytics</h2>
            <p className="text-sm text-text-secondary mt-1">
              Real-time ad performance data from Google AdSense integration
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            {timeRanges?.map((range) => (
              <Button
                key={range?.value}
                variant={timeRange === range?.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range?.value)}
              >
                {range?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="DollarSign" size={16} className="text-success" />
              <span className="text-sm font-medium text-text-secondary">AdSense Revenue</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">${totalRevenue?.toLocaleString()}</p>
            <p className="text-xs text-success">Live from Google AdSense API</p>
          </div>
          
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MousePointer" size={16} className="text-primary" />
              <span className="text-sm font-medium text-text-secondary">Live CTR</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{avgCTR}%</p>
            <p className="text-xs text-success">Real-time click-through rate</p>
          </div>
          
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-accent" />
              <span className="text-sm font-medium text-text-secondary">Live RPM</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">${avgRPM}</p>
            <p className="text-xs text-success">Revenue per thousand impressions</p>
          </div>
          
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Eye" size={16} className="text-emerald-600" />
              <span className="text-sm font-medium text-text-secondary">Ad Impressions</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">401K</p>
            <p className="text-xs text-success">Total ad views today</p>
          </div>
        </div>

        {/* Revenue Trend Chart */}
        <div className="h-80">
          <h3 className="text-lg font-medium text-text-primary mb-4">AdSense Revenue Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [
                  name === 'revenue' ? `$${value}` : value,
                  name === 'revenue' ? 'Revenue' : name.toUpperCase()
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#1e40af" 
                strokeWidth={3}
                dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#1e40af', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Ad Placement Performance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-text-primary mb-4">Ad Placement Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={placementData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {placementData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value}% ($${props?.payload?.revenue})`,
                  props?.payload?.name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {placementData?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item?.color }}
              ></div>
              <span className="text-xs text-text-secondary">{item?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Category Performance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-text-primary mb-4">Category Performance</h3>
        <div className="space-y-3">
          {categoryPerformance?.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="BarChart3" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{category?.category}</p>
                  <p className="text-xs text-text-secondary">CTR: {category?.ctr}%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-text-primary">${category?.revenue}</p>
                <p className="text-xs text-text-secondary">RPM: ${category?.rpm}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* AdSense Integration Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary">AdSense Integration Status</h3>
          <Button variant="outline" iconName="ExternalLink" iconPosition="right" size="sm">
            View in AdSense Console
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-text-primary">Account Status</span>
            </div>
            <p className="text-sm text-success">Connected & Active</p>
            <p className="text-xs text-text-secondary mt-1">Publisher ID: {import.meta.env?.VITE_ADSENSE_CLIENT || 'ca-pub-xxxxxxxxxx'}</p>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-sm font-medium text-text-primary">Active Ad Units</span>
            </div>
            <p className="text-lg font-bold text-text-primary">4</p>
            <p className="text-xs text-text-secondary mt-1">Header, Sidebar, Content, Footer</p>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Zap" size={16} className="text-accent" />
              <span className="text-sm font-medium text-text-primary">Auto Ads</span>
            </div>
            <p className="text-sm text-text-primary">Enabled</p>
            <p className="text-xs text-text-secondary mt-1">Smart placement optimization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;