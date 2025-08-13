import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedArticles = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "The History of Measurement Systems",
      excerpt: `From ancient Egyptian cubits to modern SI units, explore how measurement systems evolved across civilizations.\n\nDiscover how trade, science, and cultural exchange shaped the units we use today.`,
      author: "Dr. Sarah Chen",
      authorRole: "Measurement Historian",
      readTime: "12 min read",
      category: "History",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
      tags: ["History", "Culture", "Standards"],
      publishDate: "2025-01-15",
      views: "45,200"
    },
    {
      id: 2,
      title: "Why Precision Matters in Engineering",
      excerpt: `Understanding tolerance, accuracy, and precision in engineering measurements can mean the difference between success and catastrophic failure.\n\nLearn industry standards and best practices.`,
      author: "Michael Rodriguez",
      authorRole: "Structural Engineer",
      readTime: "8 min read",
      category: "Engineering",
      image: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?w=800&h=400&fit=crop",
      tags: ["Engineering", "Precision", "Safety"],
      publishDate: "2025-01-10",
      views: "32,800"
    },
    {
      id: 3,
      title: "Cultural Differences in Weight and Volume",
      excerpt: `Why Americans use pounds while Europeans use kilograms? Explore cultural preferences in measurement systems.\n\nUnderstand regional variations and their historical origins.`,
      author: "Prof. Elena Vasquez",
      authorRole: "Cultural Anthropologist",
      readTime: "15 min read",
      category: "Culture",
      image: "https://images.pixabay.com/photo/2016/11/29/06/15/adult-1867743_1280.jpg?w=800&h=400&fit=crop",
      tags: ["Culture", "International", "History"],
      publishDate: "2025-01-08",
      views: "28,500"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'History': 'bg-blue-100 text-blue-700',
      'Engineering': 'bg-emerald-100 text-emerald-700',
      'Culture': 'bg-amber-100 text-amber-700'
    };
    return colors?.[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Featured Educational Articles
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Deep-dive into measurement science with expert-authored content that combines theory with practical applications
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredArticles?.map((article) => (
            <article
              key={article?.id}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 conversion-card"
            >
              <div className="relative overflow-hidden h-48">
                <Image
                  src={article?.image}
                  alt={article?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article?.category)}`}>
                    {article?.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <div className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="Eye" size={12} />
                    <span>{article?.views}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{article?.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{new Date(article.publishDate)?.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-text-primary mb-3 leading-tight">
                  {article?.title}
                </h3>
                
                <p className="text-text-secondary mb-4 leading-relaxed line-clamp-3">
                  {article?.excerpt?.split('\n')?.[0]}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article?.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {article?.author?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {article?.author}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {article?.authorRole}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ArrowRight"
                    iconSize={16}
                    className="text-primary hover:text-primary"
                  >
                    Read
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            iconName="BookOpen"
            iconPosition="left"
            iconSize={20}
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;