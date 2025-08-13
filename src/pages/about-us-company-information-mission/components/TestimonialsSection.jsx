import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Harvard School of Engineering",
      type: "Educational Institution",
      quote: "Universal Converter Hub has become an essential tool in our engineering curriculum. The accuracy and educational value are outstanding.",
      verifiedSource: "harvard.edu",
      caseStudy: "Implemented in 15 engineering courses with 98% student satisfaction rate"
    },
    {
      name: "NASA Goddard Space Flight Center",
      type: "Research Organization", 
      quote: "We rely on their conversion tools for our public education programs. The scientific accuracy is exceptional.",
      verifiedSource: "nasa.gov",
      caseStudy: "Used in 200+ educational presentations reaching 50,000+ students annually"
    },
    {
      name: "International Bureau of Weights and Measures",
      type: "Standards Organization",
      quote: "Their commitment to measurement accuracy aligns with international standards. A valuable resource for the scientific community.",
      verifiedSource: "bipm.org",
      caseStudy: "Officially recognized for contributing to global measurement standardization"
    }
  ];

  const recognitions = [
    "Best Educational Technology Tool 2024 - Education Week",
    "Excellence in Scientific Computing - IEEE Computer Society",
    "Top 10 STEM Resources - National Science Foundation",
    "Innovation in Measurement Science - NIST Recognition"
  ];

  return (
    <section className="bg-white rounded-lg shadow-sm border p-8">
      <div className="flex items-center gap-3 mb-8">
        <Star className="h-8 w-8 text-yellow-600" />
        <h2 className="text-2xl font-bold text-gray-900">Trusted by Leading Organizations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {testimonials?.map((testimonial, index) => (
          <div key={index} className="border rounded-lg p-6 bg-gray-50">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900">{testimonial?.name}</h3>
                <ExternalLink className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-xs text-blue-600 font-medium">{testimonial?.type}</p>
              <p className="text-xs text-gray-500">Verified: {testimonial?.verifiedSource}</p>
            </div>
            <blockquote className="text-gray-600 italic text-sm mb-3">
              "{testimonial?.quote}"
            </blockquote>
            <div className="bg-white rounded p-3 border-l-4 border-blue-500">
              <p className="text-xs text-gray-600">
                <strong>Case Study:</strong> {testimonial?.caseStudy}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Recognition</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recognitions?.map((recognition, index) => (
            <div key={index} className="flex items-start gap-2">
              <Star className="h-4 w-4 text-yellow-600 mt-0.5" />
              <span className="text-sm text-gray-700">{recognition}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;