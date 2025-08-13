import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

const PartnershipsSection = () => {
  const partnerships = [
    {
      category: "Educational Institutions",
      partners: [
        "Harvard School of Engineering",
        "MIT Department of Mathematics",
        "Stanford Applied Physics",
        "Oxford Mathematical Institute"
      ]
    },
    {
      category: "Professional Organizations",
      partners: [
        "International Bureau of Weights and Measures",
        "National Institute of Standards and Technology",
        "IEEE Standards Association",
        "International Organization for Standardization"
      ]
    },
    {
      category: "Technology Partners",
      partners: [
        "Google Cloud Platform",
        "Amazon Web Services",
        "Microsoft Azure",
        "Cloudflare"
      ]
    }
  ];

  const certifications = [
    "ISO 9001:2015 Quality Management",
    "SOC 2 Type II Security Compliance",
    "GDPR Compliance Certification",
    "NIST Measurement Traceability",
    "Educational Content Standards (IEEE)"
  ];

  return (
    <section className="bg-white rounded-lg shadow-sm border p-8">
      <div className="flex items-center gap-3 mb-6">
        <Award className="h-8 w-8 text-yellow-600" />
        <h2 className="text-2xl font-bold text-gray-900">Industry Partnerships & Certifications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Partnerships</h3>
          {partnerships?.map((category, index) => (
            <div key={index} className="mb-6">
              <h4 className="font-medium text-blue-600 mb-2">{category?.category}</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {category?.partners?.map((partner, partnerIndex) => (
                  <li key={partnerIndex} className="flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" />
                    <span>{partner}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications & Standards</h3>
          <div className="space-y-3">
            {certifications?.map((cert, index) => (
              <div key={index} className="flex items-start gap-2">
                <Award className="h-4 w-4 text-green-600 mt-0.5" />
                <span className="text-sm text-gray-600">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">Partnership Principles</h3>
        <p className="text-sm text-gray-600 mb-3">
          We collaborate with leading institutions and organizations that share our commitment to accuracy, 
          education, and accessibility in measurement science.
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Mutual commitment to scientific accuracy and educational value</li>
          <li>• Transparent data sharing and validation processes</li>
          <li>• Joint research and development initiatives</li>
          <li>• Regular compliance audits and quality assessments</li>
        </ul>
      </div>
    </section>
  );
};

export default PartnershipsSection;