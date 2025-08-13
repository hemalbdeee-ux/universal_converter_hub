import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertTriangle, CheckCircle, FileText, Bell, Eye } from 'lucide-react';

const ComplianceTracker = () => {
  const [activeTab, setActiveTab] = useState('deadlines');

  const complianceDeadlines = [
    {
      id: 1,
      task: 'GDPR Cookie Consent Update',
      deadline: '2025-01-15',
      priority: 'high',
      status: 'pending',
      description: 'Update cookie consent banner to comply with latest GDPR requirements',
      daysLeft: 8
    },
    {
      id: 2,
      task: 'Privacy Policy Review',
      deadline: '2025-01-20',
      priority: 'medium',
      status: 'in-progress',
      description: 'Annual review and update of privacy policy documentation',
      daysLeft: 13
    },
    {
      id: 3,
      task: 'AdSense Policy Compliance Check',
      deadline: '2025-01-25',
      priority: 'high',
      status: 'pending',
      description: 'Comprehensive audit of all pages for AdSense policy compliance',
      daysLeft: 18
    },
    {
      id: 4,
      task: 'Terms of Service Update',
      deadline: '2025-02-01',
      priority: 'low',
      status: 'pending',
      description: 'Update terms of service to reflect new features and services',
      daysLeft: 25
    }
  ];

  const policyUpdates = [
    {
      id: 1,
      title: 'AdSense Content Policy Update',
      date: '2025-01-05',
      category: 'AdSense',
      impact: 'high',
      summary: 'New guidelines for educational content and user-generated material',
      status: 'reviewed',
      actions: ['Update content guidelines', 'Review existing content', 'Train content team']
    },
    {
      id: 2,
      title: 'GDPR Data Processing Guidelines',
      date: '2025-01-03',
      category: 'Privacy',
      impact: 'medium',
      summary: 'Updated requirements for data processing consent and user rights',
      status: 'implementing',
      actions: ['Update privacy policy', 'Implement new consent flows', 'Update data handling procedures']
    },
    {
      id: 3,
      title: 'Cookie Law Compliance Changes',
      date: '2024-12-28',
      category: 'Cookies',
      impact: 'medium',
      summary: 'Enhanced cookie categorization and consent management requirements',
      status: 'completed',
      actions: ['Update cookie banner', 'Implement granular controls', 'Update documentation']
    }
  ];

  const complianceHistory = [
    {
      date: '2025-01-01',
      action: 'Completed quarterly compliance audit',
      status: 'completed',
      score: 94
    },
    {
      date: '2024-12-15',
      action: 'Updated privacy policy for new data collection practices',
      status: 'completed',
      score: 92
    },
    {
      date: '2024-12-01',
      action: 'Implemented enhanced cookie consent management',
      status: 'completed',
      score: 89
    },
    {
      date: '2024-11-15',
      action: 'AdSense policy compliance review',
      status: 'completed',
      score: 96
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in-progress':
        return 'text-blue-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Calendar className="h-8 w-8 text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Compliance Tracker</h3>
            <p className="text-sm text-gray-600">Monitor deadlines, policy updates, and compliance status</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mt-6">
          {[
            { id: 'deadlines', label: 'Upcoming Deadlines', icon: Clock },
            { id: 'updates', label: 'Policy Updates', icon: Bell },
            { id: 'history', label: 'Compliance History', icon: FileText }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                activeTab === tab?.id 
                  ? 'bg-blue-100 text-blue-700' :'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {/* Upcoming Deadlines Tab */}
        {activeTab === 'deadlines' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {complianceDeadlines?.map((deadline) => (
              <div
                key={deadline?.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{deadline?.task}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(deadline?.priority)}`}>
                        {deadline?.priority} priority
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{deadline?.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Due: {deadline?.deadline}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className={`font-medium ${deadline?.daysLeft <= 7 ? 'text-red-600' : 'text-gray-600'}`}>
                          {deadline?.daysLeft} days left
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(deadline?.status)}`}>
                      {deadline?.status === 'in-progress' ? 'In Progress' : deadline?.status?.charAt(0)?.toUpperCase() + deadline?.status?.slice(1)}
                    </span>
                    {deadline?.daysLeft <= 7 && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Policy Updates Tab */}
        {activeTab === 'updates' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {policyUpdates?.map((update) => (
              <div
                key={update?.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{update?.title}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-500">{update?.date}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-blue-600">{update?.category}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(update?.impact)}`}>
                        {update?.impact} impact
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    update?.status === 'completed' ? 'bg-green-100 text-green-800' :
                    update?.status === 'implementing'? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {update?.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{update?.summary}</p>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Required Actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {update?.actions?.map((action, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Compliance History Tab */}
        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Recent Compliance Activities</h4>
              <button className="text-blue-600 hover:text-blue-700 text-sm">View Full History</button>
            </div>
            
            {complianceHistory?.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className={`p-2 rounded-full ${
                  item?.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {item?.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item?.action}</p>
                  <p className="text-sm text-gray-500">{item?.date}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{item?.score}%</div>
                  <div className="text-sm text-gray-500">Score</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComplianceTracker;