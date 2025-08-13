import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConsentPreferences = ({ consents, userRegion, onConsentUpdate }) => {
  const [preferences, setPreferences] = useState(consents);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const consentCategories = [
    {
      id: 'essential',
      name: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for the website to function properly. They enable core functionalities such as security, network management, and accessibility.',
      required: true,
      vendors: ['Universal Converter (First Party)', 'Supabase (Authentication)'],
      purposes: ['Authentication', 'Security', 'Load Balancing', 'Session Management'],
      icon: 'Shield'
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'These cookies enable the website to provide enhanced functionality and personalization based on your interactions.',
      required: false,
      vendors: ['Universal Converter (First Party)'],
      purposes: ['Language Preferences', 'Region Settings', 'User Interface Preferences'],
      icon: 'Settings'
    },
    {
      id: 'analytics',
      name: 'Analytics & Performance Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      required: false,
      vendors: ['Google Analytics', 'Google Tag Manager'],
      purposes: ['Traffic Analysis', 'Performance Monitoring', 'User Behavior Insights'],
      icon: 'BarChart'
    },
    {
      id: 'advertising',
      name: 'Advertising & Marketing Cookies',
      description: 'These cookies are used to deliver relevant advertisements and track the effectiveness of advertising campaigns.',
      required: false,
      vendors: ['Google AdSense', 'Google Ad Manager', 'Third-party Ad Networks'],
      purposes: ['Targeted Advertising', 'Ad Frequency Control', 'Campaign Analytics'],
      icon: 'Target'
    },
    {
      id: 'personalization',
      name: 'Personalization Cookies',
      description: 'These cookies allow us to customize content and recommendations based on your usage patterns and preferences.',
      required: false,
      vendors: ['Universal Converter (First Party)'],
      purposes: ['Content Personalization', 'Recommendations', 'User Experience Optimization'],
      icon: 'User'
    }
  ];

  const handleToggleConsent = (categoryId, value) => {
    if (categoryId === 'essential') return; // Cannot disable essential cookies
    
    setPreferences(prev => ({
      ...prev,
      [categoryId]: value
    }));
  };

  const handleSavePreferences = () => {
    onConsentUpdate(preferences);
  };

  const handleAcceptAll = () => {
    const allAccepted = consentCategories?.reduce((acc, category) => {
      acc[category.id] = true;
      return acc;
    }, {});
    
    setPreferences(allAccepted);
    onConsentUpdate(allAccepted);
  };

  const handleRejectAll = () => {
    const essentialOnly = consentCategories?.reduce((acc, category) => {
      acc[category.id] = category?.required;
      return acc;
    }, {});
    
    setPreferences(essentialOnly);
    onConsentUpdate(essentialOnly);
  };

  const getRegionSpecificNotice = () => {
    switch (userRegion) {
      case 'gdpr':
        return {
          title: 'GDPR Notice',
          text: 'Under GDPR, you have the right to withdraw consent at any time. Withdrawing consent will not affect the lawfulness of processing based on consent before its withdrawal.',
          icon: 'Scale'
        };
      case 'ccpa':
        return {
          title: 'CCPA Notice',
          text: 'California residents have the right to opt-out of the sale of personal information. We do not sell personal information, but we may share it with advertising partners.',
          icon: 'Flag'
        };
      case 'lgpd':
        return {
          title: 'LGPD Notice',
          text: 'Under Brazilian data protection law, you can revoke consent and request information about data processing at any time.',
          icon: 'Flag'
        };
      default:
        return {
          title: 'Privacy Notice',
          text: 'You can change your cookie preferences at any time. Changes will take effect immediately.',
          icon: 'Info'
        };
    }
  };

  const regionNotice = getRegionSpecificNotice();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          Cookie & Consent Preferences
        </h2>
        <p className="text-text-secondary">
          Control how we collect and use your data. You can update these preferences at any time.
        </p>
      </div>
      {/* Region Notice */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name={regionNotice?.icon} size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-text-primary mb-1">
              {regionNotice?.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {regionNotice?.text}
            </p>
          </div>
        </div>
      </div>
      {/* Consent Categories */}
      <div className="space-y-4">
        {consentCategories?.map((category) => (
          <div
            key={category?.id}
            className="bg-card rounded-xl p-6 border border-border hover:border-border-hover transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className={`
                p-3 rounded-lg flex-shrink-0
                ${preferences?.[category?.id] 
                  ? 'bg-primary/20 text-primary' :'bg-surface text-text-secondary'
                }
              `}>
                <Icon name={category?.icon} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {category?.name}
                  </h3>
                  
                  <div className="flex items-center gap-3">
                    {category?.required && (
                      <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">
                        Always Active
                      </span>
                    )}
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences?.[category?.id] || false}
                        onChange={(e) => handleToggleConsent(category?.id, e?.target?.checked)}
                        disabled={category?.required}
                        className="w-5 h-5 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2 disabled:opacity-50"
                      />
                    </label>
                  </div>
                </div>
                
                <p className="text-text-secondary mb-4">
                  {category?.description}
                </p>
                
                {showAdvanced && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Purposes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category?.purposes?.map((purpose, index) => (
                          <span
                            key={index}
                            className="text-xs bg-surface px-2 py-1 rounded-full text-text-secondary"
                          >
                            {purpose}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Vendors:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category?.vendors?.map((vendor, index) => (
                          <span
                            key={index}
                            className="text-xs bg-surface px-2 py-1 rounded-full text-text-secondary"
                          >
                            {vendor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Advanced Settings Toggle */}
      <div className="text-center">
        <Button
          onClick={() => setShowAdvanced(!showAdvanced)}
          variant="outline"
          size="sm"
          iconName={showAdvanced ? 'ChevronUp' : 'ChevronDown'}
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Details
        </Button>
      </div>
      {/* External Opt-out Links */}
      <div className="bg-surface rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          External Opt-out Options
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-card hover:bg-surface rounded-lg transition-colors"
          >
            <Icon name="ExternalLink" size={16} className="text-primary" />
            <div>
              <div className="font-medium text-text-primary">Google Ad Settings</div>
              <div className="text-xs text-text-secondary">Manage personalized ads</div>
            </div>
          </a>
          
          <a
            href="https://optout.aboutads.info/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-card hover:bg-surface rounded-lg transition-colors"
          >
            <Icon name="ExternalLink" size={16} className="text-primary" />
            <div>
              <div className="font-medium text-text-primary">AdChoices Opt-out</div>
              <div className="text-xs text-text-secondary">Industry opt-out page</div>
            </div>
          </a>
          
          <a
            href="https://www.google.com/settings/ads/anonymous"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-card hover:bg-surface rounded-lg transition-colors"
          >
            <Icon name="ExternalLink" size={16} className="text-primary" />
            <div>
              <div className="font-medium text-text-primary">Google Analytics Opt-out</div>
              <div className="text-xs text-text-secondary">Disable tracking</div>
            </div>
          </a>
          
          <a
            href="/do-not-sell-share-data"
            className="flex items-center gap-3 p-3 bg-card hover:bg-surface rounded-lg transition-colors"
          >
            <Icon name="Shield" size={16} className="text-primary" />
            <div>
              <div className="font-medium text-text-primary">Do Not Sell/Share</div>
              <div className="text-xs text-text-secondary">CCPA data rights</div>
            </div>
          </a>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={handleRejectAll}
          variant="outline"
          size="lg"
          iconName="X"
        >
          Reject All Non-Essential
        </Button>
        
        <Button
          onClick={handleSavePreferences}
          variant="default"
          size="lg"
          iconName="Save"
        >
          Save Preferences
        </Button>
        
        <Button
          onClick={handleAcceptAll}
          variant="default"
          size="lg"
          iconName="Check"
        >
          Accept All
        </Button>
      </div>
      {/* Last Updated */}
      <div className="text-center text-sm text-text-secondary">
        Preferences last updated: {new Date()?.toLocaleDateString()}
      </div>
    </div>
  );
};

export default ConsentPreferences;