import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Map, BarChart3, TestTube, Monitor, Smartphone, Eye, MousePointer } from 'lucide-react';

const AdPlacementOptimizer = () => {
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const [activePlacement, setActivePlacement] = useState('header');

  const placements = [
    {
      id: 'header',
      name: 'Header Banner',
      position: 'Above the fold',
      performance: 'High',
      ctr: 2.3,
      revenue: 145.67,
      status: 'active',
      description: 'Leaderboard ad unit in header section'
    },
    {
      id: 'sidebar',
      name: 'Sidebar Rectangle',
      position: 'Right sidebar',
      performance: 'Medium',
      ctr: 1.8,
      revenue: 98.42,
      status: 'active',
      description: 'Medium rectangle in right sidebar'
    },
    {
      id: 'content',
      name: 'In-Content',
      position: 'Within article',
      performance: 'High',
      ctr: 2.7,
      revenue: 203.15,
      status: 'active',
      description: 'Responsive ad within content'
    },
    {
      id: 'footer',
      name: 'Footer Banner',
      position: 'Page bottom',
      performance: 'Low',
      ctr: 0.9,
      revenue: 34.28,
      status: 'testing',
      description: 'Banner ad in footer section'
    }
  ];

  const abTests = [
    {
      name: 'Header Position Test',
      variants: ['Current', 'Below Navigation'],
      performance: '+12% CTR',
      status: 'running',
      duration: '14 days remaining'
    },
    {
      name: 'Ad Size Optimization',
      variants: ['320x250', '300x600'],
      performance: '+8% Revenue',
      status: 'completed',
      duration: 'Completed 3 days ago'
    },
    {
      name: 'Mobile Layout Test',
      variants: ['Sticky', 'Inline'],
      performance: 'TBD',
      status: 'planned',
      duration: 'Starts next week'
    }
  ];

  const heatmapData = [
    { zone: 'Header', clicks: 156, views: 6789, ctr: 2.3 },
    { zone: 'Sidebar Top', clicks: 89, views: 4932, ctr: 1.8 },
    { zone: 'Content Middle', clicks: 203, views: 7521, ctr: 2.7 },
    { zone: 'Content Bottom', clicks: 67, views: 3214, ctr: 2.1 },
    { zone: 'Footer', clicks: 23, views: 2567, ctr: 0.9 }
  ];

  const getPerformanceColor = (performance) => {
    switch (performance.toLowerCase()) {
      case 'high':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'testing':
        return 'text-blue-600 bg-blue-50';
      case 'inactive':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Ad Placement Optimizer</h3>
              <p className="text-sm text-gray-600">Optimize ad positions for maximum revenue</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedDevice('desktop')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                selectedDevice === 'desktop' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Monitor className="h-4 w-4" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setSelectedDevice('mobile')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                selectedDevice === 'mobile' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Revenue</p>
                <p className="text-xl font-bold text-blue-900">$481.52</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Average CTR</p>
                <p className="text-xl font-bold text-green-900">1.93%</p>
              </div>
              <MousePointer className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Active Units</p>
                <p className="text-xl font-bold text-purple-900">4</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Total Impressions</p>
                <p className="text-xl font-bold text-orange-900">24.0K</p>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Ad Placements Grid */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Ad Placements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {placements?.map((placement) => (
            <motion.div
              key={placement?.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                activePlacement === placement?.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setActivePlacement(placement?.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-semibold text-gray-900">{placement?.name}</h5>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(placement?.status)}`}>
                  {placement?.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{placement?.description}</p>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Performance</p>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${getPerformanceColor(placement?.performance)}`}>
                    {placement?.performance}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">CTR</p>
                  <p className="text-sm font-semibold text-gray-900">{placement?.ctr}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-sm font-semibold text-green-600">${placement?.revenue}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* A/B Testing */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TestTube className="h-6 w-6 text-purple-600" />
            <h4 className="text-lg font-semibold text-gray-900">A/B Testing</h4>
          </div>
          
          <div className="space-y-4">
            {abTests?.map((test, index) => (
              <div key={test?.name} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{test?.name}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    test?.status === 'running' ? 'bg-green-100 text-green-800' :
                    test?.status === 'completed'? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {test?.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Testing: {test?.variants?.join(' vs ')}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{test?.duration}</span>
                  <span className="font-medium text-green-600">{test?.performance}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Create New Test
          </button>
        </div>

        {/* Heat Map */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Map className="h-6 w-6 text-orange-600" />
            <h4 className="text-lg font-semibold text-gray-900">Click Heatmap</h4>
          </div>
          
          <div className="space-y-3">
            {heatmapData?.map((zone, index) => (
              <div key={zone?.zone} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ 
                      backgroundColor: zone?.ctr > 2 ? '#10b981' : zone?.ctr > 1.5 ? '#f59e0b' : '#ef4444',
                      opacity: Math.min(zone?.ctr / 3, 1)
                    }}
                  ></div>
                  <span className="font-medium text-gray-900">{zone?.zone}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{zone?.ctr}% CTR</div>
                  <div className="text-xs text-gray-500">{zone?.clicks} clicks / {zone?.views} views</div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            Generate Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdPlacementOptimizer;