import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConverterManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const converters = [
    {
      id: 1,
      name: "Length Converter",
      category: "Physical",
      status: "active",
      accuracy: "99.99%",
      lastUpdated: "2025-01-05",
      usageCount: "1.2M",
      factors: 156,
      validation: "scientific"
    },
    {
      id: 2,
      name: "Currency Converter",
      category: "Financial",
      status: "active",
      accuracy: "99.95%",
      lastUpdated: "2025-01-07",
      usageCount: "2.8M",
      factors: 168,
      validation: "real-time"
    },
    {
      id: 3,
      name: "Temperature Converter",
      category: "Physical",
      status: "active",
      accuracy: "100%",
      lastUpdated: "2025-01-03",
      usageCount: "890K",
      factors: 12,
      validation: "scientific"
    },
    {
      id: 4,
      name: "Weight Converter",
      category: "Physical",
      status: "maintenance",
      accuracy: "99.98%",
      lastUpdated: "2025-01-06",
      usageCount: "654K",
      factors: 89,
      validation: "scientific"
    },
    {
      id: 5,
      name: "Digital Storage",
      category: "Digital",
      status: "active",
      accuracy: "100%",
      lastUpdated: "2025-01-04",
      usageCount: "432K",
      factors: 24,
      validation: "standard"
    },
    {
      id: 6,
      name: "Energy Converter",
      category: "Physical",
      status: "inactive",
      accuracy: "99.97%",
      lastUpdated: "2024-12-28",
      usageCount: "123K",
      factors: 67,
      validation: "scientific"
    }
  ];

  const categories = ['all', 'Physical', 'Financial', 'Digital'];

  const filteredConverters = converters?.filter(converter => {
    const matchesSearch = converter?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || converter?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleConverterStatus = (id) => {
    // Mock toggle functionality
    console.log(`Toggling converter ${id}`);
  };

  const updateConverter = (id) => {
    // Mock update functionality
    console.log(`Updating converter ${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'maintenance':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'inactive':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getValidationBadge = (validation) => {
    switch (validation) {
      case 'scientific':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'real-time':
        return 'bg-success/10 text-success border-success/20';
      case 'standard':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Converter Management</h2>
            <p className="text-sm text-text-secondary mt-1">
              Manage conversion factors, accuracy standards, and validation workflows
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="Download" iconPosition="left" size="sm">
              Export Data
            </Button>
            <Button variant="default" iconName="Plus" iconPosition="left" size="sm">
              Add Converter
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search converters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-2">
            {categories?.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">Converter</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">Accuracy</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">Usage</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">Validation</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">Last Updated</th>
              <th className="text-right py-3 px-6 text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredConverters?.map((converter) => (
              <tr key={converter?.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Calculator" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{converter?.name}</p>
                      <p className="text-xs text-text-secondary">{converter?.factors} factors</p>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(converter?.status)}`}>
                    {converter?.status}
                  </span>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-text-primary">{converter?.accuracy}</span>
                    <Icon name="CheckCircle" size={14} className="text-success" />
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <span className="text-sm text-text-primary">{converter?.usageCount}</span>
                </td>
                
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getValidationBadge(converter?.validation)}`}>
                    {converter?.validation}
                  </span>
                </td>
                
                <td className="py-4 px-6">
                  <span className="text-sm text-text-secondary">{converter?.lastUpdated}</span>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateConverter(converter?.id)}
                      iconName="Edit"
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleConverterStatus(converter?.id)}
                      iconName={converter?.status === 'active' ? 'Pause' : 'Play'}
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MoreHorizontal"
                      iconSize={16}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConverterManagement;