import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HeroSearchSection from './components/HeroSearchSection';
import TrendingConversionsSection from './components/TrendingConversionsSection';
import FeaturedCategoriesSection from './components/FeaturedCategoriesSection';
import EducationalTooltipsSection from './components/EducationalTooltipsSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SEOHead from "../../components/SEOHead";
import { createWebsiteSchema, createSoftwareApplicationSchema } from "../../components/StructuredData";

const HomepageConversionDiscoveryHub = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Handle scroll events
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (query) => {
    if (query?.trim()) {
      navigate(`/search-results-hub-ai-powered-conversion-discovery?q=${encodeURIComponent(query)}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const siteUrl = import.meta.env?.VITE_SITE_URL || 'https://yourdomain.com';
  
  const websiteSchema = createWebsiteSchema(
    siteUrl,
    'Universal Converter Hub',
    'Professional-grade unit conversion tools with educational resources, real-time calculations, and comprehensive measurement solutions for all industries.'
  );

  const softwareSchema = createSoftwareApplicationSchema(
    'Universal Converter Hub',
    'Professional unit conversion tools and measurement calculators for all industries with real-time calculations and educational resources.',
    siteUrl
  );

  const combinedSchema = [websiteSchema, softwareSchema];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Icon name="Calculator" size={32} color="white" strokeWidth={2.5} />
          </div>
          <div className="text-lg font-medium text-text-primary mb-2">Universal Converter Hub</div>
          <div className="text-sm text-text-secondary">Loading precision converters...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title="Universal Converter Hub - Professional Unit Conversion Tools"
        description="Professional-grade unit conversion tools with educational resources, real-time calculations, and comprehensive measurement solutions for all industries."
        keywords="unit converter, measurement tools, conversion calculator, metric conversion, imperial conversion, professional tools, length converter, weight converter, temperature converter"
        canonicalUrl={`${siteUrl}/`}
        publishedTime={new Date().toISOString()}
        modifiedTime={new Date().toISOString()}
        section="Tools"
        structuredData={combinedSchema}
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Search Section */}
          <HeroSearchSection onSearch={handleSearch} />
          
          {/* Trending Conversions Section */}
          <TrendingConversionsSection />
          
          {/* Featured Categories Section */}
          <FeaturedCategoriesSection />
          
          {/* Stats Section */}
          <section className="py-16 bg-gradient-to-r from-primary/5 via-success/5 to-accent/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Daily Conversions', value: '2.3M+', icon: 'TrendingUp' },
                  { label: 'Conversion Types', value: '500+', icon: 'Grid3X3' },
                  { label: 'Countries Supported', value: '200+', icon: 'Globe' },
                  { label: 'Accuracy Rate', value: '99.9%', icon: 'Target' }
                ]?.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-brand">
                      <Icon name={stat?.icon} size={24} className="text-primary" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-text-primary mb-1">
                      {stat?.value}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {stat?.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust & Security Section */}
          <section className="py-16 bg-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-text-primary mb-4">
                  Trusted by Professionals Worldwide
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Our precision-engineered conversion algorithms are used by engineers, scientists, 
                  chefs, and millions of users who demand accuracy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Scientific Precision',
                    description: 'Validated against international standards with up to 15 decimal places of accuracy',
                    icon: 'Microscope',
                    features: ['NIST Standards', 'ISO Compliance', 'Regular Updates']
                  },
                  {
                    title: 'Cultural Context',
                    description: 'Understands regional preferences and cultural measurement systems',
                    icon: 'Users',
                    features: ['Local Units', 'Regional Formats', 'Cultural Awareness']
                  },
                  {
                    title: 'Real-Time Data',
                    description: 'Live currency rates, weather integration, and market data',
                    icon: 'RefreshCw',
                    features: ['Live Rates', 'Weather Data', 'Market Updates']
                  }
                ]?.map((feature, index) => (
                  <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-brand">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon name={feature?.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      {feature?.title}
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {feature?.description}
                    </p>
                    <div className="space-y-2">
                      {feature?.features?.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Icon name="Check" size={14} className="text-success" />
                          <span className="text-sm text-text-secondary">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-primary to-success text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Convert with Confidence?
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                Join millions of users who trust Universal Converter Hub for accurate, 
                instant conversions with cultural context and global understanding.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/user-dashboard-personalized-conversion-management')}
                  iconName="User"
                  iconPosition="left"
                  iconSize={20}
                  className="shadow-brand-lg"
                >
                  Create Free Account
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/category-landing-comprehensive-converter-collections')}
                  iconName="Grid3X3"
                  iconPosition="left"
                  iconSize={20}
                  className="border-white/20 text-white hover:bg-white/10 shadow-brand-lg"
                >
                  Explore Categories
                </Button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-text-primary text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                    <Icon name="Calculator" size={24} color="white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-semibold">Universal Converter Hub</h3>
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                  The most comprehensive unit conversion platform with precision, 
                  cultural context, and global understanding.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">99.9% Accuracy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Globe" size={14} />
                    <span className="text-sm text-gray-300">200+ Countries</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Categories', path: '/category-landing-comprehensive-converter-collections' },
                    { label: 'Search', path: '/search-results-hub-ai-powered-conversion-discovery' },
                    { label: 'Dashboard', path: '/user-dashboard-personalized-conversion-management' },
                    { label: 'Knowledge Center', path: '/knowledge-center-educational-resources-hub' }
                  ]?.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(link?.path)}
                      className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link?.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company & Legal</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Contact Us', path: '/contact-us-support-business-inquiries' },
                    { label: 'Privacy Policy', path: '/privacy-policy-legal-compliance-center' },
                    { label: 'Currency Converter', path: '/individual-converter-focused-conversion-experience' },
                    { label: 'About Us', path: '/about-us-company-information-mission' }
                  ]?.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(link?.path)}
                      className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link?.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-300 text-sm">
                © {new Date()?.getFullYear()} Universal Converter Hub. All rights reserved. 
                Built with precision and global understanding.
              </p>
            </div>
          </div>
        </footer>

        {/* Floating Components */}
        <EducationalTooltipsSection />

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            variant="default"
            size="icon"
            onClick={scrollToTop}
            iconName="ArrowUp"
            iconSize={20}
            className="fixed bottom-8 right-8 z-30 shadow-brand-lg"
          />
        )}
      </div>
    </>
  );
};

export default HomepageConversionDiscoveryHub;