import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FavoriteConverters = ({ favorites, onRemoveFavorite, onUseConverter }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-brand">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Favorite Converters</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/category-landing-comprehensive-converter-collections'}
          iconName="Plus"
          iconPosition="left"
        >
          Add More
        </Button>
      </div>
      {favorites?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Heart" size={48} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary mb-4">No favorite converters yet</p>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/category-landing-comprehensive-converter-collections'}
          >
            Browse Converters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites?.map((favorite, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg p-4 hover:shadow-brand transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${favorite?.bgColor}`}>
                    <Icon name={favorite?.icon} size={20} color={favorite?.iconColor} />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">{favorite?.name}</h3>
                    <p className="text-sm text-text-secondary">{favorite?.category}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveFavorite(favorite?.id)}
                  iconName="Heart"
                  iconSize={16}
                  className="text-error hover:text-error opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Usage:</span>
                  <span className="font-medium text-text-primary">{favorite?.usageCount} times</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Last used:</span>
                  <span className="font-medium text-text-primary">{favorite?.lastUsed}</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${favorite?.usageFrequency}%` }}
                  ></div>
                </div>
                <p className="text-xs text-text-secondary text-center">
                  {favorite?.usageFrequency}% of your conversions
                </p>
              </div>

              <Button
                variant="default"
                size="sm"
                fullWidth
                onClick={() => onUseConverter(favorite)}
                iconName="Calculator"
                iconPosition="left"
              >
                Use Now
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteConverters;