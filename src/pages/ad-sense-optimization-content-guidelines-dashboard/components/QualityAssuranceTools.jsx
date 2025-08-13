import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Gauge, Eye, CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';

const QualityAssuranceTools = () => {
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [selectedTest, setSelectedTest] = useState('all');

  const performanceMetrics = [
    {
      name: 'Page Load Speed',
      desktop: { score: 87, status: 'good', value: '2.3s' },
      mobile: { score: 72, status: 'warning', value: '3.1s' },
      target: '< 3.0s',
      impact: 'High - Affects AdSense approval'
    },
    {
      name: 'Core Web Vitals',
      desktop: { score: 91, status: 'good', value: 'Pass' },
      mobile: { score: 78, status: 'warning', value: 'Needs Work' },
      target: 'All metrics pass',
      impact: 'Critical - Required for AdSense'
    },
    {
      name: 'Mobile Responsiveness',
      desktop: { score: 100, status: 'excellent', value: 'Perfect' },
      mobile: { score: 94, status: 'good', value: 'Good' },
      target: '100% responsive',
      impact: 'High - Mobile-first indexing'
    },
    {
      name: 'Accessibility Score',
      desktop: { score: 89, status: 'good', value: '89/100' },
      mobile: { score: 85, status: 'good', value: '85/100' },
      target: '> 90/100',
      impact: 'Medium - User experience'
    }
  ];

  const seoAudit = [
    {
      category: 'Technical SEO',
      items: [
        { name: 'SSL Certificate', status: 'pass', description: 'HTTPS enabled site-wide' },
        { name: 'Meta Descriptions', status: 'warning', description: '12 pages missing meta descriptions' },
        { name: 'Title Tags', status: 'pass', description: 'All pages have unique titles' },
        { name: 'Structured Data', status: 'pass', description: 'Schema markup implemented' }
      ]
    },
    {
      category: 'Content Quality',
      items: [
        { name: 'Duplicate Content', status: 'pass', description: 'No duplicate content detected' },
        { name: 'Content Length', status: 'warning', description: '8 pages below 300 words' },
        { name: 'Image Alt Text', status: 'fail', description: '23 images missing alt text' },
        { name: 'Internal Linking', status: 'pass', description: 'Good internal link structure' }
      ]
    },
    {
      category: 'User Experience',
      items: [
        { name: 'Mobile Usability', status: 'pass', description: 'Mobile-friendly design' },
        { name: 'Page Speed', status: 'warning', description: 'Some pages load slowly' },
        { name: 'Navigation', status: 'pass', description: 'Clear site structure' },
        { name: 'Contact Information', status: 'pass', description: 'Contact page available' }
      ]
    }
  ];

  const complianceChecks = [
    {
      name: 'AdSense Policy Compliance',
      status: 'pass',
      score: 94,
      details: 'Content meets AdSense guidelines',
      issues: []
    },
    {
      name: 'GDPR Compliance',
      status: 'pass',
      score: 91,
      details: 'Privacy policy and cookie consent implemented',
      issues: ['Cookie categorization needs improvement']
    },
    {
      name: 'Accessibility Standards',
      status: 'warning',
      score: 85,
      details: 'Most accessibility requirements met',
      issues: ['Some images lack alt text', 'Color contrast issues on 3 pages']
    },
    {
      name: 'Content Quality',
      status: 'warning',
      score: 78,
      details: 'Generally good content quality',
      issues: ['Some thin content pages', '12 pages need content expansion']
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass': case'excellent': case'good':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleRunTest = () => {
    setIsRunningTest(true);
    setTimeout(() => {
      setIsRunningTest(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Quality Assurance Tools</h3>
              <p className="text-sm text-gray-600">Monitor site performance and compliance metrics</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedTest}
              onChange={(e) => setSelectedTest(e?.target?.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Tests</option>
              <option value="performance">Performance Only</option>
              <option value="seo">SEO Only</option>
              <option value="compliance">Compliance Only</option>
            </select>

            <button
              onClick={handleRunTest}
              disabled={isRunningTest}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isRunningTest ? 'animate-spin' : ''}`} />
              <span>{isRunningTest ? 'Running...' : 'Run Tests'}</span>
            </button>
          </div>
        </div>

        {/* Overall Score */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Overall Score</p>
                <p className="text-2xl font-bold text-green-900">87%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Performance</p>
                <p className="text-2xl font-bold text-blue-900">82%</p>
              </div>
              <Gauge className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">SEO Score</p>
                <p className="text-2xl font-bold text-purple-900">91%</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Compliance</p>
                <p className="text-2xl font-bold text-orange-900">87%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h4>
        
        <div className="space-y-4">
          {performanceMetrics?.map((metric, index) => (
            <motion.div
              key={metric?.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">{metric?.name}</h5>
                <span className="text-xs text-gray-500">{metric?.target}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-3">
                  <Monitor className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Desktop</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{metric?.desktop?.value}</span>
                        <span className={`text-sm font-bold ${getScoreColor(metric?.desktop?.score)}`}>
                          {metric?.desktop?.score}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          metric?.desktop?.score >= 90 ? 'bg-green-500' :
                          metric?.desktop?.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric?.desktop?.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Mobile</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{metric?.mobile?.value}</span>
                        <span className={`text-sm font-bold ${getScoreColor(metric?.mobile?.score)}`}>
                          {metric?.mobile?.score}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          metric?.mobile?.score >= 90 ? 'bg-green-500' :
                          metric?.mobile?.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric?.mobile?.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500">{metric?.impact}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Audit */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">SEO Audit Results</h4>
          
          <div className="space-y-4">
            {seoAudit?.map((category, categoryIndex) => (
              <div key={category?.category}>
                <h5 className="font-medium text-gray-900 mb-2">{category?.category}</h5>
                <div className="space-y-2">
                  {category?.items?.map((item, itemIndex) => (
                    <div key={item?.name} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                      {getStatusIcon(item?.status)}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{item?.name}</div>
                        <div className="text-xs text-gray-600">{item?.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Compliance Overview</h4>
          
          <div className="space-y-4">
            {complianceChecks?.map((check, index) => (
              <motion.div
                key={check?.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{check?.name}</h5>
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-bold ${getScoreColor(check?.score)}`}>
                      {check?.score}%
                    </span>
                    {getStatusIcon(check?.status)}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{check?.details}</p>
                
                {check?.issues?.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-700">Issues to resolve:</p>
                    {check?.issues?.map((issue, issueIndex) => (
                      <div key={issueIndex} className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                        • {issue}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Action Items */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Priority Action Items</h4>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <XCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-800">Critical: Fix image alt text issues</p>
              <p className="text-sm text-red-600">23 images missing alt text - affects accessibility score</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">Important: Improve mobile page speed</p>
              <p className="text-sm text-yellow-600">Mobile load times exceed 3 seconds on key pages</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">Medium: Add meta descriptions</p>
              <p className="text-sm text-yellow-600">12 pages missing meta descriptions for SEO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityAssuranceTools;