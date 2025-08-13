import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedConversions = ({ currentConversion, conversionType }) => {
  const getRelatedConversions = () => {
    const conversions = {
      'feet-to-meters': [
        { from: 'Meters', to: 'Yards', path: '/individual-converter-focused-conversion-experience?type=meters-to-yards', popular: true },
        { from: 'Inches', to: 'Centimeters', path: '/individual-converter-focused-conversion-experience?type=inches-to-centimeters', popular: true },
        { from: 'Feet', to: 'Inches', path: '/individual-converter-focused-conversion-experience?type=feet-to-inches', popular: false },
        { from: 'Meters', to: 'Kilometers', path: '/individual-converter-focused-conversion-experience?type=meters-to-kilometers', popular: false },
        { from: 'Yards', to: 'Feet', path: '/individual-converter-focused-conversion-experience?type=yards-to-feet', popular: false },
        { from: 'Centimeters', to: 'Millimeters', path: '/individual-converter-focused-conversion-experience?type=centimeters-to-millimeters', popular: false }
      ],
      'usd-to-eur': [
        { from: 'EUR', to: 'GBP', path: '/individual-converter-focused-conversion-experience?type=eur-to-gbp', popular: true },
        { from: 'USD', to: 'GBP', path: '/individual-converter-focused-conversion-experience?type=usd-to-gbp', popular: true },
        { from: 'USD', to: 'JPY', path: '/individual-converter-focused-conversion-experience?type=usd-to-jpy', popular: false },
        { from: 'EUR', to: 'JPY', path: '/individual-converter-focused-conversion-experience?type=eur-to-jpy', popular: false },
        { from: 'USD', to: 'CAD', path: '/individual-converter-focused-conversion-experience?type=usd-to-cad', popular: false },
        { from: 'EUR', to: 'CHF', path: '/individual-converter-focused-conversion-experience?type=eur-to-chf', popular: false }
      ],
      'celsius-to-fahrenheit': [
        { from: 'Fahrenheit', to: 'Kelvin', path: '/individual-converter-focused-conversion-experience?type=fahrenheit-to-kelvin', popular: true },
        { from: 'Celsius', to: 'Kelvin', path: '/individual-converter-focused-conversion-experience?type=celsius-to-kelvin', popular: true },
        { from: 'Kelvin', to: 'Rankine', path: '/individual-converter-focused-conversion-experience?type=kelvin-to-rankine', popular: false },
        { from: 'Fahrenheit', to: 'Rankine', path: '/individual-converter-focused-conversion-experience?type=fahrenheit-to-rankine', popular: false }
      ],
      'pounds-to-kilograms': [
        { from: 'Kilograms', to: 'Grams', path: '/individual-converter-focused-conversion-experience?type=kilograms-to-grams', popular: true },
        { from: 'Pounds', to: 'Ounces', path: '/individual-converter-focused-conversion-experience?type=pounds-to-ounces', popular: true },
        { from: 'Stones', to: 'Pounds', path: '/individual-converter-focused-conversion-experience?type=stones-to-pounds', popular: false },
        { from: 'Tons', to: 'Kilograms', path: '/individual-converter-focused-conversion-experience?type=tons-to-kilograms', popular: false },
        { from: 'Grams', to: 'Ounces', path: '/individual-converter-focused-conversion-experience?type=grams-to-ounces', popular: false }
      ]
    };

    return conversions?.[currentConversion] || conversions?.['feet-to-meters'];
  };

  const relatedConversions = getRelatedConversions();
  const popularConversions = relatedConversions?.filter(conv => conv?.popular);
  const otherConversions = relatedConversions?.filter(conv => !conv?.popular);

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-brand">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="TrendingUp" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Related Conversions</h3>
      </div>
      {/* Popular Conversions */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Star" size={16} className="text-accent" />
          <h4 className="font-medium text-text-primary">Users also convert:</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularConversions?.map((conversion, index) => (
            <Link
              key={index}
              to={conversion?.path}
              className="group p-3 bg-surface border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="ArrowRight" size={14} className="text-text-secondary group-hover:text-primary" />
                  <span className="text-sm font-medium text-text-primary">
                    {conversion?.from} to {conversion?.to}
                  </span>
                </div>
                <Icon name="ExternalLink" size={12} className="text-text-secondary group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Other Related Conversions */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">More {conversionType} conversions:</h4>
        <div className="space-y-2">
          {otherConversions?.map((conversion, index) => (
            <Link
              key={index}
              to={conversion?.path}
              className="group flex items-center justify-between p-2 rounded-lg hover:bg-surface transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <Icon name="ArrowRight" size={12} className="text-text-secondary group-hover:text-primary" />
                <span className="text-sm text-text-secondary group-hover:text-text-primary">
                  {conversion?.from} to {conversion?.to}
                </span>
              </div>
              <Icon name="ChevronRight" size={12} className="text-text-secondary group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
      {/* Quick Access */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Bookmark"
            iconPosition="left"
            iconSize={14}
          >
            Save to Favorites
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            iconPosition="left"
            iconSize={14}
          >
            Share Converter
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="History"
            iconPosition="left"
            iconSize={14}
          >
            View History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedConversions;