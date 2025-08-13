import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversionHistory = ({ history, onExport, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredHistory = history
    .filter(item => {
      const matchesSearch = item?.conversion?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           item?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesFilter = filterType === 'all' || item?.category === filterType;
      return matchesSearch && matchesFilter;
    })?.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else if (sortBy === 'category') {
        return a?.category?.localeCompare(b?.category);
      } else if (sortBy === 'frequency') {
        return b?.frequency - a?.frequency;
      }
      return 0;
    });

  const categories = [...new Set(history.map(item => item.category))];

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Conversion History</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('csv')}
              iconName="Download"
              iconPosition="left"
            >
              Export CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('pdf')}
              iconName="FileText"
              iconPosition="left"
            >
              Export PDF
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onClear}
              iconName="Trash2"
              iconPosition="left"
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search conversions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e?.target?.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">All Categories</option>
            {categories?.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="recent">Most Recent</option>
            <option value="category">By Category</option>
            <option value="frequency">Most Used</option>
          </select>
        </div>
      </div>
      {/* History List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredHistory?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="History" size={48} className="mx-auto text-text-secondary mb-4" />
            <p className="text-text-secondary">No conversion history found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredHistory?.map((item, index) => (
              <div key={index} className="p-4 hover:bg-surface transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name={item?.icon} size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{item?.conversion}</p>
                        <p className="text-sm text-text-secondary">{item?.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">{item?.result}</p>
                    <p className="text-xs text-text-secondary">{item?.timestamp}</p>
                    {item?.frequency > 1 && (
                      <p className="text-xs text-accent">Used {item?.frequency} times</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.location.href = `/individual-converter-focused-conversion-experience?type=${item?.type}&preset=${item?.conversion}`}
                    iconName="Repeat"
                    iconSize={16}
                    className="ml-2"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversionHistory;