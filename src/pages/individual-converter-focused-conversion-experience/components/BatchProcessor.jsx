import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BatchProcessor = ({ conversionType, fromUnit, toUnit, conversionRate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [batchInput, setBatchInput] = useState('');
  const [batchResults, setBatchResults] = useState([]);
  const [processingMode, setProcessingMode] = useState('list'); // 'list' or 'range'
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [rangeStep, setRangeStep] = useState('1');

  const processBatchList = () => {
    const values = batchInput?.split(/[,\n\s]+/)?.map(v => v?.trim())?.filter(v => v && !isNaN(v))?.map(v => parseFloat(v));

    const results = values?.map(value => ({
      input: value,
      output: (value * conversionRate)?.toFixed(6)?.replace(/\.?0+$/, ''),
      formatted: `${value} ${fromUnit} = ${(value * conversionRate)?.toFixed(6)?.replace(/\.?0+$/, '')} ${toUnit}`
    }));

    setBatchResults(results);
  };

  const processBatchRange = () => {
    const start = parseFloat(rangeStart);
    const end = parseFloat(rangeEnd);
    const step = parseFloat(rangeStep);

    if (isNaN(start) || isNaN(end) || isNaN(step) || step <= 0) {
      return;
    }

    const results = [];
    for (let value = start; value <= end; value += step) {
      results?.push({
        input: value,
        output: (value * conversionRate)?.toFixed(6)?.replace(/\.?0+$/, ''),
        formatted: `${value} ${fromUnit} = ${(value * conversionRate)?.toFixed(6)?.replace(/\.?0+$/, '')} ${toUnit}`
      });
    }

    setBatchResults(results);
  };

  const handleProcess = () => {
    if (processingMode === 'list') {
      processBatchList();
    } else {
      processBatchRange();
    }
  };

  const handleClear = () => {
    setBatchInput('');
    setBatchResults([]);
    setRangeStart('');
    setRangeEnd('');
    setRangeStep('1');
  };

  const handleExport = () => {
    const csvContent = [
      `Input (${fromUnit}),Output (${toUnit})`,
      ...batchResults?.map(result => `${result?.input},${result?.output}`)
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch_conversion_${fromUnit}_to_${toUnit}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const handleCopyResults = () => {
    const textContent = batchResults?.map(result => result?.formatted)?.join('\n');
    navigator.clipboard?.writeText(textContent);
  };

  if (!isExpanded) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 shadow-brand">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(true)}
          iconName="Layers"
          iconPosition="left"
          iconSize={16}
          className="w-full"
        >
          Batch Process Multiple Values
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-brand">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Layers" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Batch Processor</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(false)}
          iconName="X"
          iconSize={16}
          className="text-text-secondary hover:text-text-primary"
        />
      </div>
      {/* Processing Mode Toggle */}
      <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1">
        <button
          onClick={() => setProcessingMode('list')}
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center
            ${processingMode === 'list' ?'bg-primary text-primary-foreground shadow-brand' :'text-text-secondary hover:text-text-primary hover:bg-background'
            }
          `}
        >
          <Icon name="List" size={16} />
          <span>Value List</span>
        </button>
        <button
          onClick={() => setProcessingMode('range')}
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center
            ${processingMode === 'range' ?'bg-primary text-primary-foreground shadow-brand' :'text-text-secondary hover:text-text-primary hover:bg-background'
            }
          `}
        >
          <Icon name="BarChart3" size={16} />
          <span>Range</span>
        </button>
      </div>
      {/* Input Section */}
      <div className="space-y-4 mb-6">
        {processingMode === 'list' ? (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Enter values (comma or line separated):
            </label>
            <textarea
              value={batchInput}
              onChange={(e) => setBatchInput(e?.target?.value)}
              placeholder={`1, 2, 3, 4, 5\nor\n1\n2\n3\n4\n5`}
              className="w-full h-24 px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Start"
              type="number"
              value={rangeStart}
              onChange={(e) => setRangeStart(e?.target?.value)}
              placeholder="0"
            />
            <Input
              label="End"
              type="number"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(e?.target?.value)}
              placeholder="100"
            />
            <Input
              label="Step"
              type="number"
              value={rangeStep}
              onChange={(e) => setRangeStep(e?.target?.value)}
              placeholder="1"
            />
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-3 mb-6">
        <Button
          variant="default"
          onClick={handleProcess}
          iconName="Play"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
          disabled={
            processingMode === 'list' 
              ? !batchInput?.trim() 
              : !rangeStart || !rangeEnd || !rangeStep
          }
        >
          Process
        </Button>
        <Button
          variant="outline"
          onClick={handleClear}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
        >
          Clear
        </Button>
      </div>
      {/* Results Section */}
      {batchResults?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-text-primary">
              Results ({batchResults?.length} conversions)
            </h4>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyResults}
                iconName="Copy"
                iconSize={14}
              >
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                iconName="Download"
                iconSize={14}
              >
                Export CSV
              </Button>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto bg-surface rounded-lg border border-border">
            <div className="grid grid-cols-2 gap-px bg-border">
              <div className="bg-surface px-3 py-2 font-medium text-text-primary text-sm">
                Input ({fromUnit})
              </div>
              <div className="bg-surface px-3 py-2 font-medium text-text-primary text-sm">
                Output ({toUnit})
              </div>
            </div>
            {batchResults?.map((result, index) => (
              <div key={index} className="grid grid-cols-2 gap-px bg-border">
                <div className="bg-card px-3 py-2 text-sm text-text-primary">
                  {result?.input}
                </div>
                <div className="bg-card px-3 py-2 text-sm text-text-primary font-medium">
                  {result?.output}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">
                {batchResults?.length}
              </div>
              <div className="text-xs text-text-secondary">Total Values</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-success">
                {Math.min(...batchResults?.map(r => r?.input))}
              </div>
              <div className="text-xs text-text-secondary">Min Input</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-accent">
                {Math.max(...batchResults?.map(r => r?.input))}
              </div>
              <div className="text-xs text-text-secondary">Max Input</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-text-primary">
                {(batchResults?.reduce((sum, r) => sum + r?.input, 0) / batchResults?.length)?.toFixed(2)}
              </div>
              <div className="text-xs text-text-secondary">Average</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchProcessor;