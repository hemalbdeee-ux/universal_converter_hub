import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const SupportResources = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const supportCategories = [
    {
      id: 'conversion-accuracy',
      title: 'Conversion Accuracy',
      icon: '🎯',
      description: 'Questions about precision, rounding, and calculation methods',
      resources: [
        {
          title: 'Understanding Conversion Precision',
          type: 'Guide',
          description: 'Learn about significant figures and rounding in conversions',
          link: '/knowledge-center#precision',
          popularity: 'High'
        },
        {
          title: 'Why Results Differ Between Tools',
          type: 'FAQ',
          description: 'Common reasons for variation in conversion results',
          link: '/knowledge-center#accuracy',
          popularity: 'High'
        },
        {
          title: 'Scientific vs. Standard Mode',
          type: 'Tutorial',
          description: 'When to use different calculation modes',
          link: '/knowledge-center#modes',
          popularity: 'Medium'
        }
      ]
    },
    {
      id: 'account-management',
      title: 'Account Management',
      icon: '👤',
      description: 'Profile settings, preferences, and account security',
      resources: [
        {
          title: 'Creating Your Free Account',
          type: 'Guide',
          description: 'Step-by-step account setup and verification',
          link: '/user-dashboard#setup',
          popularity: 'High'
        },
        {
          title: 'Customizing Conversion Preferences',
          type: 'Tutorial',
          description: 'Set default units and precision settings',
          link: '/user-dashboard#preferences',
          popularity: 'Medium'
        },
        {
          title: 'Account Security Best Practices',
          type: 'Guide',
          description: 'Protecting your account and data',
          link: '/user-dashboard#security',
          popularity: 'Low'
        }
      ]
    },
    {
      id: 'technical-issues',
      title: 'Technical Troubleshooting',
      icon: '🔧',
      description: 'Browser compatibility, performance, and error resolution',
      resources: [
        {
          title: 'Browser Compatibility Guide',
          type: 'Guide',
          description: 'Supported browsers and version requirements',
          link: '/knowledge-center#compatibility',
          popularity: 'High'
        },
        {
          title: 'Clearing Cache and Cookies',
          type: 'Tutorial',
          description: 'Resolve loading and performance issues',
          link: '/knowledge-center#cache',
          popularity: 'Medium'
        },
        {
          title: 'Mobile App Troubleshooting',
          type: 'FAQ',
          description: 'Common mobile-specific issues and solutions',
          link: '/knowledge-center#mobile',
          popularity: 'Medium'
        },
        {
          title: 'Reporting Calculation Errors',
          type: 'Guide',
          description: 'How to report suspected bugs or inaccuracies',
          link: '#report-bug',
          popularity: 'Low'
        }
      ]
    },
    {
      id: 'api-integration',
      title: 'API & Integration',
      icon: '🔌',
      description: 'Developer resources and API documentation',
      resources: [
        {
          title: 'API Quick Start Guide',
          type: 'Guide',
          description: 'Get started with our conversion API',
          link: '/api-docs#quickstart',
          popularity: 'Medium'
        },
        {
          title: 'Authentication & Rate Limits',
          type: 'Documentation',
          description: 'API keys, authentication, and usage limits',
          link: '/api-docs#auth',
          popularity: 'Medium'
        },
        {
          title: 'Widget Integration',
          type: 'Tutorial',
          description: 'Embed converters on your website',
          link: '/api-docs#widgets',
          popularity: 'Low'
        }
      ]
    },
    {
      id: 'educational',
      title: 'Educational Support',
      icon: '📚',
      description: 'Learning resources for students and educators',
      resources: [
        {
          title: 'Classroom Integration Guide',
          type: 'Guide',
          description: 'Using conversion tools in educational settings',
          link: '/knowledge-center#education',
          popularity: 'Medium'
        },
        {
          title: 'Unit Systems Explained',
          type: 'Educational',
          description: 'Comprehensive guide to metric, imperial, and other systems',
          link: '/knowledge-center#systems',
          popularity: 'High'
        },
        {
          title: 'Historical Context of Measurements',
          type: 'Article',
          description: 'The evolution of measurement standards',
          link: '/knowledge-center#history',
          popularity: 'Low'
        }
      ]
    },
    {
      id: 'business-partnerships',
      title: 'Business Partnerships',
      icon: '🤝',
      description: 'Enterprise solutions and partnership opportunities',
      resources: [
        {
          title: 'Enterprise Solutions Overview',
          type: 'Brochure',
          description: 'Custom solutions for business needs',
          link: '/business#enterprise',
          popularity: 'Low'
        },
        {
          title: 'White-label Options',
          type: 'Guide',
          description: 'Brand our tools with your identity',
          link: '/business#whitelabel',
          popularity: 'Low'
        },
        {
          title: 'Partnership Application',
          type: 'Form',
          description: 'Apply to become a technology partner',
          link: '/business#partnership',
          popularity: 'Low'
        }
      ]
    }
  ];

  const filteredCategories = supportCategories?.filter(category =>
    category?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    category?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    category?.resources?.some(resource =>
      resource?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )
  );

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const getPopularityColor = (popularity) => {
    switch (popularity) {
      case 'High': return 'bg-success/10 text-success border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'Low': return 'bg-info/10 text-info border-info/20';
      default: return 'bg-muted text-text-secondary border-border';
    }
  };

  const getResourceTypeIcon = (type) => {
    switch (type) {
      case 'Guide': return '📖';
      case 'Tutorial': return '🎥';
      case 'FAQ': return '❓';
      case 'Documentation': return '📄';
      case 'Educational': return '🎓';
      case 'Article': return '📰';
      case 'Brochure': return '📋';
      case 'Form': return '📝';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header and Search */}
      <div className="bg-surface rounded-lg p-8 shadow-brand">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Support Resources</h2>
          <p className="text-text-secondary">
            Find answers to common questions and access helpful resources organized by category.
            Can't find what you're looking for? Use our contact form or live chat.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-text-secondary text-sm">🔍</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            placeholder="Search support resources..."
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">150+</div>
            <div className="text-sm text-text-secondary">Help Articles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">24h</div>
            <div className="text-sm text-text-secondary">Avg Response</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-info">95%</div>
            <div className="text-sm text-text-secondary">Issue Resolution</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">4.8★</div>
            <div className="text-sm text-text-secondary">Support Rating</div>
          </div>
        </div>
      </div>

      {/* Support Categories */}
      <div className="space-y-4">
        {filteredCategories?.map((category) => (
          <div key={category?.id} className="bg-surface rounded-lg shadow-brand overflow-hidden">
            <button
              onClick={() => toggleCategory(category?.id)}
              className="w-full px-8 py-6 text-left hover:bg-background/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{category?.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{category?.title}</h3>
                    <p className="text-text-secondary text-sm mt-1">{category?.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-text-secondary">
                        {category?.resources?.length} resources
                      </span>
                      <div className="flex space-x-1">
                        {category?.resources?.slice(0, 3)?.map((resource, idx) => (
                          <span key={idx} className={`
                            inline-block px-2 py-1 text-xs rounded border
                            ${getPopularityColor(resource?.popularity)}
                          `}>
                            {resource?.popularity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`
                  transform transition-transform duration-200
                  ${expandedCategory === category?.id ? 'rotate-180' : 'rotate-0'}
                `}>
                  <span className="text-text-secondary">▼</span>
                </div>
              </div>
            </button>

            {expandedCategory === category?.id && (
              <div className="px-8 pb-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {category?.resources?.map((resource, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 hover:border-primary/30 hover:shadow-brand-focus transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        <div className="text-lg">{getResourceTypeIcon(resource?.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-text-primary">{resource?.title}</h4>
                            <span className={`
                              inline-block px-2 py-1 text-xs rounded border ml-2
                              ${getPopularityColor(resource?.popularity)}
                            `}>
                              {resource?.popularity}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary mt-1 mb-3">{resource?.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                              {resource?.type}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(resource?.link, '_blank')}
                            >
                              View →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCategories?.length === 0 && (
        <div className="bg-surface rounded-lg p-8 shadow-brand text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">No resources found</h3>
          <p className="text-text-secondary mb-4">
            Try adjusting your search terms or browse our categories above.
          </p>
          <Button onClick={() => setSearchQuery('')} variant="outline">
            Clear Search
          </Button>
        </div>
      )}

      {/* Additional Help Options */}
      <div className="bg-gradient-to-br from-primary/10 via-success/5 to-info/10 rounded-lg p-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Still need help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary text-xl">💬</span>
            </div>
            <h4 className="font-medium text-text-primary mb-2">Live Chat</h4>
            <p className="text-sm text-text-secondary mb-3">
              Get instant help during business hours
            </p>
            <Button size="sm" variant="outline">Start Chat</Button>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-success text-xl">📧</span>
            </div>
            <h4 className="font-medium text-text-primary mb-2">Email Support</h4>
            <p className="text-sm text-text-secondary mb-3">
              Detailed response within 24 hours
            </p>
            <Button size="sm" variant="outline">Send Email</Button>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-info/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-info text-xl">📞</span>
            </div>
            <h4 className="font-medium text-text-primary mb-2">Phone Support</h4>
            <p className="text-sm text-text-secondary mb-3">
              Direct line for urgent issues
            </p>
            <Button size="sm" variant="outline">Call Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportResources;