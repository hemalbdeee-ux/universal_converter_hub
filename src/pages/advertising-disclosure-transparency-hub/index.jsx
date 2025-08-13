import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import AdDisclosureManager from './components/AdDisclosureManager';
import ComplianceDocuments from './components/ComplianceDocuments';
import ConsentManager from './components/ConsentManager';
import BusinessSettingsPanel from './components/BusinessSettingsPanel';
import AdsTextEditor from './components/AdsTextEditor';
import DataRequestPortal from './components/DataRequestPortal';

const AdvertisingDisclosureTransparencyHub = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('disclosure');
  const [complianceData, setComplianceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAdmin = userProfile?.role === 'admin';

  useEffect(() => {
    fetchComplianceData();
  }, []);

  const fetchComplianceData = async () => {
    try {
      setLoading(true);
      
      // Fetch compliance documents
      const { data: documents, error: docError } = await supabase?.from('compliance_documents')?.select('*')?.eq('is_active', true)?.order('document_type');

      if (docError) throw docError;

      // Fetch compliance settings
      const { data: settings, error: settingsError } = await supabase?.from('compliance_settings')?.select('*');

      if (settingsError) throw settingsError;

      setComplianceData({
        documents: documents || [],
        settings: settings || []
      });
    } catch (err) {
      console.error('Error fetching compliance data:', err);
      setError(err?.message || 'Failed to load compliance data');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: 'disclosure',
      name: 'Ad Disclosure',
      icon: 'AlertTriangle',
      description: 'Manage advertising disclosures',
      adminOnly: false
    },
    {
      id: 'documents',
      name: 'Compliance Docs',
      icon: 'FileText',
      description: 'Privacy Policy, Terms & Conditions',
      adminOnly: false
    },
    {
      id: 'consent',
      name: 'Consent Manager',
      icon: 'Shield',
      description: 'GDPR/CCPA consent management',
      adminOnly: false
    },
    {
      id: 'business',
      name: 'Business Settings',
      icon: 'Building',
      description: 'Company information',
      adminOnly: true
    },
    {
      id: 'ads-txt',
      name: 'Ads.txt Editor',
      icon: 'Code',
      description: 'AdSense publisher verification',
      adminOnly: true
    },
    {
      id: 'data-requests',
      name: 'Data Requests',
      icon: 'Download',
      description: 'Handle user data requests',
      adminOnly: true
    }
  ];

  const visibleTabs = tabs?.filter(tab => !tab?.adminOnly || isAdmin);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading compliance dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchComplianceData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Advertising Disclosure & Transparency Hub - ConvertAnything.com</title>
        <meta name="description" content="Comprehensive advertising transparency and compliance management for AdSense integration, privacy policies, and legal requirements." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Advertising Disclosure & Transparency Hub
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage advertising compliance, privacy policies, and consent management
                </p>
              </div>
            </div>

            {/* FTC Compliance Notice */}
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
              <div className="flex">
                <Icon name="Info" className="text-orange-400 mr-3 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-sm font-medium text-orange-800">
                    FTC Compliance Notice
                  </h3>
                  <p className="text-sm text-orange-700 mt-1">
                    This platform helps maintain FTC-compliant advertising disclosures. 
                    All affiliate relationships and sponsored content must be clearly disclosed 
                    to maintain transparency with your audience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {visibleTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${activeTab === tab?.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.name}</span>
                  {tab?.adminOnly && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                </button>
              ))}
            </nav>
            
            {/* Tab Description */}
            <p className="text-gray-600 text-sm mt-2 ml-1">
              {visibleTabs?.find(tab => tab?.id === activeTab)?.description}
            </p>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
            {activeTab === 'disclosure' && (
              <AdDisclosureManager 
                complianceData={complianceData}
                onUpdate={fetchComplianceData}
                isAdmin={isAdmin}
              />
            )}
            
            {activeTab === 'documents' && (
              <ComplianceDocuments 
                complianceData={complianceData}
                onUpdate={fetchComplianceData}
                isAdmin={isAdmin}
              />
            )}
            
            {activeTab === 'consent' && (
              <ConsentManager 
                complianceData={complianceData}
                onUpdate={fetchComplianceData}
                isAdmin={isAdmin}
              />
            )}
            
            {activeTab === 'business' && isAdmin && (
              <BusinessSettingsPanel 
                complianceData={complianceData}
                onUpdate={fetchComplianceData}
              />
            )}
            
            {activeTab === 'ads-txt' && isAdmin && (
              <AdsTextEditor 
                complianceData={complianceData}
                onUpdate={fetchComplianceData}
              />
            )}
            
            {activeTab === 'data-requests' && isAdmin && (
              <DataRequestPortal 
                complianceData={complianceData}
                onUpdate={fetchComplianceData}
              />
            )}
          </div>

          {/* Footer Information */}
          <div className="mt-8 text-center">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Compliance Standards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                <div>
                  <strong className="text-gray-900">FTC Guidelines</strong>
                  <p>Advertising disclosure compliance</p>
                </div>
                <div>
                  <strong className="text-gray-900">GDPR</strong>
                  <p>European data protection</p>
                </div>
                <div>
                  <strong className="text-gray-900">CCPA</strong>
                  <p>California privacy rights</p>
                </div>
                <div>
                  <strong className="text-gray-900">IAB TCF 2.2</strong>
                  <p>Consent management framework</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertisingDisclosureTransparencyHub;