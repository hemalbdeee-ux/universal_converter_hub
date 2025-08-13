import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CategoryHero from './components/CategoryHero';
import MainConverter from './components/MainConverter';
import VisualScaleReference from './components/VisualScaleReference';
import AdvancedFeatures from './components/AdvancedFeatures';
import RelatedConverters from './components/RelatedConverters';
import KnowledgeHub from './components/KnowledgeHub';
import Icon from '../../components/AppIcon';

const CategoryLandingPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('length');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoryParam = searchParams?.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    // Simulate loading for smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Update URL without page reload
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams?.set('category', category);
    window.history?.replaceState({}, '', `${window.location?.pathname}?${newSearchParams}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-text-secondary">Loading conversion tools...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <CategoryHero 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange}
        />

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Converter - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <MainConverter selectedCategory={selectedCategory} />
              
              {/* Visual Scale Reference */}
              <VisualScaleReference selectedCategory={selectedCategory} />
              
              {/* Advanced Features */}
              <AdvancedFeatures selectedCategory={selectedCategory} />
              
              {/* Knowledge Hub */}
              <KnowledgeHub selectedCategory={selectedCategory} />
            </div>

            {/* Sidebar - Takes 1 column */}
            <div className="space-y-8">
              <RelatedConverters selectedCategory={selectedCategory} />
              
              {/* Social Proof */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-brand">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-success to-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Icon name="Award" size={32} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">Accuracy Guarantee</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Our conversions are scientifically verified and trusted by professionals worldwide. 
                      99.9% accuracy rate with real-time updates.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="CheckCircle" size={16} />
                      <span>Verified</span>
                    </div>
                    <div className="flex items-center space-x-1 text-primary">
                      <Icon name="Shield" size={16} />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center space-x-1 text-accent">
                      <Icon name="Zap" size={16} />
                      <span>Fast</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Statistics */}
              <div className="bg-gradient-to-br from-primary/5 to-success/5 border border-primary/20 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="BarChart3" size={18} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-text-primary">Live Statistics</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Conversions Today</span>
                      <span className="font-mono font-semibold text-primary">2,347,892</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Active Users</span>
                      <span className="font-mono font-semibold text-success">45,231</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Countries Served</span>
                      <span className="font-mono font-semibold text-accent">195</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-primary/20">
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span>Updated in real-time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-primary to-success py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                <Icon name="Calculator" size={40} color="white" />
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Need More Conversion Power?
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  Unlock advanced features, batch processing, and custom formulas with our Pro account. 
                  Join thousands of professionals who trust our precision.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Icon name="Crown" size={20} />
                  <span>Upgrade to Pro</span>
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Icon name="Play" size={20} />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center">
                <Icon name="Calculator" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">Universal Converter Hub</span>
            </div>
            <p className="text-text-secondary">
              © {new Date()?.getFullYear()} Universal Converter Hub. All rights reserved. 
              Trusted by professionals worldwide for accurate conversions.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact Support</span>
              <span>API Documentation</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryLandingPage;