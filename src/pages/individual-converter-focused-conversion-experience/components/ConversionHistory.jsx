import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversionHistory = ({ onHistoryUpdate }) => {
  const [history, setHistory] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock history data
  useEffect(() => {
    const mockHistory = [
      {
        id: 1,
        fromValue: '5',
        fromUnit: 'feet',
        toValue: '1.524',
        toUnit: 'meters',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        conversionType: 'length'
      },
      {
        id: 2,
        fromValue: '100',
        fromUnit: 'USD',
        toValue: '92.15',
        toUnit: 'EUR',
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        conversionType: 'currency'
      },
      {
        id: 3,
        fromValue: '25',
        fromUnit: 'Celsius',
        toValue: '77',
        toUnit: 'Fahrenheit',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        conversionType: 'temperature'
      },
      {
        id: 4,
        fromValue: '10',
        fromUnit: 'feet',
        toValue: '3.048',
        toUnit: 'meters',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        conversionType: 'length'
      },
      {
        id: 5,
        fromValue: '150',
        fromUnit: 'pounds',
        toValue: '68.04',
        toUnit: 'kilograms',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        conversionType: 'weight'
      }
    ];
    setHistory(mockHistory);
  }, []);

  const formatTimestamp = (timestamp) => {
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

  const getConversionIcon = (type) => {
    const icons = {
      length: 'Ruler',
      currency: 'DollarSign',
      temperature: 'Thermometer',
      weight: 'Scale',
      volume: 'Beaker',
      area: 'Square'
    };
    return icons?.[type] || 'Calculator';
  };

  const handleClearHistory = () => {
    setHistory([]);
    onHistoryUpdate && onHistoryUpdate([]);
  };

  const handleRemoveItem = (id) => {
    const updatedHistory = history.filter(item => item?.id !== id);
    setHistory(updatedHistory);
    onHistoryUpdate && onHistoryUpdate(updatedHistory);
  };

  const handleReuseConversion = (item) => {
    // This would typically trigger a callback to populate the main converter
    console.log('Reusing conversion:', item);
  };

  const displayedHistory = isExpanded ? history : history.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-brand">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Recent Conversions</h3>
        </div>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearHistory}
            iconName="Trash2"
            iconSize={14}
            className="text-text-secondary hover:text-destructive"
          >
            Clear All
          </Button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="text-text-secondary mx-auto mb-3 opacity-50" />
          <p className="text-text-secondary">No recent conversions</p>
          <p className="text-sm text-text-secondary mt-1">
            Your conversion history will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedHistory?.map((item) => (
            <div
              key={item?.id}
              className="group flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-primary/5 transition-all duration-200"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="p-2 bg-background rounded-full">
                  <Icon 
                    name={getConversionIcon(item?.conversionType)} 
                    size={16} 
                    className="text-primary" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary">
                      {item?.fromValue} {item?.fromUnit}
                    </span>
                    <Icon name="ArrowRight" size={12} className="text-text-secondary" />
                    <span className="font-medium text-text-primary">
                      {item?.toValue} {item?.toUnit}
                    </span>
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    {formatTimestamp(item?.timestamp)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleReuseConversion(item)}
                  iconName="RotateCcw"
                  iconSize={14}
                  className="h-8 w-8 text-text-secondary hover:text-primary"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(item?.id)}
                  iconName="X"
                  iconSize={14}
                  className="h-8 w-8 text-text-secondary hover:text-destructive"
                />
              </div>
            </div>
          ))}
          
          {history.length > 3 && (
            <div className="text-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
                iconSize={16}
                className="text-text-secondary hover:text-text-primary"
              >
                {isExpanded ? 'Show Less' : `Show ${history.length - 3} More`}
              </Button>
            </div>
          )}
        </div>
      )}
      {/* Export Options */}
      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Export CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
              iconSize={14}
            >
              Share History
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversionHistory;