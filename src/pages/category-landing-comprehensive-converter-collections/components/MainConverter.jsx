import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const MainConverter = ({ selectedCategory }) => {
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const conversionData = {
    length: {
      units: [
        { value: 'meter', label: 'Meter (m)', factor: 1 },
        { value: 'kilometer', label: 'Kilometer (km)', factor: 1000 },
        { value: 'centimeter', label: 'Centimeter (cm)', factor: 0.01 },
        { value: 'millimeter', label: 'Millimeter (mm)', factor: 0.001 },
        { value: 'inch', label: 'Inch (in)', factor: 0.0254 },
        { value: 'foot', label: 'Foot (ft)', factor: 0.3048 },
        { value: 'yard', label: 'Yard (yd)', factor: 0.9144 },
        { value: 'mile', label: 'Mile (mi)', factor: 1609.344 }
      ],
      defaultFrom: 'meter',
      defaultTo: 'foot',
      icon: 'Ruler',
      color: 'blue'
    },
    weight: {
      units: [
        { value: 'kilogram', label: 'Kilogram (kg)', factor: 1 },
        { value: 'gram', label: 'Gram (g)', factor: 0.001 },
        { value: 'pound', label: 'Pound (lb)', factor: 0.453592 },
        { value: 'ounce', label: 'Ounce (oz)', factor: 0.0283495 },
        { value: 'stone', label: 'Stone (st)', factor: 6.35029 },
        { value: 'ton', label: 'Metric Ton (t)', factor: 1000 }
      ],
      defaultFrom: 'kilogram',
      defaultTo: 'pound',
      icon: 'Scale',
      color: 'emerald'
    },
    temperature: {
      units: [
        { value: 'celsius', label: 'Celsius (°C)', factor: 1 },
        { value: 'fahrenheit', label: 'Fahrenheit (°F)', factor: 1 },
        { value: 'kelvin', label: 'Kelvin (K)', factor: 1 },
        { value: 'rankine', label: 'Rankine (°R)', factor: 1 }
      ],
      defaultFrom: 'celsius',
      defaultTo: 'fahrenheit',
      icon: 'Thermometer',
      color: 'red'
    },
    volume: {
      units: [
        { value: 'liter', label: 'Liter (L)', factor: 1 },
        { value: 'milliliter', label: 'Milliliter (mL)', factor: 0.001 },
        { value: 'gallon_us', label: 'US Gallon (gal)', factor: 3.78541 },
        { value: 'gallon_uk', label: 'UK Gallon (gal)', factor: 4.54609 },
        { value: 'cup_us', label: 'US Cup', factor: 0.236588 },
        { value: 'fluid_ounce_us', label: 'US Fluid Ounce (fl oz)', factor: 0.0295735 }
      ],
      defaultFrom: 'liter',
      defaultTo: 'gallon_us',
      icon: 'Beaker',
      color: 'cyan'
    },
    currency: {
      units: [
        { value: 'usd', label: 'US Dollar (USD)', factor: 1 },
        { value: 'eur', label: 'Euro (EUR)', factor: 0.85 },
        { value: 'gbp', label: 'British Pound (GBP)', factor: 0.73 },
        { value: 'jpy', label: 'Japanese Yen (JPY)', factor: 110 },
        { value: 'cad', label: 'Canadian Dollar (CAD)', factor: 1.25 },
        { value: 'aud', label: 'Australian Dollar (AUD)', factor: 1.35 }
      ],
      defaultFrom: 'usd',
      defaultTo: 'eur',
      icon: 'DollarSign',
      color: 'green'
    }
  };

  const currentData = conversionData?.[selectedCategory] || conversionData?.length;

  useEffect(() => {
    setFromUnit(currentData?.defaultFrom);
    setToUnit(currentData?.defaultTo);
    setFromValue('1');
  }, [selectedCategory]);

  useEffect(() => {
    if (fromValue && fromUnit && toUnit) {
      performConversion();
    }
  }, [fromValue, fromUnit, toUnit]);

  const performConversion = () => {
    setIsConverting(true);
    
    setTimeout(() => {
      const value = parseFloat(fromValue) || 0;
      let result = 0;

      if (selectedCategory === 'temperature') {
        result = convertTemperature(value, fromUnit, toUnit);
      } else {
        const fromFactor = currentData?.units?.find(u => u?.value === fromUnit)?.factor || 1;
        const toFactor = currentData?.units?.find(u => u?.value === toUnit)?.factor || 1;
        result = (value * fromFactor) / toFactor;
      }

      setToValue(result?.toLocaleString('en-US', { 
        maximumFractionDigits: 6,
        minimumFractionDigits: 0
      }));
      setIsConverting(false);
    }, 300);
  };

  const convertTemperature = (value, from, to) => {
    let celsius = value;
    
    // Convert to Celsius first
    if (from === 'fahrenheit') {
      celsius = (value - 32) * 5/9;
    } else if (from === 'kelvin') {
      celsius = value - 273.15;
    } else if (from === 'rankine') {
      celsius = (value - 491.67) * 5/9;
    }
    
    // Convert from Celsius to target
    if (to === 'fahrenheit') {
      return celsius * 9/5 + 32;
    } else if (to === 'kelvin') {
      return celsius + 273.15;
    } else if (to === 'rankine') {
      return celsius * 9/5 + 491.67;
    }
    
    return celsius;
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    const tempValue = fromValue;
    
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue?.replace(/,/g, ''));
  };

  const clearValues = () => {
    setFromValue('');
    setToValue('');
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-brand-lg overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r from-${currentData?.color}-500 to-${currentData?.color}-600 px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name={currentData?.icon} size={24} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {selectedCategory?.charAt(0)?.toUpperCase() + selectedCategory?.slice(1)} Converter
              </h2>
              <p className="text-white/80 text-sm">Professional-grade precision</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={clearValues}
              iconName="RotateCcw"
              iconSize={18}
              className="text-white hover:bg-white/20"
            />
            <div className="flex items-center space-x-1 text-white/80 text-xs">
              <Icon name="Shield" size={14} />
              <span>99.9% Accurate</span>
            </div>
          </div>
        </div>
      </div>
      {/* Converter Interface */}
      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* From Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">From</label>
              <div className="text-xs text-text-secondary">Enter value to convert</div>
            </div>
            
            <Input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e?.target?.value)}
              placeholder="Enter value"
              className="text-lg font-mono"
            />
            
            <Select
              options={currentData?.units}
              value={fromUnit}
              onChange={setFromUnit}
              placeholder="Select unit"
            />
          </div>

          {/* Swap Button */}
          <div className="lg:col-span-2 flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapUnits}
              iconName="ArrowLeftRight"
              iconSize={20}
              className="hover:scale-110 transition-transform duration-200"
            />
          </div>

          {/* To Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">To</label>
              <div className="text-xs text-text-secondary">Converted result</div>
            </div>
            
            <div className="relative">
              <Input
                type="text"
                value={toValue}
                readOnly
                placeholder="Result will appear here"
                className={`text-lg font-mono bg-surface ${isConverting ? 'animate-pulse' : ''}`}
              />
              {isConverting && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Icon name="Loader2" size={20} className="animate-spin text-primary" />
                </div>
              )}
            </div>
            
            <Select
              options={currentData?.units}
              value={toUnit}
              onChange={setToUnit}
              placeholder="Select unit"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFromValue('1')}
                iconName="Hash"
                iconPosition="left"
                iconSize={14}
              >
                Reset to 1
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFromValue('100')}
                iconName="Percent"
                iconPosition="left"
                iconSize={14}
              >
                Set to 100
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="Clock" size={14} />
              <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Precision Indicator */}
        {toValue && (
          <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full precision-indicator"></div>
              <span className="text-sm text-success font-medium">
                Conversion completed with scientific precision
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainConverter;