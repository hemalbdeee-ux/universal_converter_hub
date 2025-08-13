import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const IndustryGuides = () => {
  const [activeIndustry, setActiveIndustry] = useState('cooking');

  const industries = [
    {
      id: 'cooking',
      name: 'Cooking & Culinary',
      icon: 'ChefHat',
      color: 'from-orange-500 to-red-500',
      description: 'Recipe conversions, oven temperatures, and ingredient measurements',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=600&h=400&fit=crop',
      guides: [
        {
          title: 'Converting Recipe Measurements',
          description: 'Master the art of scaling recipes up or down while maintaining perfect ratios',
          readTime: '6 min',
          difficulty: 'Beginner'
        },
        {
          title: 'International Oven Temperature Guide',
          description: 'Navigate between Fahrenheit, Celsius, and gas mark settings',
          readTime: '4 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Baking Precision: Weight vs Volume',
          description: 'Why professional bakers prefer weight measurements for consistency',
          readTime: '8 min',
          difficulty: 'Intermediate'
        }
      ],
      tools: ['Recipe Scaler', 'Temperature Converter', 'Volume to Weight Calculator']
    },
    {
      id: 'construction',
      name: 'Construction & Architecture',
      icon: 'HardHat',
      color: 'from-blue-500 to-indigo-500',
      description: 'Architectural measurements, material calculations, and building codes',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
      guides: [
        {
          title: 'Reading Architectural Drawings',
          description: 'Understanding scale, dimensions, and measurement annotations in blueprints',
          readTime: '12 min',
          difficulty: 'Intermediate'
        },
        {
          title: 'Material Quantity Calculations',
          description: 'Calculate concrete, lumber, and other materials with precision',
          readTime: '10 min',
          difficulty: 'Advanced'
        },
        {
          title: 'International Building Code Conversions',
          description: 'Navigate between metric and imperial building standards',
          readTime: '15 min',
          difficulty: 'Advanced'
        }
      ],
      tools: ['Area Calculator', 'Volume Estimator', 'Unit Converter']
    },
    {
      id: 'science',
      name: 'Science & Laboratory',
      icon: 'Flask',
      color: 'from-emerald-500 to-teal-500',
      description: 'Laboratory precision, scientific notation, and research standards',
      image: 'https://images.pixabay.com/photo/2017/09/07/08/54/money-2724241_1280.jpg?w=600&h=400&fit=crop',
      guides: [
        {
          title: 'Laboratory Measurement Precision',
          description: 'Understanding significant figures, accuracy, and measurement uncertainty',
          readTime: '14 min',
          difficulty: 'Advanced'
        },
        {
          title: 'Scientific Notation Mastery',
          description: 'Working with very large and very small numbers in scientific contexts',
          readTime: '8 min',
          difficulty: 'Intermediate'
        },
        {
          title: 'Unit Analysis in Chemistry',
          description: 'Dimensional analysis and unit conversions in chemical calculations',
          readTime: '16 min',
          difficulty: 'Advanced'
        }
      ],
      tools: ['Precision Calculator', 'Scientific Converter', 'Uncertainty Estimator']
    }
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700'
    };
    return colors?.[difficulty] || 'bg-gray-100 text-gray-700';
  };

  const activeIndustryData = industries?.find(ind => ind?.id === activeIndustry);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Industry-Specific Guides
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Professional-grade conversion knowledge tailored to your industry's unique requirements and standards
          </p>
        </div>
        
        {/* Industry Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {industries?.map((industry) => (
            <button
              key={industry?.id}
              onClick={() => setActiveIndustry(industry?.id)}
              className={`
                flex items-center space-x-3 px-6 py-3 rounded-xl border-2 transition-all duration-300
                ${activeIndustry === industry?.id
                  ? 'border-primary bg-primary text-white shadow-brand-lg'
                  : 'border-border bg-background text-text-secondary hover:border-primary/30 hover:text-text-primary'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${activeIndustry === industry?.id 
                  ? 'bg-white/20' 
                  : `bg-gradient-to-br ${industry?.color}`
                }
              `}>
                <Icon 
                  name={industry?.icon} 
                  size={18} 
                  color={activeIndustry === industry?.id ? 'white' : 'white'} 
                  strokeWidth={2} 
                />
              </div>
              <span className="font-medium">{industry?.name}</span>
            </button>
          ))}
        </div>
        
        {/* Active Industry Content */}
        {activeIndustryData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Industry Overview */}
            <div>
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-brand">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={activeIndustryData?.image}
                    alt={activeIndustryData?.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeIndustryData?.color} flex items-center justify-center shadow-brand`}>
                        <Icon name={activeIndustryData?.icon} size={24} color="white" strokeWidth={2} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {activeIndustryData?.name}
                      </h3>
                    </div>
                    <p className="text-white/90 leading-relaxed">
                      {activeIndustryData?.description}
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-text-primary mb-4">
                    Available Tools:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeIndustryData?.tools?.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-surface text-text-secondary text-sm rounded-full border border-border"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Guides List */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-text-primary mb-6">
                Featured Guides
              </h4>
              
              {activeIndustryData?.guides?.map((guide, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300 conversion-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h5 className="text-lg font-semibold text-text-primary leading-tight">
                      {guide?.title}
                    </h5>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide?.difficulty)}`}>
                        {guide?.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {guide?.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{guide?.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="BookOpen" size={14} />
                        <span>Guide</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ArrowRight"
                      iconSize={16}
                      className="text-primary hover:text-primary"
                    >
                      Read Guide
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  size="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={18}
                >
                  View All {activeIndustryData?.name} Guides
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default IndustryGuides;