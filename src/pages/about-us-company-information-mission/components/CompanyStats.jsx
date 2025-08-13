import React from 'react';
import { TrendingUp, CheckCircle, Globe, Users } from 'lucide-react';

const CompanyStats = () => {
  const stats = [
    { value: "50M+", label: "Daily Conversions", icon: TrendingUp },
    { value: "99.99%", label: "Accuracy Guarantee", icon: CheckCircle },
    { value: "200+", label: "Conversion Types", icon: Globe },
    { value: "150+", label: "Countries Served", icon: Users }
  ];

  return (
    <section className="bg-white rounded-lg shadow-sm border p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Global Impact</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats?.map((stat, index) => {
          const IconComponent = stat?.icon;
          return (
            <div key={index} className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <IconComponent className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat?.value}</div>
              <div className="text-sm text-gray-600">{stat?.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CompanyStats;