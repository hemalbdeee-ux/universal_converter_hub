import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EducationalContent = ({ searchQuery }) => {
  const educationalContent = [
    {
      id: 1,
      title: "Understanding Temperature Scales",
      description: `Temperature conversion is fundamental in cooking, science, and daily life. The Celsius scale is based on water's freezing (0°C) and boiling (100°C) points.\n\nFahrenheit, primarily used in the US, sets water's freezing at 32°F and boiling at 212°F. The conversion formula °C = (°F - 32) × 5/9 helps bridge these systems.`,
      category: "Temperature",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=200&fit=crop",
      tags: ["Celsius", "Fahrenheit", "Cooking", "Science"],
      type: "guide"
    },
    {
      id: 2,
      title: "Metric vs Imperial: A Historical Perspective",
      description: `The metric system, developed during the French Revolution, provides a decimal-based measurement system used by most of the world.\n\nThe Imperial system, rooted in British tradition, remains primary in the US. Understanding both systems is crucial for global communication and trade.`,
      category: "Measurement Systems",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?w=400&h=200&fit=crop",
      tags: ["Metric", "Imperial", "History", "Global"],
      type: "article"
    },
    {
      id: 3,
      title: "Precision in Conversions: When Accuracy Matters",
      description: `Different applications require different levels of precision. Cooking might need standard precision (2 decimals), while engineering requires high precision (4+ decimals).\n\nUnderstanding significant figures and rounding rules ensures your conversions match the required accuracy for your specific use case.`,
      category: "Precision",
      readTime: "4 min read",
      image: "https://images.pixabay.com/photo/2016/11/29/06/18/mathematics-1867285_1280.jpg?w=400&h=200&fit=crop",
      tags: ["Precision", "Engineering", "Accuracy", "Mathematics"],
      type: "tutorial"
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'guide': return 'BookOpen';
      case 'article': return 'FileText';
      case 'tutorial': return 'PlayCircle';
      default: return 'Info';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'guide': return 'text-primary bg-primary/10';
      case 'article': return 'text-success bg-success/10';
      case 'tutorial': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="GraduationCap" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Learn More</h3>
        </div>
        <Link
          to="/knowledge-center-educational-resources-hub"
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
        >
          View All Resources →
        </Link>
      </div>
      <div className="space-y-6">
        {educationalContent?.map((content) => (
          <div key={content?.id} className="group">
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              {/* Image */}
              <div className="lg:w-48 lg:flex-shrink-0">
                <div className="relative overflow-hidden rounded-lg bg-surface h-32 lg:h-24">
                  <Image
                    src={content?.image}
                    alt={content?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(content?.type)}`}>
                      <Icon name={getTypeIcon(content?.type)} size={12} />
                      <span className="capitalize">{content?.type}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors duration-200 mb-1">
                      {content?.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-text-secondary mb-2">
                      <span className="font-medium text-primary">{content?.category}</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{content?.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-text-secondary line-clamp-3 mb-3">
                  {content?.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {content?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Call to Action */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-gradient-to-r from-primary/5 to-success/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name="Lightbulb" size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary mb-1">
                Need Help with Conversions?
              </h4>
              <p className="text-sm text-text-secondary mb-3">
                Our Knowledge Center has comprehensive guides, tutorials, and reference materials to help you master any conversion.
              </p>
              <Link
                to="/knowledge-center-educational-resources-hub"
                className="inline-flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <span>Explore Knowledge Center</span>
                <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalContent;