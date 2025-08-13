import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchStats = ({ query, resultCount, searchTime, filters }) => {
  const stats = {
    totalResults: resultCount || 247,
    searchTime: searchTime || 0.23,
    activeFilters: Object.values(filters || {})?.flat()?.length,
    suggestions: 12,
    categories: 8
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Search" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {formatNumber(stats?.totalResults)} results found in {stats?.searchTime}s
            </span>
          </div>
          
          {query && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">for</span>
              <span className="text-sm font-medium text-text-primary bg-background px-2 py-1 rounded border">
                "{query}"
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6">
          {stats?.activeFilters > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="Filter" size={14} className="text-primary" />
              <span className="text-sm text-primary font-medium">
                {stats?.activeFilters} filter{stats?.activeFilters !== 1 ? 's' : ''} active
              </span>
            </div>
          )}
          
          <div className="flex items-center space-x-1">
            <Icon name="Grid3X3" size={14} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {stats?.categories} categories
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Lightbulb" size={14} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {stats?.suggestions} suggestions
            </span>
          </div>
        </div>
      </div>
      {/* Quick Stats Bar */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-success">98.7%</div>
            <div className="text-xs text-text-secondary">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">2.3M</div>
            <div className="text-xs text-text-secondary">Daily Conversions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-warning">156</div>
            <div className="text-xs text-text-secondary">Converter Types</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">24/7</div>
            <div className="text-xs text-text-secondary">Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchStats;