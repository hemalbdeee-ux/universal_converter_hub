import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MeasurementTimeline = () => {
  const [activeEra, setActiveEra] = useState(null);

  const timelineData = [
    {
      id: 'ancient',
      era: "Ancient Civilizations",
      period: "3000 BCE - 500 CE",
      icon: 'Pyramid',
      color: 'from-amber-500 to-orange-500',
      description: `Early measurement systems based on human body parts and natural phenomena.\n\nEgyptian cubits, Roman feet, and Greek stadia formed the foundation of measurement.`,
      keyDevelopments: [
        "Egyptian cubit (forearm length)",
        "Roman mile (1000 paces)",
        "Greek Olympic stadium",
        "Babylonian time divisions"
      ],
      culturalContext: "Measurements tied to rulers and religious significance"
    },
    {
      id: 'medieval',
      era: "Medieval Period",
      period: "500 - 1500 CE",
      icon: 'Castle',
      color: 'from-blue-500 to-indigo-500',
      description: `Trade expansion led to standardization attempts across regions.\n\nGuilds and merchants drove the need for consistent measurements.`,
      keyDevelopments: [
        "English yard standardization",
        "Merchant pound weights",
        "Acre for land measurement",
        "Barrel and bushel volumes"
      ],
      culturalContext: "Local variations caused trade disputes and confusion"
    },
    {
      id: 'renaissance',
      era: "Renaissance & Scientific Revolution",
      period: "1500 - 1800 CE",
      icon: 'Telescope',
      color: 'from-emerald-500 to-teal-500',
      description: `Scientific method demanded precise, reproducible measurements.\n\nGalileo, Newton, and others revolutionized measurement accuracy.`,
      keyDevelopments: [
        "Pendulum clock precision",
        "Thermometer scales",
        "Barometric pressure",
        "Astronomical measurements"
      ],
      culturalContext: "Science began separating from religious and royal authority"
    },
    {
      id: 'industrial',
      era: "Industrial Revolution",
      period: "1800 - 1900 CE",
      icon: 'Cog',
      color: 'from-purple-500 to-pink-500',
      description: `Mass production required interchangeable parts and precise tolerances.\n\nNational standards emerged to support industrial growth.`,
      keyDevelopments: [
        "Metric system adoption",
        "Standard gauge railways",
        "Precision manufacturing",
        "International cooperation"
      ],
      culturalContext: "Nationalism influenced measurement system preferences"
    },
    {
      id: 'modern',
      era: "Modern Era",
      period: "1900 - Present",
      icon: 'Atom',
      color: 'from-red-500 to-rose-500',
      description: `Atomic and quantum physics enabled unprecedented precision.\n\nGlobal standards ensure consistency across all scientific fields.`,
      keyDevelopments: [
        "SI unit system (1960)",
        "Atomic time standards",
        "Laser interferometry",
        "Quantum measurement"
      ],
      culturalContext: "International cooperation through scientific organizations"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Evolution of Measurement Systems
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Interactive timeline showing how human measurement evolved from body parts to quantum precision
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-success to-accent rounded-full"></div>
          
          <div className="space-y-12">
            {timelineData?.map((era, index) => (
              <div
                key={era?.id}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div
                    className={`
                      bg-card border border-border rounded-2xl p-6 shadow-brand hover:shadow-brand-lg 
                      transition-all duration-300 cursor-pointer conversion-card
                      ${activeEra === era?.id ? 'ring-2 ring-primary' : ''}
                    `}
                    onClick={() => setActiveEra(activeEra === era?.id ? null : era?.id)}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${era?.color} flex items-center justify-center shadow-brand`}>
                        <Icon name={era?.icon} size={24} color="white" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary">
                          {era?.era}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {era?.period}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-text-secondary leading-relaxed mb-4">
                      {era?.description?.split('\n')?.[0]}
                    </p>
                    
                    {activeEra === era?.id && (
                      <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <div>
                          <h4 className="font-semibold text-text-primary mb-2">Key Developments:</h4>
                          <ul className="space-y-1">
                            {era?.keyDevelopments?.map((development, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-sm text-text-secondary">
                                <Icon name="CheckCircle" size={14} className="text-success" />
                                <span>{development}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-surface p-4 rounded-lg">
                          <h4 className="font-semibold text-text-primary mb-2">Cultural Context:</h4>
                          <p className="text-sm text-text-secondary">
                            {era?.culturalContext}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-text-secondary">
                        Click to explore details
                      </span>
                      <Icon 
                        name={activeEra === era?.id ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className="text-text-secondary" 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Timeline Node */}
                <div className="relative z-10">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${era?.color} border-4 border-background shadow-brand`}></div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-card border border-border rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Lightbulb" size={24} className="text-accent" />
              <h3 className="text-lg font-semibold text-text-primary">
                Did You Know?
              </h3>
            </div>
            <p className="text-text-secondary leading-relaxed">
              The meter was originally defined as one ten-millionth of the distance from the equator to the North Pole. 
              Today, it's defined by the speed of light in a vacuum, making it one of the most precisely defined units in science.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeasurementTimeline;