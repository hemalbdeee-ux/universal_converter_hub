import React from 'react';
import { MapPin, Mail, Phone, Globe, Clock, Building2 } from 'lucide-react';

const ContactDetailsSection = () => {
  const regionalOffices = [
    {
      region: "North America (HQ)",
      address: "1234 Innovation Drive, Suite 500\nSan Francisco, CA 94105\nUnited States",
      phone: "+1 (555) 123-4567",
      email: "americas@universalconverterhub.com",
      hours: "Mon-Fri 9AM-5PM PST"
    },
    {
      region: "Europe",
      address: "456 Tech Square\nLondon EC2A 3LT\nUnited Kingdom",
      phone: "+44 20 1234 5678",
      email: "europe@universalconverterhub.com", 
      hours: "Mon-Fri 9AM-5PM GMT"
    },
    {
      region: "Asia-Pacific",
      address: "789 Innovation Center\nSingapore 018956\nSingapore",
      phone: "+65 6123 4567",
      email: "apac@universalconverterhub.com",
      hours: "Mon-Fri 9AM-5PM SGT"
    }
  ];

  const departments = [
    {
      department: "General Support",
      email: "support@universalconverterhub.com",
      description: "Account help, basic questions, general assistance"
    },
    {
      department: "Technical Support",
      email: "tech@universalconverterhub.com",
      description: "Bug reports, conversion errors, platform issues"
    },
    {
      department: "Business Development",
      email: "partnerships@universalconverterhub.com",
      description: "Enterprise solutions, API access, partnerships"
    },
    {
      department: "Media & Press",
      email: "press@universalconverterhub.com",
      description: "Media inquiries, press releases, interviews"
    },
    {
      department: "Educational Services",
      email: "education@universalconverterhub.com",
      description: "Classroom resources, institutional licensing"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Regional Offices */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Global Offices</h3>
        </div>
        
        <div className="space-y-4">
          {regionalOffices?.map((office, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-gray-900 mb-1">{office?.region}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-600 whitespace-pre-line">{office?.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a href={`tel:${office?.phone}`} className="text-blue-600 hover:text-blue-800">
                    {office?.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href={`mailto:${office?.email}`} className="text-blue-600 hover:text-blue-800">
                    {office?.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{office?.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Contacts */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Department Contacts</h3>
        </div>
        
        <div className="space-y-3">
          {departments?.map((dept, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900">{dept?.department}</h4>
                <a 
                  href={`mailto:${dept?.email}`} 
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {dept?.email}
                </a>
              </div>
              <p className="text-xs text-gray-600">{dept?.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Business Hours</h3>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Monday - Friday:</span>
            <span className="font-medium text-gray-900">9:00 AM - 5:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Saturday - Sunday:</span>
            <span className="font-medium text-gray-900">Emergency Only</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Time Zones:</span>
            <span className="font-medium text-gray-900">PST/GMT/SGT</span>
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200">
            <p className="text-xs text-blue-700">
              <strong>Emergency Support:</strong> Available 24/7 for critical technical issues 
              affecting enterprise customers via emergency hotline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsSection;