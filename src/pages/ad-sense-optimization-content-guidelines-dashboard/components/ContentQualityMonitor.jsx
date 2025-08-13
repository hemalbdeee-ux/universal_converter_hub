import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, AlertTriangle, CheckCircle, Eye, User, TrendingUp } from 'lucide-react';

const ContentQualityMonitor = () => {
  const [scanResults, setScanResults] = useState([
    {
      id: 1,
      url: '/length-conversion-guide',
      title: 'Complete Guide to Length Conversions',
      wordCount: 2450,
      readability: 85,
      uniqueness: 98,
      issues: [],
      status: 'excellent',
      lastChecked: '2 hours ago'
    },
    {
      id: 2,
      url: '/temperature-converter',
      title: 'Temperature Conversion Calculator',
      wordCount: 1200,
      readability: 78,
      uniqueness: 94,
      issues: ['Thin content warning'],
      status: 'warning',
      lastChecked: '4 hours ago'
    },
    {
      id: 3,
      url: '/weight-measurement-standards',
      title: 'International Weight Measurement Standards',
      wordCount: 3200,
      readability: 82,
      uniqueness: 96,
      issues: [],
      status: 'excellent',
      lastChecked: '1 day ago'
    },
    {
      id: 4,
      url: '/currency-exchange-basics',
      title: 'Currency Exchange Basics for Beginners',
      wordCount: 890,
      readability: 68,
      uniqueness: 87,
      issues: ['Low readability', 'Needs expert review'],
      status: 'needs-review',
      lastChecked: '2 days ago'
    }
  ]);

  const [contentGuidelines] = useState([
    {
      category: 'Content Length',
      requirement: 'Minimum 1500 words for main pages',
      status: 'good',
      description: 'Most pages meet minimum word count requirements'
    },
    {
      category: 'Originality',
      requirement: '95%+ unique content',
      status: 'excellent',
      description: 'All content passes plagiarism checks'
    },
    {
      category: 'Readability',
      requirement: 'Grade level 8-12',
      status: 'good',
      description: 'Content is accessible to general audience'
    },
    {
      category: 'Expert Review',
      requirement: 'Technical accuracy verification',
      status: 'warning',
      description: 'Some content needs expert validation'
    },
    {
      category: 'User Engagement',
      requirement: 'Interactive elements',
      status: 'excellent',
      description: 'Calculators and tools enhance user experience'
    },
    {
      category: 'Mobile Optimization',
      requirement: 'Mobile-friendly formatting',
      status: 'good',
      description: 'Content displays well on all devices'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'good':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'needs-review':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': case'good':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'needs-review':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Content Quality Monitor</h3>
              <p className="text-sm text-gray-600">Ensure all content meets AdSense quality standards</p>
            </div>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Search className="h-4 w-4" />
            <span>Scan All Pages</span>
          </button>
        </div>

        {/* Quality Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Pages Scanned</p>
                <p className="text-xl font-bold text-green-900">156</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Average Quality</p>
                <p className="text-xl font-bold text-blue-900">87%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Need Review</p>
                <p className="text-xl font-bold text-yellow-900">12</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Expert Reviews</p>
                <p className="text-xl font-bold text-purple-900">8</p>
              </div>
              <User className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Scan Results */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Content Scans</h4>
          
          <div className="space-y-4">
            {scanResults?.map((result) => (
              <motion.div
                key={result?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border ${getStatusColor(result?.status)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-gray-900">{result?.title}</h5>
                    <p className="text-sm text-gray-600">{result?.url}</p>
                  </div>
                  {getStatusIcon(result?.status)}
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Word Count</p>
                    <p className="text-sm font-semibold text-gray-900">{result?.wordCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Readability</p>
                    <p className="text-sm font-semibold text-gray-900">{result?.readability}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Uniqueness</p>
                    <p className="text-sm font-semibold text-gray-900">{result?.uniqueness}%</p>
                  </div>
                </div>

                {result?.issues?.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Issues:</p>
                    <div className="flex flex-wrap gap-1">
                      {result?.issues?.map((issue, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded"
                        >
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>Last checked: {result?.lastChecked}</span>
                  <button className="text-blue-600 hover:text-blue-800">View Details</button>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            View All Results
          </button>
        </div>

        {/* Content Guidelines */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Content Quality Guidelines</h4>
          
          <div className="space-y-4">
            {contentGuidelines?.map((guideline, index) => (
              <motion.div
                key={guideline?.category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{guideline?.category}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    guideline?.status === 'excellent' ? 'bg-green-100 text-green-800' :
                    guideline?.status === 'good'? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {guideline?.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{guideline?.requirement}</p>
                <p className="text-xs text-gray-500">{guideline?.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">Content Improvement Tips</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Add more detailed explanations and examples</li>
              <li>• Include relevant images and diagrams</li>
              <li>• Ensure content is regularly updated</li>
              <li>• Add user-friendly calculators and tools</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Automated Content Scanning */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Automated Content Scanning</h4>
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Search className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h5 className="font-semibold text-gray-900 mb-2">Plagiarism Detection</h5>
            <p className="text-sm text-gray-600">Automatically checks for duplicate content across the web</p>
          </div>
          <div className="text-center">
            <Eye className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h5 className="font-semibold text-gray-900 mb-2">Readability Analysis</h5>
            <p className="text-sm text-gray-600">Evaluates content readability and suggests improvements</p>
          </div>
          <div className="text-center">
            <User className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <h5 className="font-semibold text-gray-900 mb-2">Expert Review Queue</h5>
            <p className="text-sm text-gray-600">Routes technical content to subject matter experts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentQualityMonitor;