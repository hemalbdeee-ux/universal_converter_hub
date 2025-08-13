import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AdvancedFeatures = ({ selectedCategory }) => {
  const [activeFeature, setActiveFeature] = useState('batch');
  const [batchInput, setBatchInput] = useState('1, 2, 3, 4, 5');
  const [batchResults, setBatchResults] = useState([]);

  const features = [
    {
      id: 'batch',
      name: 'Batch Processor',
      icon: 'List',
      description: 'Convert multiple values at once'
    },
    {
      id: 'comparison',
      name: 'Comparison Table',
      icon: 'BarChart3',
      description: 'Side-by-side unit comparisons'
    },
    {
      id: 'formula',
      name: 'Formula Builder',
      icon: 'Calculator',
      description: 'Create custom conversion chains'
    }
  ];

  const processBatch = () => {
    const values = batchInput?.split(',')?.map(v => parseFloat(v?.trim()))?.filter(v => !isNaN(v));
    const results = values?.map(value => ({
      input: value,
      output: value * 3.28084, // Example: meters to feet
      unit: 'ft'
    }));
    setBatchResults(results);
  };

  const comparisonData = [
    { unit: 'Meter', value: 1, equivalent: '3.28 feet' },
    { unit: 'Kilometer', value: 1, equivalent: '0.62 miles' },
    { unit: 'Centimeter', value: 1, equivalent: '0.39 inches' },
    { unit: 'Millimeter', value: 1, equivalent: '0.04 inches' }
  ];

  const renderBatchProcessor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Enter values (comma-separated)
        </label>
        <Input
          value={batchInput}
          onChange={(e) => setBatchInput(e?.target?.value)}
          placeholder="1, 2, 3, 4, 5"
          className="font-mono"
        />
      </div>
      
      <Button
        onClick={processBatch}
        iconName="Play"
        iconPosition="left"
        iconSize={16}
        className="w-full"
      >
        Process Batch Conversion
      </Button>

      {batchResults?.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-text-primary">Results:</h4>
          <div className="bg-surface rounded-lg p-4 max-h-48 overflow-y-auto">
            {batchResults?.map((result, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                <span className="font-mono">{result?.input} m</span>
                <Icon name="ArrowRight" size={16} className="text-text-secondary" />
                <span className="font-mono font-semibold">{result?.output?.toFixed(2)} {result?.unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderComparisonTable = () => (
    <div className="space-y-4">
      <div className="bg-surface rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-2 border-b border-border">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-text-primary">
            <span>Unit</span>
            <span>Value</span>
            <span>Equivalent</span>
          </div>
        </div>
        <div className="divide-y divide-border">
          {comparisonData?.map((item, index) => (
            <div key={index} className="px-4 py-3 hover:bg-muted/50 transition-colors duration-200">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <span className="font-medium text-text-primary">{item?.unit}</span>
                <span className="font-mono">{item?.value}</span>
                <span className="text-text-secondary">{item?.equivalent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          iconSize={16}
        >
          Export Table
        </Button>
      </div>
    </div>
  );

  const renderFormulaBuilder = () => (
    <div className="space-y-4">
      <div className="bg-surface rounded-lg p-4">
        <div className="text-center space-y-3">
          <Icon name="Calculator" size={48} className="text-text-secondary mx-auto" />
          <h4 className="font-medium text-text-primary">Custom Formula Builder</h4>
          <p className="text-sm text-text-secondary">
            Create complex conversion chains by combining multiple units and operations.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Input Unit</label>
          <div className="p-3 bg-surface rounded border border-border">
            <span className="font-mono">meters</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Output Unit</label>
          <div className="p-3 bg-surface rounded border border-border">
            <span className="font-mono">feet</span>
          </div>
        </div>
      </div>
      
      <div className="bg-muted rounded-lg p-4">
        <div className="text-center">
          <div className="font-mono text-lg text-text-primary mb-2">
            result = input × 3.28084
          </div>
          <p className="text-xs text-text-secondary">
            Formula: Meters to Feet conversion
          </p>
        </div>
      </div>
      
      <Button
        variant="outline"
        iconName="Save"
        iconPosition="left"
        iconSize={16}
        className="w-full"
      >
        Save Custom Formula
      </Button>
    </div>
  );

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'batch':
        return renderBatchProcessor();
      case 'comparison':
        return renderComparisonTable();
      case 'formula':
        return renderFormulaBuilder();
      default:
        return renderBatchProcessor();
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-brand overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-success/5 px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="Settings" size={18} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Advanced Features</h3>
            <p className="text-sm text-text-secondary">Professional conversion tools</p>
          </div>
        </div>
      </div>
      {/* Feature Tabs */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex space-x-1">
          {features?.map((feature) => (
            <Button
              key={feature?.id}
              variant={activeFeature === feature?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFeature(feature?.id)}
              iconName={feature?.icon}
              iconPosition="left"
              iconSize={16}
              className="transition-all duration-200"
            >
              {feature?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Feature Content */}
      <div className="p-6">
        <div className="mb-4">
          <h4 className="font-medium text-text-primary mb-1">
            {features?.find(f => f?.id === activeFeature)?.name}
          </h4>
          <p className="text-sm text-text-secondary">
            {features?.find(f => f?.id === activeFeature)?.description}
          </p>
        </div>
        
        {renderFeatureContent()}
      </div>
      {/* Pro Features Notice */}
      <div className="px-6 py-4 bg-accent/5 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={16} className="text-accent" />
            <span className="text-sm font-medium text-text-primary">Pro Features Available</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Crown"
            iconPosition="left"
            iconSize={14}
          >
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFeatures;