import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomConverterCard = ({ converter, onEdit, onDelete, onDuplicate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-brand hover:shadow-brand-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${converter?.bgColor}`}>
            <Icon name={converter?.icon} size={20} color={converter?.iconColor} />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{converter?.name}</h3>
            <p className="text-sm text-text-secondary">{converter?.description}</p>
          </div>
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMenuToggle}
            iconName="MoreVertical"
            iconSize={16}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          />
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-brand-lg z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    onEdit(converter);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                >
                  <Icon name="Edit" size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    onDuplicate(converter);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                >
                  <Icon name="Copy" size={16} />
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(converter);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-error hover:bg-error/10 transition-colors duration-200"
                >
                  <Icon name="Trash2" size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Conversions:</span>
          <span className="font-medium text-text-primary">{converter?.conversions}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Last used:</span>
          <span className="font-medium text-text-primary">{converter?.lastUsed}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Accuracy:</span>
          <span className="font-medium text-success">{converter?.accuracy}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {converter?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-surface text-text-secondary rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = `/individual-converter-focused-conversion-experience?type=${converter?.type}`}
          >
            Use Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomConverterCard;