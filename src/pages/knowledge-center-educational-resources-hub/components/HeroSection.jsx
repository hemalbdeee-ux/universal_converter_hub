import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ onSearchSubmit, searchQuery, setSearchQuery }) => {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-success/5 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center shadow-brand-lg">
              <Icon name="BookOpen" size={32} color="white" strokeWidth={2} />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Knowledge Center
          </h1>
          
          <p className="text-xl lg:text-2xl text-text-secondary mb-8 leading-relaxed">
            Master the art and science of measurement conversion with comprehensive guides, 
            interactive tools, and expert insights from industry professionals.
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={onSearchSubmit} className="relative">
              <Icon 
                name="Search" 
                size={24} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                placeholder="Search guides, tutorials, or measurement topics..."
                className="w-full pl-12 pr-16 py-4 bg-background border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-brand text-lg"
              />
              <Button
                type="submit"
                variant="default"
                size="default"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                iconName="ArrowRight"
                iconSize={20}
              >
                Search
              </Button>
            </form>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-success" />
              <span>50,000+ Students Helped</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-primary" />
              <span>Expert-Verified Content</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-accent" />
              <span>25+ Languages Supported</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;