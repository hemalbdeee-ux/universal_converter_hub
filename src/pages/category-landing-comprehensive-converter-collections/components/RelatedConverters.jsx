import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedConverters = ({ selectedCategory }) => {
  const allConverters = {
    length: [
      { id: 'area', name: 'Area & Surface', icon: 'Square', description: 'Convert square units', color: 'green' },
      { id: 'volume', name: 'Volume & Capacity', icon: 'Beaker', description: 'Convert volume units', color: 'cyan' },
      { id: 'speed', name: 'Speed & Velocity', icon: 'Gauge', description: 'Convert speed units', color: 'purple' }
    ],
    weight: [
      { id: 'volume', name: 'Volume & Capacity', icon: 'Beaker', description: 'Convert volume units', color: 'cyan' },
      { id: 'energy', name: 'Energy & Power', icon: 'Zap', description: 'Convert energy units', color: 'yellow' },
      { id: 'pressure', name: 'Pressure', icon: 'Activity', description: 'Convert pressure units', color: 'indigo' }
    ],
    temperature: [
      { id: 'energy', name: 'Energy & Power', icon: 'Zap', description: 'Convert energy units', color: 'yellow' },
      { id: 'pressure', name: 'Pressure', icon: 'Activity', description: 'Convert pressure units', color: 'indigo' },
      { id: 'speed', name: 'Speed & Velocity', icon: 'Gauge', description: 'Convert speed units', color: 'purple' }
    ],
    volume: [
      { id: 'weight', name: 'Weight & Mass', icon: 'Scale', description: 'Convert weight units', color: 'emerald' },
      { id: 'length', name: 'Length & Distance', icon: 'Ruler', description: 'Convert length units', color: 'blue' },
      { id: 'area', name: 'Area & Surface', icon: 'Square', description: 'Convert area units', color: 'green' }
    ],
    currency: [
      { id: 'digital', name: 'Digital Storage', icon: 'HardDrive', description: 'Convert data units', color: 'slate' },
      { id: 'time', name: 'Time & Date', icon: 'Clock', description: 'Convert time units', color: 'amber' },
      { id: 'angle', name: 'Angle & Rotation', icon: 'RotateCw', description: 'Convert angle units', color: 'pink' }
    ]
  };

  const recentConversions = [
    { from: '100', fromUnit: 'USD', to: '85.23', toUnit: 'EUR', time: '2 min ago' },
    { from: '5', fromUnit: 'feet', to: '1.52', toUnit: 'meters', time: '5 min ago' },
    { from: '32', fromUnit: '°F', to: '0', toUnit: '°C', time: '8 min ago' },
    { from: '1', fromUnit: 'gallon', to: '3.79', toUnit: 'liters', time: '12 min ago' }
  ];

  const relatedConverters = allConverters?.[selectedCategory] || allConverters?.length;

  return (
    <div className="space-y-6">
      {/* Related Converters */}
      <div className="bg-card border border-border rounded-xl shadow-brand overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-success flex items-center justify-center">
              <Icon name="Link" size={18} color="white" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Related Converters</h3>
              <p className="text-sm text-text-secondary">Explore similar conversion tools</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {relatedConverters?.map((converter) => (
              <Link
                key={converter?.id}
                to={`/individual-converter-focused-conversion-experience?category=${converter?.id}`}
                className="block group"
              >
                <div className="flex items-center space-x-4 p-4 bg-surface rounded-lg hover:bg-muted/50 transition-all duration-200 group-hover:shadow-brand">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${converter?.color}-500 to-${converter?.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon name={converter?.icon} size={24} color="white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                      {converter?.name}
                    </h4>
                    <p className="text-sm text-text-secondary">{converter?.description}</p>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-text-secondary group-hover:text-primary transition-colors duration-200" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <Link to="/category-landing-comprehensive-converter-collections">
              <Button
                variant="outline"
                iconName="Grid3X3"
                iconPosition="left"
                iconSize={16}
                className="w-full"
              >
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Recent Conversions */}
      <div className="bg-card border border-border rounded-xl shadow-brand overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Icon name="History" size={18} color="white" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Recent Conversions</h3>
                <p className="text-sm text-text-secondary">Your conversion history</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              iconSize={16}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {recentConversions?.map((conversion, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="font-mono text-sm">
                    <span className="font-semibold text-text-primary">{conversion?.from}</span>
                    <span className="text-text-secondary ml-1">{conversion?.fromUnit}</span>
                  </div>
                  <Icon name="ArrowRight" size={14} className="text-text-secondary" />
                  <div className="font-mono text-sm">
                    <span className="font-semibold text-text-primary">{conversion?.to}</span>
                    <span className="text-text-secondary ml-1">{conversion?.toUnit}</span>
                  </div>
                </div>
                <div className="text-xs text-text-secondary">{conversion?.time}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <Link to="/user-dashboard-personalized-conversion-management">
              <Button
                variant="outline"
                iconName="BarChart3"
                iconPosition="left"
                iconSize={16}
                className="w-full"
              >
                View Full History
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Quick Tips */}
      <div className="bg-gradient-to-br from-primary/5 to-success/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
            <Icon name="Lightbulb" size={18} className="text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Pro Tip</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Use keyboard shortcuts for faster conversions: Press Tab to switch between input fields, 
              Enter to convert, and Ctrl+Shift+C to copy results to clipboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedConverters;