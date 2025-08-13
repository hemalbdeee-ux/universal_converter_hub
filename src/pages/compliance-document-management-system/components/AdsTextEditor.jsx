import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AdsTextEditor = () => {
  const [adsTextContent, setAdsTextContent] = useState('');
  const [publisherId, setPublisherId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [deploymentStatus, setDeploymentStatus] = useState('not_deployed');

  useEffect(() => {
    loadAdsTextContent();
  }, []);

  const loadAdsTextContent = async () => {
    try {
      // In production, this would fetch from your backend/Supabase
      // For now, using localStorage as a mock
      const savedContent = localStorage.getItem('ads_txt_content');
      const savedPublisherId = localStorage.getItem('adsense_publisher_id');
      
      if (savedContent) {
        setAdsTextContent(savedContent);
      } else {
        generateDefaultContent(savedPublisherId || 'ca-pub-XXXXXXXXXXXXXXXX');
      }
      
      if (savedPublisherId) {
        setPublisherId(savedPublisherId);
      }
    } catch (error) {
      console.error('Failed to load ads.txt content:', error);
    }
  };

  const generateDefaultContent = (pubId) => {
    const defaultContent = `# ads.txt file for Universal Converter Hub
# This file authorizes advertising systems to sell our ad inventory

# Google AdSense
google.com, ${pubId}, DIRECT, f08c47fec0942fa0

# Google Ad Manager (if applicable)
# google.com, ${pubId}, DIRECT, f08c47fec0942fa0

# Add other advertising partners here
# Example for other ad networks:
# adnxs.com, 123456, RESELLER, f5ab79cb980f11d1
# pubmatic.com, 789012, RESELLER, 5d62403b186f2ace

# Last updated: ${new Date()?.toISOString()?.split('T')?.[0]}`;
    
    setAdsTextContent(defaultContent);
  };

  const handlePublisherIdChange = (newId) => {
    setPublisherId(newId);
    
    // Update the content with the new publisher ID
    const updatedContent = adsTextContent?.replace(
      /google\.com, [^,]+, DIRECT/g,
      `google.com, ${newId}, DIRECT`
    );
    setAdsTextContent(updatedContent);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In production, this would save to your backend
      localStorage.setItem('ads_txt_content', adsTextContent);
      localStorage.setItem('adsense_publisher_id', publisherId);
      
      setLastSaved(new Date());
      setDeploymentStatus('pending');
      
      // Simulate deployment delay
      setTimeout(() => {
        setDeploymentStatus('deployed');
      }, 3000);
      
    } catch (error) {
      console.error('Failed to save ads.txt:', error);
      setDeploymentStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNetwork = (networkTemplate) => {
    const templates = {
      'pubmatic': '# PubMatic\npubmatic.com, 123456, RESELLER, 5d62403b186f2ace',
      'appnexus': '# AppNexus\nadnxs.com, 123456, RESELLER, f5ab79cb980f11d1',
      'openx': '# OpenX\nopenx.com, 123456, RESELLER, 6ac7b5b5fd0b3e12',
      'rubicon': '# Rubicon Project\nrubiconproject.com, 123456, RESELLER, 0bfd66d529a55807',
      'amazon': '# Amazon Publisher Services\namazon-adsystem.com, 123456, DIRECT, 3dd1103b59dd9e0b'
    };

    const template = templates?.[networkTemplate];
    if (template) {
      const newContent = adsTextContent + '\n\n' + template;
      setAdsTextContent(newContent);
    }
  };

  const validateAdsText = () => {
    const lines = adsTextContent?.split('\n');
    const errors = [];
    const warnings = [];

    lines?.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmedLine = line?.trim();
      
      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine?.startsWith('#')) return;
      
      const parts = trimmedLine?.split(',')?.map(p => p?.trim());
      
      // Check format: domain, publisher_id, relationship, certification_authority_id
      if (parts?.length !== 4) {
        errors?.push(`Line ${lineNum}: Invalid format. Expected 4 comma-separated values.`);
        return;
      }
      
      const [domain, pubId, relationship, certId] = parts;
      
      // Validate domain
      if (!domain?.includes('.')) {
        errors?.push(`Line ${lineNum}: Invalid domain format.`);
      }
      
      // Validate relationship
      if (!['DIRECT', 'RESELLER']?.includes(relationship?.toUpperCase())) {
        errors?.push(`Line ${lineNum}: Relationship must be DIRECT or RESELLER.`);
      }
      
      // Check for common issues
      if (pubId?.includes('XXXXXXXX')) {
        warnings?.push(`Line ${lineNum}: Placeholder publisher ID detected. Replace with actual ID.`);
      }
    });

    return { errors, warnings };
  };

  const validation = validateAdsText();
  const isValid = validation?.errors?.length === 0;

  const getDeploymentStatusInfo = () => {
    switch (deploymentStatus) {
      case 'deployed':
        return {
          color: 'success',
          icon: 'CheckCircle',
          message: 'Successfully deployed to domain root'
        };
      case 'pending':
        return {
          color: 'warning',
          icon: 'Clock',
          message: 'Deployment in progress...'
        };
      case 'error':
        return {
          color: 'danger',
          icon: 'XCircle',
          message: 'Deployment failed'
        };
      default:
        return {
          color: 'secondary',
          icon: 'Upload',
          message: 'Not deployed'
        };
    }
  };

  const statusInfo = getDeploymentStatusInfo();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          Ads.txt Editor
        </h2>
        <p className="text-text-secondary">
          Manage your ads.txt file for AdSense publisher verification. 
          This file will be automatically served at your domain root.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-4">
          {/* Publisher ID */}
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              AdSense Configuration
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Publisher ID
                </label>
                <input
                  type="text"
                  value={publisherId}
                  onChange={(e) => handlePublisherIdChange(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                />
              </div>
              
              <Button
                onClick={() => generateDefaultContent(publisherId)}
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                className="w-full"
              >
                Regenerate Template
              </Button>
            </div>
          </div>

          {/* Quick Add Networks */}
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              Add Ad Networks
            </h3>
            
            <div className="space-y-2">
              {[
                { id: 'pubmatic', name: 'PubMatic', icon: 'Target' },
                { id: 'appnexus', name: 'AppNexus', icon: 'Target' },
                { id: 'openx', name: 'OpenX', icon: 'Target' },
                { id: 'rubicon', name: 'Rubicon', icon: 'Target' },
                { id: 'amazon', name: 'Amazon APS', icon: 'Target' }
              ]?.map((network) => (
                <button
                  key={network?.id}
                  onClick={() => handleAddNetwork(network?.id)}
                  className="w-full flex items-center gap-2 p-2 bg-surface hover:bg-border rounded-lg transition-colors text-left"
                >
                  <Icon name={network?.icon} size={14} className="text-primary" />
                  <span className="text-sm text-text-primary">{network?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Deployment Status */}
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              Deployment Status
            </h3>
            
            <div className={`
              flex items-center gap-3 p-3 rounded-lg
              ${statusInfo?.color === 'success' ? 'bg-success/20 text-success' : ''}
              ${statusInfo?.color === 'warning' ? 'bg-warning/20 text-warning' : ''}
              ${statusInfo?.color === 'danger' ? 'bg-danger/20 text-danger' : ''}
              ${statusInfo?.color === 'secondary' ? 'bg-surface text-text-secondary' : ''}
            `}>
              <Icon name={statusInfo?.icon} size={20} />
              <div>
                <div className="font-medium">{statusInfo?.message}</div>
                {deploymentStatus === 'deployed' && (
                  <div className="text-xs opacity-75">
                    Available at: /ads.txt
                  </div>
                )}
              </div>
            </div>
            
            {lastSaved && (
              <p className="text-xs text-text-secondary mt-2">
                Last saved: {lastSaved?.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Ads.txt Content
              </h3>
              
              <div className="flex items-center gap-2">
                {isValid ? (
                  <span className="flex items-center gap-1 text-success text-sm">
                    <Icon name="CheckCircle" size={16} />
                    Valid
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-danger text-sm">
                    <Icon name="XCircle" size={16} />
                    {validation?.errors?.length} errors
                  </span>
                )}
              </div>
            </div>
            
            <textarea
              value={adsTextContent}
              onChange={(e) => setAdsTextContent(e?.target?.value)}
              className="w-full h-96 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm bg-surface"
              placeholder="Enter your ads.txt content..."
            />
            
            {/* Validation Results */}
            {(validation?.errors?.length > 0 || validation?.warnings?.length > 0) && (
              <div className="mt-4 space-y-2">
                {validation?.errors?.length > 0 && (
                  <div className="bg-danger/10 border border-danger/20 rounded-lg p-3">
                    <h4 className="font-medium text-danger mb-2 flex items-center gap-2">
                      <Icon name="XCircle" size={16} />
                      Errors ({validation?.errors?.length})
                    </h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      {validation?.errors?.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {validation?.warnings?.length > 0 && (
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                    <h4 className="font-medium text-warning mb-2 flex items-center gap-2">
                      <Icon name="AlertTriangle" size={16} />
                      Warnings ({validation?.warnings?.length})
                    </h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      {validation?.warnings?.map((warning, index) => (
                        <li key={index}>• {warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {/* Save Button */}
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleSave}
                variant="default"
                iconName="Save"
                disabled={!isValid || isSaving}
              >
                {isSaving ? 'Saving...' : 'Save & Deploy'}
              </Button>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-surface rounded-xl p-6 mt-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              Ads.txt Format Help
            </h3>
            
            <div className="space-y-3 text-sm text-text-secondary">
              <div>
                <strong className="text-text-primary">Format:</strong> domain, publisher_id, relationship, certification_authority_id
              </div>
              
              <div>
                <strong className="text-text-primary">Example:</strong> google.com, ca-pub-1234567890, DIRECT, f08c47fec0942fa0
              </div>
              
              <div className="space-y-1">
                <div><strong className="text-text-primary">Relationship types:</strong></div>
                <ul className="ml-4 space-y-1">
                  <li>• <strong>DIRECT:</strong> Direct business relationship</li>
                  <li>• <strong>RESELLER:</strong> Authorized through reseller</li>
                </ul>
              </div>
              
              <div>
                <strong className="text-text-primary">Comments:</strong> Lines starting with # are comments and ignored
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsTextEditor;