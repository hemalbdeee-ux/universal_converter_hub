import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchResultCard = ({ result, onQuickConvert, onBookmark }) => {
  const {
    id,
    title,
    description,
    category,
    usageCount,
    accuracy,
    conversionPreview,
    isBookmarked,
    tags,
    difficulty,
    contextType
  } = result;

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-success bg-success/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getContextIcon = (type) => {
    switch (type) {
      case 'professional': return 'Briefcase';
      case 'educational': return 'GraduationCap';
      case 'casual': return 'Home';
      default: return 'Calculator';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-lg transition-all duration-300 conversion-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={getContextIcon(contextType)} size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary capitalize">{category}</span>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
          <p className="text-sm text-text-secondary line-clamp-2">{description}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBookmark(id)}
          iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
          iconSize={18}
          className={`ml-4 ${isBookmarked ? 'text-warning' : 'text-text-secondary hover:text-warning'}`}
        />
      </div>
      {/* Conversion Preview */}
      {conversionPreview && (
        <div className="bg-surface border border-border rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-center">
                <div className="text-lg font-semibold text-text-primary">{conversionPreview?.from?.value}</div>
                <div className="text-xs text-text-secondary">{conversionPreview?.from?.unit}</div>
              </div>
              <Icon name="ArrowRight" size={16} className="text-text-secondary" />
              <div className="text-center">
                <div className="text-lg font-semibold text-success">{conversionPreview?.to?.value}</div>
                <div className="text-xs text-text-secondary">{conversionPreview?.to?.unit}</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickConvert(result)}
              iconName="Calculator"
              iconPosition="left"
              iconSize={14}
            >
              Try Now
            </Button>
          </div>
        </div>
      )}
      {/* Tags */}
      {tags && tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.slice(0, 4)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags?.length > 4 && (
            <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
              +{tags?.length - 4} more
            </span>
          )}
        </div>
      )}
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>Used {usageCount} times today</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Target" size={14} />
            <span>{accuracy}% accuracy</span>
          </div>
        </div>
        <Link
          to={`/individual-converter-focused-conversion-experience?converter=${id}`}
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default SearchResultCard;