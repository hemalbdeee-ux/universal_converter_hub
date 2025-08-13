import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Globe, Users, MousePointer, Eye, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RevenueAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const revenueData = [
    { date: '2025-01-01', revenue: 45.32, impressions: 12500, clicks: 234 },
    { date: '2025-01-02', revenue: 52.18, impressions: 13200, clicks: 267 },
    { date: '2025-01-03', revenue: 48.76, impressions: 11800, clicks: 221 },
    { date: '2025-01-04', revenue: 61.43, impressions: 14600, clicks: 298 },
    { date: '2025-01-05', revenue: 58.29, impressions: 13900, clicks: 287 },
    { date: '2025-01-06', revenue: 67.15, impressions: 15300, clicks: 312 },
    { date: '2025-01-07', revenue: 54.82, impressions: 12700, clicks: 245 }
  ];

  const geographicData = [
    { country: 'United States', revenue: 145.67, percentage: 34.2, color: '#3b82f6' },
    { country: 'Canada', revenue: 87.43, percentage: 20.5, color: '#10b981' },
    { country: 'United Kingdom', revenue: 76.21, percentage: 17.9, color: '#f59e0b' },
    { country: 'Germany', revenue: 54.18, percentage: 12.7, color: '#ef4444' },
    { country: 'Australia', revenue: 43.29, percentage: 10.2, color: '#8b5cf6' },
    { country: 'Others', revenue: 19.85, percentage: 4.5, color: '#6b7280' }
  ];

  const deviceData = [
    { device: 'Desktop', revenue: 234.67, sessions: 8943, ctr: 2.1 },
    { device: 'Mobile', revenue: 187.43, sessions: 12456, ctr: 1.8 },
    { device: 'Tablet', revenue: 43.53, sessions: 2134, ctr: 2.3 }
  ];

  const monthlyTrends = [
    { month: 'Sep', revenue: 1234, growth: 8.2 },
    { month: 'Oct', revenue: 1387, growth: 12.4 },
    { month: 'Nov', revenue: 1456, growth: 5.0 },
    { month: 'Dec', revenue: 1623, growth: 11.5 },
    { month: 'Jan', revenue: 1247, growth: -23.2 }
  ];

  const topPerformingPages = [
    { page: '/length-conversion-guide', revenue: 89.45, sessions: 4532, ctr: 2.7 },
    { page: '/temperature-converter', revenue: 76.32, sessions: 3821, ctr: 2.3 },
    { page: '/weight-measurement-tools', revenue: 65.18, sessions: 3124, ctr: 2.1 },
    { page: '/currency-exchange-calculator', revenue: 54.27, sessions: 2876, ctr: 1.9 },
    { page: '/time-zone-converter', revenue: 41.36, sessions: 2234, ctr: 1.8 }
  ];

  const formatCurrency = (value) => `$${value?.toFixed(2)}`;
  const formatNumber = (value) => value?.toLocaleString();

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Revenue Analytics</h3>
              <p className="text-sm text-gray-600">Monitor AdSense performance and optimization opportunities</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-900">$1,247.83</p>
                <p className="text-sm text-green-600">+12.3% vs last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">RPM</p>
                <p className="text-2xl font-bold text-blue-900">$2.73</p>
                <p className="text-sm text-blue-600">+8.7% vs last month</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Impressions</p>
                <p className="text-2xl font-bold text-purple-900">456.8K</p>
                <p className="text-sm text-purple-600">+15.2% vs last month</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">CTR</p>
                <p className="text-2xl font-bold text-orange-900">1.95%</p>
                <p className="text-sm text-orange-600">+0.3% vs last month</p>
              </div>
              <MousePointer className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Revenue Trend</h4>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedMetric('revenue')}
              className={`px-3 py-1 rounded-lg text-sm ${
                selectedMetric === 'revenue' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setSelectedMetric('impressions')}
              className={`px-3 py-1 rounded-lg text-sm ${
                selectedMetric === 'impressions' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Impressions
            </button>
            <button
              onClick={() => setSelectedMetric('clicks')}
              className={`px-3 py-1 rounded-lg text-sm ${
                selectedMetric === 'clicks' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Clicks
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                labelFormatter={(value) => `Date: ${value}`}
                formatter={(value) => [
                  selectedMetric === 'revenue' ? formatCurrency(value) : formatNumber(value),
                  selectedMetric?.charAt(0)?.toUpperCase() + selectedMetric?.slice(1)
                ]}
              />
              <Area 
                type="monotone" 
                dataKey={selectedMetric}
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Performance */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-6 w-6 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-900">Geographic Performance</h4>
          </div>

          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={geographicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="percentage"
                  label={({ country, percentage }) => `${country}: ${percentage}%`}
                >
                  {geographicData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {geographicData?.slice(0, 4)?.map((country) => (
              <div key={country?.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: country?.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{country?.country}</span>
                </div>
                <span className="font-semibold text-gray-900">{formatCurrency(country?.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Performance */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-purple-600" />
            <h4 className="text-lg font-semibold text-gray-900">Device Performance</h4>
          </div>

          <div className="space-y-4">
            {deviceData?.map((device, index) => (
              <motion.div
                key={device?.device}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{device?.device}</h5>
                  <span className="font-bold text-green-600">{formatCurrency(device?.revenue)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Sessions</p>
                    <p className="font-semibold text-gray-900">{formatNumber(device?.sessions)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">CTR</p>
                    <p className="font-semibold text-gray-900">{device?.ctr}%</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Top Performing Pages */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Pages</h4>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CTR
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformingPages?.map((page, index) => (
                <tr key={page?.page} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{page?.page}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">{formatCurrency(page?.revenue)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatNumber(page?.sessions)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{page?.ctr}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trends</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {monthlyTrends?.map((month) => (
            <div key={month?.month} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{month?.month}</div>
              <div className="text-sm text-gray-600 mb-2">{formatCurrency(month?.revenue)}</div>
              <div className={`text-sm font-semibold ${
                month?.growth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {month?.growth > 0 ? '+' : ''}{month?.growth?.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;