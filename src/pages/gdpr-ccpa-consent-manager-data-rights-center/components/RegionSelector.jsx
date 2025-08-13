import React from 'react';
import Icon from '../../../components/AppIcon';

const RegionSelector = ({ currentRegion, onRegionChange }) => {
  const regions = [
    {
      id: 'gdpr',
      name: 'GDPR (EU)',
      description: 'European Union',
      flag: '🇪🇺',
      color: 'blue'
    },
    {
      id: 'ccpa',
      name: 'CCPA (CA)',
      description: 'California, USA',
      flag: '🇺🇸',
      color: 'red'
    },
    {
      id: 'lgpd',
      name: 'LGPD (BR)',
      description: 'Brazil',
      flag: '🇧🇷',
      color: 'green'
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Other regions',
      flag: '🌍',
      color: 'gray'
    }
  ];

  const currentRegionData = regions?.find(r => r?.id === currentRegion);

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg">
        <span className="text-xl" role="img" aria-label={currentRegionData?.description}>
          {currentRegionData?.flag}
        </span>
        <span className="font-medium text-text-primary">
          {currentRegionData?.name}
        </span>
        <Icon name="MapPin" size={16} className="text-text-secondary" />
      </div>
      
      <div className="mt-2 text-xs text-text-secondary text-center">
        Auto-detected: {currentRegionData?.description}
      </div>
    </div>
  );
};

export default RegionSelector;