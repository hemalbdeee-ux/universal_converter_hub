import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryHero = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    {
      id: 'length',
      name: 'Length & Distance',
      icon: 'Ruler',
      description: 'Convert between meters, feet, inches, miles, and more',
      color: 'from-blue-500 to-blue-600',
      story: `The meter was originally defined in 1793 as one ten-millionth of the distance from the equator to the North Pole. Today, it's defined by the speed of light, making it one of the most precise measurements in human history.`,context: 'Used globally in construction, engineering, and everyday measurements'
    },
    {
      id: 'weight',name: 'Weight & Mass',icon: 'Scale',description: 'Convert kilograms, pounds, stones, ounces, and more',color: 'from-emerald-500 to-emerald-600',story: `The kilogram is the only SI base unit still defined by a physical object - the International Prototype Kilogram in Paris. However, as of 2019, it's now defined by Planck's constant for ultimate precision.`,
      context: 'Essential for cooking, shipping, health, and scientific applications'
    },
    {
      id: 'temperature',name: 'Temperature',icon: 'Thermometer',description: 'Convert Celsius, Fahrenheit, Kelvin, and Rankine',color: 'from-red-500 to-orange-500',story: `Celsius was created by Anders Celsius in 1742, originally with 0° as boiling point and 100° as freezing. Fahrenheit, developed by Daniel Fahrenheit in 1724, used human body temperature as a reference point.`,context: 'Critical for weather, cooking, science, and industrial processes'
    },
    {
      id: 'volume',name: 'Volume & Capacity',icon: 'Beaker',description: 'Convert liters, gallons, cups, fluid ounces, and more',color: 'from-cyan-500 to-blue-500',story: `The liter was originally defined as the volume of one kilogram of water at maximum density. Today, it's precisely defined as one cubic decimeter, bridging the gap between volume and mass.`,
      context: 'Essential for cooking, chemistry, fuel measurement, and beverages'
    },
    {
      id: 'area',
      name: 'Area & Surface',
      icon: 'Square',
      description: 'Convert square meters, acres, hectares, square feet',
      color: 'from-green-500 to-teal-500',
      story: `The acre originated in medieval England as the amount of land a yoke of oxen could plow in one day. Today, it remains crucial in real estate and agriculture, especially in English-speaking countries.`,
      context: 'Vital for real estate, agriculture, construction, and land planning'
    },
    {
      id: 'speed',
      name: 'Speed & Velocity',
      icon: 'Gauge',
      description: 'Convert mph, km/h, knots, meters per second',
      color: 'from-purple-500 to-indigo-500',
      story: `Speed measurements evolved from horse-drawn carriages to supersonic aircraft. The knot, used in maritime and aviation, represents one nautical mile per hour - crucial for navigation across Earth's curved surface.`,context: 'Essential for transportation, sports, physics, and navigation'
    },
    {
      id: 'time',name: 'Time & Date',icon: 'Clock',description: 'Convert time zones, calendar systems, and durations',color: 'from-amber-500 to-yellow-500',
      story: `Time standardization began with railways in the 19th century. Today, atomic clocks define the second with incredible precision, while time zones help coordinate our global civilization.`,
      context: 'Fundamental for scheduling, coordination, and scientific precision'
    },
    {
      id: 'energy',name: 'Energy & Power',icon: 'Zap',description: 'Convert watts, horsepower, BTU, joules, calories',color: 'from-yellow-500 to-orange-500',story: `The watt honors James Watt, whose steam engine improvements launched the Industrial Revolution. Horsepower, still used today, was Watt's way of marketing his engines by comparing them to horses.`,
      context: 'Critical for electrical systems, engines, and energy efficiency'
    },
    {
      id: 'pressure',
      name: 'Pressure',
      icon: 'Activity',
      description: 'Convert PSI, bar, pascal, atmospheres, mmHg',
      color: 'from-indigo-500 to-purple-500',
      story: `Pressure measurement began with Torricelli's barometer in 1643. Today, from tire pressure to weather forecasting, these measurements keep us safe and informed about our physical world.`,
      context: 'Essential for weather, automotive, medical, and industrial applications'
    },
    {
      id: 'digital',name: 'Digital Storage',icon: 'HardDrive',description: 'Convert bytes, KB, MB, GB, TB, and binary units',color: 'from-slate-500 to-gray-600',story: `Digital storage evolved from punch cards to cloud computing. The confusion between decimal (1000) and binary (1024) prefixes led to new standards, helping users understand their actual storage capacity.`,context: 'Crucial for computing, data management, and digital media'
    },
    {
      id: 'currency',name: 'Currency',icon: 'DollarSign',description: 'Convert world currencies with real-time exchange rates',color: 'from-green-600 to-emerald-600',story: `Currency exchange has evolved from ancient barter systems to today's digital markets. Real-time rates fluctuate based on global economics, making accurate conversion essential for international commerce.`,
      context: 'Vital for international trade, travel, and global business'
    },
    {
      id: 'angle',
      name: 'Angle & Rotation',
      icon: 'RotateCw',
      description: 'Convert degrees, radians, gradians, and turns',
      color: 'from-pink-500 to-rose-500',
      story: `The 360-degree circle comes from ancient Babylonian astronomy, based on their base-60 number system. Radians, preferred in mathematics, relate directly to the circle's radius and circumference.`,context: 'Essential for engineering, navigation, astronomy, and mathematics'
    }
  ];

  const currentCategory = categories?.find(cat => cat?.id === selectedCategory) || categories?.[0];

  return (
    <div className="relative bg-gradient-to-br from-background via-surface to-muted overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-success/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Category Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {categories?.map((category) => (
              <Button
                key={category?.id}
                variant={selectedCategory === category?.id ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category?.id)}
                iconName={category?.icon}
                iconPosition="left"
                iconSize={16}
                className="transition-all duration-200 hover:scale-105"
              >
                {category?.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentCategory?.color} flex items-center justify-center shadow-brand-lg`}>
                <Icon name={currentCategory?.icon} size={32} color="white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-text-primary">
                  {currentCategory?.name}
                </h1>
                <p className="text-lg text-text-secondary mt-1">
                  {currentCategory?.description}
                </p>
              </div>
            </div>

            {/* Historical Context */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-brand">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="BookOpen" size={16} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Historical Context</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {currentCategory?.story}
                  </p>
                </div>
              </div>
            </div>

            {/* Modern Applications */}
            <div className="bg-success/5 border border-success/20 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="Lightbulb" size={16} className="text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Modern Applications</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {currentCategory?.context}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="text-2xl font-bold text-primary">12+</div>
                <div className="text-sm text-text-secondary">Units Available</div>
              </div>
              <div className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="text-2xl font-bold text-success">99.9%</div>
                <div className="text-sm text-text-secondary">Accuracy Rate</div>
              </div>
              <div className="text-center p-4 bg-card border border-border rounded-lg">
                <div className="text-2xl font-bold text-accent">2.3M</div>
                <div className="text-sm text-text-secondary">Daily Conversions</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-brand-lg">
              <div className="text-center space-y-6">
                <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${currentCategory?.color} flex items-center justify-center shadow-brand-lg`}>
                  <Icon name={currentCategory?.icon} size={48} color="white" strokeWidth={1.5} />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-text-primary">
                    Start Converting {currentCategory?.name}
                  </h3>
                  <p className="text-text-secondary">
                    Access professional-grade conversion tools with real-time accuracy and cultural context.
                  </p>
                  
                  <div className="flex items-center justify-center space-x-2 text-sm text-success">
                    <Icon name="Shield" size={16} />
                    <span>Scientifically Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-brand cultural-indicator">
              <Icon name="Star" size={16} color="white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-brand cultural-indicator">
              <Icon name="Zap" size={16} color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;