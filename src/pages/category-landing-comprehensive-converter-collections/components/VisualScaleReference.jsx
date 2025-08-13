import React from 'react';
import Icon from '../../../components/AppIcon';

const VisualScaleReference = ({ selectedCategory }) => {
  const scaleData = {
    length: {
      title: 'Length Scale Reference',
      icon: 'Ruler',
      color: 'blue',
      references: [
        { unit: '1 mm', description: 'Thickness of a credit card', visual: '|' },
        { unit: '1 cm', description: 'Width of a fingernail', visual: '|——|' },
        { unit: '1 m', description: 'Height of a door handle', visual: '|————————|' },
        { unit: '1 km', description: '12-minute walk', visual: '|————————————————|' }
      ]
    },
    weight: {
      title: 'Weight Scale Reference',
      icon: 'Scale',
      color: 'emerald',
      references: [
        { unit: '1 g', description: 'Weight of a paperclip', visual: '○' },
        { unit: '100 g', description: 'Weight of a smartphone', visual: '●' },
        { unit: '1 kg', description: 'Weight of a laptop', visual: '●●' },
        { unit: '10 kg', description: 'Weight of a car tire', visual: '●●●●' }
      ]
    },
    temperature: {
      title: 'Temperature Scale Reference',
      icon: 'Thermometer',
      color: 'red',
      references: [
        { unit: '0°C', description: 'Water freezes', visual: '❄️' },
        { unit: '20°C', description: 'Room temperature', visual: '🏠' },
        { unit: '37°C', description: 'Human body temperature', visual: '🌡️' },
        { unit: '100°C', description: 'Water boils', visual: '💨' }
      ]
    },
    volume: {
      title: 'Volume Scale Reference',
      icon: 'Beaker',
      color: 'cyan',
      references: [
        { unit: '1 mL', description: 'A few drops of water', visual: '💧' },
        { unit: '250 mL', description: 'A cup of coffee', visual: '☕' },
        { unit: '1 L', description: 'A water bottle', visual: '🍼' },
        { unit: '4 L', description: 'A gallon of milk', visual: '🥛' }
      ]
    },
    currency: {
      title: 'Currency Market Indicators',
      icon: 'DollarSign',
      color: 'green',
      references: [
        { unit: 'USD', description: 'World reserve currency', visual: '💵' },
        { unit: 'EUR', description: 'European single currency', visual: '💶' },
        { unit: 'GBP', description: 'British pound sterling', visual: '💷' },
        { unit: 'JPY', description: 'Japanese yen', visual: '💴' }
      ]
    }
  };

  const currentScale = scaleData?.[selectedCategory] || scaleData?.length;

  return (
    <div className="bg-card border border-border rounded-xl shadow-brand overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r from-${currentScale?.color}-50 to-${currentScale?.color}-100 px-6 py-4 border-b border-border`}>
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg bg-${currentScale?.color}-500 flex items-center justify-center`}>
            <Icon name={currentScale?.icon} size={18} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{currentScale?.title}</h3>
            <p className="text-sm text-text-secondary">Visual understanding aids</p>
          </div>
        </div>
      </div>
      {/* Scale References */}
      <div className="p-6">
        <div className="space-y-4">
          {currentScale?.references?.map((ref, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-surface rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className="text-2xl">{ref?.visual}</div>
              <div className="flex-1">
                <div className="font-mono font-semibold text-text-primary">{ref?.unit}</div>
                <div className="text-sm text-text-secondary">{ref?.description}</div>
              </div>
              <div className={`w-2 h-8 bg-gradient-to-t from-${currentScale?.color}-200 to-${currentScale?.color}-500 rounded-full`}></div>
            </div>
          ))}
        </div>

        {/* Interactive Scale */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center space-y-3">
            <h4 className="font-medium text-text-primary">Interactive Scale Visualization</h4>
            <div className="relative h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-full overflow-hidden">
              <div className={`absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-${currentScale?.color}-400 to-${currentScale?.color}-500 rounded-full transition-all duration-1000`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-white drop-shadow">Scale Reference</span>
              </div>
            </div>
            <p className="text-xs text-text-secondary">
              Visual representation helps understand relative sizes and measurements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualScaleReference;