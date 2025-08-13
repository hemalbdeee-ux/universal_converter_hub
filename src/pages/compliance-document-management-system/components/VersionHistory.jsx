import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VersionHistory = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState('all');
  const [showDetails, setShowDetails] = useState(null);

  // Mock version history data - in production this would come from your database
  const getVersionHistory = () => {
    const mockHistory = [
      {
        id: 1,
        document_id: 1,
        document_type: 'privacy_policy',
        document_title: 'Privacy Policy',
        version: 3,
        change_type: 'major',
        changes: [
          'Added CCPA compliance section',
          'Updated Google AdSense cookie information',
          'Added data retention policy details'
        ],
        changed_by: 'Admin User',
        changed_at: '2025-01-15T10:30:00Z',
        status: 'published',
        change_reason: 'Regulatory compliance update for California users'
      },
      {
        id: 2,
        document_id: 1,
        document_type: 'privacy_policy',
        document_title: 'Privacy Policy',
        version: 2,
        change_type: 'minor',
        changes: [
          'Updated contact information',
          'Fixed typos in GDPR section'
        ],
        changed_by: 'Admin User',
        changed_at: '2025-01-10T14:20:00Z',
        status: 'published',
        change_reason: 'Contact information update'
      },
      {
        id: 3,
        document_id: 2,
        document_type: 'cookie_policy',
        document_title: 'Cookie Policy',
        version: 2,
        change_type: 'major',
        changes: [
          'Added Google Analytics 4 cookie information',
          'Updated third-party cookie list',
          'Added cookie consent management details'
        ],
        changed_by: 'Admin User',
        changed_at: '2025-01-08T16:45:00Z',
        status: 'published',
        change_reason: 'GA4 migration and consent management implementation'
      },
      {
        id: 4,
        document_id: 3,
        document_type: 'terms_conditions',
        document_title: 'Terms & Conditions',
        version: 1,
        change_type: 'major',
        changes: [
          'Initial version created',
          'Added service usage terms',
          'Defined user responsibilities'
        ],
        changed_by: 'Admin User',
        changed_at: '2025-01-05T09:15:00Z',
        status: 'published',
        change_reason: 'Initial document creation'
      }
    ];

    return mockHistory?.filter(entry => 
      selectedDocument === 'all' || entry?.document_type === selectedDocument
    );
  };

  const getChangeTypeInfo = (changeType) => {
    switch (changeType) {
      case 'major':
        return { color: 'danger', icon: 'AlertTriangle', label: 'Major Change' };
      case 'minor':
        return { color: 'warning', icon: 'Edit', label: 'Minor Change' };
      case 'patch':
        return { color: 'primary', icon: 'Tool', label: 'Patch/Fix' };
      default:
        return { color: 'secondary', icon: 'FileText', label: 'Change' };
    }
  };

  const getDocumentOptions = () => {
    const options = [{ value: 'all', label: 'All Documents' }];
    
    const uniqueDocuments = documents?.reduce((acc, doc) => {
      if (!acc?.find(item => item?.document_type === doc?.document_type)) {
        acc?.push({
          value: doc?.document_type,
          label: doc?.title
        });
      }
      return acc;
    }, []);

    return [...options, ...uniqueDocuments];
  };

  const versionHistory = getVersionHistory();
  const documentOptions = getDocumentOptions();

  const handleRestore = async (versionId) => {
    try {
      // In production, this would restore the document version
      console.log('Restoring version:', versionId);
      // Implement restore logic here
    } catch (error) {
      console.error('Failed to restore version:', error);
    }
  };

  const handleCompare = (version1, version2) => {
    // In production, this would open a comparison view
    console.log('Comparing versions:', version1, version2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          Version History
        </h2>
        <p className="text-text-secondary">
          Track document changes, revisions, and maintain version control with approval workflows
        </p>
      </div>
      {/* Filter Controls */}
      <div className="bg-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-text-primary">
              Filter by Document:
            </label>
            <select
              value={selectedDocument}
              onChange={(e) => setSelectedDocument(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {documentOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-text-secondary">
            Showing {versionHistory?.length} version{versionHistory?.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
      {/* Version History Timeline */}
      <div className="bg-card rounded-xl p-6">
        <div className="space-y-6">
          {versionHistory?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No Version History
              </h3>
              <p className="text-text-secondary">
                {selectedDocument === 'all' ?'No document versions found' :'No versions found for the selected document'
                }
              </p>
            </div>
          ) : (
            versionHistory?.map((entry, index) => {
              const changeInfo = getChangeTypeInfo(entry?.change_type);
              
              return (
                <div key={entry?.id} className="relative">
                  {/* Timeline Line */}
                  {index !== versionHistory?.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-20 bg-border"></div>
                  )}
                  
                  <div className="flex gap-4">
                    {/* Timeline Icon */}
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                      ${changeInfo?.color === 'danger' ? 'bg-danger/20 text-danger' : ''}
                      ${changeInfo?.color === 'warning' ? 'bg-warning/20 text-warning' : ''}
                      ${changeInfo?.color === 'primary' ? 'bg-primary/20 text-primary' : ''}
                      ${changeInfo?.color === 'secondary' ? 'bg-surface text-text-secondary' : ''}
                    `}>
                      <Icon name={changeInfo?.icon} size={20} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-surface rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-text-primary">
                              {entry?.document_title} - Version {entry?.version}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={`
                                text-xs px-2 py-1 rounded-full font-medium
                                ${changeInfo?.color === 'danger' ? 'bg-danger/20 text-danger' : ''}
                                ${changeInfo?.color === 'warning' ? 'bg-warning/20 text-warning' : ''}
                                ${changeInfo?.color === 'primary' ? 'bg-primary/20 text-primary' : ''}
                                ${changeInfo?.color === 'secondary' ? 'bg-surface text-text-secondary' : ''}
                              `}>
                                {changeInfo?.label}
                              </span>
                              <span className={`
                                text-xs px-2 py-1 rounded-full font-medium
                                ${entry?.status === 'published' ? 'bg-success/20 text-success' : ''}
                                ${entry?.status === 'draft' ? 'bg-warning/20 text-warning' : ''}
                              `}>
                                {entry?.status?.charAt(0)?.toUpperCase() + entry?.status?.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => setShowDetails(showDetails === entry?.id ? null : entry?.id)}
                              variant="outline"
                              size="sm"
                              iconName={showDetails === entry?.id ? 'ChevronUp' : 'ChevronDown'}
                            >
                              {showDetails === entry?.id ? 'Hide' : 'Details'}
                            </Button>
                            
                            {entry?.version > 1 && (
                              <Button
                                onClick={() => handleRestore(entry?.id)}
                                variant="outline"
                                size="sm"
                                iconName="RotateCcw"
                              >
                                Restore
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-sm text-text-secondary mb-3">
                          <div className="flex items-center gap-4">
                            <span>By {entry?.changed_by}</span>
                            <span>{new Date(entry?.changed_at)?.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        {entry?.change_reason && (
                          <div className="bg-card rounded-lg p-3 mb-3">
                            <h5 className="font-medium text-text-primary mb-1">Reason for Change:</h5>
                            <p className="text-sm text-text-secondary">{entry?.change_reason}</p>
                          </div>
                        )}
                        
                        {/* Change Summary */}
                        <div className="space-y-2">
                          <h5 className="font-medium text-text-primary">Changes Made:</h5>
                          <ul className="text-sm text-text-secondary space-y-1">
                            {entry?.changes?.map((change, changeIndex) => (
                              <li key={changeIndex} className="flex items-start gap-2">
                                <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                                {change}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Detailed View */}
                        {showDetails === entry?.id && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                <h6 className="font-medium text-text-primary mb-2">Technical Details:</h6>
                                <ul className="text-text-secondary space-y-1">
                                  <li>Document ID: {entry?.document_id}</li>
                                  <li>Version: {entry?.version}</li>
                                  <li>Change Type: {entry?.change_type}</li>
                                  <li>Status: {entry?.status}</li>
                                </ul>
                              </div>
                              
                              <div>
                                <h6 className="font-medium text-text-primary mb-2">Actions:</h6>
                                <div className="space-y-2">
                                  <Button
                                    onClick={() => console.log('View full document')}
                                    variant="outline"
                                    size="sm"
                                    iconName="Eye"
                                    className="w-full sm:w-auto"
                                  >
                                    View Document
                                  </Button>
                                  {entry?.version > 1 && (
                                    <Button
                                      onClick={() => handleCompare(entry?.version, entry?.version - 1)}
                                      variant="outline"
                                      size="sm"
                                      iconName="GitCompare"
                                      className="w-full sm:w-auto"
                                    >
                                      Compare with Previous
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">
            {versionHistory?.length}
          </div>
          <div className="text-sm text-text-secondary">Total Versions</div>
        </div>
        
        <div className="bg-card rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-danger mb-1">
            {versionHistory?.filter(v => v?.change_type === 'major')?.length}
          </div>
          <div className="text-sm text-text-secondary">Major Changes</div>
        </div>
        
        <div className="bg-card rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">
            {versionHistory?.filter(v => v?.status === 'published')?.length}
          </div>
          <div className="text-sm text-text-secondary">Published Versions</div>
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;