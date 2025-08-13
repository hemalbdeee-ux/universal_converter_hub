import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningRecommendations = ({ recommendations }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-brand">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <Icon name="BookOpen" size={24} className="mr-2" />
          Learning Recommendations
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/knowledge-center-educational-resources-hub'}
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      {recommendations?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="GraduationCap" size={48} className="mx-auto text-text-secondary mb-4" />
          <p className="text-text-secondary mb-4">No recommendations available yet</p>
          <p className="text-sm text-text-secondary">
            Use more converters to get personalized learning suggestions
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations?.map((recommendation, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg p-4 hover:shadow-brand transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${recommendation?.bgColor} flex-shrink-0`}>
                  <Icon name={recommendation?.icon} size={24} color={recommendation?.iconColor} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">
                        {recommendation?.title}
                      </h3>
                      <p className="text-sm text-text-secondary mb-2">
                        {recommendation?.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <span className="flex items-center">
                          <Icon name="Clock" size={12} className="mr-1" />
                          {recommendation?.readTime}
                        </span>
                        <span className="flex items-center">
                          <Icon name="BarChart3" size={12} className="mr-1" />
                          {recommendation?.difficulty}
                        </span>
                        <span className="flex items-center">
                          <Icon name="Users" size={12} className="mr-1" />
                          {recommendation?.popularity}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {recommendation?.isNew && (
                        <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                          New
                        </span>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = recommendation?.link}
                        iconName="ArrowRight"
                        iconPosition="right"
                      >
                        Learn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {recommendation?.progress && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-text-secondary">Progress</span>
                    <span className="font-medium text-text-primary">
                      {recommendation?.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-success h-2 rounded-full transition-all duration-300"
                      style={{ width: `${recommendation?.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {recommendation?.relatedTopics && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-text-secondary mb-2">Related topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendation?.relatedTopics?.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full cursor-pointer hover:bg-primary/20 transition-colors duration-200"
                        onClick={() => window.location.href = `/knowledge-center-educational-resources-hub?topic=${topic}`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningRecommendations;