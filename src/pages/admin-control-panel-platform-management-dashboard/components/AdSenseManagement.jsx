import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AdSenseManagement = () => {
  const [adSettings, setAdSettings] = useState({
    publisherId: import.meta.env?.VITE_ADSENSE_CLIENT || '',
    headerBannerSlot: '',
    sidebarAdSlot: '',
    inContentAdSlot: '',
    footerBannerSlot: '',
    autoAdsEnabled: false
  });

  const [testResults, setTestResults] = useState({
    headerBanner: { status: 'active', impressions: 45000, clicks: 890, ctr: 2.4, rpm: 4.8 },
    sidebarAds: { status: 'active', impressions: 38000, clicks: 712, ctr: 2.1, rpm: 4.2 },
    inContent: { status: 'paused', impressions: 0, clicks: 0, ctr: 0, rpm: 0 },
    footerBanner: { status: 'active', impressions: 23000, clicks: 380, ctr: 1.9, rpm: 3.8 }
  });

  const handleSettingChange = (field, value) => {
    setAdSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    // Save AdSense settings
    console.log('Saving AdSense settings:', adSettings);
    // Implementation would save to backend/database
  };

  const handleToggleAdUnit = (adUnit) => {
    setTestResults(prev => ({
      ...prev,
      [adUnit]: {
        ...prev?.[adUnit],
        status: prev?.[adUnit]?.status === 'active' ? 'paused' : 'active'
      }
    }));
  };

  const adUnits = [
    { 
      id: 'headerBanner', 
      name: 'Header Banner', 
      description: '728x90 Leaderboard at top of page',
      settingKey: 'headerBannerSlot'
    },
    { 
      id: 'sidebarAds', 
      name: 'Sidebar Ads', 
      description: '300x250 Rectangle in sidebar',
      settingKey: 'sidebarAdSlot'
    },
    { 
      id: 'inContent', 
      name: 'In-Content Ads', 
      description: 'Responsive ads within content',
      settingKey: 'inContentAdSlot'
    },
    { 
      id: 'footerBanner', 
      name: 'Footer Banner', 
      description: '728x90 Leaderboard at bottom',
      settingKey: 'footerBannerSlot'
    }
  ];

  return (
    <div className="space-y-6">
      {/* AdSense Account Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">AdSense Configuration</h2>
            <p className="text-sm text-text-secondary mt-1">
              Manage your Google AdSense publisher settings and ad units
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-medium text-success">Connected</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Publisher ID
            </label>
            <Input
              type="text"
              value={adSettings?.publisherId}
              onChange={(e) => handleSettingChange('publisherId', e?.target?.value)}
              placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              className="w-full"
            />
            <p className="text-xs text-text-secondary mt-1">
              Your Google AdSense Publisher ID
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-text-primary">
              Auto Ads
            </label>
            <button
              onClick={() => handleSettingChange('autoAdsEnabled', !adSettings?.autoAdsEnabled)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                adSettings?.autoAdsEnabled ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  adSettings?.autoAdsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <p className="text-xs text-text-secondary">
              {adSettings?.autoAdsEnabled ? 'Enabled' : 'Disabled'}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveSettings} iconName="Save" iconPosition="left">
            Save Settings
          </Button>
        </div>
      </div>
      {/* Ad Unit Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-text-primary mb-4">Ad Unit Management</h3>
        <div className="space-y-4">
          {adUnits?.map((adUnit) => (
            <div key={adUnit?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Monitor" size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{adUnit?.name}</h4>
                    <p className="text-sm text-text-secondary">{adUnit?.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    testResults?.[adUnit?.id]?.status === 'active' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                  }`}>
                    {testResults?.[adUnit?.id]?.status}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleAdUnit(adUnit?.id)}
                  >
                    {testResults?.[adUnit?.id]?.status === 'active' ? 'Pause' : 'Activate'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Ad Slot ID
                  </label>
                  <Input
                    type="text"
                    value={adSettings?.[adUnit?.settingKey]}
                    onChange={(e) => handleSettingChange(adUnit?.settingKey, e?.target?.value)}
                    placeholder="XXXXXXXXXX"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">
                      {testResults?.[adUnit?.id]?.impressions?.toLocaleString() || '0'}
                    </p>
                    <p className="text-xs text-text-secondary">Impressions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">
                      {testResults?.[adUnit?.id]?.clicks?.toLocaleString() || '0'}
                    </p>
                    <p className="text-xs text-text-secondary">Clicks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">
                      {testResults?.[adUnit?.id]?.ctr?.toFixed(1) || '0.0'}%
                    </p>
                    <p className="text-xs text-text-secondary">CTR</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-text-primary">
                      ${testResults?.[adUnit?.id]?.rpm?.toFixed(1) || '0.0'}
                    </p>
                    <p className="text-xs text-text-secondary">RPM</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="RefreshCw" size={18} className="text-primary" />
            <h4 className="font-medium text-text-primary">Refresh Ads</h4>
          </div>
          <p className="text-sm text-text-secondary mb-3">
            Force refresh all ad units on the site
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Refresh Now
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="TestTube" size={18} className="text-accent" />
            <h4 className="font-medium text-text-primary">A/B Test</h4>
          </div>
          <p className="text-sm text-text-secondary mb-3">
            Create new ad placement test
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Start Test
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Download" size={18} className="text-success" />
            <h4 className="font-medium text-text-primary">Export Data</h4>
          </div>
          <p className="text-sm text-text-secondary mb-3">
            Download AdSense performance report
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdSenseManagement;