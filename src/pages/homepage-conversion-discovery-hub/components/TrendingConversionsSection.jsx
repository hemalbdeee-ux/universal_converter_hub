import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TrendingConversionsSection = () => {
  const [trendingData, setTrendingData] = useState({
    temperature: 32,
    currency: 28,
    length: 19,
    weight: 12,
    volume: 9
  });

  const [totalConversions, setTotalConversions] = useState(2347891);

  const trendingCategories = [
    {
      name: "Temperature",
      percentage: trendingData?.temperature,
      icon: "Thermometer",
      color: "text-red-500",
      bgColor: "bg-red-50",
      examples: ["°F to °C", "°C to K", "°F to K"],
      trend: "+5.2%"
    },
    {
      name: "Currency",
      percentage: trendingData?.currency,
      icon: "DollarSign",
      color: "text-green-500",
      bgColor: "bg-green-50",
      examples: ["USD to EUR", "GBP to USD", "JPY to USD"],
      trend: "+3.8%"
    },
    {
      name: "Length",
      percentage: trendingData?.length,
      icon: "Ruler",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      examples: ["ft to m", "in to cm", "mi to km"],
      trend: "+2.1%"
    },
    {
      name: "Weight",
      percentage: trendingData?.weight,
      icon: "Scale",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      examples: ["lb to kg", "oz to g", "st to kg"],
      trend: "+1.9%"
    },
    {
      name: "Volume",
      percentage: trendingData?.volume,
      icon: "Beaker",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      examples: ["gal to L", "cup to mL", "fl oz to mL"],
      trend: "+1.4%"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalConversions(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US')?.format(num);
  };

  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Real-Time Conversion Insights
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            See what the world is converting right now. Live data from millions of users worldwide.
          </p>
        </div>

        {/* Live Counter */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4 bg-card border border-border rounded-2xl px-8 py-4 shadow-brand">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-text-secondary">Live Conversions Today</span>
            </div>
            <div className="text-3xl font-bold text-primary success-celebration">
              {formatNumber(totalConversions)}
            </div>
          </div>
        </div>

        {/* Trending Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {trendingCategories?.map((category, index) => (
            <div
              key={category?.name}
              className="conversion-card bg-card border border-border rounded-xl p-6 hover:shadow-brand-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${category?.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon name={category?.icon} size={24} className={category?.color} />
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-success">
                    {category?.trend}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {category?.name}
                </h3>
                <div className="text-2xl font-bold text-primary">
                  {category?.percentage}%
                </div>
              </div>

              <div className="space-y-1">
                {category?.examples?.map((example, idx) => (
                  <div key={idx} className="text-xs text-text-secondary bg-surface px-2 py-1 rounded">
                    {example}
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full precision-indicator`}
                    style={{ width: `${category?.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Conversions Today */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-brand">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">
              Most Popular Conversions Today
            </h3>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="TrendingUp" size={16} />
              <span>Updated every 5 minutes</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { from: "100 USD", to: "92.34 EUR", count: "45,231", icon: "DollarSign" },
              { from: "70°F", to: "21.11°C", count: "38,492", icon: "Thermometer" },
              { from: "5 feet", to: "1.524 meters", count: "29,847", icon: "Ruler" },
              { from: "1 mile", to: "1.609 km", count: "24,156", icon: "MapPin" },
              { from: "1 pound", to: "0.453 kg", count: "19,283", icon: "Scale" },
              { from: "1 gallon", to: "3.785 L", count: "15,674", icon: "Beaker" }
            ]?.map((conversion, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-surface rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={conversion?.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">
                    {conversion?.from} → {conversion?.to}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {conversion?.count} conversions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingConversionsSection;