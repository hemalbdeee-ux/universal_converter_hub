import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import AudienceNavigation from './components/AudienceNavigation';
import FeaturedArticles from './components/FeaturedArticles';
import MeasurementTimeline from './components/MeasurementTimeline';
import IndustryGuides from './components/IndustryGuides';
import VisualLearningTools from './components/VisualLearningTools';
import ExpertContributions from './components/ExpertContributions';
import SearchAndGlossary from './components/SearchAndGlossary';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const KnowledgeCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAudience, setActiveAudience] = useState('students');

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // Navigate to search results with knowledge center context
      console.log('Searching for:', searchQuery);
      // In a real app, this would navigate to search results
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <HeroSection 
        onSearchSubmit={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {/* Audience Navigation */}
      <AudienceNavigation 
        activeAudience={activeAudience}
        setActiveAudience={setActiveAudience}
      />
      {/* Featured Articles */}
      <FeaturedArticles />
      {/* Measurement Timeline */}
      <MeasurementTimeline />
      {/* Industry Guides */}
      <IndustryGuides />
      {/* Visual Learning Tools */}
      <VisualLearningTools />
      {/* Expert Contributions */}
      <ExpertContributions />
      {/* Search and Glossary */}
      <SearchAndGlossary />
      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-success/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-brand-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center shadow-brand">
                <Icon name="GraduationCap" size={32} color="white" strokeWidth={2} />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Ready to Master Measurements?
            </h2>
            
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Join thousands of students, professionals, and curious minds who have improved their 
              measurement skills through our comprehensive educational resources.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="BookOpen"
                iconPosition="left"
                iconSize={20}
              >
                Start Learning Journey
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Calculator"
                iconPosition="left"
                iconSize={20}
              >
                Try Interactive Converters
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-text-secondary">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">200+</div>
                <div className="text-sm text-text-secondary">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">25+</div>
                <div className="text-sm text-text-secondary">Industries Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-text-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                  <Icon name="Calculator" size={24} color="white" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-semibold">Universal Converter Hub</h3>
              </div>
              <p className="text-white/80 leading-relaxed mb-4">
                Empowering accurate measurements through education, precision tools, and expert knowledge. 
                Your trusted source for conversion mastery.
              </p>
              <div className="flex items-center space-x-2 text-sm text-white/60">
                <Icon name="Shield" size={16} />
                <span>Expert-verified content</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Learning Resources</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Student Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Professional Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Industry Standards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Visual Learning</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Expert Network</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Featured Experts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contribute Content</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Peer Review</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © {new Date()?.getFullYear()} Universal Converter Hub. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Icon name="Mail" size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KnowledgeCenterPage;