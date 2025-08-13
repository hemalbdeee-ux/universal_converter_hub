import React from 'react';
import { Building2 } from 'lucide-react';

const CompanyTimeline = () => {
  const milestones = [
    { year: "2020", event: "Platform Launch", description: "Started with a mission to democratize accurate conversion tools" },
    { year: "2021", event: "1 Million Users", description: "Reached our first million monthly active users" },
    { year: "2022", event: "Educational Partnerships", description: "Partnered with 50+ universities worldwide for curriculum integration" },
    { year: "2023", event: "Algorithm Enhancement", description: "Achieved 99.99% accuracy through advanced validation systems" },
    { year: "2024", event: "Global Recognition", description: "Recognized by International Bureau of Weights and Measures" },
    { year: "2025", event: "50M Daily Conversions", description: "Processing over 50 million accurate conversions daily" }
  ];

  return (
    <section className="bg-white rounded-lg shadow-sm border p-8">
      <div className="flex items-center gap-3 mb-8">
        <Building2 className="h-8 w-8 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">Our Evolution</h2>
      </div>

      <div className="space-y-6">
        {milestones?.map((milestone, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-16 text-center">
              <div className="bg-blue-600 text-white text-sm font-bold py-1 px-2 rounded">
                {milestone?.year}
              </div>
            </div>
            <div className="flex-1 pb-6 border-l border-gray-200 pl-6 last:border-l-0">
              <h3 className="font-semibold text-gray-900 mb-1">{milestone?.event}</h3>
              <p className="text-gray-600 text-sm">{milestone?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyTimeline;