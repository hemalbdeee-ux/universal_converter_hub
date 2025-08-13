import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MissionVision from './components/MissionVision';
import CompanyStats from './components/CompanyStats';
import TeamSection from './components/TeamSection';
import CompanyTimeline from './components/CompanyTimeline';
import TechnologySection from './components/TechnologySection';
import PartnershipsSection from './components/PartnershipsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactInfo from './components/ContactInfo';
import AdSense from '../../components/AdSense';

const AboutUsCompanyInformationMission = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>About Universal Converter Hub - Company Information & Mission</title>
        <meta name="description" content="Learn about Universal Converter Hub's mission, expert team, and commitment to providing accurate, educational conversion tools trusted by millions worldwide." />
        <meta name="keywords" content="about us, company mission, conversion experts, measurement science, educational tools, team credentials, Universal Converter Hub" />
        <link rel="canonical" href="/about-us-company-information-mission" />
      </Helmet>

      <Header />
      
      <div className="pt-16">
        <HeroSection />
        
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
            <div className="lg:col-span-2 space-y-12">
              <MissionVision />
              <CompanyStats />
              <TeamSection />
              <CompanyTimeline />
              <TechnologySection />
              <PartnershipsSection />
              <TestimonialsSection />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCompanyInformationMission;