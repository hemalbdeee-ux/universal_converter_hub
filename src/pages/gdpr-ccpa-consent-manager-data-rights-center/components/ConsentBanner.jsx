import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConsentBanner = ({ userRegion, onConsentUpdate, onClose }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedConsents, setSelectedConsents] = useState({
    essential: true, // Always required
    functional: false,
    analytics: false,
    advertising: false,
    personalization: false
  });

  const getRegionSpecificText = () => {
    switch (userRegion) {
      case 'gdpr':
        return {
          title: 'GDPR Cookie Consent',
          description: 'We use cookies and similar technologies to provide our services. Under GDPR, we need your explicit consent for non-essential cookies.',
          rights: 'You have the right to withdraw consent at any time and request access to your personal data.'
        };
      case 'ccpa':
        return {
          title: 'California Privacy Rights',
          description: 'We collect and share personal information. Under CCPA, you have rights regarding your personal information.',
          rights: 'You can opt-out of the sale/sharing of personal information and request deletion of your data.'
        };
      case 'lgpd':
        return {
          title: 'LGPD Privacy Notice',
          description: 'We process personal data in accordance with Brazilian data protection law (LGPD).',
          rights: 'You have rights to access, correct, delete, and port your personal data.'
        };
      default:
        return {
          title: 'Privacy & Cookie Consent',
          description: 'We use cookies and collect data to improve your experience. Please review your preferences.',
          rights: 'You can change your preferences at any time in your privacy settings.'
        };
    }
  };

  const consentTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      description: 'Required for basic site functionality, security, and user authentication.',
      required: true
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'Remember your preferences and settings to enhance user experience.',
      required: false
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website (Google Analytics).',
      required: false
    },
    {
      id: 'advertising',
      name: 'Advertising Cookies',
      description: 'Used by Google AdSense and partners to show relevant ads based on your interests.',
      required: false
    },
    {
      id: 'personalization',
      name: 'Personalization Cookies',
      description: 'Customize content and recommendations based on your usage patterns.',
      required: false
    }
  ];

  const regionText = getRegionSpecificText();

  const handleConsentChange = (consentId, value) => {
    if (consentId === 'essential') return; // Essential cookies cannot be disabled
    
    setSelectedConsents(prev => ({
      ...prev,
      [consentId]: value
    }));
  };

  const handleAcceptAll = () => {
    const allConsents = {
      essential: true,
      functional: true,
      analytics: true,
      advertising: true,
      personalization: true
    };
    
    generateConsentString(allConsents)?.then(consentString => {
      onConsentUpdate(allConsents, consentString);
    });
  };

  const handleAcceptSelected = () => {
    generateConsentString(selectedConsents)?.then(consentString => {
      onConsentUpdate(selectedConsents, consentString);
    });
  };

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      advertising: false,
      personalization: false
    };
    
    generateConsentString(essentialOnly)?.then(consentString => {
      onConsentUpdate(essentialOnly, consentString);
    });
  };

  const generateConsentString = async (consents) => {
    // Generate IAB TCF 2.2 compatible consent string
    // This is a simplified version - use a proper TCF library in production
    const purposes = [];
    if (consents?.analytics) purposes?.push('analytics');
    if (consents?.advertising) purposes?.push('ads');
    if (consents?.functional) purposes?.push('functional');
    if (consents?.personalization) purposes?.push('personalization');
    
    const consentString = `tcfv2.${purposes?.join(',')}.${Date.now()}`;
    return consentString;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4">
      <div className="bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {regionText?.title}
              </h2>
              <p className="text-text-secondary">
                {regionText?.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {!showDetails ? (
            <div className="text-center space-y-4">
              <p className="text-text-secondary">
                We use cookies and similar technologies to enhance your experience. 
                Choose your preferences below:
              </p>
              
              <div className="bg-surface rounded-lg p-4 text-left">
                <h3 className="font-semibold text-text-primary mb-2">
                  <Icon name="Shield" size={16} className="inline mr-2" />
                  What We Use Cookies For:
                </h3>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Essential site functionality and security</li>
                  <li>• Analytics to improve our services (Google Analytics)</li>
                  <li>• Advertising through Google AdSense</li>
                  <li>• Personalizing your experience</li>
                </ul>
              </div>

              <div className="text-xs text-text-secondary bg-warning/10 rounded-lg p-3 border border-warning/20">
                <Icon name="AlertTriangle" size={14} className="inline mr-1 text-warning" />
                {regionText?.rights}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Detailed Cookie Preferences
              </h3>
              
              <div className="space-y-3">
                {consentTypes?.map((type) => (
                  <div key={type?.id} className="bg-surface rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-text-primary">
                            {type?.name}
                          </h4>
                          {type?.required && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary">
                          {type?.description}
                        </p>
                      </div>
                      
                      <div className="ml-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedConsents?.[type?.id]}
                            onChange={(e) => handleConsentChange(type?.id, e?.target?.checked)}
                            disabled={type?.required}
                            className="w-5 h-5 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2 disabled:opacity-50"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border bg-surface/50">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              size="sm"
              className="order-1 sm:order-0"
            >
              {showDetails ? 'Hide Details' : 'Customize Settings'}
            </Button>
            
            <Button
              onClick={handleRejectNonEssential}
              variant="outline"
              size="sm"
              className="order-3 sm:order-1"
            >
              Reject Non-Essential
            </Button>
            
            {showDetails && (
              <Button
                onClick={handleAcceptSelected}
                variant="default"
                size="sm"
                className="order-2"
              >
                Accept Selected
              </Button>
            )}
            
            <Button
              onClick={handleAcceptAll}
              variant="default"
              size="sm"
              className="order-2 sm:order-3"
            >
              Accept All Cookies
            </Button>
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border text-xs">
            <a href="/privacy-policy-legal-compliance-center" className="text-primary hover:underline">
              Privacy Policy
            </a>
            <a href="/cookie-policy" className="text-primary hover:underline">
              Cookie Policy
            </a>
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Google Ad Settings
            </a>
            <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              AdChoices Opt-out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;