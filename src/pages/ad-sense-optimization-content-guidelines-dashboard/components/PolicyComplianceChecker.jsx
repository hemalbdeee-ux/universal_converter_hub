import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';

const PolicyComplianceChecker = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState('2 hours ago');
  
  const complianceItems = [
    {
      category: 'Content Policies',
      items: [
        { name: 'No prohibited content', status: 'passed', description: 'Adult content, violence, drugs' },
        { name: 'Original content requirement', status: 'passed', description: 'No plagiarized content detected' },
        { name: 'Valuable content standards', status: 'warning', description: 'Some pages need more substantial content' },
        { name: 'User-generated content moderation', status: 'passed', description: 'Comment moderation active' }
      ]
    },
    {
      category: 'Technical Requirements',
      items: [
        { name: 'Privacy Policy page', status: 'passed', description: 'Comprehensive privacy policy present' },
        { name: 'Terms of Service', status: 'passed', description: 'Complete terms and conditions' },
        { name: 'Cookie consent', status: 'passed', description: 'GDPR compliant cookie notice' },
        { name: 'Contact information', status: 'passed', description: 'Clear contact details available' }
      ]
    },
    {
      category: 'User Experience',
      items: [
        { name: 'Mobile responsiveness', status: 'passed', description: 'Site works well on mobile devices' },
        { name: 'Page loading speed', status: 'warning', description: 'Some pages load slower than 3 seconds' },
        { name: 'Navigation clarity', status: 'passed', description: 'Clear site structure and navigation' },
        { name: 'Ad placement guidelines', status: 'passed', description: 'Ads follow placement policies' }
      ]
    },
    {
      category: 'Traffic Quality',
      items: [
        { name: 'Organic traffic sources', status: 'passed', description: 'Majority traffic from search engines' },
        { name: 'No invalid clicks', status: 'passed', description: 'No suspicious click activity detected' },
        { name: 'Audience engagement', status: 'passed', description: 'Good user engagement metrics' },
        { name: 'Geographic distribution', status: 'passed', description: 'Healthy traffic distribution' }
      ]
    }
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setLastScan('Just now');
    }, 3000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed':
        return 'bg-green-50 text-green-800';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800';
      case 'failed':
        return 'bg-red-50 text-red-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };

  const overallScore = Math.round(
    (complianceItems?.reduce((total, category) => 
      total + category?.items?.reduce((catTotal, item) => 
        catTotal + (item?.status === 'passed' ? 1 : item?.status === 'warning' ? 0.5 : 0)
      , 0)
    , 0) / complianceItems?.reduce((total, category) => total + category?.items?.length, 0)) * 100
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Policy Compliance Checker</h3>
              <p className="text-sm text-gray-600">Last scan: {lastScan}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{overallScore}%</div>
              <div className="text-sm text-gray-600">Compliance Score</div>
            </div>
            
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Run Scan'}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-8">
          {complianceItems?.map((category, categoryIndex) => (
            <motion.div
              key={category?.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{category?.category}</h4>
              
              <div className="space-y-3">
                {category?.items?.map((item, itemIndex) => (
                  <div
                    key={item?.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(item?.status)}
                      <div>
                        <div className="font-medium text-gray-900">{item?.name}</div>
                        <div className="text-sm text-gray-600">{item?.description}</div>
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item?.status)}`}>
                      {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Items */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h5 className="font-semibold text-yellow-800 mb-2">Action Items Required</h5>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Improve content quality on pages with thin content</li>
            <li>• Optimize page loading speeds for better user experience</li>
            <li>• Review and update privacy policy for latest regulations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PolicyComplianceChecker;