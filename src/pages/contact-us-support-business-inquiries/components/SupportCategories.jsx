import React from 'react';
import { HelpCircle, Wrench, Building2, Camera, GraduationCap } from 'lucide-react';

const SupportCategories = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    {
      id: 'general',
      label: 'General Support',
      icon: HelpCircle,
      description: 'Account help, basic questions, and general assistance'
    },
    {
      id: 'technical',
      label: 'Technical Issues',
      icon: Wrench,
      description: 'Bug reports, conversion errors, and platform issues'
    },
    {
      id: 'business',
      label: 'Business Partnerships',
      icon: Building2,
      description: 'Enterprise solutions, API access, and collaboration'
    },
    {
      id: 'media',
      label: 'Media Inquiries',
      icon: Camera,
      description: 'Press releases, interviews, and media relations'
    },
    {
      id: 'education',
      label: 'Educational Licensing',
      icon: GraduationCap,
      description: 'Classroom resources, bulk licenses, and institution partnerships'
    }
  ];

  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">How can we help you?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => {
          const IconComponent = category?.icon;
          return (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`
                p-4 rounded-lg border transition-all duration-200 text-left
                ${activeCategory === category?.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center gap-3 mb-2">
                <IconComponent className={`h-6 w-6 ${
                  activeCategory === category?.id ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <h3 className={`font-medium ${
                  activeCategory === category?.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {category?.label}
                </h3>
              </div>
              <p className="text-sm text-gray-600">{category?.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SupportCategories;