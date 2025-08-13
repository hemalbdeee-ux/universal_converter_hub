import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExpertContributions = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Measurement Standards Physicist",
      organization: "National Institute of Standards",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      expertise: ["Metrology", "Quantum Standards", "Precision Measurement"],
      credentials: "PhD Physics, 15+ years NIST experience",
      contributions: 23,
      rating: 4.9,
      bio: `Dr. Chen leads research in quantum-based measurement standards and has contributed to the redefinition of the kilogram.\n\nHer work focuses on atomic clocks and fundamental constants that form the basis of modern measurement systems.`,
      recentArticles: [
        {
          title: "The Future of Quantum Metrology",
          date: "2025-01-05",
          readTime: "12 min",
          category: "Research"
        },
        {
          title: "Understanding Measurement Uncertainty",
          date: "2024-12-28",
          readTime: "8 min",
          category: "Education"
        }
      ],
      specialization: "Quantum measurement standards and atomic precision"
    },
    {
      id: 2,
      name: "Prof. Michael Rodriguez",
      title: "Structural Engineering Professor",
      organization: "MIT Engineering",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      expertise: ["Structural Analysis", "Building Codes", "Material Science"],
      credentials: "PE License, PhD Structural Engineering",
      contributions: 31,
      rating: 4.8,
      bio: `Professor Rodriguez specializes in international building standards and has consulted on major infrastructure projects worldwide.\n\nHis expertise in measurement precision has prevented numerous structural failures.`,
      recentArticles: [
        {
          title: "Precision in Structural Measurements",
          date: "2025-01-03",
          readTime: "15 min",
          category: "Engineering"
        },
        {
          title: "International Building Code Conversions",
          date: "2024-12-30",
          readTime: "10 min",
          category: "Standards"
        }
      ],
      specialization: "Structural engineering precision and international standards"
    },
    {
      id: 3,
      name: "Chef Elena Vasquez",
      title: "Culinary Institute Director",
      organization: "International Culinary Academy",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      expertise: ["Recipe Development", "Food Science", "International Cuisine"],
      credentials: "Certified Master Chef, 20+ years experience",
      contributions: 18,
      rating: 4.9,
      bio: `Chef Vasquez has trained thousands of professional chefs and specializes in recipe scaling and international cooking measurements.\n\nHer expertise bridges traditional cooking methods with modern precision techniques.`,
      recentArticles: [
        {
          title: "The Science of Recipe Scaling",
          date: "2025-01-01",
          readTime: "9 min",
          category: "Culinary"
        },
        {
          title: "International Cooking Measurements",
          date: "2024-12-25",
          readTime: "7 min",
          category: "Culture"
        }
      ],
      specialization: "Culinary measurements and recipe precision"
    },
    {
      id: 4,
      name: "Dr. James Thompson",
      title: "Pharmaceutical Research Scientist",
      organization: "Global Pharma Research",
      avatar: "https://randomuser.me/api/portraits/men/38.jpg",
      expertise: ["Drug Development", "Laboratory Standards", "Quality Control"],
      credentials: "PhD Chemistry, FDA Consultant",
      contributions: 27,
      rating: 4.7,
      bio: `Dr. Thompson ensures measurement accuracy in pharmaceutical manufacturing where precision can be life-saving.\n\nHis work in analytical chemistry has established industry standards for drug measurement protocols.`,
      recentArticles: [
        {
          title: "Precision in Pharmaceutical Measurements",
          date: "2024-12-29",
          readTime: "14 min",
          category: "Science"
        },
        {
          title: "Laboratory Calibration Standards",
          date: "2024-12-22",
          readTime: "11 min",
          category: "Standards"
        }
      ],
      specialization: "Pharmaceutical measurement precision and quality standards"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Research': 'bg-blue-100 text-blue-700',
      'Education': 'bg-green-100 text-green-700',
      'Engineering': 'bg-purple-100 text-purple-700',
      'Standards': 'bg-orange-100 text-orange-700',
      'Culinary': 'bg-red-100 text-red-700',
      'Culture': 'bg-pink-100 text-pink-700',
      'Science': 'bg-teal-100 text-teal-700'
    };
    return colors?.[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Expert Contributions
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Learn from industry professionals and researchers who ensure measurement accuracy across critical applications
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {experts?.map((expert) => (
            <div
              key={expert?.id}
              className={`
                bg-card border border-border rounded-2xl p-6 shadow-brand hover:shadow-brand-lg 
                transition-all duration-300 cursor-pointer conversion-card
                ${selectedExpert === expert?.id ? 'ring-2 ring-primary' : ''}
              `}
              onClick={() => setSelectedExpert(selectedExpert === expert?.id ? null : expert?.id)}
            >
              <div className="text-center mb-4">
                <div className="relative inline-block mb-4">
                  <Image
                    src={expert?.avatar}
                    alt={expert?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" strokeWidth={3} />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {expert?.name}
                </h3>
                <p className="text-sm text-text-secondary mb-2">
                  {expert?.title}
                </p>
                <p className="text-xs text-text-secondary">
                  {expert?.organization}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Articles:</span>
                  <span className="font-medium text-text-primary">{expert?.contributions}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-accent fill-current" />
                    <span className="font-medium text-text-primary">{expert?.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {expert?.expertise?.slice(0, 2)?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {expert?.expertise?.length > 2 && (
                    <span className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-md">
                      +{expert?.expertise?.length - 2}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={selectedExpert === expert?.id ? "ChevronUp" : "ChevronDown"}
                  iconSize={16}
                  className="w-full text-primary hover:text-primary"
                >
                  {selectedExpert === expert?.id ? "Less Info" : "View Profile"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Expert Detail Modal */}
        {selectedExpert && (
          <div className="bg-card border border-border rounded-2xl p-8 shadow-brand-lg">
            {(() => {
              const expert = experts?.find(e => e?.id === selectedExpert);
              return (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Expert Info */}
                  <div className="lg:col-span-1">
                    <div className="text-center mb-6">
                      <Image
                        src={expert?.avatar}
                        alt={expert?.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                      />
                      <h3 className="text-2xl font-bold text-text-primary mb-2">
                        {expert?.name}
                      </h3>
                      <p className="text-text-secondary mb-1">
                        {expert?.title}
                      </p>
                      <p className="text-sm text-text-secondary mb-4">
                        {expert?.organization}
                      </p>
                      
                      <div className="bg-surface rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-text-primary mb-2">Credentials</h4>
                        <p className="text-sm text-text-secondary">
                          {expert?.credentials}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-text-primary">{expert?.contributions}</div>
                          <div className="text-text-secondary">Articles</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <Icon name="Star" size={16} className="text-accent fill-current" />
                            <span className="font-semibold text-text-primary">{expert?.rating}</span>
                          </div>
                          <div className="text-text-secondary">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Bio and Articles */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-text-primary mb-4">
                        About {expert?.name?.split(' ')?.[1]}
                      </h4>
                      <p className="text-text-secondary leading-relaxed mb-4">
                        {expert?.bio?.split('\n')?.[0]}
                      </p>
                      <p className="text-text-secondary leading-relaxed">
                        {expert?.bio?.split('\n')?.[2]}
                      </p>
                      
                      <div className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-success/5 rounded-lg">
                        <h5 className="font-medium text-text-primary mb-2">Specialization:</h5>
                        <p className="text-sm text-text-secondary">
                          {expert?.specialization}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold text-text-primary mb-4">
                        Recent Articles
                      </h4>
                      <div className="space-y-4">
                        {expert?.recentArticles?.map((article, index) => (
                          <div
                            key={index}
                            className="bg-surface rounded-lg p-4 hover:shadow-brand transition-shadow duration-200"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium text-text-primary leading-tight">
                                {article?.title}
                              </h5>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ml-4 ${getCategoryColor(article?.category)}`}>
                                {article?.category}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-text-secondary">
                              <div className="flex items-center space-x-1">
                                <Icon name="Calendar" size={14} />
                                <span>{new Date(article.date)?.toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Icon name="Clock" size={14} />
                                <span>{article?.readTime}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold text-text-primary mb-4">
                        Expertise Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {expert?.expertise?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-primary/10 text-primary text-sm rounded-lg font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            iconName="Users"
            iconPosition="left"
            iconSize={20}
          >
            Become a Contributing Expert
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExpertContributions;