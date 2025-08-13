import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentSearches = ({ searches, onSearchClick, onClearHistory, isLoggedIn }) => {
  const recentSearches = [
    {
      id: 1,
      query: "350 fahrenheit to celsius",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      category: "Temperature",
      icon: "Thermometer"
    },
    {
      id: 2,
      query: "2 cups flour to grams",
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      category: "Weight",
      icon: "Scale"
    },
    {
      id: 3,
      query: "miles to kilometers",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      category: "Length",
      icon: "Ruler"
    },
    {
      id: 4,
      query: "usd to eur exchange rate",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      category: "Currency",
      icon: "DollarSign"
    },
    {
      id: 5,
      query: "square feet to square meters",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      category: "Area",
      icon: "Square"
    }
  ];

  const popularSearches = [
    {
      id: 1,
      query: "cooking temperature conversion",
      category: "Temperature",
      icon: "ChefHat",
      popularity: "Very Popular"
    },
    {
      id: 2,
      query: "metric to imperial length",
      category: "Length",
      icon: "Ruler",
      popularity: "Popular"
    },
    {
      id: 3,
      query: "currency exchange calculator",
      category: "Currency",
      icon: "DollarSign",
      popularity: "Trending"
    },
    {
      id: 4,
      query: "weight conversion for baking",
      category: "Weight",
      icon: "Scale",
      popularity: "Popular"
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const displaySearches = isLoggedIn ? recentSearches : popularSearches;
  const title = isLoggedIn ? 'Recent Searches' : 'Popular in Your Region';
  const titleIcon = isLoggedIn ? 'History' : 'TrendingUp';

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name={titleIcon} size={18} className="text-text-secondary" />
          <h3 className="font-semibold text-text-primary">{title}</h3>
        </div>
        {isLoggedIn && recentSearches?.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            iconName="Trash2"
            iconSize={14}
            className="text-text-secondary hover:text-error"
          >
            Clear
          </Button>
        )}
      </div>
      {displaySearches?.length === 0 ? (
        <div className="text-center py-8">
          <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg mx-auto mb-3">
            <Icon name="Search" size={24} className="text-text-secondary" />
          </div>
          <p className="text-sm text-text-secondary mb-2">No recent searches</p>
          <p className="text-xs text-text-secondary">
            Your search history will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {displaySearches?.map((search) => (
            <div
              key={search?.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-surface cursor-pointer group transition-colors duration-200"
              onClick={() => onSearchClick(search?.query)}
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex items-center justify-center w-8 h-8 bg-surface rounded-lg">
                  <Icon name={search?.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                    {search?.query}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <span>{search?.category}</span>
                    {isLoggedIn ? (
                      <span>• {formatTimeAgo(search?.timestamp)}</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                        {search?.popularity}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Icon name="CornerDownLeft" size={14} className="text-text-secondary group-hover:text-primary transition-colors duration-200" />
            </div>
          ))}
        </div>
      )}
      {!isLoggedIn && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="bg-gradient-to-r from-primary/5 to-success/5 border border-primary/20 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <Icon name="User" size={16} className="text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  Save Your Search History
                </p>
                <p className="text-xs text-text-secondary">
                  Sign in to track and access your recent conversions
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="LogIn"
                iconSize={14}
                className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentSearches;