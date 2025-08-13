import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const TrendingSearches = ({ searches, onSearchClick }) => {
  const trendingSearches = [
    {
      id: 1,
      query: "cooking temperature conversion",
      category: "Temperature",
      trend: "up",
      percentage: "+24%",
      searches: "12.4K",
      icon: "ChefHat"
    },
    {
      id: 2,
      query: "currency exchange rates",
      category: "Currency",
      trend: "up",
      percentage: "+18%",
      searches: "8.7K",
      icon: "DollarSign"
    },
    {
      id: 3,
      query: "metric to imperial length",
      category: "Length",
      trend: "stable",
      percentage: "±2%",
      searches: "6.2K",
      icon: "Ruler"
    },
    {
      id: 4,
      query: "weight conversion for recipes",
      category: "Weight",
      trend: "up",
      percentage: "+15%",
      searches: "5.8K",
      icon: "Scale"
    },
    {
      id: 5,
      query: "time zone converter",
      category: "Time",
      trend: "down",
      percentage: "-8%",
      searches: "4.9K",
      icon: "Clock"
    },
    {
      id: 6,
      query: "fuel efficiency calculator",
      category: "Speed",
      trend: "up",
      percentage: "+31%",
      searches: "3.6K",
      icon: "Fuel"
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Trending Searches</h3>
        </div>
        <div className="text-xs text-text-secondary">
          Last 24 hours
        </div>
      </div>
      <div className="space-y-3">
        {trendingSearches?.map((search, index) => (
          <div
            key={search?.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-surface transition-colors duration-200 cursor-pointer group"
            onClick={() => onSearchClick(search?.query)}
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="flex items-center justify-center w-6 h-6 text-xs font-semibold text-text-secondary">
                {index + 1}
              </div>
              <div className="flex items-center space-x-2">
                <Icon name={search?.icon} size={16} className="text-primary" />
                <div>
                  <div className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                    {search?.query}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {search?.category} • {search?.searches} searches
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-1 ${getTrendColor(search?.trend)}`}>
                <Icon name={getTrendIcon(search?.trend)} size={12} />
                <span className="text-xs font-medium">{search?.percentage}</span>
              </div>
              <Icon name="ChevronRight" size={14} className="text-text-secondary group-hover:text-primary transition-colors duration-200" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Link
          to="/category-landing-comprehensive-converter-collections"
          className="flex items-center justify-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
        >
          <span>View All Categories</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>
    </div>
  );
};

export default TrendingSearches;