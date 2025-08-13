import React from 'react';
import { MapPin, Mail, Phone, Book, Award, CheckCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';
import AdSense from '../../../components/AdSense';

const ContactInfo = () => {
  const certifications = [
    "ISO 9001:2015 Quality Management",
    "SOC 2 Type II Security",
    "GDPR Compliance Certified",
    "NIST Measurement Traceability",
    "IEEE Educational Standards"
  ];

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Business Information</h3>
        <div className="space-y-4 text-sm">
          <div>
            <strong className="text-gray-900">Legal Name:</strong>
            <p className="text-gray-600">Universal Converter Hub Inc.</p>
          </div>
          <div>
            <strong className="text-gray-900">Founded:</strong>
            <p className="text-gray-600">January 15, 2020</p>
          </div>
          <div>
            <strong className="text-gray-900">Headquarters:</strong>
            <div className="text-gray-600 flex items-start gap-2 mt-1">
              <MapPin className="h-4 w-4 mt-0.5 text-blue-600" />
              <div>
                1234 Innovation Drive, Suite 500<br />
                San Francisco, CA 94105<br />
                United States
              </div>
            </div>
          </div>
          <div>
            <strong className="text-gray-900">Business Registration:</strong>
            <p className="text-gray-600">Delaware C-Corp #7890123</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">General Inquiries</p>
              <a href="mailto:info@universalconverterhub.com" className="text-blue-600 hover:text-blue-800 text-sm">
                info@universalconverterhub.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Business Line</p>
              <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Book className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Media & Press</p>
              <a href="mailto:press@universalconverterhub.com" className="text-blue-600 hover:text-blue-800 text-sm">
                press@universalconverterhub.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Certifications</h3>
        </div>
        <div className="space-y-2">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <span className="text-sm text-gray-600">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AdSense Ad */}
      <div className="bg-gray-50 rounded-lg p-4">
        <AdSense
          adClient={import.meta.env?.VITE_ADSENSE_CLIENT}
          adSlot="0987654321"
          adFormat="auto"
          adStyle={{ display: 'block', minHeight: '300px' }}
        />
      </div>

      {/* Partnership Inquiries */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-2">Partnership Opportunities</h3>
        <p className="text-sm text-gray-600 mb-4">
          Interested in educational partnerships, API access, or enterprise solutions?
        </p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <Mail className="h-4 w-4 mr-2" />
          Contact Partnerships
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;