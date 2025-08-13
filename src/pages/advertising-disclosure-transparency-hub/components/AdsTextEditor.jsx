import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { supabase } from '../../../lib/supabase';

const AdsTextEditor = ({ complianceData, onUpdate }) => {
  const [adsTextContent, setAdsTextContent] = useState('');
  const [publisherId, setPublisherId] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    loadAdsTextData();
  }, [complianceData]);

  const loadAdsTextData = () => {
    if (complianceData?.settings) {
      const adsTextSetting = complianceData?.settings?.find(s => s?.setting_key === 'ads_txt_content');
      const publisherIdSetting = complianceData?.settings?.find(s => s?.setting_key === 'adsense_publisher_id');
      
      if (adsTextSetting?.setting_value?.value) {
        setAdsTextContent(adsTextSetting?.setting_value?.value);
      }
      
      if (publisherIdSetting?.setting_value?.value) {
        setPublisherId(publisherIdSetting?.setting_value?.value);
      }
    }
  };

  const generateDefaultAdsText = () => {
    if (!publisherId) {
      alert('Please set your AdSense Publisher ID in Business Settings first.');
      return;
    }

    const defaultContent = `# ads.txt file for ConvertAnything.com
# This file allows advertisers to verify authorized ad inventory sellers
# Generated on ${new Date()?.toISOString()?.split('T')?.[0]}

# Google AdSense
google.com, ${publisherId?.replace('ca-pub-', 'pub-')}, DIRECT, f08c47fec0942fa0

# Additional ad networks can be added below
# Format: domain, publisher_id, relationship, certification_authority_id
# Example: example-ad-network.com, 12345, DIRECT, abc123def456

# For more information about ads.txt:
# https://iabtechlab.com/ads-txt-about/`;

    setAdsTextContent(defaultContent);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const { error } = await supabase?.from('compliance_settings')?.upsert({
          setting_key: 'ads_txt_content',
          setting_value: { value: adsTextContent },
          setting_type: 'textarea',
          last_updated: new Date()?.toISOString()
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      onUpdate?.();
    } catch (err) {
      console.error('Error saving ads.txt:', err);
      alert('Failed to save ads.txt content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateAdsText = () => {
    const lines = adsTextContent?.split('\n')?.filter(line => 
      line?.trim() && !line?.trim()?.startsWith('#')
    );

    const issues = [];
    
    if (!lines?.length) {
      issues?.push('No valid entries found');
    }

    lines?.forEach((line, index) => {
      const parts = line?.split(',')?.map(p => p?.trim());
      if (parts?.length !== 4) {
        issues?.push(`Line ${index + 1}: Invalid format (should have 4 comma-separated values)`);
      }
      if (parts?.[2] && !['DIRECT', 'RESELLER']?.includes(parts?.[2]?.toUpperCase())) {
        issues?.push(`Line ${index + 1}: Relationship should be DIRECT or RESELLER`);
      }
    });

    return issues;
  };

  const validationIssues = validateAdsText();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ads.txt Editor
        </h2>
        <p className="text-gray-600">
          Create and manage your ads.txt file for AdSense publisher verification.
        </p>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="CheckCircle" className="text-green-500 mr-3" size={20} />
            <div>
              <span className="text-green-800 font-medium">
                Ads.txt saved successfully!
              </span>
              <p className="text-green-700 text-sm mt-1">
                Your ads.txt file is now available at: 
                <code className="bg-green-100 px-1 rounded ml-1">
                  https://convertanything.com/ads.txt
                </code>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Panel */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Ads.txt Content
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={generateDefaultAdsText}
                className="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
              >
                <Icon name="RefreshCw" size={14} className="inline mr-1" />
                Generate Default
              </button>
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                <Icon name="Eye" size={14} className="inline mr-1" />
                {previewMode ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>

          {!previewMode ? (
            <>
              <textarea
                value={adsTextContent}
                onChange={(e) => setAdsTextContent(e?.target?.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="# ads.txt file&#10;google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"
              />
              
              {/* Character Count */}
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>Character count: {adsTextContent?.length || 0}</span>
                <span>Lines: {adsTextContent?.split('\n')?.length || 0}</span>
              </div>

              {/* Validation Results */}
              {validationIssues?.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="flex items-center text-red-800 font-medium mb-2">
                    <Icon name="AlertTriangle" className="mr-2" size={16} />
                    Validation Issues
                  </h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    {validationIssues?.map((issue, index) => (
                      <li key={index}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={loading || validationIssues?.length > 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                  <span>Save Ads.txt</span>
                </button>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-2 text-sm text-gray-600">Preview of ads.txt file:</div>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                {adsTextContent || '# No content yet'}
              </pre>
            </div>
          )}
        </div>

        {/* Information Panel */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Current Status</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Publisher ID:</span>
                <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
                  {publisherId || 'Not set'}
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">File Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  adsTextContent 
                    ? 'bg-green-100 text-green-800' :'bg-gray-100 text-gray-600'
                }`}>
                  {adsTextContent ? 'Ready' : 'Empty'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Validation:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  validationIssues?.length === 0
                    ? 'bg-green-100 text-green-800' :'bg-red-100 text-red-800'
                }`}>
                  {validationIssues?.length === 0 ? 'Valid' : `${validationIssues?.length} Issues`}
                </span>
              </div>
            </div>
          </div>

          {/* What is Ads.txt */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">What is Ads.txt?</h4>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                Ads.txt (Authorized Digital Sellers) is a file that helps protect your ad inventory from counterfeit sellers.
              </p>
              <p>
                It's required by Google AdSense and should be placed at your domain root.
              </p>
            </div>
          </div>

          {/* Format Guide */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Format Guide</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <div>
                <strong>Basic format:</strong>
                <code className="block bg-white p-2 mt-1 rounded text-xs">
                  domain, publisher_id, relationship, certification
                </code>
              </div>
              <div>
                <strong>Relationship types:</strong>
                <ul className="mt-1 ml-4 space-y-1 text-xs">
                  <li>• DIRECT - Direct business relationship</li>
                  <li>• RESELLER - Through intermediary</li>
                </ul>
              </div>
              <div>
                <strong>Comments:</strong>
                <p className="text-xs text-gray-600">
                  Lines starting with # are comments
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button
                onClick={() => window.open('/ads.txt', '_blank')}
                className="w-full flex items-center justify-between px-3 py-2 text-left text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <span>View Live ads.txt</span>
                <Icon name="ExternalLink" size={14} className="text-gray-400" />
              </button>
              
              <a
                href="https://support.google.com/adsense/answer/7532444"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2 text-left text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <span>AdSense ads.txt Guide</span>
                <Icon name="ExternalLink" size={14} className="text-gray-400" />
              </a>
              
              <a
                href="https://iabtechlab.com/ads-txt-about/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2 text-left text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <span>IAB ads.txt Specification</span>
                <Icon name="ExternalLink" size={14} className="text-gray-400" />
              </a>
            </div>
          </div>

          {/* Implementation Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Icon name="Info" className="text-yellow-600 mr-2" size={16} />
              Implementation Note
            </h4>
            <p className="text-yellow-800 text-xs">
              After saving, your ads.txt file will be automatically served at 
              <code className="bg-yellow-100 px-1 rounded mx-1">
                https://convertanything.com/ads.txt
              </code>
              It may take a few minutes for changes to propagate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsTextEditor;