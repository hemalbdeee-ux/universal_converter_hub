import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ filters, onFilterChange, onClearFilters, isVisible, onToggle }) => {
  const categories = [
    { id: 'length', label: 'Length & Distance', count: 24 },
    { id: 'weight', label: 'Weight & Mass', count: 18 },
    { id: 'temperature', label: 'Temperature', count: 12 },
    { id: 'volume', label: 'Volume & Capacity', count: 21 },
    { id: 'area', label: 'Area & Surface', count: 15 },
    { id: 'speed', label: 'Speed & Velocity', count: 9 },
    { id: 'time', label: 'Time & Date', count: 14 },
    { id: 'energy', label: 'Energy & Power', count: 16 },
    { id: 'pressure', label: 'Pressure', count: 11 },
    { id: 'currency', label: 'Currency', count: 195 }
  ];

  const precisionLevels = [
    { id: 'standard', label: 'Standard (2 decimals)', count: 156 },
    { id: 'high', label: 'High (4 decimals)', count: 89 },
    { id: 'scientific', label: 'Scientific (8 decimals)', count: 34 }
  ];

  const contextTypes = [
    { id: 'professional', label: 'Professional', icon: 'Briefcase', count: 78 },
    { id: 'educational', label: 'Educational', icon: 'GraduationCap', count: 92 },
    { id: 'casual', label: 'Casual', icon: 'Home', count: 145 }
  ];

  const difficultyLevels = [
    { id: 'beginner', label: 'Beginner', color: 'text-success', count: 167 },
    { id: 'intermediate', label: 'Intermediate', color: 'text-warning', count: 98 },
    { id: 'advanced', label: 'Advanced', color: 'text-error', count: 45 }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...(filters?.categories || []), categoryId]
      : (filters?.categories || [])?.filter(id => id !== categoryId);
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePrecisionChange = (precisionId, checked) => {
    const newPrecision = checked
      ? [...(filters?.precision || []), precisionId]
      : (filters?.precision || [])?.filter(id => id !== precisionId);
    onFilterChange({ ...filters, precision: newPrecision });
  };

  const handleContextChange = (contextId, checked) => {
    const newContext = checked
      ? [...(filters?.context || []), contextId]
      : (filters?.context || [])?.filter(id => id !== contextId);
    onFilterChange({ ...filters, context: newContext });
  };

  const handleDifficultyChange = (difficultyId, checked) => {
    const newDifficulty = checked
      ? [...(filters?.difficulty || []), difficultyId]
      : (filters?.difficulty || [])?.filter(id => id !== difficultyId);
    onFilterChange({ ...filters, difficulty: newDifficulty });
  };

  const getActiveFilterCount = () => {
    return (filters?.categories?.length || 0) + 
           (filters?.precision?.length || 0) + 
           (filters?.context?.length || 0) + 
           (filters?.difficulty?.length || 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-text-secondary" />
          <h3 className="font-semibold text-text-primary">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconSize={14}
              className="text-text-secondary hover:text-text-primary"
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            iconName={isVisible ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            className="text-text-secondary hover:text-text-primary lg:hidden"
          />
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isVisible ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">Categories</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories?.map((category) => (
                <div key={category?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={category?.label}
                    checked={filters?.categories?.includes(category?.id) || false}
                    onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                    className="flex-1"
                  />
                  <span className="text-xs text-text-secondary ml-2">{category?.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Precision Level */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">Precision Level</h4>
            <div className="space-y-2">
              {precisionLevels?.map((precision) => (
                <div key={precision?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={precision?.label}
                    checked={filters?.precision?.includes(precision?.id) || false}
                    onChange={(e) => handlePrecisionChange(precision?.id, e?.target?.checked)}
                    className="flex-1"
                  />
                  <span className="text-xs text-text-secondary ml-2">{precision?.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Context Type */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">Context Type</h4>
            <div className="space-y-2">
              {contextTypes?.map((context) => (
                <div key={context?.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <Checkbox
                      checked={filters?.context?.includes(context?.id) || false}
                      onChange={(e) => handleContextChange(context?.id, e?.target?.checked)}
                    />
                    <Icon name={context?.icon} size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{context?.label}</span>
                  </div>
                  <span className="text-xs text-text-secondary ml-2">{context?.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">Difficulty Level</h4>
            <div className="space-y-2">
              {difficultyLevels?.map((difficulty) => (
                <div key={difficulty?.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <Checkbox
                      checked={filters?.difficulty?.includes(difficulty?.id) || false}
                      onChange={(e) => handleDifficultyChange(difficulty?.id, e?.target?.checked)}
                    />
                    <span className={`text-sm font-medium ${difficulty?.color}`}>
                      {difficulty?.label}
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary ml-2">{difficulty?.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;