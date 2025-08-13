import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KnowledgeHub = ({ selectedCategory }) => {
  const [activeTab, setActiveTab] = useState('guides');

  const knowledgeData = {
    length: {
      guides: [
        {
          title: 'Understanding the Metric System',
          description: 'Learn how the metric system revolutionized global measurements',
          readTime: '5 min read',
          difficulty: 'Beginner',
          icon: 'BookOpen'
        },
        {
          title: 'Imperial vs Metric: A Historical Perspective',
          description: 'Explore the fascinating history behind different measurement systems',
          readTime: '8 min read',
          difficulty: 'Intermediate',
          icon: 'Globe'
        },
        {
          title: 'Precision in Engineering Measurements',
          description: 'How engineers achieve millimeter precision in construction',
          readTime: '12 min read',
          difficulty: 'Advanced',
          icon: 'Wrench'
        }
      ],
      applications: [
        { industry: 'Construction', usage: 'Building measurements, material calculations', icon: 'Building' },
        { industry: 'Fashion', usage: 'Garment sizing, fabric measurements', icon: 'Shirt' },
        { industry: 'Sports', usage: 'Track distances, field dimensions', icon: 'Trophy' },
        { industry: 'Science', usage: 'Laboratory measurements, research data', icon: 'Microscope' }
      ],
      visualAids: [
        { type: 'Interactive Ruler', description: 'Compare different length units visually' },
        { type: 'Scale Comparison', description: 'See relative sizes of common objects' },
        { type: 'Historical Timeline', description: 'Evolution of length measurements' }
      ]
    },
    temperature: {
      guides: [
        {
          title: 'The Celsius vs Fahrenheit Story',
          description: 'Why different temperature scales exist and when to use each',
          readTime: '6 min read',
          difficulty: 'Beginner',
          icon: 'Thermometer'
        },
        {
          title: 'Absolute Zero and the Kelvin Scale',
          description: 'Understanding scientific temperature measurements',
          readTime: '10 min read',
          difficulty: 'Intermediate',
          icon: 'Snowflake'
        },
        {
          title: 'Temperature in Cooking: Precision Matters',
          description: 'How temperature accuracy affects culinary results',
          readTime: '7 min read',
          difficulty: 'Beginner',
          icon: 'ChefHat'
        }
      ],
      applications: [
        { industry: 'Cooking', usage: 'Recipe temperatures, food safety', icon: 'ChefHat' },
        { industry: 'Weather', usage: 'Forecasting, climate data', icon: 'Cloud' },
        { industry: 'Medicine', usage: 'Body temperature, storage conditions', icon: 'Heart' },
        { industry: 'Industry', usage: 'Manufacturing processes, quality control', icon: 'Factory' }
      ],
      visualAids: [
        { type: 'Temperature Scale Comparison', description: 'Visual comparison of all temperature scales' },
        { type: 'Weather Integration', description: 'Real-time temperature data from around the world' },
        { type: 'Cooking Temperature Guide', description: 'Essential temperatures for cooking' }
      ]
    },
    currency: {
      guides: [
        {
          title: 'Understanding Exchange Rates',
          description: 'How currency values fluctuate and what affects them',
          readTime: '9 min read',
          difficulty: 'Intermediate',
          icon: 'TrendingUp'
        },
        {
          title: 'Digital Currencies and Conversion',
          description: 'The rise of cryptocurrencies and their exchange mechanisms',
          readTime: '11 min read',
          difficulty: 'Advanced',
          icon: 'Bitcoin'
        },
        {
          title: 'Travel Money: Getting the Best Rates',
          description: 'Tips for currency exchange when traveling internationally',
          readTime: '6 min read',
          difficulty: 'Beginner',
          icon: 'Plane'
        }
      ],
      applications: [
        { industry: 'Travel', usage: 'Currency exchange, budget planning', icon: 'Plane' },
        { industry: 'E-commerce', usage: 'International pricing, payment processing', icon: 'ShoppingCart' },
        { industry: 'Investment', usage: 'Forex trading, portfolio management', icon: 'TrendingUp' },
        { industry: 'Business', usage: 'International transactions, accounting', icon: 'Briefcase' }
      ],
      visualAids: [
        { type: 'Live Exchange Rates', description: 'Real-time currency conversion rates' },
        { type: 'Historical Charts', description: 'Currency performance over time' },
        { type: 'Market Indicators', description: 'Economic factors affecting exchange rates' }
      ]
    }
  };

  const currentData = knowledgeData?.[selectedCategory] || knowledgeData?.length;

  const tabs = [
    { id: 'guides', name: 'Guides', icon: 'BookOpen' },
    { id: 'applications', name: 'Applications', icon: 'Briefcase' },
    { id: 'visual', name: 'Visual Aids', icon: 'Eye' }
  ];

  const renderGuides = () => (
    <div className="space-y-4">
      {currentData?.guides?.map((guide, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-6 hover:shadow-brand transition-all duration-200 group">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
              <Icon name={guide?.icon} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-200">
                {guide?.title}
              </h4>
              <p className="text-text-secondary mb-4 leading-relaxed">
                {guide?.description}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-text-secondary">
                  <Icon name="Clock" size={14} />
                  <span>{guide?.readTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    guide?.difficulty === 'Beginner' ? 'bg-success' :
                    guide?.difficulty === 'Intermediate' ? 'bg-accent' : 'bg-destructive'
                  }`}></div>
                  <span className="text-text-secondary">{guide?.difficulty}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="ArrowRight"
              iconSize={16}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </div>
        </div>
      ))}
      
      <div className="text-center pt-4">
        <Link to="/knowledge-center-educational-resources-hub">
          <Button
            variant="outline"
            iconName="BookOpen"
            iconPosition="left"
            iconSize={16}
          >
            Explore All Guides
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-4">
      {currentData?.applications?.map((app, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Icon name={app?.icon} size={20} className="text-success" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-text-primary">{app?.industry}</h4>
              <p className="text-sm text-text-secondary">{app?.usage}</p>
            </div>
            <Icon name="ExternalLink" size={16} className="text-text-secondary" />
          </div>
        </div>
      ))}
      
      <div className="bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20 rounded-lg p-6">
        <div className="text-center space-y-3">
          <Icon name="Users" size={32} className="text-accent mx-auto" />
          <h4 className="font-semibold text-text-primary">Industry Partnerships</h4>
          <p className="text-sm text-text-secondary">
            We work with leading companies to ensure our conversions meet industry standards and requirements.
          </p>
        </div>
      </div>
    </div>
  );

  const renderVisualAids = () => (
    <div className="space-y-4">
      {currentData?.visualAids?.map((aid, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-6 hover:shadow-brand transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-text-primary mb-2">{aid?.type}</h4>
              <p className="text-sm text-text-secondary">{aid?.description}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Play"
              iconPosition="left"
              iconSize={14}
            >
              Launch
            </Button>
          </div>
        </div>
      ))}
      
      <div className="bg-gradient-to-br from-primary/5 to-success/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
            <Icon name="Sparkles" size={18} className="text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Interactive Learning</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Our visual aids use interactive elements to help you understand measurements better. 
              Click, drag, and explore to learn through hands-on experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'guides':
        return renderGuides();
      case 'applications':
        return renderApplications();
      case 'visual':
        return renderVisualAids();
      default:
        return renderGuides();
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-brand overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-success/5 px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="GraduationCap" size={18} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Knowledge Hub</h3>
            <p className="text-sm text-text-secondary">Educational resources and guides</p>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex space-x-1">
          {tabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab?.id)}
              iconName={tab?.icon}
              iconPosition="left"
              iconSize={16}
              className="transition-all duration-200"
            >
              {tab?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
      {/* Footer */}
      <div className="px-6 py-4 bg-muted/30 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Users" size={16} />
            <span>Trusted by 50,000+ professionals worldwide</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">Content updated daily</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;