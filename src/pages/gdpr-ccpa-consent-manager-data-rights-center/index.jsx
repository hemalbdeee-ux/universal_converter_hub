import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';

import { useAuth } from '../../contexts/AuthContext';
import ConsentBanner from './components/ConsentBanner';
import ConsentPreferences from './components/ConsentPreferences';
import DataRequestForm from './components/DataRequestForm';
import RegionSelector from './components/RegionSelector';
import ComplianceStatus from './components/ComplianceStatus';
import AdSense from '../../components/AdSense';

const GDPRCCPAConsentManager = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('consent');
  const [userRegion, setUserRegion] = useState('other');
  const [consentBannerVisible, setConsentBannerVisible] = useState(false);
  const [consents, setConsents] = useState({
    essential: true,
    functional: false,
    analytics: false,
    advertising: false,
    personalization: false
  });

  useEffect(() => {
    // Detect user region based on various factors
    detectUserRegion();
    
    // Check if consent banner should be shown
    const hasConsentRecord = localStorage.getItem('user-consent');
    if (!hasConsentRecord) {
      setConsentBannerVisible(true);
    } else {
      loadUserConsents();
    }
  }, []);

  const detectUserRegion = async () => {
    try {
      // Try to detect region via geolocation API or IP-based service
      // This is a simplified version - in production, use a proper geo-IP service
      const timezone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
      let detectedRegion = 'other';
      
      if (timezone?.includes('Europe')) {
        detectedRegion = 'gdpr';
      } else if (timezone?.includes('America/Los_Angeles') || timezone?.includes('America/New_York')) {
        // Additional logic needed to detect California specifically
        detectedRegion = 'ccpa';
      } else if (timezone?.includes('America/Sao_Paulo')) {
        detectedRegion = 'lgpd';
      }
      
      setUserRegion(detectedRegion);
    } catch (error) {
      console.error('Region detection failed:', error);
      setUserRegion('other');
    }
  };

  const loadUserConsents = () => {
    try {
      const savedConsents = localStorage.getItem('user-consent');
      if (savedConsents) {
        const parsedConsents = JSON.parse(savedConsents);
        setConsents(prev => ({ ...prev, ...parsedConsents?.preferences }));
      }
    } catch (error) {
      console.error('Failed to load user consents:', error);
    }
  };

  const handleConsentUpdate = async (newConsents, consentString = null) => {
    try {
      // Update local state
      setConsents(newConsents);
      
      // Save to localStorage
      const consentData = {
        preferences: newConsents,
        timestamp: new Date()?.toISOString(),
        region: userRegion,
        consentString: consentString,
        version: '1.0'
      };
      
      localStorage.setItem('user-consent', JSON.stringify(consentData));
      
      // If user is logged in, also save to database
      if (user?.id) {
        await saveConsentToDatabase(newConsents, consentString);
      }
      
      // Hide consent banner after user makes choice
      setConsentBannerVisible(false);
      
      // Trigger consent change events for third-party services
      triggerConsentChangeEvents(newConsents);
      
    } catch (error) {
      console.error('Failed to update consents:', error);
    }
  };

  const saveConsentToDatabase = async (consents, consentString) => {
    // This would integrate with Supabase to save consent preferences
    // Implementation depends on your specific backend setup
    console.log('Saving to database:', { consents, consentString, region: userRegion });
  };

  const triggerConsentChangeEvents = (consents) => {
    // Trigger events for Google Analytics, AdSense, etc.
    if (window.gtag && consents?.analytics) {
      window.gtag('consent', 'update', {
        analytics_storage: consents?.analytics ? 'granted' : 'denied',
        ad_storage: consents?.advertising ? 'granted' : 'denied',
        ad_user_data: consents?.advertising ? 'granted' : 'denied',
        ad_personalization: consents?.personalization ? 'granted' : 'denied'
      });
    }

    // Custom event for other integrations
    window.dispatchEvent(new CustomEvent('consentUpdate', {
      detail: { consents, region: userRegion }
    }));
  };

  const getRegionTitle = () => {
    switch (userRegion) {
      case 'gdpr': return 'GDPR Compliance Center (EU)';
      case 'ccpa': return 'CCPA Privacy Center (California)';
      case 'lgpd': return 'LGPD Compliance Center (Brazil)';
      default: return 'Privacy & Consent Center';
    }
  };

  const getRegionDescription = () => {
    switch (userRegion) {
      case 'gdpr': 
        return 'Manage your data protection rights under the General Data Protection Regulation (GDPR). You have the right to access, rectify, delete, and port your personal data.';
      case 'ccpa': 
        return 'Exercise your privacy rights under the California Consumer Privacy Act (CCPA). You can request to know what personal information we collect, sell, or share about you.';
      case 'lgpd': 
        return 'Manage your rights under the Lei Geral de Proteção de Dados (LGPD). Control how your personal data is collected, used, and shared.';
      default: 
        return 'Manage your privacy preferences and data rights. Control how your personal information is collected, used, and shared.';
    }
  };

  const tabs = [
    {
      id: 'consent',
      label: 'Consent Management',
      icon: 'Shield',
      description: 'Manage your cookie and tracking preferences'
    },
    {
      id: 'data-rights',
      label: 'Data Rights',
      icon: 'FileText',
      description: 'Request access, deletion, or export of your data'
    },
    {
      id: 'status',
      label: 'Compliance Status',
      icon: 'CheckCircle',
      description: 'View your current privacy settings and compliance status'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{getRegionTitle()} | Universal Converter</title>
        <meta name="description" content={getRegionDescription()} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface">
        {/* Consent Banner - Shows when user hasn't made consent choices */}
        {consentBannerVisible && (
          <ConsentBanner
            userRegion={userRegion}
            onConsentUpdate={handleConsentUpdate}
            onClose={() => setConsentBannerVisible(false)}
          />
        )}

        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <RegionSelector 
                  currentRegion={userRegion} 
                  onRegionChange={setUserRegion} 
                />
              </div>
              
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                {getRegionTitle()}
              </h1>
              
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                {getRegionDescription()}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row gap-2 mb-8 bg-card rounded-xl p-2">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeTab === tab?.id
                      ? 'bg-primary text-white shadow-lg transform scale-[1.02]'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={20} />
                  <div className="text-left">
                    <div className="font-semibold">{tab?.label}</div>
                    <div className="text-xs opacity-75 hidden sm:block">
                      {tab?.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'consent' && (
                <ConsentPreferences
                  consents={consents}
                  userRegion={userRegion}
                  onConsentUpdate={handleConsentUpdate}
                />
              )}

              {activeTab === 'data-rights' && (
                <DataRequestForm
                  userRegion={userRegion}
                  user={user}
                  userProfile={userProfile}
                />
              )}

              {activeTab === 'status' && (
                <ComplianceStatus
                  consents={consents}
                  userRegion={userRegion}
                  user={user}
                />
              )}
            </div>

            {/* Legal Links Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
                Legal Information & Resources
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Privacy Policy', path: '/privacy-policy-legal-compliance-center', icon: 'Shield' },
                  { title: 'Terms & Conditions', path: '/terms-conditions', icon: 'FileText' },
                  { title: 'Cookie Policy', path: '/cookie-policy', icon: 'Settings' },
                  { title: 'Contact Privacy Officer', path: '/contact-support-center', icon: 'Mail' },
                  { title: 'About Us', path: '/about-us-company-information', icon: 'Info' },
                  { title: 'Disclaimer', path: '/disclaimer', icon: 'AlertTriangle' }
                ]?.map((link, index) => (
                  <a
                    key={index}
                    href={link?.path}
                    className="flex items-center gap-3 p-4 bg-card hover:bg-surface rounded-lg transition-colors duration-200"
                  >
                    <Icon name={link?.icon} size={20} className="text-primary" />
                    <span className="font-medium text-text-primary">{link?.title}</span>
                    <Icon name="ExternalLink" size={16} className="text-text-secondary ml-auto" />
                  </a>
                ))}
              </div>
            </div>

            {/* AdSense Ad Placement */}
            <div className="mt-8">
              <AdSense
                adSlot="1234567894"
                adFormat="auto"
                slot="compliance_center"
                className="max-w-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GDPRCCPAConsentManager;