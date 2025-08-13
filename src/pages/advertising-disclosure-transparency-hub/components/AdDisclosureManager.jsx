import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import AdSense from '../../../components/AdSense';

const AdDisclosureManager = ({ complianceData, onUpdate, isAdmin }) => {
  const [disclosureSettings, setDisclosureSettings] = useState({
    showOnConverterPages: true,
    showOnEducationalContent: true,
    showOnHomepage: false,
    disclosureText: 'This page contains affiliate links and advertisements. We may receive compensation when you click on links to products or services.',
    position: 'top',
    style: 'banner',
    autoPlacement: true
  });

  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Load disclosure settings from compliance data
    if (complianceData?.settings) {
      const disclosureSetting = complianceData?.settings?.find(s => s?.setting_key === 'disclosure_settings');
      if (disclosureSetting?.setting_value?.value) {
        setDisclosureSettings(prev => ({
          ...prev,
          ...disclosureSetting?.setting_value?.value
        }));
      }
    }
  }, [complianceData]);

  const DisclosureWidget = ({ style = 'banner', text, preview = false }) => {
    const baseClasses = "border-l-4 p-4 mb-4";
    const styleClasses = {
      banner: "bg-yellow-50 border-yellow-400",
      subtle: "bg-gray-50 border-gray-300",
      prominent: "bg-orange-50 border-orange-400"
    };

    return (
      <div className={`${baseClasses} ${styleClasses?.[style]} ${preview ? 'opacity-75' : ''}`}>
        <div className="flex items-start">
          <Icon 
            name="AlertTriangle" 
            className={`mr-3 flex-shrink-0 ${
              style === 'prominent' ? 'text-orange-400' : 
              style === 'banner' ? 'text-yellow-500' : 'text-gray-400'
            }`} 
            size={18} 
          />
          <div>
            <h4 className={`text-sm font-semibold ${
              style === 'prominent' ? 'text-orange-800' : 
              style === 'banner' ? 'text-yellow-800' : 'text-gray-700'
            }`}>
              Advertising Disclosure
            </h4>
            <p className={`text-sm mt-1 ${
              style === 'prominent' ? 'text-orange-700' : 
              style === 'banner' ? 'text-yellow-700' : 'text-gray-600'
            }`}>
              {text}
            </p>
            {preview && (
              <span className="text-xs text-gray-500 mt-2 block">
                Preview Mode - This disclosure will appear on selected pages
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Advertising Disclosure Management
        </h2>
        <p className="text-gray-600">
          Configure automatic disclosure placement for FTC compliance and transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Disclosure Settings
          </h3>

          <div className="space-y-6">
            {/* Auto Placement */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={disclosureSettings?.autoPlacement}
                  onChange={(e) => setDisclosureSettings(prev => ({
                    ...prev,
                    autoPlacement: e?.target?.checked
                  }))}
                  className="rounded border-gray-300"
                />
                <div>
                  <span className="font-medium text-gray-900">Auto Placement</span>
                  <p className="text-sm text-gray-600">
                    Automatically place disclosures on content with ads
                  </p>
                </div>
              </label>
            </div>

            {/* Page Selection */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Show Disclosures On</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={disclosureSettings?.showOnConverterPages}
                    onChange={(e) => setDisclosureSettings(prev => ({
                      ...prev,
                      showOnConverterPages: e?.target?.checked
                    }))}
                    className="rounded border-gray-300"
                  />
                  <span className="text-gray-700">Converter Pages</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={disclosureSettings?.showOnEducationalContent}
                    onChange={(e) => setDisclosureSettings(prev => ({
                      ...prev,
                      showOnEducationalContent: e?.target?.checked
                    }))}
                    className="rounded border-gray-300"
                  />
                  <span className="text-gray-700">Educational Content</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={disclosureSettings?.showOnHomepage}
                    onChange={(e) => setDisclosureSettings(prev => ({
                      ...prev,
                      showOnHomepage: e?.target?.checked
                    }))}
                    className="rounded border-gray-300"
                  />
                  <span className="text-gray-700">Homepage</span>
                </label>
              </div>
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Position
              </label>
              <select
                value={disclosureSettings?.position}
                onChange={(e) => setDisclosureSettings(prev => ({
                  ...prev,
                  position: e?.target?.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="top">Top of Content</option>
                <option value="bottom">Bottom of Content</option>
                <option value="both">Top and Bottom</option>
              </select>
            </div>

            {/* Style */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Display Style
              </label>
              <select
                value={disclosureSettings?.style}
                onChange={(e) => setDisclosureSettings(prev => ({
                  ...prev,
                  style: e?.target?.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="banner">Banner Style</option>
                <option value="subtle">Subtle</option>
                <option value="prominent">Prominent</option>
              </select>
            </div>

            {/* Disclosure Text */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Disclosure Text
              </label>
              <textarea
                value={disclosureSettings?.disclosureText}
                onChange={(e) => setDisclosureSettings(prev => ({
                  ...prev,
                  disclosureText: e?.target?.value
                }))}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your FTC-compliant disclosure text..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Ensure your disclosure meets FTC guidelines for transparency
              </p>
            </div>

            {/* Action Buttons */}
            {isAdmin && (
              <div className="flex space-x-3 pt-4 border-t">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {previewMode ? 'Exit Preview' : 'Preview'}
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Settings
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Preview & Templates
          </h3>

          {/* Live Preview */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Live Preview</h4>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <DisclosureWidget 
                style={disclosureSettings?.style}
                text={disclosureSettings?.disclosureText}
                preview={true}
              />
              
              {/* Sample AdSense Ad */}
              <div className="mt-4">
                <AdSense
                  adClient={import.meta.env?.VITE_ADSENSE_CLIENT}
                  adSlot="1234567890"
                  adFormat="auto"
                  slot="preview"
                  className="mb-4"
                />
              </div>
            </div>
          </div>

          {/* Template Library */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Template Library</h4>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-3">
                <h5 className="font-medium text-gray-800">Standard Disclosure</h5>
                <p className="text-sm text-gray-600 mt-1">
                  "This page contains affiliate links and advertisements. We may receive compensation when you click on links to products or services."
                </p>
                <button className="text-xs text-blue-600 hover:text-blue-800 mt-2">
                  Use Template
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-3">
                <h5 className="font-medium text-gray-800">Detailed AdSense Disclosure</h5>
                <p className="text-sm text-gray-600 mt-1">
                  "We display advertisements from Google AdSense. These ads help support our free conversion tools and educational content."
                </p>
                <button className="text-xs text-blue-600 hover:text-blue-800 mt-2">
                  Use Template
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-3">
                <h5 className="font-medium text-gray-800">Educational Content Disclosure</h5>
                <p className="text-sm text-gray-600 mt-1">
                  "This educational content is supported by advertising. We maintain editorial independence while providing valuable conversion resources."
                </p>
                <button className="text-xs text-blue-600 hover:text-blue-800 mt-2">
                  Use Template
                </button>
              </div>
            </div>
          </div>

          {/* Compliance Guidelines */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">FTC Guidelines</h4>
            <div className="bg-blue-50 rounded-lg p-4">
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Disclosures must be clear and conspicuous</li>
                <li>• Place disclosures before affiliate links</li>
                <li>• Use plain language that consumers understand</li>
                <li>• Ensure disclosures are visible on mobile devices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDisclosureManager;