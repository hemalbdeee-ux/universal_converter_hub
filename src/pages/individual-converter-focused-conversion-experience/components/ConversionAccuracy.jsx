import React from 'react';
import Icon from '../../../components/AppIcon';

const ConversionAccuracy = ({ conversionType, accuracy = "99.99%", lastUpdated }) => {
  const getAccuracyBadges = () => {
    const badges = [
      {
        icon: 'Shield',
        label: 'Scientific Validation',
        description: 'Verified against international standards',
        color: 'text-success'
      },
      {
        icon: 'Target',
        label: `${accuracy} Accuracy`,
        description: 'Precision guaranteed to 6 decimal places',
        color: 'text-primary'
      },
      {
        icon: 'Clock',
        label: 'Real-time Updates',
        description: lastUpdated || 'Updated: Dec 7, 2025 2:50 PM',
        color: 'text-accent'
      }
    ];

    return badges;
  };

  const getValidationInfo = () => {
    switch (conversionType) {
      case 'currency':
        return {
          source: 'European Central Bank & Federal Reserve',
          methodology: 'Real-time exchange rates with 15-minute updates',
          certification: 'ISO 4217 Currency Code Standard'
        };
      case 'length':
        return {
          source: 'International Bureau of Weights and Measures',
          methodology: 'SI base unit definitions (meter standard)',
          certification: 'NIST Measurement Standards'
        };
      case 'weight':
        return {
          source: 'International Committee for Weights and Measures',
          methodology: 'Kilogram redefinition (Planck constant)',
          certification: 'BIPM International Standards'
        };
      case 'temperature':
        return {
          source: 'International Temperature Scale (ITS-90)',
          methodology: 'Thermodynamic temperature definitions',
          certification: 'NIST Temperature Standards'
        };
      default:
        return {
          source: 'International Standards Organization',
          methodology: 'Peer-reviewed conversion factors',
          certification: 'ISO/IEC Measurement Standards'
        };
    }
  };

  const validationInfo = getValidationInfo();

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-brand">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Award" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Accuracy Guarantee</h3>
      </div>
      {/* Accuracy Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {getAccuracyBadges()?.map((badge, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-surface rounded-lg validation-badge">
            <div className={`p-2 rounded-full bg-background ${badge?.color}`}>
              <Icon name={badge?.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-text-primary text-sm">{badge?.label}</div>
              <div className="text-xs text-text-secondary mt-1">{badge?.description}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Validation Details */}
      <div className="border-t border-border pt-4">
        <h4 className="font-medium text-text-primary mb-3">Validation Details</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Data Source:</span>
            <span className="text-text-primary font-medium">{validationInfo?.source}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Methodology:</span>
            <span className="text-text-primary font-medium">{validationInfo?.methodology}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Certification:</span>
            <span className="text-text-primary font-medium">{validationInfo?.certification}</span>
          </div>
        </div>
      </div>
      {/* Precision Explanation */}
      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-primary mb-1">Precision Note</div>
            <div className="text-text-secondary">
              Results are calculated using double-precision floating-point arithmetic and rounded to 6 significant digits for optimal accuracy across all conversion ranges.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionAccuracy;