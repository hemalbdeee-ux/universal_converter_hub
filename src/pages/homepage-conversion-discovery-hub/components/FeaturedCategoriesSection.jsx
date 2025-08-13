import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedCategoriesSection = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const featuredCategories = [
    {
      id: 'length',
      title: 'Length & Distance',
      description: 'Convert between meters, feet, inches, miles, and more with visual scale references',
      icon: 'Ruler',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      conversions: '2.3M',
      examples: ['ft to m', 'in to cm', 'mi to km'],
      animation: 'ruler-animation',
      features: ['Visual Scale', 'Cultural Context', 'Precision Guaranteed']
    },
    {
      id: 'weight',
      title: 'Weight & Mass',
      description: 'Accurate weight conversions with cultural context for stones, pounds, and kilograms',
      icon: 'Scale',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      conversions: '1.8M',
      examples: ['lb to kg', 'oz to g', 'st to kg'],
      animation: 'scale-animation',
      features: ['Cultural Units', 'Medical Precision', 'Cooking Measurements']
    },
    {
      id: 'temperature',
      title: 'Temperature',
      description: 'Weather integration and cooking contexts for Fahrenheit, Celsius, and Kelvin',
      icon: 'Thermometer',
      gradient: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      conversions: '2.1M',
      examples: ['°F to °C', '°C to K', 'Weather'],
      animation: 'thermometer-animation',
      features: ['Weather Data', 'Cooking Temps', 'Scientific Units']
    },
    {
      id: 'currency',
      title: 'Currency Exchange',
      description: 'Real-time exchange rates with historical data and market insights',
      icon: 'DollarSign',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      conversions: '1.9M',
      examples: ['USD to EUR', 'GBP to JPY', 'Live Rates'],
      animation: 'currency-animation',
      features: ['Live Rates', 'Historical Data', 'Market Trends']
    },
    {
      id: 'volume',
      title: 'Volume & Capacity',
      description: 'Cooking and industrial applications for liters, gallons, cups, and more',
      icon: 'Beaker',
      gradient: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-amber-50',
      conversions: '1.2M',
      examples: ['gal to L', 'cup to mL', 'fl oz'],
      animation: 'beaker-animation',
      features: ['Cooking Units', 'Industrial Scale', 'Liquid & Dry']
    },
    {
      id: 'area',
      title: 'Area & Surface',
      description: 'Real estate and land measurements with regional unit preferences',
      icon: 'Square',
      gradient: 'from-teal-500 to-blue-500',
      bgColor: 'bg-teal-50',
      conversions: '890K',
      examples: ['sq ft to m²', 'acre to ha', 'Real Estate'],
      animation: 'area-animation',
      features: ['Real Estate', 'Land Survey', 'Construction']
    }
  ];

  const handleCategoryHover = (categoryId) => {
    setHoveredCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Featured Conversion Categories
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Explore our comprehensive collection of converters, each designed with precision, 
            cultural context, and real-world applications in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCategories?.map((category, index) => (
            <div
              key={category?.id}
              className="category-card bg-card border border-border rounded-2xl p-6 hover:shadow-brand-lg transition-all duration-300 group"
              onMouseEnter={() => handleCategoryHover(category?.id)}
              onMouseLeave={handleCategoryLeave}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 ${category?.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon 
                    name={category?.icon} 
                    size={28} 
                    className={`bg-gradient-to-r ${category?.gradient} bg-clip-text text-transparent`}
                  />
                </div>
                <div className="text-right">
                  <div className="validation-badge bg-success/10 border border-success/20 rounded-full px-2 py-1">
                    <span className="text-xs font-medium text-success">
                      {category?.conversions} today
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-200">
                  {category?.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {category?.description}
                </p>
              </div>

              {/* Examples */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {category?.examples?.map((example, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-surface border border-border rounded-full px-3 py-1 text-text-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <div className="space-y-2">
                  {category?.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-xs text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between">
                <Link
                  to="/category-landing-comprehensive-converter-collections"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  Explore Category
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowRight"
                  iconSize={14}
                  className="text-text-secondary hover:text-primary"
                >
                  Try Now
                </Button>
              </div>

              {/* Hover Animation Overlay */}
              {hoveredCategory === category?.id && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-success/5 rounded-2xl pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Access Toolbar */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-brand">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Quick Access Toolbar
            </h3>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Zap" size={16} />
              <span>Instant Conversions</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'USD → EUR', icon: 'DollarSign', value: '$100 = €92.34' },
              { label: '°F → °C', icon: 'Thermometer', value: '70°F = 21.1°C' },
              { label: 'ft → m', icon: 'Ruler', value: '5ft = 1.52m' },
              { label: 'lb → kg', icon: 'Scale', value: '1lb = 0.45kg' },
              { label: 'gal → L', icon: 'Beaker', value: '1gal = 3.79L' },
              { label: 'mi → km', icon: 'MapPin', value: '1mi = 1.61km' }
            ]?.map((quick, index) => (
              <button
                key={index}
                className="p-3 bg-surface hover:bg-muted rounded-lg transition-colors duration-200 text-left group"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name={quick?.icon} size={14} className="text-primary" />
                  <span className="text-xs font-medium text-text-primary">{quick?.label}</span>
                </div>
                <div className="text-xs text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                  {quick?.value}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategoriesSection;