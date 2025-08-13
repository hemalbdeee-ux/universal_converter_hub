import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { supabase } from '../../../lib/supabase';

const ComplianceDocuments = ({ complianceData, onUpdate, isAdmin }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(false);

  const documentTypes = [
    {
      type: 'privacy_policy',
      title: 'Privacy Policy',
      description: 'GDPR, CCPA, LGPD compliant privacy policy with AdSense disclosures',
      icon: 'Shield',
      required: true
    },
    {
      type: 'terms_conditions',
      title: 'Terms & Conditions',
      description: 'Terms of service and usage conditions',
      icon: 'FileText',
      required: true
    },
    {
      type: 'cookie_policy',
      title: 'Cookie Policy',
      description: 'Cookie usage and DART cookie disclosure',
      icon: 'Globe',
      required: true
    },
    {
      type: 'disclaimer_affiliate',
      title: 'Disclaimer & Affiliate Disclosure',
      description: 'FTC-compliant affiliate and advertising disclosures',
      icon: 'AlertTriangle',
      required: true
    },
    {
      type: 'about_us',
      title: 'About Us',
      description: 'Company information and mission statement',
      icon: 'Info',
      required: false
    },
    {
      type: 'contact_us',
      title: 'Contact Us',
      description: 'Contact information and COPPA compliance notice',
      icon: 'Mail',
      required: false
    }
  ];

  const handleEdit = (document) => {
    setSelectedDocument(document);
    setEditContent(document?.content || '');
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!selectedDocument || !isAdmin) return;

    try {
      setLoading(true);
      
      const { error } = await supabase?.from('compliance_documents')?.update({
          content: editContent,
          last_updated: new Date()?.toISOString()
        })?.eq('id', selectedDocument?.id);

      if (error) throw error;

      setEditMode(false);
      setSelectedDocument(null);
      onUpdate?.();
    } catch (err) {
      console.error('Error saving document:', err);
      alert('Failed to save document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDocumentData = (type) => {
    return complianceData?.documents?.find(doc => doc?.document_type === type);
  };

  const formatLastUpdated = (dateString) => {
    if (!dateString) return 'Never updated';
    return new Date(dateString)?.toLocaleDateString();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Compliance Documents
        </h2>
        <p className="text-gray-600">
          Manage legal documents for privacy compliance and advertising transparency.
        </p>
      </div>

      {!editMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {documentTypes?.map((docType) => {
            const document = getDocumentData(docType?.type);
            const exists = !!document;

            return (
              <div
                key={docType?.type}
                className={`border rounded-xl p-6 transition-all duration-200 ${
                  exists 
                    ? 'border-green-200 bg-green-50 hover:shadow-md' 
                    : 'border-gray-200 bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      exists ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Icon 
                        name={docType?.icon} 
                        size={20} 
                        className={exists ? 'text-green-600' : 'text-gray-500'}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                        <span>{docType?.title}</span>
                        {docType?.required && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            Required
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {docType?.description}
                      </p>
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    exists 
                      ? 'bg-green-100 text-green-800' :'bg-gray-100 text-gray-600'
                  }`}>
                    {exists ? 'Active' : 'Missing'}
                  </div>
                </div>

                {exists && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between items-center">
                        <span>Last updated: {formatLastUpdated(document?.last_updated)}</span>
                        <span>Version: {document?.version_number}</span>
                      </div>
                      <div className="mt-2 text-xs bg-white rounded p-2 border">
                        <div className="truncate">
                          {document?.content?.substring(0, 150)}...
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      if (exists) {
                        window.open(`/${docType?.type?.replace('_', '-')}`, '_blank');
                      }
                    }}
                    disabled={!exists}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                      exists
                        ? 'text-blue-600 border border-blue-200 hover:bg-blue-50' :'text-gray-400 border border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    <Icon name="ExternalLink" size={16} className="inline mr-2" />
                    View
                  </button>
                  
                  {isAdmin && (
                    <button
                      onClick={() => handleEdit(document)}
                      className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Icon name="Edit" size={16} className="inline mr-2" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="Edit" size={20} className="text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Edit {selectedDocument?.title || 'Document'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Last updated: {formatLastUpdated(selectedDocument?.last_updated)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setSelectedDocument(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Document Content
                </label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e?.target?.value)}
                  rows={20}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="Enter your document content here..."
                />
                <p className="text-xs text-gray-500 mt-2">
                  Use HTML tags for formatting. Last updated timestamp will be automatically generated.
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Character count: {editContent?.length || 0}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setSelectedDocument(null);
                    }}
                    disabled={loading}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading || !editContent?.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                    <span>Save Document</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links Footer */}
      {!editMode && (
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Important Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <a
              href="https://www.ftc.gov/business-guidance/advertising-marketing/online-advertising-disclosure"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <Icon name="ExternalLink" size={16} />
              <span>FTC Disclosure Guidelines</span>
            </a>
            <a
              href="https://gdpr.eu/privacy-notice/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <Icon name="ExternalLink" size={16} />
              <span>GDPR Privacy Notice Guide</span>
            </a>
            <a
              href="https://support.google.com/adsense/answer/9012903"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <Icon name="ExternalLink" size={16} />
              <span>AdSense Policy Center</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceDocuments;