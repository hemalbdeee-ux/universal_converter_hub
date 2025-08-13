import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactHero from './components/ContactHero';
import InquiryForm from './components/InquiryForm';
import SupportCategories from './components/SupportCategories';
import LiveChatWidget from './components/LiveChatWidget';
import ContactDetailsSection from './components/ContactDetailsSection';
import ResponseTimeCommitments from './components/ResponseTimeCommitments';
import FAQSection from './components/FAQSection';
import SecurityFeatures from './components/SecurityFeatures';
import AdSense from '../../components/AdSense';

const ContactUsSupportBusinessInquiries = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isBusinessHours = () => {
    const hour = currentTime?.getHours();
    const day = currentTime?.getDay();
    return day >= 1 && day <= 5 && hour >= 9 && hour <= 17; // Monday-Friday 9AM-5PM PST
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Contact Us - Support & Business Inquiries | Universal Converter Hub</title>
        <meta name="description" content="Comprehensive contact hub with multiple communication channels, structured inquiry management, and dedicated support for Universal Converter Hub users and business partners." />
        <meta name="keywords" content="contact us, support, business inquiries, technical support, customer service, partnerships, media inquiries, educational licensing" />
        <link rel="canonical" href="/contact-us-support-business-inquiries" />
      </Helmet>

      <Header />
      
      <div className="pt-16">
        <ContactHero 
          isBusinessHours={isBusinessHours()} 
          currentTime={currentTime} 
        />
        
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <SupportCategories 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
              
              <InquiryForm 
                activeCategory={activeCategory}
              />
              
              <LiveChatWidget 
                isBusinessHours={isBusinessHours()}
              />
              
              <FAQSection />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <ContactDetailsSection />
              <ResponseTimeCommitments />
              <SecurityFeatures />
              
              {/* AdSense Sidebar */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sponsored</h3>
                <AdSense
                  adClient={import.meta.env?.VITE_ADSENSE_CLIENT}
                  adSlot="9876543210"
                  adFormat="auto"
                  adStyle={{ display: 'block', width: '100%', height: '250px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSupportBusinessInquiries;