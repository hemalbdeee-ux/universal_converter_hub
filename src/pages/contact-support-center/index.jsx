import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactForm from './components/ContactForm';
import BusinessContactInfo from './components/BusinessContactInfo';
import SupportResources from './components/SupportResources';
import LiveChatSection from './components/LiveChatSection';
import PrivacyContactOptions from './components/PrivacyContactOptions';
import ResponseTimeInfo from './components/ResponseTimeInfo';
import AdSense from '../../components/AdSense';

const ContactSupportCenter = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'contact', label: 'Contact Form', icon: 'Mail' },
    { id: 'business', label: 'Business Info', icon: 'Building2' },
    { id: 'support', label: 'Support', icon: 'HelpCircle' },
    { id: 'chat', label: 'Live Chat', icon: 'MessageCircle' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' }
  ];

  const isBusinessHours = () => {
    const hour = currentTime.getHours();
    const day = currentTime.getDay();
    return day >= 1 && day <= 5 && hour >= 9 && hour <= 17; // Monday-Friday 9AM-5PM
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact & Support Center - Universal Converter Hub</title>
        <meta
          name="description"
          content="Comprehensive contact hub with multiple communication channels, support resources, and compliance features for Universal Converter Hub users."
        />
        <meta name="keywords" content="contact, support, help, customer service, technical assistance, business inquiries" />
        <link rel="canonical" href="/contact-support-center" />
      </Helmet>
      <Header />
      <div className="pt-20 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-success/5 to-info/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Contact & Support Center
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Get in touch with our team through multiple channels. We're here to help with conversions, 
              technical support, business inquiries, and privacy matters.
            </p>
            
            {/* Status Indicator */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border">
              <div className={`w-2 h-2 rounded-full ${isBusinessHours() ? 'bg-success animate-pulse' : 'bg-warning'}`}></div>
              <span className="text-sm font-medium">
                {isBusinessHours() ? 'Live Support Available' : 'Outside Business Hours'}
              </span>
              <span className="text-xs text-text-secondary">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* AdSense Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center">
            <AdSense
              adClient={import.meta.env?.VITE_ADSENSE_CLIENT}
              adSlot="1234567890"
              adFormat="auto"
              adStyle={{ display: 'block', width: '100%', maxWidth: '728px', height: '90px' }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 bg-surface rounded-lg p-1 shadow-brand">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground shadow-brand'
                    : 'text-text-secondary hover:text-text-primary hover:bg-background'
                  }
                `}
              >
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === 'contact' && <ContactForm />}
              {activeTab === 'business' && <BusinessContactInfo />}
              {activeTab === 'support' && <SupportResources />}
              {activeTab === 'chat' && <LiveChatSection isBusinessHours={isBusinessHours()} />}
              {activeTab === 'privacy' && <PrivacyContactOptions />}
            </div>

            <div className="space-y-6">
              <ResponseTimeInfo />
              
              {/* AdSense Sidebar */}
              <div className="bg-surface rounded-lg p-6 shadow-brand">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Sponsored</h3>
                <AdSense
                  adClient={import.meta.env?.VITE_ADSENSE_CLIENT}
                  adSlot="9876543210"
                  adFormat="auto"
                  adStyle={{ display: 'block', width: '100%', height: '250px' }}
                />
              </div>

              {/* Trust Badges */}
              <div className="bg-surface rounded-lg p-6 shadow-brand">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Security & Trust</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <span className="text-success text-sm">🔒</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">SSL Encrypted</p>
                      <p className="text-xs text-text-secondary">Your data is secure</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center">
                      <span className="text-info text-sm">🛡️</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">GDPR Compliant</p>
                      <p className="text-xs text-text-secondary">Privacy protected</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm">⚡</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">24h Response</p>
                      <p className="text-xs text-text-secondary">Quick support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom AdSense Banner */}
          <div className="mt-16 flex justify-center">
            <AdSense
              adClient={import.meta.env?.VITE_ADSENSE_CLIENT}
              adSlot="5555555555"
              adFormat="auto"
              adStyle={{ display: 'block', width: '100%', maxWidth: '970px', height: '90px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupportCenter;