import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Encrypted Communication",
      description: "All form submissions use SSL/TLS encryption"
    },
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "Full compliance with data protection regulations"
    },
    {
      icon: Eye,
      title: "Privacy Protected",
      description: "Your personal information is never shared or sold"
    },
    {
      icon: FileText,
      title: "Data Retention Policy",
      description: "Clear policies on how long we keep your data"
    }
  ];

  const privacyHighlights = [
    "Form data encrypted in transit and at rest",
    "GDPR-compliant data processing and storage",
    "Right to request data deletion at any time",
    "Transparent privacy policy with clear terms",
    "Regular security audits and compliance reviews",
    "No third-party data sharing without consent"
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="h-5 w-5 text-green-600" />
        <h3 className="font-semibold text-gray-900">Security & Privacy</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        {securityFeatures?.map((feature, index) => {
          const IconComponent = feature?.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="bg-green-100 rounded-full p-2">
                <IconComponent className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{feature?.title}</h4>
                <p className="text-xs text-gray-600">{feature?.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-medium text-gray-900 mb-3 text-sm">Privacy Commitments</h4>
        <ul className="space-y-1">
          {privacyHighlights?.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5"></div>
              <span className="text-xs text-gray-600">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Data Handling:</strong> We process your contact information solely for responding to 
          your inquiry and improving our services. You can request data deletion at any time by 
          contacting our privacy team at privacy@universalconverterhub.com
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <a 
          href="/privacy-policy-legal-compliance-center"
          className="text-xs text-blue-600 hover:text-blue-800 underline"
        >
          Privacy Policy
        </a>
        <span className="text-gray-300">•</span>
        <a 
          href="/gdpr-ccpa-consent-manager-data-rights-center" 
          className="text-xs text-blue-600 hover:text-blue-800 underline"
        >
          Data Rights
        </a>
        <span className="text-gray-300">•</span>
        <a 
          href="/contact-us-support-business-inquiries" 
          className="text-xs text-blue-600 hover:text-blue-800 underline"
        >
          Security Report
        </a>
      </div>
    </div>
  );
};

export default SecurityFeatures;