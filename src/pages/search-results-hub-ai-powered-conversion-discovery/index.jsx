import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchResultCard from './components/SearchResultCard';
import SearchFilters from './components/SearchFilters';
import TrendingSearches from './components/TrendingSearches';
import SearchSuggestions from './components/SearchSuggestions';
import EducationalContent from './components/EducationalContent';
import RecentSearches from './components/RecentSearches';
import SearchStats from './components/SearchStats';

const SearchResultsHub = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [filters, setFilters] = useState({
    categories: [],
    precision: [],
    context: [],
    difficulty: []
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [isLoggedIn] = useState(false); // Mock login state
  const [searchTime] = useState(0.23);

  // Mock search results data
  const mockResults = [
    {
      id: 'temp-cooking-converter',
      title: 'Cooking Temperature Converter',
      description: 'Convert between Fahrenheit and Celsius for perfect cooking results. Includes oven temperature guides and baking references.',
      category: 'Temperature',
      usageCount: '45.2K',
      accuracy: 99.9,
      conversionPreview: {
        from: { value: '350', unit: '°F' },
        to: { value: '176.7', unit: '°C' }
      },
      isBookmarked: false,
      tags: ['cooking', 'baking', 'oven', 'fahrenheit', 'celsius'],
      difficulty: 'beginner',
      contextType: 'casual'
    },
    {
      id: 'weight-recipe-converter',
      title: 'Recipe Weight Converter',
      description: 'Convert cooking measurements between grams, ounces, pounds, and cups. Perfect for international recipes and precise baking.',
      category: 'Weight',
      usageCount: '32.8K',
      accuracy: 99.5,
      conversionPreview: {
        from: { value: '2', unit: 'cups flour' },
        to: { value: '240', unit: 'grams' }
      },
      isBookmarked: true,
      tags: ['baking', 'cooking', 'recipes', 'grams', 'cups'],
      difficulty: 'beginner',
      contextType: 'casual'
    },
    {
      id: 'length-metric-imperial',
      title: 'Metric to Imperial Length Converter',
      description: 'Professional-grade length conversion between meters, feet, inches, and yards. Includes precision controls for engineering applications.',
      category: 'Length',
      usageCount: '28.4K',
      accuracy: 99.8,
      conversionPreview: {
        from: { value: '5', unit: 'feet' },
        to: { value: '1.524', unit: 'meters' }
      },
      isBookmarked: false,
      tags: ['metric', 'imperial', 'feet', 'meters', 'engineering'],
      difficulty: 'intermediate',
      contextType: 'professional'
    },
    {
      id: 'currency-exchange-live',
      title: 'Live Currency Exchange Converter',
      description: 'Real-time currency conversion with live exchange rates. Supports 195+ currencies with historical data and trend analysis.',
      category: 'Currency',
      usageCount: '67.1K',
      accuracy: 99.9,
      conversionPreview: {
        from: { value: '100', unit: 'USD' },
        to: { value: '92.45', unit: 'EUR' }
      },
      isBookmarked: false,
      tags: ['currency', 'exchange', 'usd', 'eur', 'live-rates'],
      difficulty: 'beginner',
      contextType: 'casual'
    },
    {
      id: 'area-construction-converter',
      title: 'Construction Area Calculator',
      description: 'Convert between square feet, square meters, acres, and hectares. Includes material estimation tools for construction projects.',
      category: 'Area',
      usageCount: '19.6K',
      accuracy: 99.7,
      conversionPreview: {
        from: { value: '1000', unit: 'sq ft' },
        to: { value: '92.9', unit: 'sq m' }
      },
      isBookmarked: false,
      tags: ['area', 'construction', 'square-feet', 'square-meters'],
      difficulty: 'advanced',
      contextType: 'professional'
    },
    {
      id: 'speed-travel-converter',
      title: 'Travel Speed Converter',
      description: 'Convert between mph, km/h, knots, and other speed units. Perfect for travel planning and vehicle specifications.',
      category: 'Speed',
      usageCount: '15.3K',
      accuracy: 99.6,
      conversionPreview: {
        from: { value: '60', unit: 'mph' },
        to: { value: '96.6', unit: 'km/h' }
      },
      isBookmarked: false,
      tags: ['speed', 'travel', 'mph', 'kmh', 'vehicles'],
      difficulty: 'beginner',
      contextType: 'casual'
    }
  ];

  const [results, setResults] = useState(mockResults);
  const [filteredResults, setFilteredResults] = useState(mockResults);

  useEffect(() => {
    const query = searchParams?.get('q');
    if (query) {
      setSearchQuery(query);
      // Simulate search filtering
      let filtered = mockResults?.filter(result => 
        result?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
        result?.description?.toLowerCase()?.includes(query?.toLowerCase()) ||
        result?.tags?.some(tag => tag?.toLowerCase()?.includes(query?.toLowerCase()))
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults(mockResults);
    }
  }, [searchParams]);

  useEffect(() => {
    // Apply filters
    let filtered = results;

    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(result => 
        filters?.categories?.includes(result?.category?.toLowerCase())
      );
    }

    if (filters?.context?.length > 0) {
      filtered = filtered?.filter(result => 
        filters?.context?.includes(result?.contextType)
      );
    }

    if (filters?.difficulty?.length > 0) {
      filtered = filtered?.filter(result => 
        filters?.difficulty?.includes(result?.difficulty)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        filtered?.sort((a, b) => parseFloat(b?.usageCount) - parseFloat(a?.usageCount));
        break;
      case 'accuracy':
        filtered?.sort((a, b) => b?.accuracy - a?.accuracy);
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      default: // relevance
        break;
    }

    setFilteredResults(filtered);
  }, [filters, sortBy, results]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchParams({ q: query });
    setIsSuggestionsVisible(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      precision: [],
      context: [],
      difficulty: []
    });
  };

  const handleQuickConvert = (result) => {
    navigate(`/individual-converter-focused-conversion-experience?converter=${result?.id}`);
  };

  const handleBookmark = (resultId) => {
    setResults(prev => prev?.map(result => 
      result?.id === resultId 
        ? { ...result, isBookmarked: !result?.isBookmarked }
        : result
    ));
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
  };

  const handleTrendingSearchClick = (query) => {
    handleSearch(query);
  };

  const handleRecentSearchClick = (query) => {
    handleSearch(query);
  };

  const handleClearHistory = () => {
    // Mock clear history functionality
    console.log('History cleared');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Search Bar */}
          <div className="mb-8">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <form onSubmit={(e) => { e?.preventDefault(); handleSearch(searchQuery); }}>
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={20} 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      onFocus={() => setIsSuggestionsVisible(true)}
                      onBlur={() => setTimeout(() => setIsSuggestionsVisible(false), 200)}
                      placeholder="Search conversions, units, or formulas..."
                      className="w-full pl-12 pr-16 py-4 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-brand text-lg"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <kbd className="px-2 py-1 text-xs font-mono bg-muted border border-border rounded text-text-secondary">
                        ⌘K
                      </kbd>
                      <Button
                        type="submit"
                        variant="default"
                        size="sm"
                        iconName="Search"
                        iconSize={16}
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </form>
                
                <SearchSuggestions
                  suggestions={[]}
                  onSuggestionClick={handleSuggestionClick}
                  isVisible={isSuggestionsVisible && searchQuery?.length > 0}
                />
              </div>
            </div>
          </div>

          {/* Search Stats */}
          <SearchStats
            query={searchQuery}
            resultCount={filteredResults?.length}
            searchTime={searchTime}
            filters={filters}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Filters */}
              <SearchFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isVisible={isFiltersVisible}
                onToggle={() => setIsFiltersVisible(!isFiltersVisible)}
              />

              {/* Recent/Popular Searches */}
              <RecentSearches
                searches={[]}
                onSearchClick={handleRecentSearchClick}
                onClearHistory={handleClearHistory}
                isLoggedIn={isLoggedIn}
              />

              {/* Trending Searches */}
              <TrendingSearches
                searches={[]}
                onSearchClick={handleTrendingSearchClick}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Sort Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-semibold text-text-primary">
                    Search Results
                  </h2>
                  <span className="text-sm text-text-secondary">
                    {filteredResults?.length} of {results?.length} results
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-text-secondary">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="popularity">Popularity</option>
                    <option value="accuracy">Accuracy</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              {filteredResults?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    No results found
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Try adjusting your search terms or filters
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      iconName="X"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Clear Filters
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSearch('')}
                      iconName="RotateCcw"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Show All
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredResults?.map((result) => (
                    <SearchResultCard
                      key={result?.id}
                      result={result}
                      onQuickConvert={handleQuickConvert}
                      onBookmark={handleBookmark}
                    />
                  ))}
                </div>
              )}

              {/* Educational Content */}
              {searchQuery && (
                <div className="mt-12">
                  <EducationalContent searchQuery={searchQuery} />
                </div>
              )}

              {/* Load More */}
              {filteredResults?.length > 0 && (
                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    iconName="ChevronDown"
                    iconPosition="right"
                    iconSize={16}
                  >
                    Load More Results
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-text-secondary">
              © {new Date()?.getFullYear()} Universal Converter Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchResultsHub;