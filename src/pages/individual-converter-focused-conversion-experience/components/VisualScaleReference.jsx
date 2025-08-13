import React from 'react';
import Icon from '../../../components/AppIcon';

const VisualScaleReference = ({ conversionType, fromValue, toValue, fromUnit, toUnit }) => {
  const getScaleVisualization = () => {
    switch (conversionType) {
      case 'length':
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-secondary">Visual Scale</span>
                <Icon name="Ruler" size={16} className="text-primary" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{fromValue} {fromUnit}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-2 bg-success rounded-full"></div>
                  <span className="text-sm">{toValue} {toUnit}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs text-text-secondary">
              <div className="space-y-1">
                <div className="font-medium">Common References:</div>
                <div>• 1 foot ≈ 30.48 cm</div>
                <div>• 1 meter ≈ 3.28 feet</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Real World:</div>
                <div>• Door height: ~7 feet</div>
                <div>• Car length: ~4.5 meters</div>
              </div>
            </div>
          </div>
        );
      
      case 'weight':
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-secondary">Weight Comparison</span>
                <Icon name="Scale" size={16} className="text-primary" />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                    <Icon name="Package" size={20} color="white" />
                  </div>
                  <div className="text-sm font-medium">{fromValue} {fromUnit}</div>
                </div>
                <Icon name="ArrowRight" size={16} className="text-text-secondary" />
                <div className="text-center">
                  <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mb-2">
                    <Icon name="Package" size={20} color="white" />
                  </div>
                  <div className="text-sm font-medium">{toValue} {toUnit}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs text-text-secondary">
              <div className="space-y-1">
                <div className="font-medium">Common Items:</div>
                <div>• Apple: ~150g</div>
                <div>• Laptop: ~2kg</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Conversions:</div>
                <div>• 1 kg = 2.2 lbs</div>
                <div>• 1 lb = 453.6g</div>
              </div>
            </div>
          </div>
        );
      
      case 'temperature':
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-secondary">Temperature Scale</span>
                <Icon name="Thermometer" size={16} className="text-primary" />
              </div>
              <div className="relative">
                <div className="w-full h-4 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-400 rounded-full"></div>
                <div className="flex justify-between mt-2 text-xs">
                  <span>Cold</span>
                  <span>Moderate</span>
                  <span>Hot</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">{fromValue}°{fromUnit}</div>
                </div>
                <Icon name="ArrowRight" size={16} className="text-text-secondary" />
                <div className="text-center">
                  <div className="text-lg font-semibold text-success">{toValue}°{toUnit}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs text-text-secondary">
              <div className="space-y-1">
                <div className="font-medium">Reference Points:</div>
                <div>• Water freezes: 0°C/32°F</div>
                <div>• Room temp: 20°C/68°F</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Cooking:</div>
                <div>• Baking: 180°C/350°F</div>
                <div>• Water boils: 100°C/212°F</div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-text-secondary">Conversion Reference</span>
              <Icon name="Calculator" size={16} className="text-primary" />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">{fromValue} {fromUnit}</div>
              </div>
              <Icon name="ArrowRight" size={16} className="text-text-secondary" />
              <div className="text-center">
                <div className="text-lg font-semibold text-success">{toValue} {toUnit}</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-brand">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Visual Reference</h3>
      {getScaleVisualization()}
    </div>
  );
};

export default VisualScaleReference;