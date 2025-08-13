import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

import { 
  generateMetaTitle, 
  generateMetaDescription, 
  getSEOSettings, 
  updateSEOSettings,
  updateSitemapXML
} from '../../../utils/seo';

const SEOTools = () => {
  const [selectedTool, setSelectedTool] = useState('meta');
  const [loading, setLoading] = useState(false);
  const [redirectSettings, setRedirectSettings] = useState({
    redirectType: 'non-www-to-www',
    enableHttpsRedirect: true,
    enableCanonicalRedirect: true
  });

  const metaTags = [
    {
      id: 1,
      page: "Homepage",
      url: "/homepage-conversion-discovery-hub",
      title: "Universal Converter Hub - Precision Conversion Tools",
      description: "Convert units with scientific accuracy. Currency, temperature, length, weight and more. Trusted by professionals worldwide.",
      keywords: "unit converter, currency converter, temperature converter",
      status: "optimized",
      lastUpdated: "2025-01-05"
    },
    {
      id: 2,
      page: "Currency Converter",
      url: "/individual-converter-focused-conversion-experience/currency",
      title: "Currency Converter - Real-time Exchange Rates",
      description: "Convert currencies with live exchange rates. Support for 168+ currencies with historical data and trends.",
      keywords: "currency converter, exchange rates, forex",
      status: "needs-review",
      lastUpdated: "2025-01-03"
    }
  ];

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getSEOSettings();
        if (settings) {
          const redirectData = settings?.find(s => s?.key === 'redirect_settings')?.value;
          if (redirectData) {
            setRedirectSettings(prev => ({ ...prev, ...redirectData }));
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  const handleRedirectSettingsUpdate = async (newSettings) => {
    setLoading(true);
    try {
      await updateSEOSettings('redirect_settings', newSettings);
      setRedirectSettings(newSettings);
      
      if (window?.gtag) {
        window.gtag('event', 'admin_settings_change', {
          event_category: 'Admin',
          event_action: 'Redirect Settings Update',
          setting_type: 'www_redirect',
          new_value: newSettings?.redirectType
        });
      }
      
      alert('Redirect settings updated successfully! Changes will take effect on next page load.');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateSitemap = async () => {
    setLoading(true);
    try {
      await updateSitemapXML();
      
      if (window?.gtag) {
        window.gtag('event', 'admin_action', {
          event_category: 'SEO',
          event_action: 'Sitemap Generated',
          timestamp: new Date()?.toISOString()
        });
      }
      
      alert('Sitemap generated successfully!');
    } catch (error) {
      console.error('Error generating sitemap:', error);
      alert('Error generating sitemap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimized': case'excellent': case'good': case'active':
        return 'bg-success/10 text-success border-success/20';
      case 'needs-review': case'warning': case'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error': case'critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const tools = [
    { value: 'meta', label: 'Meta Tags', icon: 'Tag' },
    { value: 'redirects', label: 'Redirects', icon: 'ArrowRight' },
    { value: 'sitemap', label: 'Sitemap', icon: 'Map' },
    { value: 'performance', label: 'Analytics', icon: 'TrendingUp' }
  ];

  return (
    <div className="space-y-6">
      {/* SEO Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">SEO & Deployment Configuration</h2>
            <p className="text-sm text-text-secondary mt-1">
              Manage redirects, meta tags, sitemaps, and deployment settings
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            {tools?.map((tool) => (
              <Button
                key={tool?.value}
                variant={selectedTool === tool?.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTool(tool?.value)}
                iconName={tool?.icon}
                iconPosition="left"
              >
                {tool?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Redirect Configuration */}
      {selectedTool === 'redirects' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text-primary">Redirect & Domain Configuration</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-text-secondary">Production Active</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* WWW Redirect Settings */}
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Globe" size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">Domain Redirect Configuration</h4>
                  <p className="text-xs text-text-secondary">Configure www to non-www or non-www to www redirection</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-2 block">Redirect Type</label>
                  <Select
                    value={redirectSettings?.redirectType}
                    onValueChange={(value) => setRedirectSettings(prev => ({ ...prev, redirectType: value }))}
                  >
                    <option value="non-www-to-www">Non-WWW to WWW (example.com → www.example.com)</option>
                    <option value="www-to-non-www">WWW to Non-WWW (www.example.com → example.com)</option>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-2 block">Current Setting</label>
                  <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                    <Icon name="Check" size={14} className="text-success" />
                    <span className="text-sm text-text-primary">
                      {redirectSettings?.redirectType === 'non-www-to-www' ?'Redirecting to www.convertanything.com' :'Redirecting to convertanything.com'
                      }
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={redirectSettings?.enableHttpsRedirect}
                      onChange={(e) => setRedirectSettings(prev => ({ 
                        ...prev, 
                        enableHttpsRedirect: e?.target?.checked 
                      }))}
                      className="rounded"
                    />
                    <span className="text-sm text-text-primary">HTTPS Redirect</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={redirectSettings?.enableCanonicalRedirect}
                      onChange={(e) => setRedirectSettings(prev => ({ 
                        ...prev, 
                        enableCanonicalRedirect: e?.target?.checked 
                      }))}
                      className="rounded"
                    />
                    <span className="text-sm text-text-primary">Canonical URL Cleanup</span>
                  </label>
                </div>
                
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleRedirectSettingsUpdate(redirectSettings)}
                  disabled={loading}
                  iconName={loading ? "Loader2" : "Save"}
                  iconPosition="left"
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </div>

            {/* Current Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm font-medium text-text-secondary">HTTPS Status</span>
                </div>
                <p className="text-lg font-bold text-success">Enforced</p>
                <p className="text-xs text-text-secondary">All HTTP requests redirect to HTTPS</p>
              </div>
              
              <div className="bg-surface rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Link" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-text-secondary">Canonical URLs</span>
                </div>
                <p className="text-lg font-bold text-primary">Active</p>
                <p className="text-xs text-text-secondary">Trailing slashes & case normalization</p>
              </div>
              
              <div className="bg-surface rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Activity" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-text-secondary">Redirect Tracking</span>
                </div>
                <p className="text-lg font-bold text-warning">Monitored</p>
                <p className="text-xs text-text-secondary">All redirects tracked in GA4</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Meta Tags Management */}
      {selectedTool === 'meta' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text-primary">Meta Tags Management</h3>
            <Button variant="default" iconName="Plus" iconPosition="left" size="sm">
              Add Meta Tags
            </Button>
          </div>
          
          {/* Meta Generator Tool */}
          <div className="bg-surface rounded-lg p-4 mb-6">
            <h4 className="font-medium text-text-primary mb-3">Dynamic Meta Generator</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                placeholder="Page/Converter name"
                onChange={(e) => {
                  const title = generateMetaTitle('ConvertAnything.com', '', e?.target?.value);
                  console.log('Generated title:', title);
                }}
              />
              <Input
                placeholder="Category"
                onChange={(e) => {
                  const desc = generateMetaDescription(e?.target?.value);
                  console.log('Generated description:', desc);
                }}
              />
              <Button variant="outline" iconName="Wand2" iconPosition="left">
                Generate
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {metaTags?.map((meta) => (
              <div key={meta.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-text-primary">{meta.page}</h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(meta.status)}`}>
                        {meta.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mb-2">{meta.url}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" iconName="Edit" iconSize={14} />
                    <Button variant="ghost" size="icon" iconName="Eye" iconSize={14} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium text-text-secondary">Title ({meta.title?.length}/60)</label>
                    <p className="text-sm text-text-primary">{meta.title}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary">Description ({meta.description?.length}/160)</label>
                    <p className="text-sm text-text-secondary">{meta.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Sitemap Management */}
      {selectedTool === 'sitemap' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-text-primary">Sitemap Management</h3>
            <Button 
              variant="default" 
              iconName={loading ? "Loader2" : "RefreshCw"}
              iconPosition="left" 
              size="sm"
              onClick={generateSitemap}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Sitemap'}
            </Button>
          </div>
          
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="FileText" size={16} className="text-primary" />
              <div>
                <h4 className="font-medium text-text-primary">Automatic Sitemap Generation</h4>
                <p className="text-xs text-text-secondary">Sitemap is generated from database content and static pages</p>
              </div>
            </div>
            
            <div className="text-sm text-text-secondary space-y-2">
              <p>✅ Static pages (Homepage, Knowledge Center, etc.)</p>
              <p>✅ Dynamic converter pages from database</p>
              <p>✅ Category pages from database</p>
              <p>✅ Automatic lastmod dates</p>
              <p>✅ SEO-optimized priority and changefreq</p>
            </div>
          </div>
        </div>
      )}
      {/* Analytics Integration */}
      {selectedTool === 'performance' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">Analytics & Performance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">Google Analytics Integration</h4>
              <div className="bg-surface rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Activity" size={16} className="text-success" />
                  <span className="text-sm font-medium">GA4 Status: Active</span>
                </div>
                <div className="text-xs text-text-secondary space-y-1">
                  <p>✅ Page view tracking</p>
                  <p>✅ Conversion event tracking</p>
                  <p>✅ Search event tracking</p>
                  <p>✅ Error tracking</p>
                  <p>✅ Custom dimensions</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">AdSense Integration</h4>
              <div className="bg-surface rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="DollarSign" size={16} className="text-success" />
                  <span className="text-sm font-medium">AdSense Status: Ready</span>
                </div>
                <div className="text-xs text-text-secondary space-y-1">
                  <p>✅ Auto ads configured</p>
                  <p>✅ Manual ad placements</p>
                  <p>✅ Ad performance tracking</p>
                  <p>✅ Compliance monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOTools;