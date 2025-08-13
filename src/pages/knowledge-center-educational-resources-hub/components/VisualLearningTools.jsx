import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VisualLearningTools = () => {
  const [activeComparison, setActiveComparison] = useState('length');
  const [selectedUnit, setSelectedUnit] = useState('meter');

  const comparisonTypes = [
    {
      id: 'length',
      name: 'Length & Distance',
      icon: 'Ruler',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'weight',
      name: 'Weight & Mass',
      icon: 'Scale',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'volume',
      name: 'Volume & Capacity',
      icon: 'Beaker',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'temperature',
      name: 'Temperature',
      icon: 'Thermometer',
      color: 'from-red-500 to-red-600'
    }
  ];

  const visualComparisons = {
    length: {
      baseUnit: 'meter',
      comparisons: [
        {
          unit: 'millimeter',
          value: 0.001,
          visualSize: 2,
          realWorldExample: 'Thickness of a credit card',
          color: 'bg-blue-200'
        },
        {
          unit: 'centimeter',
          value: 0.01,
          visualSize: 8,
          realWorldExample: 'Width of a fingernail',
          color: 'bg-blue-300'
        },
        {
          unit: 'meter',
          value: 1,
          visualSize: 100,
          realWorldExample: 'Height of a door',
          color: 'bg-blue-500'
        },
        {
          unit: 'kilometer',
          value: 1000,
          visualSize: 120,
          realWorldExample: 'Walking distance in 10-12 minutes',
          color: 'bg-blue-700'
        }
      ]
    },
    weight: {
      baseUnit: 'kilogram',
      comparisons: [
        {
          unit: 'gram',
          value: 0.001,
          visualSize: 4,
          realWorldExample: 'Weight of a paperclip',
          color: 'bg-emerald-200'
        },
        {
          unit: 'kilogram',
          value: 1,
          visualSize: 60,
          realWorldExample: 'Weight of a laptop',
          color: 'bg-emerald-500'
        },
        {
          unit: 'pound',
          value: 0.453592,
          visualSize: 45,
          realWorldExample: 'Weight of a loaf of bread',
          color: 'bg-emerald-400'
        },
        {
          unit: 'ton',
          value: 1000,
          visualSize: 100,
          realWorldExample: 'Weight of a small car',
          color: 'bg-emerald-700'
        }
      ]
    },
    volume: {
      baseUnit: 'liter',
      comparisons: [
        {
          unit: 'milliliter',
          value: 0.001,
          visualSize: 6,
          realWorldExample: 'A few drops of water',
          color: 'bg-purple-200'
        },
        {
          unit: 'cup',
          value: 0.236588,
          visualSize: 35,
          realWorldExample: 'Standard coffee cup',
          color: 'bg-purple-400'
        },
        {
          unit: 'liter',
          value: 1,
          visualSize: 80,
          realWorldExample: 'Large water bottle',
          color: 'bg-purple-500'
        },
        {
          unit: 'gallon',
          value: 3.78541,
          visualSize: 120,
          realWorldExample: 'Milk jug',
          color: 'bg-purple-700'
        }
      ]
    },
    temperature: {
      baseUnit: 'celsius',
      comparisons: [
        {
          unit: 'celsius',
          value: 0,
          visualSize: 30,
          realWorldExample: 'Water freezes',
          color: 'bg-blue-400'
        },
        {
          unit: 'celsius',
          value: 20,
          visualSize: 50,
          realWorldExample: 'Room temperature',
          color: 'bg-green-400'
        },
        {
          unit: 'celsius',
          value: 37,
          visualSize: 70,
          realWorldExample: 'Human body temperature',
          color: 'bg-yellow-400'
        },
        {
          unit: 'celsius',
          value: 100,
          visualSize: 100,
          realWorldExample: 'Water boils',
          color: 'bg-red-500'
        }
      ]
    }
  };

  const activeData = visualComparisons?.[activeComparison];

  return (
    <section className="py-16 bg-gradient-to-br from-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Visual Learning Tools
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Interactive visual comparisons help you understand the relative sizes and relationships between different units
          </p>
        </div>
        
        {/* Comparison Type Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {comparisonTypes?.map((type) => (
            <button
              key={type?.id}
              onClick={() => setActiveComparison(type?.id)}
              className={`
                flex items-center space-x-3 px-6 py-3 rounded-xl border-2 transition-all duration-300
                ${activeComparison === type?.id
                  ? 'border-primary bg-primary text-white shadow-brand-lg'
                  : 'border-border bg-background text-text-secondary hover:border-primary/30 hover:text-text-primary'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${activeComparison === type?.id 
                  ? 'bg-white/20' 
                  : `bg-gradient-to-br ${type?.color}`
                }
              `}>
                <Icon 
                  name={type?.icon} 
                  size={18} 
                  color={activeComparison === type?.id ? 'white' : 'white'} 
                  strokeWidth={2} 
                />
              </div>
              <span className="font-medium">{type?.name}</span>
            </button>
          ))}
        </div>
        
        {/* Visual Comparison Display */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Visual Bars */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                Visual Scale Comparison
              </h3>
              
              <div className="space-y-6">
                {activeData?.comparisons?.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text-primary capitalize">
                        {item?.unit}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {activeComparison === 'temperature' ? `${item?.value}°C` : 
                         `${item?.value} ${activeData?.baseUnit}${item?.value !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                    
                    <div className="relative bg-surface rounded-lg h-8 overflow-hidden">
                      <div
                        className={`h-full ${item?.color} rounded-lg transition-all duration-1000 ease-out`}
                        style={{ width: `${item?.visualSize}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center px-3">
                        <span className="text-xs font-medium text-text-primary">
                          {item?.realWorldExample}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Interactive Converter */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                Interactive Converter
              </h3>
              
              <div className="bg-surface rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Convert from:
                  </label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e?.target?.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {activeData?.comparisons?.map((item, index) => (
                      <option key={index} value={item?.unit}>
                        {item?.unit?.charAt(0)?.toUpperCase() + item?.unit?.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Value:
                  </label>
                  <input
                    type="number"
                    defaultValue="1"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Enter value"
                  />
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-text-primary mb-3">
                    Converted Values:
                  </h4>
                  <div className="space-y-2">
                    {activeData?.comparisons?.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 px-3 bg-background rounded-lg">
                        <span className="text-sm text-text-secondary capitalize">
                          {item?.unit}
                        </span>
                        <span className="font-medium text-text-primary">
                          {activeComparison === 'temperature' ? `${item?.value}°C` : 
                           `${item?.value?.toFixed(3)} ${item?.unit}${item?.value !== 1 ? 's' : ''}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Educational Note */}
          <div className="mt-8 bg-gradient-to-r from-primary/5 to-success/5 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={24} className="text-accent mt-1" />
              <div>
                <h4 className="font-semibold text-text-primary mb-2">
                  Learning Tip
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  Visual comparisons help build intuitive understanding of measurement relationships. 
                  Try to associate each unit with familiar objects to improve your conversion accuracy and speed.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            iconName="Play"
            iconPosition="left"
            iconSize={20}
          >
            Try Interactive Measurement Game
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VisualLearningTools;