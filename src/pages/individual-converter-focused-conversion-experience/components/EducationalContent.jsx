import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EducationalContent = ({ conversionType, fromUnit, toUnit }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getEducationalContent = () => {
    const content = {
      'length': {
        overview: {
          title: 'Length Conversion Fundamentals',
          content: `Length conversion is essential in engineering, construction, and daily life. The meter, defined as the distance light travels in vacuum in 1/299,792,458 of a second, serves as the international standard.\n\nFeet and meters represent two major measurement systems: Imperial (used primarily in the US) and Metric (used globally). Understanding both systems is crucial for international communication and technical work.`
        },
        applications: {
          title: 'Industry Applications',
          content: `• **Construction & Architecture**: Building plans, room dimensions, material specifications\n• **Engineering**: Technical drawings, component sizing, tolerance calculations\n• **Sports & Fitness**: Track measurements, field dimensions, personal metrics\n• **Travel & Navigation**: Distance planning, map reading, GPS coordinates\n• **Manufacturing**: Product specifications, quality control, assembly instructions`
        },
        tips: {
          title: 'Conversion Tips & Tricks',
          content: `• **Quick Mental Math**: 1 meter ≈ 3.3 feet (more precise than 3 feet)\n• **Memory Aid**: A meter is roughly one large step for an adult\n• **Precision Matters**: Use 3.28084 for high-precision calculations\n• **Common Mistakes**: Don't confuse feet with yards (1 yard = 3 feet)\n• **Practical Reference**: Standard door height is about 2 meters or 6.5 feet`
        }
      },
      'currency': {
        overview: {
          title: 'Currency Exchange Fundamentals',
          content: `Currency conversion reflects the relative value between different national currencies, influenced by economic factors, trade relationships, and market sentiment.\n\nExchange rates fluctuate constantly due to supply and demand, economic indicators, political stability, and central bank policies. Understanding these dynamics helps in making informed financial decisions.`
        },
        applications: {
          title: 'Practical Applications',
          content: `• **International Trade**: Import/export pricing, contract negotiations\n• **Travel Planning**: Budget estimation, expense tracking, price comparisons\n• **Investment**: Foreign market analysis, portfolio diversification\n• **E-commerce**: Global pricing strategies, payment processing\n• **Remittances**: Money transfers, family support, international payments`
        },
        tips: {
          title: 'Exchange Rate Tips',
          content: `• **Timing Matters**: Rates change throughout the trading day\n• **Hidden Fees**: Banks and services often add margins to published rates\n• **Forward Contracts**: Lock in rates for future transactions\n• **Economic Indicators**: GDP, inflation, and interest rates affect currencies\n• **Market Hours**: Major movements occur during overlapping market sessions`
        }
      },
      'temperature': {
        overview: {
          title: 'Temperature Scale Fundamentals',content: `Temperature conversion between Celsius, Fahrenheit, and Kelvin is essential in science, cooking, weather, and international communication.\n\nCelsius (°C) is based on water's freezing (0°) and boiling (100°) points. Fahrenheit (°F) uses 32° for freezing and 212° for boiling. Kelvin starts at absolute zero (-273.15°C).`
        },
        applications: {
          title: 'Common Applications',
          content: `• **Cooking & Baking**: Recipe conversions, oven temperatures, food safety\n• **Weather & Climate**: International weather reports, climate data analysis\n• **Science & Research**: Laboratory work, chemical reactions, physics calculations\n• **HVAC Systems**: Heating and cooling specifications, energy efficiency\n• **Medical Applications**: Body temperature, equipment calibration, storage requirements`
        },
        tips: {
          title: 'Temperature Conversion Tips',
          content: `• **Quick Celsius to Fahrenheit**: Multiply by 2, add 30 (approximate)\n• **Exact Formula**: °F = (°C × 9/5) + 32\n• **Body Temperature**: 37°C = 98.6°F (normal human temperature)\n• **Cooking Reference**: 180°C = 350°F (common baking temperature)\n• **Freezing Point**: 0°C = 32°F (water freezes)`
        }
      },
      'weight': {
        overview: {
          title: 'Weight & Mass Conversion',
          content: `Weight conversion between pounds, kilograms, and other units is fundamental in health, fitness, shipping, and international trade.\n\nTechnically, weight measures gravitational force while mass measures matter quantity. In everyday use, these terms are often interchangeable, but precision matters in scientific applications.`
        },
        applications: {
          title: 'Practical Uses',
          content: `• **Health & Fitness**: Body weight tracking, nutrition planning, exercise equipment\n• **Shipping & Logistics**: Package weights, freight calculations, postal services\n• **Cooking & Recipes**: Ingredient measurements, portion control, nutritional analysis\n• **Manufacturing**: Product specifications, quality control, material calculations\n• **Sports & Athletics**: Weight classes, equipment specifications, performance metrics`
        },
        tips: {
          title: 'Weight Conversion Tips',
          content: `• **Quick Conversion**: 1 kg ≈ 2.2 lbs (more precise: 2.20462)\n• **Memory Aid**: A kilogram is about the weight of a liter of water\n• **Common Reference**: Average adult weight: 70 kg = 154 lbs\n• **Precision Cooking**: Use grams for baking accuracy\n• **Shipping Tip**: Always round up for package weight estimates`
        }
      }
    };

    return content?.[conversionType] || content?.['length'];
  };

  const educationalContent = getEducationalContent();
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BookOpen' },
    { id: 'applications', label: 'Applications', icon: 'Briefcase' },
    { id: 'tips', label: 'Tips & Tricks', icon: 'Lightbulb' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-brand">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="GraduationCap" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Educational Content</h3>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center
              ${activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-brand'
                : 'text-text-secondary hover:text-text-primary hover:bg-background'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-text-primary">
          {educationalContent?.[activeTab]?.title}
        </h4>
        <div className="prose prose-sm max-w-none">
          <div className="text-text-secondary leading-relaxed whitespace-pre-line">
            {educationalContent?.[activeTab]?.content}
          </div>
        </div>
      </div>
      {/* Quick Facts */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="font-medium text-primary">Accuracy</span>
            </div>
            <p className="text-sm text-text-secondary">
              All conversions use internationally recognized standards with 6-decimal precision.
            </p>
          </div>
          <div className="bg-success/5 border border-success/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Globe" size={16} className="text-success" />
              <span className="font-medium text-success">Global Standards</span>
            </div>
            <p className="text-sm text-text-secondary">
              Based on SI units and international measurement conventions.
            </p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          iconSize={14}
        >
          Download Guide
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Share"
          iconPosition="left"
          iconSize={14}
        >
          Share Article
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="left"
          iconSize={14}
        >
          More Resources
        </Button>
      </div>
    </div>
  );
};

export default EducationalContent;