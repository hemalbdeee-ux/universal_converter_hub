import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversionCalculator = ({ 
  conversionType, 
  fromUnit, 
  toUnit, 
  conversionRate, 
  onConvert,
  precision = 6 
}) => {
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');
  const [isSwapped, setIsSwapped] = useState(false);

  useEffect(() => {
    if (fromValue && !isNaN(fromValue)) {
      const converted = parseFloat(fromValue) * conversionRate;
      setToValue(converted?.toFixed(precision)?.replace(/\.?0+$/, ''));
      onConvert && onConvert(fromValue, converted);
    } else {
      setToValue('');
    }
  }, [fromValue, conversionRate, precision, onConvert]);

  const handleFromValueChange = (e) => {
    const value = e?.target?.value;
    if (value === '' || /^\d*\.?\d*$/?.test(value)) {
      setFromValue(value);
    }
  };

  const handleToValueChange = (e) => {
    const value = e?.target?.value;
    if (value === '' || /^\d*\.?\d*$/?.test(value)) {
      setToValue(value);
      if (value && !isNaN(value)) {
        const converted = parseFloat(value) / conversionRate;
        setFromValue(converted?.toFixed(precision)?.replace(/\.?0+$/, ''));
      } else {
        setFromValue('');
      }
    }
  };

  const handleSwapUnits = () => {
    setIsSwapped(!isSwapped);
    const tempValue = fromValue;
    setFromValue(toValue);
    setToValue(tempValue);
  };

  const handleClear = () => {
    setFromValue('');
    setToValue('');
  };

  const currentFromUnit = isSwapped ? toUnit : fromUnit;
  const currentToUnit = isSwapped ? fromUnit : toUnit;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-brand conversion-card">
      <div className="space-y-6">
        {/* From Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            From ({currentFromUnit})
          </label>
          <div className="relative">
            <input
              type="text"
              value={fromValue}
              onChange={handleFromValueChange}
              placeholder="Enter value"
              className="w-full text-2xl font-semibold bg-surface border border-border rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-lg font-medium text-text-secondary">
                {currentFromUnit}
              </span>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwapUnits}
            iconName="ArrowUpDown"
            iconSize={20}
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          />
        </div>

        {/* To Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">
            To ({currentToUnit})
          </label>
          <div className="relative">
            <input
              type="text"
              value={toValue}
              onChange={handleToValueChange}
              placeholder="Result"
              className="w-full text-2xl font-semibold bg-surface border border-border rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-lg font-medium text-text-secondary">
                {currentToUnit}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleClear}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Clear
          </Button>
          <Button
            variant="default"
            iconName="Copy"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
            onClick={() => {
              navigator.clipboard?.writeText(`${fromValue} ${currentFromUnit} = ${toValue} ${currentToUnit}`);
            }}
          >
            Copy Result
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversionCalculator;