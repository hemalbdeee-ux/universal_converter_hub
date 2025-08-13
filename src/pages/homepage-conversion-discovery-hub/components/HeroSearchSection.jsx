import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSearchSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const placeholders = [
    "Convert anything instantly...",
    "100 USD to EUR",
    "5 feet to meters", 
    "350°F to Celsius",
    "1 mile to kilometers",
    "2 cups to liters"
  ];

  const popularSuggestions = [
    { query: "100 USD to EUR", category: "Currency", icon: "DollarSign" },
    { query: "5 feet to meters", category: "Length", icon: "Ruler" },
    { query: "350°F to Celsius", category: "Temperature", icon: "Thermometer" },
    { query: "1 mile to kilometers", category: "Distance", icon: "MapPin" },
    { query: "2 cups to liters", category: "Volume", icon: "Beaker" },
    { query: "1 pound to kg", category: "Weight", icon: "Scale" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchFocused(false);
      setShowSuggestions(false);
    }, 200);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e?.target?.value);
    setShowSuggestions(e?.target?.value?.length > 0 || isSearchFocused);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.query);
    onSearch(suggestion?.query);
    setShowSuggestions(false);
  };

  return (
    <section className="relative bg-gradient-to-br from-background via-surface to-muted py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Title */}
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              Universal{' '}
              <span className="text-gradient-brand">Converter</span>{' '}
              Hub
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
              Transform any measurement instantly with precision, context, and global understanding. 
              The most comprehensive conversion platform trusted by millions worldwide.
            </p>
          </div>

          {/* Hero Search */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative hero-search">
                <Icon 
                  name="Search" 
                  size={24} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary z-10" 
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder={placeholders?.[placeholderIndex]}
                  className={`
                    w-full pl-12 pr-20 py-4 text-lg bg-card border-2 border-border rounded-2xl
                    focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
                    search-enhanced transition-all duration-300 shadow-brand-lg
                    ${isSearchFocused ? 'transform scale-105' : ''}
                  `}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <kbd className="hidden sm:flex px-2 py-1 text-sm font-mono bg-muted border border-border rounded text-text-secondary">
                    ⌘K
                  </kbd>
                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    iconName="ArrowRight"
                    iconSize={16}
                    className="shadow-brand"
                  >
                    Convert
                  </Button>
                </div>
              </div>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-brand-lg z-50 max-h-80 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs font-medium text-text-secondary px-3 py-2 border-b border-border">
                    Popular Conversions
                  </div>
                  {popularSuggestions?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-surface rounded-lg transition-colors duration-200 suggestion-item"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={suggestion?.icon} size={16} className="text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-text-primary">
                          {suggestion?.query}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {suggestion?.category}
                        </div>
                      </div>
                      <Icon name="ArrowUpRight" size={14} className="text-text-secondary" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>99.9% Accuracy Guaranteed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} />
              <span>200+ Countries Supported</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-success/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSearchSection;