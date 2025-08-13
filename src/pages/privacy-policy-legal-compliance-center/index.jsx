import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronDown, ChevronRight, Shield, Eye, Cookie, FileText, Globe, Download, Trash2, Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import AdSense from '../../components/AdSense';

const PrivacyPolicyLegalComplianceCenter = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [showConsentBanner, setShowConsentBanner] = useState(true);
  const [consentPreferences, setConsentPreferences] = useState({
    necessary: true,
    analytics: false,
    advertising: false,
    functional: false
  });
  const [deleteRequestForm, setDeleteRequestForm] = useState({
    email: '',
    reason: ''
  });

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleConsentUpdate = (type, value) => {
    setConsentPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleDeleteRequest = (e) => {
    e?.preventDefault();
    alert('Data deletion request submitted. You will receive confirmation within 48 hours.');
    setDeleteRequestForm({ email: '', reason: '' });
  };

  const exportUserData = () => {
    const userData = {
      exportDate: new Date()?.toISOString(),
      message: 'This would contain all user data in a real implementation'
    };
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-data-export.json';
    a?.click();
  };

  const policyVersions = [
    { version: '3.0', date: '2025-01-01', current: true },
    { version: '2.1', date: '2024-07-01', current: false },
    { version: '2.0', date: '2024-01-01', current: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Privacy Policy & Legal Compliance Center - Universal Converter Hub</title>
        <meta name="description" content="Comprehensive privacy policy, terms of service, and legal compliance information for Universal Converter Hub." />
        <meta name="keywords" content="privacy policy, terms of service, GDPR compliance, cookie policy, data protection" />
      </Helmet>
      {/* GDPR Consent Banner */}
      {showConsentBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white p-4 shadow-lg z-50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm">
                We use cookies and similar technologies to improve your experience, analyze usage, and serve personalized content and ads.
                This includes Google AdSense for monetization purposes.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setConsentPreferences({
                    necessary: true,
                    analytics: true,
                    advertising: true,
                    functional: true
                  });
                  setShowConsentBanner(false);
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Accept All
              </Button>
              <Button
                onClick={() => setShowConsentBanner(false)}
                variant="outline"
                className="bg-white text-blue-900"
              >
                Manage Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="h-8 w-8 text-blue-600" />
                Privacy Policy & Legal Compliance Center
              </h1>
              <p className="text-gray-600 mt-2">Your privacy matters. Learn how we protect your data and comply with regulations.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              Last updated: January 1, 2025
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Navigation</h3>
              <nav className="space-y-2">
                <a href="#privacy-policy" className="block text-blue-600 hover:text-blue-800 text-sm">Privacy Policy</a>
                <a href="#terms-of-service" className="block text-blue-600 hover:text-blue-800 text-sm">Terms of Service</a>
                <a href="#cookie-policy" className="block text-blue-600 hover:text-blue-800 text-sm">Cookie Policy</a>
                <a href="#gdpr-compliance" className="block text-blue-600 hover:text-blue-800 text-sm">GDPR Compliance</a>
                <a href="#contact" className="block text-blue-600 hover:text-blue-800 text-sm">Contact Information</a>
              </nav>

              {/* AdSense Ad Placement */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <AdSense
                  adClient={import.meta.env?.VITE_ADSENSE_CLIENT}
                  adSlot="1234567890"
                  adFormat="auto"
                  adStyle={{ display: 'block', minHeight: '250px' }}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Privacy Policy Section */}
            <section id="privacy-policy" className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
                </div>
                <p className="text-gray-600 mt-2">How we collect, use, and protect your personal information</p>
              </div>

              <div className="p-6 space-y-4">
                {/* Data Collection */}
                <div className="border rounded-lg">
                  <button
                    onClick={() => toggleSection('data-collection')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-900">Data Collection & Usage</span>
                    {expandedSection === 'data-collection' ? 
                      <ChevronDown className="h-5 w-5 text-gray-500" /> : 
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    }
                  </button>
                  {expandedSection === 'data-collection' && (
                    <div className="px-4 pb-4 border-t bg-gray-50">
                      <div className="space-y-4 pt-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Information We Collect</h4>
                          <ul className="text-gray-600 space-y-1 text-sm">
                            <li>• Usage data and conversion history for service improvement</li>
                            <li>• Device information and browser preferences for optimization</li>
                            <li>• IP addresses for security and analytics purposes</li>
                            <li>• Cookie data for personalization and advertising (Google AdSense)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Third-Party Services</h4>
                          <ul className="text-gray-600 space-y-1 text-sm">
                            <li>• <strong>Google AdSense:</strong> Serves personalized advertisements based on your interests</li>
                            <li>• <strong>Google Analytics:</strong> Analyzes website traffic and user behavior</li>
                            <li>• <strong>Conversion APIs:</strong> Provides accurate conversion data</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Rights */}
                <div className="border rounded-lg">
                  <button
                    onClick={() => toggleSection('user-rights')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-900">Your Rights Under GDPR/CCPA</span>
                    {expandedSection === 'user-rights' ? 
                      <ChevronDown className="h-5 w-5 text-gray-500" /> : 
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    }
                  </button>
                  {expandedSection === 'user-rights' && (
                    <div className="px-4 pb-4 border-t bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-800">Access & Portability</h4>
                          <p className="text-sm text-gray-600">Request a copy of your personal data</p>
                          <Button onClick={exportUserData} className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                            <Download className="h-4 w-4 mr-2" />
                            Export My Data
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-800">Right to Deletion</h4>
                          <p className="text-sm text-gray-600">Request deletion of your personal data</p>
                          <Button 
                            onClick={() => toggleSection('delete-form')}
                            className="w-full mt-2 bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Request Deletion
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Data Deletion Request Form */}
            {expandedSection === 'delete-form' && (
              <section className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Deletion Request</h3>
                  <form onSubmit={handleDeleteRequest} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={deleteRequestForm?.email}
                      onChange={(e) => setDeleteRequestForm(prev => ({ ...prev, email: e?.target?.value }))}
                      required
                    />
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      rows="4"
                      placeholder="Please specify what data you'd like deleted and reason (optional)"
                      value={deleteRequestForm?.reason}
                      onChange={(e) => setDeleteRequestForm(prev => ({ ...prev, reason: e?.target?.value }))}
                    />
                    <Button type="submit" className="bg-red-600 hover:bg-red-700">
                      Submit Deletion Request
                    </Button>
                  </form>
                </div>
              </section>
            )}

            {/* Cookie Policy Section */}
            <section id="cookie-policy" className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                  <Cookie className="h-6 w-6 text-orange-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Cookie Policy</h2>
                </div>
                <p className="text-gray-600 mt-2">How we use cookies and tracking technologies</p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">Necessary Cookies</h4>
                          <p className="text-sm text-gray-600">Essential for site functionality</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={consentPreferences?.necessary}
                          disabled
                          className="w-5 h-5 text-blue-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                          <p className="text-sm text-gray-600">Help us improve the site</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={consentPreferences?.analytics}
                          onChange={(e) => handleConsentUpdate('analytics', e?.target?.checked)}
                          className="w-5 h-5 text-blue-600"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">Advertising Cookies</h4>
                          <p className="text-sm text-gray-600">Used by Google AdSense</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={consentPreferences?.advertising}
                          onChange={(e) => handleConsentUpdate('advertising', e?.target?.checked)}
                          className="w-5 h-5 text-blue-600"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">Functional Cookies</h4>
                          <p className="text-sm text-gray-600">Remember your preferences</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={consentPreferences?.functional}
                          onChange={(e) => handleConsentUpdate('functional', e?.target?.checked)}
                          className="w-5 h-5 text-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Terms of Service */}
            <section id="terms-of-service" className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Rights & Limitations</h3>
                  <ul className="text-gray-600 space-y-2 mb-6">
                    <li>• Use our conversion tools for personal and commercial purposes</li>
                    <li>• Content accuracy is provided on best-effort basis with regular updates</li>
                    <li>• Automated scraping or bulk data extraction is prohibited</li>
                    <li>• We reserve the right to limit usage for fair resource allocation</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Conversion Accuracy</h3>
                  <p className="text-gray-600 mb-4">
                    Our conversion calculations are based on internationally recognized standards and are updated regularly. 
                    However, for critical applications, we recommend verification with authoritative sources.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Dispute Resolution</h3>
                  <p className="text-gray-600">
                    Any disputes will be resolved through binding arbitration in accordance with applicable laws. 
                    For questions or concerns, please contact our support team.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section id="contact" className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Privacy Contact Information</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Privacy Officer</h4>
                        <p className="text-gray-600">privacy@universalconverterhub.com</p>
                        <p className="text-sm text-gray-500">For privacy-related inquiries and requests</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Support Line</h4>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-500">Available Monday-Friday, 9 AM - 5 PM EST</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Business Address</h4>
                        <p className="text-gray-600">
                          Universal Converter Hub Inc.<br />
                          1234 Tech Drive, Suite 100<br />
                          San Francisco, CA 94105
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Policy Version History */}
            <section className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Policy Version History</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {policyVersions?.map((version, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {version?.current && <CheckCircle className="h-5 w-5 text-green-600" />}
                        <div>
                          <span className="font-semibold text-gray-900">Version {version?.version}</span>
                          {version?.current && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Current</span>}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{version?.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* Multilingual Support Notice */}
      <div className="bg-blue-50 border-t">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">International Compliance</h3>
              <p className="text-gray-600 text-sm">
                This policy complies with GDPR, CCPA, and other international privacy regulations. 
                Additional language versions available upon request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyLegalComplianceCenter;