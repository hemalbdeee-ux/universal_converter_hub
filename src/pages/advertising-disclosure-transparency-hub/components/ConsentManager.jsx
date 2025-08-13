import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { supabase } from '../../../lib/supabase';

const ConsentManager = ({ complianceData, onUpdate, isAdmin }) => {
  const [consentStats, setConsentStats] = useState({
    totalConsents: 0,
    acceptedConsents: 0,
    rejectedConsents: 0,
    recentConsents: []
  });
  const [consentConfig, setConsentConfig] = useState({
    gdprEnabled: true,
    ccpaEnabled: true,
    lgpdEnabled: true,
    tcfCompliant: true,
    bannerText: 'We use cookies and similar technologies to enhance your experience.',
    position: 'bottom',
    style: 'banner'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchConsentStats();
    }
    loadConsentConfig();
  }, [isAdmin, complianceData]);

  const fetchConsentStats = async () => {
    try {
      setLoading(true);
      
      // Fetch consent statistics
      const { data: consents, error } = await supabase?.from('user_consents')?.select('*')?.order('created_at', { ascending: false })?.limit(10);

      if (error) throw error;

      // Process stats
      const totalConsents = consents?.length || 0;
      const acceptedConsents = consents?.filter(c => c?.consent_data?.accepted)?.length || 0;
      const rejectedConsents = totalConsents - acceptedConsents;

      setConsentStats({
        totalConsents,
        acceptedConsents,
        rejectedConsents,
        recentConsents: consents || []
      });
    } catch (err) {
      console.error('Error fetching consent stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadConsentConfig = () => {
    if (complianceData?.settings) {
      const config = {};
      complianceData?.settings?.forEach(setting => {
        if (setting?.setting_key?.includes('gdpr') || 
            setting?.setting_key?.includes('ccpa') || 
            setting?.setting_key?.includes('lgpd') ||
            setting?.setting_key?.includes('consent')) {
          config[setting?.setting_key] = setting?.setting_value?.value;
        }
      });
      
      if (Object.keys(config)?.length > 0) {
        setConsentConfig(prev => ({ ...prev, ...config }));
      }
    }
  };

  const ConsentBanner = ({ preview = false }) => (
    <div className={`border rounded-lg p-4 ${preview ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Shield" size={18} className="text-blue-600" />
            <h4 className="font-medium text-gray-900">Cookie Consent</h4>
          </div>
          <p className="text-sm text-gray-600">
            {consentConfig?.bannerText}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Accept All
          </button>
          <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Manage Preferences
          </button>
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
            Reject All
          </button>
        </div>
      </div>
      {preview && (
        <p className="text-xs text-blue-600 mt-3 border-t border-blue-200 pt-2">
          Preview Mode - This banner appears to users based on their location and consent status
        </p>
      )}
    </div>
  );

  const RegionBadge = ({ region, enabled }) => (
    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
      enabled 
        ? 'bg-green-100 text-green-800' :'bg-gray-100 text-gray-600'
    }`}>
      {region} {enabled ? 'Enabled' : 'Disabled'}
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Consent Management
        </h2>
        <p className="text-gray-600">
          Manage GDPR, CCPA, and LGPD compliance with IAB TCF 2.2 framework.
        </p>
      </div>

      {/* Statistics Dashboard (Admin Only) */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Consents</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? '...' : consentStats?.totalConsents}
                </p>
              </div>
              <Icon name="Users" className="text-blue-500" size={24} />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-3xl font-bold text-green-600">
                  {loading ? '...' : consentStats?.acceptedConsents}
                </p>
              </div>
              <Icon name="CheckCircle" className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600">
                  {loading ? '...' : consentStats?.rejectedConsents}
                </p>
              </div>
              <Icon name="XCircle" className="text-red-500" size={24} />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Consent Configuration
          </h3>

          <div className="space-y-6">
            {/* Regional Compliance */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Regional Compliance</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={consentConfig?.gdprEnabled}
                      onChange={(e) => setConsentConfig(prev => ({
                        ...prev,
                        gdprEnabled: e?.target?.checked
                      }))}
                      className="rounded border-gray-300"
                    />
                    <div>
                      <span className="font-medium text-gray-900">GDPR (Europe)</span>
                      <p className="text-sm text-gray-600">
                        European Union data protection compliance
                      </p>
                    </div>
                  </div>
                  <RegionBadge region="EU" enabled={consentConfig?.gdprEnabled} />
                </label>

                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={consentConfig?.ccpaEnabled}
                      onChange={(e) => setConsentConfig(prev => ({
                        ...prev,
                        ccpaEnabled: e?.target?.checked
                      }))}
                      className="rounded border-gray-300"
                    />
                    <div>
                      <span className="font-medium text-gray-900">CCPA (California)</span>
                      <p className="text-sm text-gray-600">
                        California Consumer Privacy Act compliance
                      </p>
                    </div>
                  </div>
                  <RegionBadge region="CA" enabled={consentConfig?.ccpaEnabled} />
                </label>

                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={consentConfig?.lgpdEnabled}
                      onChange={(e) => setConsentConfig(prev => ({
                        ...prev,
                        lgpdEnabled: e?.target?.checked
                      }))}
                      className="rounded border-gray-300"
                    />
                    <div>
                      <span className="font-medium text-gray-900">LGPD (Brazil)</span>
                      <p className="text-sm text-gray-600">
                        Lei Geral de Proteção de Dados compliance
                      </p>
                    </div>
                  </div>
                  <RegionBadge region="BR" enabled={consentConfig?.lgpdEnabled} />
                </label>
              </div>
            </div>

            {/* IAB TCF 2.2 Compliance */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Framework Compliance</h4>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  checked={consentConfig?.tcfCompliant}
                  onChange={(e) => setConsentConfig(prev => ({
                    ...prev,
                    tcfCompliant: e?.target?.checked
                  }))}
                  className="rounded border-gray-300"
                />
                <div>
                  <span className="font-medium text-gray-900">IAB TCF 2.2 Compliant</span>
                  <p className="text-sm text-gray-600">
                    Interactive Advertising Bureau Transparency & Consent Framework
                  </p>
                </div>
              </label>
            </div>

            {/* Banner Configuration */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Banner Settings</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Banner Text
                  </label>
                  <textarea
                    value={consentConfig?.bannerText}
                    onChange={(e) => setConsentConfig(prev => ({
                      ...prev,
                      bannerText: e?.target?.value
                    }))}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Position
                    </label>
                    <select
                      value={consentConfig?.position}
                      onChange={(e) => setConsentConfig(prev => ({
                        ...prev,
                        position: e?.target?.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="bottom">Bottom</option>
                      <option value="top">Top</option>
                      <option value="center">Center</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Style
                    </label>
                    <select
                      value={consentConfig?.style}
                      onChange={(e) => setConsentConfig(prev => ({
                        ...prev,
                        style: e?.target?.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="banner">Banner</option>
                      <option value="modal">Modal</option>
                      <option value="corner">Corner</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Settings */}
            {isAdmin && (
              <div className="pt-4 border-t">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Consent Settings
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview and Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Preview & Management
          </h3>

          {/* Banner Preview */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Consent Banner Preview</h4>
            <ConsentBanner preview={true} />
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Icon name="Eye" size={18} className="text-blue-600" />
                  <span className="font-medium">View "Do Not Sell/Share" Page</span>
                </div>
                <Icon name="ExternalLink" size={16} className="text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Icon name="Download" size={18} className="text-blue-600" />
                  <span className="font-medium">Data Request Form</span>
                </div>
                <Icon name="ExternalLink" size={16} className="text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Icon name="Trash2" size={18} className="text-blue-600" />
                  <span className="font-medium">Data Deletion Request</span>
                </div>
                <Icon name="ExternalLink" size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Compliance Resources */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Compliance Resources</h4>
            <div className="space-y-3">
              <a
                href="https://iabeurope.eu/tcf-2-0/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">IAB TCF 2.2 Framework</h5>
                    <p className="text-sm text-gray-600">Official specification and implementation guide</p>
                  </div>
                  <Icon name="ExternalLink" size={16} className="text-gray-400" />
                </div>
              </a>

              <a
                href="https://gdpr-info.eu/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">GDPR Information Portal</h5>
                    <p className="text-sm text-gray-600">Complete GDPR compliance guide</p>
                  </div>
                  <Icon name="ExternalLink" size={16} className="text-gray-400" />
                </div>
              </a>

              <a
                href="https://oag.ca.gov/privacy/ccpa"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">CCPA Official Guide</h5>
                    <p className="text-sm text-gray-600">California Attorney General's CCPA resource</p>
                  </div>
                  <Icon name="ExternalLink" size={16} className="text-gray-400" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentManager;