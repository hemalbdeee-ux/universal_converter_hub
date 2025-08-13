import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchSuggestions = ({ suggestions, onSuggestionClick, isVisible }) => {
  const searchSuggestions = [
    {
      id: 1,
      text: "fahrenheit to celsius cooking",
      type: "conversion",
      category: "Temperature",
      icon: "Thermometer",
      formula: "°C = (°F - 32) × 5/9"
    },
    {
      id: 2,
      text: "pounds to kilograms weight",
      type: "conversion",
      category: "Weight",
      icon: "Scale",
      formula: "kg = lb ÷ 2.205"
    },
    {
      id: 3,
      text: "miles per hour to kilometers",
      type: "conversion",
      category: "Speed",
      icon: "Gauge",
      formula: "km/h = mph × 1.609"
    },
    {
      id: 4,
      text: "cups to milliliters baking",
      type: "conversion",
      category: "Volume",
      icon: "Beaker",
      formula: "ml = cups × 236.588"
    },
    {
      id: 5,
      text: "square feet to square meters",
      type: "conversion",
      category: "Area",
      icon: "Square",
      formula: "m² = ft² × 0.0929"
    },
    {
      id: 6,
      text: "oven temperature guide",
      type: "guide",
      category: "Educational",
      icon: "BookOpen",
      description: "Complete cooking temperature reference"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-brand-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="flex items-center justify-between px-3 py-2 text-xs text-text-secondary border-b border-border mb-2">
          <span>Suggestions</span>
          <span>Press ↵ to search</span>
        </div>
        
        <div className="space-y-1">
          {searchSuggestions?.map((suggestion) => (
            <div
              key={suggestion?.id}
              className="flex items-center justify-between p-3 rounded-md hover:bg-surface cursor-pointer group transition-colors duration-200"
              onClick={() => onSuggestionClick(suggestion?.text)}
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                  <Icon name={suggestion?.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                    {suggestion?.text}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {suggestion?.category}
                    {suggestion?.formula && (
                      <span className="ml-2 font-mono">{suggestion?.formula}</span>
                    )}
                    {suggestion?.description && (
                      <span className="ml-2">{suggestion?.description}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                  {suggestion?.type}
                </div>
                <Icon name="CornerDownLeft" size={12} className="text-text-secondary group-hover:text-primary transition-colors duration-200" />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-2 pt-2">
          <div className="flex items-center justify-between px-3 py-2 text-xs text-text-secondary">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs">↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs">↵</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;