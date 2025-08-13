import React from 'react';
import Icon from '../../../components/AppIcon';

const AudienceNavigation = ({ activeAudience, setActiveAudience }) => {
  const audiences = [
    {
      id: 'students',
      name: 'Students',
      icon: 'GraduationCap',
      description: 'Homework help & visual learning aids',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      count: '15,000+ Resources'
    },
    {
      id: 'professionals',
      name: 'Professionals',
      icon: 'Briefcase',
      description: 'Industry guides & precision standards',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      count: '8,500+ Guides'
    },
    {
      id: 'general',
      name: 'General Users',
      icon: 'Users',
      description: 'Cultural contexts & everyday applications',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      count: '12,000+ Articles'
    }
  ];

  return (
    <section className="py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Tailored educational content designed for your specific needs and expertise level
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences?.map((audience) => (
            <div
              key={audience?.id}
              onClick={() => setActiveAudience(audience?.id)}
              className={`
                relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-brand-lg
                ${activeAudience === audience?.id 
                  ? `border-primary shadow-brand-lg ${audience?.bgColor}` 
                  : 'border-border bg-background hover:border-primary/30'
                }
              `}
            >
              <div className="text-center">
                <div className={`
                  w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${audience?.color} 
                  flex items-center justify-center shadow-brand
                `}>
                  <Icon name={audience?.icon} size={28} color="white" strokeWidth={2} />
                </div>
                
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {audience?.name}
                </h3>
                
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {audience?.description}
                </p>
                
                <div className={`
                  inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium
                  ${activeAudience === audience?.id ? audience?.textColor : 'text-text-secondary'}
                `}>
                  <Icon name="BookOpen" size={14} />
                  <span>{audience?.count}</span>
                </div>
              </div>
              
              {activeAudience === audience?.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" strokeWidth={3} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceNavigation;