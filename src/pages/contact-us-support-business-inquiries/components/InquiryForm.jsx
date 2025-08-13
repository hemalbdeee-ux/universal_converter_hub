import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, Building2, AlertTriangle, Camera, GraduationCap } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InquiryForm = ({ activeCategory }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    priority: 'normal',
    browser: '',
    errorDescription: '',
    businessType: '',
    mediaOutlet: '',
    institutionName: '',
    studentCount: ''
  });

  const handleSubmit = (e) => {
    e?.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We\'ll get back to you within our guaranteed response time.');
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderCategorySpecificFields = () => {
    switch (activeCategory) {
      case 'technical':
        return (
          <>
            <Input
              label="Browser & Version"
              value={formData?.browser}
              onChange={(e) => handleChange('browser', e?.target?.value)}
              placeholder="e.g., Chrome 120.0, Firefox 119.0"
              icon={AlertTriangle}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Error Description
              </label>
              <textarea
                value={formData?.errorDescription}
                onChange={(e) => handleChange('errorDescription', e?.target?.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please describe the exact steps that led to the error and what you expected to happen..."
              />
            </div>
          </>
        );
      
      case 'business':
        return (
          <>
            <Input
              label="Company Name"
              value={formData?.company}
              onChange={(e) => handleChange('company', e?.target?.value)}
              placeholder="Your company name"
              icon={Building2}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                value={formData?.businessType}
                onChange={(e) => handleChange('businessType', e?.target?.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select business type</option>
                <option value="enterprise">Enterprise (500+ employees)</option>
                <option value="medium">Medium Business (50-499 employees)</option>
                <option value="small">Small Business (1-49 employees)</option>
                <option value="startup">Startup</option>
                <option value="consultant">Consultant/Freelancer</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        );
      
      case 'media':
        return (
          <Input
            label="Media Outlet"
            value={formData?.mediaOutlet}
            onChange={(e) => handleChange('mediaOutlet', e?.target?.value)}
            placeholder="Publication, blog, or media organization"
            icon={Camera}
            required
          />
        );
      
      case 'education':
        return (
          <>
            <Input
              label="Institution Name"
              value={formData?.institutionName}
              onChange={(e) => handleChange('institutionName', e?.target?.value)}
              placeholder="School, college, or university name"
              icon={GraduationCap}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approximate Student Count
              </label>
              <select
                value={formData?.studentCount}
                onChange={(e) => handleChange('studentCount', e?.target?.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select range</option>
                <option value="1-50">1-50 students</option>
                <option value="51-200">51-200 students</option>
                <option value="201-500">201-500 students</option>
                <option value="501-1000">501-1000 students</option>
                <option value="1000+">1000+ students</option>
              </select>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  const getFormTitle = () => {
    switch (activeCategory) {
      case 'technical': return 'Technical Issue Report';
      case 'business': return 'Business Partnership Inquiry';
      case 'media': return 'Media Inquiry Form';
      case 'education': return 'Educational Licensing Request';
      default: return 'General Support Request';
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">{getFormTitle()}</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={formData?.name}
            onChange={(e) => handleChange('name', e?.target?.value)}
            placeholder="Your full name"
            icon={User}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleChange('email', e?.target?.value)}
            placeholder="your.email@example.com"
            icon={Mail}
            required
          />
        </div>

        {renderCategorySpecificFields()}

        <Input
          label="Subject"
          value={formData?.subject}
          onChange={(e) => handleChange('subject', e?.target?.value)}
          placeholder="Brief description of your inquiry"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['low', 'normal', 'urgent']?.map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => handleChange('priority', priority)}
                className={`
                  p-2 text-sm rounded-lg border transition-colors capitalize
                  ${formData?.priority === priority
                    ? 'border-blue-500 bg-blue-50 text-blue-700' :'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message Details
          </label>
          <textarea
            value={formData?.message}
            onChange={(e) => handleChange('message', e?.target?.value)}
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Please provide detailed information about your inquiry, including any relevant background or specific requirements..."
            required
          />
          <div className="text-xs text-gray-500 mt-1">
            Minimum 50 characters. Be as specific as possible to help us provide the best assistance.
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Response Time:</span>
            <span className="ml-2">
              {activeCategory === 'media' ? '4 hours' : 
               activeCategory === 'technical' ? '24 hours' : '48 hours'}
            </span>
          </div>
          
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Inquiry
          </Button>
        </div>
      </form>
    </section>
  );
};

export default InquiryForm;