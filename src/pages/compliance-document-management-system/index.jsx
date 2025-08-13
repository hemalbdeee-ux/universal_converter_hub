import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import DocumentEditor from './components/DocumentEditor';
import BusinessInfoManager from './components/BusinessInfoManager';
import AdsTextEditor from './components/AdsTextEditor';
import ComplianceTracker from './components/ComplianceTracker';
import VersionHistory from './components/VersionHistory';
import AdSense from '../../components/AdSense';

const ComplianceDocumentManagement = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('documents');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Check if user has admin access
  const isAdmin = userProfile?.role === 'admin';

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      // In production, this would fetch from Supabase
      // For now, using mock data
      const mockDocuments = [
        {
          id: 1,
          document_type: 'privacy_policy',
          title: 'Privacy Policy',
          status: 'published',
          version: 3,
          last_updated: '2025-01-15T10:30:00Z',
          compliance_score: 98,
          content: 'Privacy Policy content with Google AdSense compliance...'
        },
        {
          id: 2,
          document_type: 'terms_conditions',
          title: 'Terms & Conditions',
          status: 'published',
          version: 2,
          last_updated: '2025-01-10T14:20:00Z',
          compliance_score: 95,
          content: 'Terms and conditions content...'
        },
        {
          id: 3,
          document_type: 'cookie_policy',
          title: 'Cookie Policy',
          status: 'draft',
          version: 1,
          last_updated: '2025-01-05T09:15:00Z',
          compliance_score: 85,
          content: 'Cookie policy content including Google AdSense cookies...'
        },
        {
          id: 4,
          document_type: 'disclaimer',
          title: 'Disclaimer',
          status: 'published',
          version: 1,
          last_updated: '2024-12-20T16:45:00Z',
          compliance_score: 92,
          content: 'Legal disclaimer content...'
        },
        {
          id: 5,
          document_type: 'affiliate_disclosure',
          title: 'Affiliate Disclosure',
          status: 'published',
          version: 1,
          last_updated: '2024-12-15T11:30:00Z',
          compliance_score: 90,
          content: 'Affiliate disclosure content...'
        }
      ];

      setDocuments(mockDocuments);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentSave = async (documentId, content, status = 'draft') => {
    try {
      // Update document in state (in production, would save to database)
      setDocuments(prev => prev?.map(doc => 
        doc?.id === documentId 
          ? { 
              ...doc, 
              content, 
              status, 
              last_updated: new Date()?.toISOString(),
              version: status === 'published' ? doc?.version + 1 : doc?.version
            }
          : doc
      ));

      console.log('Document saved:', { documentId, status, content: content?.substring(0, 100) + '...' });
    } catch (error) {
      console.error('Failed to save document:', error);
    }
  };

  const handleDocumentPublish = async (documentId) => {
    try {
      const document = documents?.find(doc => doc?.id === documentId);
      if (document) {
        await handleDocumentSave(documentId, document?.content, 'published');
        
        // Trigger any post-publish actions (update header/footer links, etc.)
        console.log('Document published:', documentId);
      }
    } catch (error) {
      console.error('Failed to publish document:', error);
    }
  };

  const getDocumentTypeIcon = (type) => {
    const iconMap = {
      privacy_policy: 'Shield',
      terms_conditions: 'FileText',
      cookie_policy: 'Settings',
      disclaimer: 'AlertTriangle',
      affiliate_disclosure: 'DollarSign',
      about: 'Info',
      contact: 'Mail'
    };
    return iconMap?.[type] || 'FileText';
  };

  const getStatusColor = (status) => {
    const colorMap = {
      published: 'success',
      draft: 'warning',
      archived: 'secondary'
    };
    return colorMap?.[status] || 'secondary';
  };

  const tabs = [
    {
      id: 'documents',
      label: 'Legal Documents',
      icon: 'FileText',
      description: 'Manage privacy policy, terms, and legal documents'
    },
    {
      id: 'business',
      label: 'Business Info',
      icon: 'Building',
      description: 'Update company details and contact information'
    },
    {
      id: 'ads-txt',
      label: 'Ads.txt Editor',
      icon: 'Code',
      description: 'Manage AdSense publisher verification'
    },
    {
      id: 'compliance',
      label: 'Compliance Tracker',
      icon: 'CheckCircle',
      description: 'Monitor compliance status and requirements'
    },
    {
      id: 'versions',
      label: 'Version History',
      icon: 'History',
      description: 'Track document changes and revisions'
    }
  ];

  // Restrict access to admin users
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface flex items-center justify-center">
        <div className="bg-card rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Lock" size={32} className="text-danger" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Access Restricted
            </h1>
            <p className="text-text-secondary mb-6">
              You need administrator privileges to access the compliance document management system.
            </p>
            <Button
              onClick={() => window.history?.back()}
              variant="outline"
              iconName="ArrowLeft"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Compliance Document Management System | Universal Converter</title>
        <meta name="description" content="Centralized admin interface for managing all AdSense-required legal documentation with real-time editing and compliance tracking." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                Compliance Document Management
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Centralized admin interface for managing all AdSense-required legal documentation 
                with real-time editing capabilities and automated compliance tracking.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 max-w-2xl mx-auto">
                <div className="bg-card rounded-lg p-3">
                  <div className="text-2xl font-bold text-success">
                    {documents?.filter(doc => doc?.status === 'published')?.length}
                  </div>
                  <div className="text-xs text-text-secondary">Published</div>
                </div>
                <div className="bg-card rounded-lg p-3">
                  <div className="text-2xl font-bold text-warning">
                    {documents?.filter(doc => doc?.status === 'draft')?.length}
                  </div>
                  <div className="text-xs text-text-secondary">Drafts</div>
                </div>
                <div className="bg-card rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">
                    {documents?.length ? Math.round(documents?.reduce((sum, doc) => sum + (doc?.compliance_score || 0), 0) / documents?.length) : 0}%
                  </div>
                  <div className="text-xs text-text-secondary">Avg Score</div>
                </div>
                <div className="bg-card rounded-lg p-3">
                  <div className="text-2xl font-bold text-text-primary">
                    {documents?.length}
                  </div>
                  <div className="text-xs text-text-secondary">Total Docs</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-col lg:flex-row gap-2 mb-8 bg-card rounded-xl p-2">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeTab === tab?.id
                      ? 'bg-primary text-white shadow-lg transform scale-[1.02]'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={18} />
                  <div className="text-left hidden sm:block">
                    <div className="font-semibold">{tab?.label}</div>
                    <div className="text-xs opacity-75">
                      {tab?.description}
                    </div>
                  </div>
                  <div className="block sm:hidden">
                    {tab?.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'documents' && (
                <div className="space-y-6">
                  {/* Document List */}
                  {!selectedDocument ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {loading ? (
                        Array.from({ length: 4 })?.map((_, index) => (
                          <div key={index} className="bg-card rounded-xl p-6 animate-pulse">
                            <div className="h-6 bg-surface rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-surface rounded w-full mb-2"></div>
                            <div className="h-4 bg-surface rounded w-2/3"></div>
                          </div>
                        ))
                      ) : (
                        documents?.map((document) => (
                          <div
                            key={document?.id}
                            className="bg-card rounded-xl p-6 border border-border hover:border-border-hover transition-all duration-200 hover:shadow-lg cursor-pointer"
                            onClick={() => setSelectedDocument(document)}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                  <Icon name={getDocumentTypeIcon(document?.document_type)} size={20} className="text-primary" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-text-primary">
                                    {document?.title}
                                  </h3>
                                  <p className="text-sm text-text-secondary">
                                    Version {document?.version}
                                  </p>
                                </div>
                              </div>
                              
                              <div className={`
                                px-3 py-1 rounded-full text-xs font-medium
                                ${getStatusColor(document?.status) === 'success' ? 'bg-success/20 text-success' : ''}
                                ${getStatusColor(document?.status) === 'warning' ? 'bg-warning/20 text-warning' : ''}
                                ${getStatusColor(document?.status) === 'secondary' ? 'bg-surface text-text-secondary' : ''}
                              `}>
                                {document?.status?.charAt(0)?.toUpperCase() + document?.status?.slice(1)}
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Compliance Score:</span>
                                <span className="font-medium text-text-primary">
                                  {document?.compliance_score}%
                                </span>
                              </div>
                              
                              <div className="w-full bg-surface rounded-full h-2">
                                <div
                                  className={`
                                    h-2 rounded-full transition-all duration-500
                                    ${document?.compliance_score >= 95 ? 'bg-success' : ''}
                                    ${document?.compliance_score >= 80 && document?.compliance_score < 95 ? 'bg-warning' : ''}
                                    ${document?.compliance_score < 80 ? 'bg-danger' : ''}
                                  `}
                                  style={{ width: `${document?.compliance_score}%` }}
                                />
                              </div>
                              
                              <div className="flex justify-between text-xs text-text-secondary">
                                <span>
                                  Last updated: {new Date(document?.last_updated)?.toLocaleDateString()}
                                </span>
                                <Icon name="ChevronRight" size={16} />
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <DocumentEditor
                      document={selectedDocument}
                      onSave={handleDocumentSave}
                      onPublish={handleDocumentPublish}
                      onBack={() => setSelectedDocument(null)}
                    />
                  )}
                </div>
              )}

              {activeTab === 'business' && (
                <BusinessInfoManager />
              )}

              {activeTab === 'ads-txt' && (
                <AdsTextEditor />
              )}

              {activeTab === 'compliance' && (
                <ComplianceTracker documents={documents} />
              )}

              {activeTab === 'versions' && (
                <VersionHistory documents={documents} />
              )}
            </div>

            {/* AdSense Ad Placement */}
            <div className="mt-8">
              <AdSense
                adSlot="1234567895"
                adFormat="auto"
                slot="compliance_management"
                className="max-w-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplianceDocumentManagement;