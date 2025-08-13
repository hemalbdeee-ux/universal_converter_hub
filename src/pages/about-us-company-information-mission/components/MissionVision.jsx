import React from 'react';
import { Target, CheckCircle } from 'lucide-react';

const MissionVision = () => {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-8">
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-8 w-8 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Our Mission & Vision</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Mission Statement</h3>
          <p className="text-gray-600 leading-relaxed">
            To democratize access to precise measurement conversion tools while fostering global 
            education in mathematics, science, and engineering. We believe that accurate, accessible 
            conversion tools can bridge educational gaps and empower learners worldwide.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            To become the definitive global standard for measurement conversion, trusted by 
            educators, professionals, and learners in every country, while maintaining the 
            highest standards of accuracy, transparency, and educational value.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Values</h3>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <span><strong>Accuracy:</strong> Every conversion is scientifically validated and traceable to international standards</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <span><strong>Accessibility:</strong> Free, fast, and available to everyone, everywhere</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <span><strong>Education:</strong> Every tool includes context, explanations, and learning opportunities</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <span><strong>Transparency:</strong> Open about our methods, sources, and data handling practices</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;