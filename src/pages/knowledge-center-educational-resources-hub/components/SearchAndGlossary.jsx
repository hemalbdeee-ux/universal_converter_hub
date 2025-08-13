import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchAndGlossary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState(null);

  const categories = [
    { id: 'all', name: 'All Terms', count: 156 },
    { id: 'units', name: 'Units', count: 45 },
    { id: 'systems', name: 'Systems', count: 23 },
    { id: 'concepts', name: 'Concepts', count: 38 },
    { id: 'tools', name: 'Tools', count: 28 },
    { id: 'standards', name: 'Standards', count: 22 }
  ];

  const glossaryTerms = [
    {
      id: 1,
      term: "SI Units",
      category: "systems",
      pronunciation: "es-eye YOO-nits",
      definition: `The International System of Units, the modern form of the metric system and the world's most widely used system of measurement.\n\nEstablished by international agreement, it provides a logical and interconnected framework for all measurements in science, industry, and commerce.`,
      examples: ["meter (length)", "kilogram (mass)", "second (time)", "ampere (electric current)"],
      relatedTerms: ["Metric System", "Base Units", "Derived Units"],
      difficulty: "Beginner"
    },
    {
      id: 2,
      term: "Precision",
      category: "concepts",
      pronunciation: "pri-SIZH-uhn",
      definition: `The degree of exactness or accuracy with which a measurement is made or stated.\n\nIn measurement science, precision refers to the consistency of repeated measurements, while accuracy refers to how close measurements are to the true value.`,
      examples: ["±0.001 mm tolerance", "3 significant figures", "Calibrated instruments"],
      relatedTerms: ["Accuracy", "Tolerance", "Uncertainty"],
      difficulty: "Intermediate"
    },
    {
      id: 3,
      term: "Calibration",
      category: "tools",
      pronunciation: "kal-uh-BRAY-shuhn",
      definition: `The process of configuring an instrument to provide accurate measurements by comparing it with a known standard.\n\nRegular calibration ensures measurement instruments maintain their accuracy over time and environmental changes.`,
      examples: ["Scale calibration with known weights", "Thermometer ice point check", "Ruler comparison to standard"],
      relatedTerms: ["Standards", "Traceability", "Verification"],
      difficulty: "Intermediate"
    },
    {
      id: 4,
      term: "Significant Figures",
      category: "concepts",
      pronunciation: "sig-NIF-i-kuhnt FIG-yerz",
      definition: `The digits in a number that carry meaningful information about its precision.\n\nThey indicate the reliability of a measurement and are crucial for proper calculation and reporting of results.`,
      examples: ["123.45 has 5 sig figs", "0.00456 has 3 sig figs", "1200 has 2-4 sig figs"],
      relatedTerms: ["Precision", "Rounding", "Scientific Notation"],
      difficulty: "Beginner"
    },
    {
      id: 5,
      term: "Traceability",
      category: "standards",
      pronunciation: "TRAY-suh-bil-i-tee",
      definition: `The ability to trace a measurement result through an unbroken chain of comparisons to national or international standards.\n\nEnsures that measurements made anywhere in the world can be compared with confidence.`,
      examples: ["NIST reference standards", "Certified reference materials", "Calibration certificates"],
      relatedTerms: ["Standards", "Calibration", "Uncertainty"],
      difficulty: "Advanced"
    },
    {
      id: 6,
      term: "Unit Conversion",
      category: "concepts",
      pronunciation: "YOO-nit kuhn-VUR-zhuhn",
      definition: `The process of changing a measurement from one unit to another while maintaining the same physical quantity.\n\nRequires understanding of conversion factors and dimensional analysis to ensure accuracy.`,
      examples: ["1 meter = 3.28084 feet", "1 kilogram = 2.20462 pounds", "32°F = 0°C"],
      relatedTerms: ["Conversion Factor", "Dimensional Analysis", "Equivalent Units"],
      difficulty: "Beginner"
    }
  ];

  const filteredTerms = glossaryTerms?.filter(term => {
    const matchesSearch = term?.term?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         term?.definition?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = activeCategory === 'all' || term?.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700'
    };
    return colors?.[difficulty] || 'bg-gray-100 text-gray-700';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'units': 'Ruler',
      'systems': 'Grid3X3',
      'concepts': 'Lightbulb',
      'tools': 'Wrench',
      'standards': 'Award'
    };
    return icons?.[category] || 'BookOpen';
  };

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Search & Glossary
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Find specific conversion guidance and explore our comprehensive glossary of measurement terms and concepts
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
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
              placeholder="Search terms, definitions, or concepts..."
              className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-brand"
            />
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200
                ${activeCategory === category?.id
                  ? 'border-primary bg-primary text-white shadow-brand'
                  : 'border-border bg-background text-text-secondary hover:border-primary/30 hover:text-text-primary'
                }
              `}
            >
              {category?.id !== 'all' && (
                <Icon name={getCategoryIcon(category?.id)} size={16} />
              )}
              <span className="font-medium">{category?.name}</span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs
                ${activeCategory === category?.id
                  ? 'bg-white/20 text-white' :'bg-surface text-text-secondary'
                }
              `}>
                {category?.count}
              </span>
            </button>
          ))}
        </div>
        
        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-text-secondary">
            Showing {filteredTerms?.length} of {glossaryTerms?.length} terms
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
        
        {/* Glossary Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms?.map((term) => (
            <div
              key={term?.id}
              className={`
                bg-card border border-border rounded-xl p-6 shadow-brand hover:shadow-brand-lg 
                transition-all duration-300 cursor-pointer conversion-card
                ${selectedTerm === term?.id ? 'ring-2 ring-primary' : ''}
              `}
              onClick={() => setSelectedTerm(selectedTerm === term?.id ? null : term?.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    {term?.term}
                  </h3>
                  <p className="text-sm text-text-secondary italic">
                    /{term?.pronunciation}/
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(term?.difficulty)}`}>
                    {term?.difficulty}
                  </span>
                  <Icon name={getCategoryIcon(term?.category)} size={16} className="text-text-secondary" />
                </div>
              </div>
              
              <p className="text-text-secondary leading-relaxed mb-4 line-clamp-3">
                {term?.definition?.split('\n')?.[0]}
              </p>
              
              {selectedTerm === term?.id && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-text-secondary leading-relaxed">
                    {term?.definition?.split('\n')?.[2]}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {term?.examples?.map((example, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                          <Icon name="ArrowRight" size={12} className="text-primary" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">Related Terms:</h4>
                    <div className="flex flex-wrap gap-2">
                      {term?.relatedTerms?.map((relatedTerm, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-md border border-border hover:border-primary cursor-pointer transition-colors duration-200"
                        >
                          {relatedTerm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-xs text-text-secondary capitalize">
                  {term?.category}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={selectedTerm === term?.id ? "ChevronUp" : "ChevronDown"}
                  iconSize={16}
                  className="text-primary hover:text-primary"
                >
                  {selectedTerm === term?.id ? "Less" : "More"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTerms?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No terms found
            </h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your search query or selecting a different category
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
            >
              Clear Filters
            </Button>
          </div>
        )}
        
        <div className="text-center mt-12">
          <div className="bg-card border border-border rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="HelpCircle" size={24} className="text-primary" />
              <h3 className="text-lg font-semibold text-text-primary">
                Can't find what you're looking for?
              </h3>
            </div>
            <p className="text-text-secondary mb-4">
              Our glossary is constantly growing. Suggest new terms or request clarification on existing definitions.
            </p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Suggest a Term
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchAndGlossary;