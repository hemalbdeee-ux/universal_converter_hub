import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { supabase } from '../../../lib/supabase';

const BusinessSettingsPanel = ({ complianceData, onUpdate }) => {
  const [businessData, setBusinessData] = useState({
    businessName: '',
    businessAddress: '',
    contactEmail: '',
    adsensePublisherId: '',
    supportEmail: '',
    dataProtectionOfficer: '',
    businessRegistration: '',
    vatNumber: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadBusinessData();
  }, [complianceData]);

  const loadBusinessData = () => {
    if (complianceData?.settings) {
      const settings = {};
      complianceData?.settings?.forEach(setting => {
        const key = setting?.setting_key;
        const value = setting?.setting_value?.value;
        
        switch (key) {
          case 'business_name':
            settings.businessName = value;
            break;
          case 'business_address':
            settings.businessAddress = value;
            break;
          case 'contact_email':
            settings.contactEmail = value;
            break;
          case 'adsense_publisher_id':
            settings.adsensePublisherId = value;
            break;
          case 'support_email':
            settings.supportEmail = value;
            break;
          case 'data_protection_officer':
            settings.dataProtectionOfficer = value;
            break;
          case 'business_registration':
            settings.businessRegistration = value;
            break;
          case 'vat_number':
            settings.vatNumber = value;
            break;
          case 'phone_number':
            settings.phoneNumber = value;
            break;
        }
      });
      
      setBusinessData(prev => ({ ...prev, ...settings }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const settingsToUpdate = [
        { key: 'business_name', value: businessData?.businessName },
        { key: 'business_address', value: businessData?.businessAddress },
        { key: 'contact_email', value: businessData?.contactEmail },
        { key: 'adsense_publisher_id', value: businessData?.adsensePublisherId },
        { key: 'support_email', value: businessData?.supportEmail },
        { key: 'data_protection_officer', value: businessData?.dataProtectionOfficer },
        { key: 'business_registration', value: businessData?.businessRegistration },
        { key: 'vat_number', value: businessData?.vatNumber },
        { key: 'phone_number', value: businessData?.phoneNumber }
      ];

      for (const setting of settingsToUpdate) {
        const { error } = await supabase?.from('compliance_settings')?.upsert({
            setting_key: setting?.key,
            setting_value: { value: setting?.value },
            setting_type: 'text',
            last_updated: new Date()?.toISOString()
          }, {
            onConflict: 'setting_key'
          });

        if (error) throw error;
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      onUpdate?.();
    } catch (err) {
      console.error('Error saving business settings:', err);
      alert('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    {
      key: 'businessName',
      label: 'Business Name',
      type: 'text',
      placeholder: 'ConvertAnything.com',
      required: true,
      description: 'Your company or business name as it appears in legal documents'
    },
    {
      key: 'contactEmail',
      label: 'Primary Contact Email',
      type: 'email',
      placeholder: 'contact@convertanything.com',
      required: true,
      description: 'Main contact email for business inquiries'
    },
    {
      key: 'supportEmail',
      label: 'Support Email',
      type: 'email',
      placeholder: 'support@convertanything.com',
      required: false,
      description: 'Email for customer support (can be same as contact email)'
    },
    {
      key: 'businessAddress',
      label: 'Business Address',
      type: 'textarea',
      placeholder: 'Your Business Address\nCity, State, ZIP\nCountry',
      required: true,
      description: 'Complete business address for legal compliance'
    },
    {
      key: 'adsensePublisherId',
      label: 'AdSense Publisher ID',
      type: 'text',
      placeholder: 'ca-pub-XXXXXXXXXXXXXXXX',
      required: true,
      description: 'Your Google AdSense Publisher ID (found in AdSense dashboard)'
    },
    {
      key: 'dataProtectionOfficer',
      label: 'Data Protection Officer',
      type: 'text',
      placeholder: 'dpo@convertanything.com',
      required: false,
      description: 'Contact for GDPR data protection inquiries (optional)'
    },
    {
      key: 'businessRegistration',
      label: 'Business Registration Number',
      type: 'text',
      placeholder: 'Company registration or tax ID',
      required: false,
      description: 'Legal business registration number (optional)'
    },
    {
      key: 'vatNumber',
      label: 'VAT Number',
      type: 'text',
      placeholder: 'EU VAT number if applicable',
      required: false,
      description: 'EU VAT number for European businesses (optional)'
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      required: false,
      description: 'Business phone number for contact page (optional)'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Business Settings
        </h2>
        <p className="text-gray-600">
          Configure your business information for compliance documents and contact forms.
        </p>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Icon name="CheckCircle" className="text-green-500 mr-3" size={20} />
            <span className="text-green-800 font-medium">
              Business settings saved successfully!
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Fields */}
        <div className="space-y-6">
          {formFields?.map((field) => (
            <div key={field?.key}>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {field?.label}
                {field?.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field?.type === 'textarea' ? (
                <textarea
                  value={businessData?.[field?.key] || ''}
                  onChange={(e) => setBusinessData(prev => ({
                    ...prev,
                    [field?.key]: e?.target?.value
                  }))}
                  rows={4}
                  placeholder={field?.placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <input
                  type={field?.type}
                  value={businessData?.[field?.key] || ''}
                  onChange={(e) => setBusinessData(prev => ({
                    ...prev,
                    [field?.key]: e?.target?.value
                  }))}
                  placeholder={field?.placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
              
              {field?.description && (
                <p className="text-xs text-gray-500 mt-1">
                  {field?.description}
                </p>
              )}
            </div>
          ))}

          {/* Save Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={loading || !businessData?.businessName?.trim() || !businessData?.contactEmail?.trim()}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
              <span>Save Business Settings</span>
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Settings Preview
          </h3>

          <div className="space-y-6">
            {/* Contact Information Preview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Business:</span>
                  <span className="text-gray-600 ml-2">
                    {businessData?.businessName || 'Not set'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-600 ml-2">
                    {businessData?.contactEmail || 'Not set'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <div className="text-gray-600 ml-2 mt-1">
                    {businessData?.businessAddress?.split('\n')?.map((line, index) => (
                      <div key={index}>{line || 'Not set'}</div>
                    )) || 'Not set'}
                  </div>
                </div>
              </div>
            </div>

            {/* AdSense Configuration Preview */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">AdSense Configuration</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Publisher ID:</span>
                  <code className="text-blue-600 bg-white px-2 py-1 rounded ml-2 text-xs">
                    {businessData?.adsensePublisherId || 'ca-pub-XXXXXXXXXXXXXXXX'}
                  </code>
                </div>
                <p className="text-gray-600 text-xs mt-2">
                  This Publisher ID will be used in ads.txt and AdSense integration
                </p>
              </div>
            </div>

            {/* Data Protection Preview */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Data Protection</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">DPO Contact:</span>
                  <span className="text-gray-600 ml-2">
                    {businessData?.dataProtectionOfficer || 'Not specified'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Business Reg:</span>
                  <span className="text-gray-600 ml-2">
                    {businessData?.businessRegistration || 'Not specified'}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mt-2">
                  Optional fields for enhanced GDPR compliance
                </p>
              </div>
            </div>

            {/* Usage Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Icon name="Info" className="text-yellow-600 mr-2" size={16} />
                How This Information is Used
              </h4>
              <ul className="text-xs text-yellow-800 space-y-1">
                <li>• Contact forms and support pages</li>
                <li>• Privacy policy and terms of service</li>
                <li>• AdSense ads.txt file generation</li>
                <li>• GDPR data controller information</li>
                <li>• Business schema markup for SEO</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSettingsPanel;