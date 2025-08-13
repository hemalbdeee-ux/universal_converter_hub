import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PrivacyContactOptions = () => {
  const [activeSection, setActiveSection] = useState('gdpr');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const requestTypes = [
    { value: 'data-access', label: 'Request My Personal Data (GDPR Article 15)' },
    { value: 'data-correction', label: 'Correct My Personal Data (GDPR Article 16)' },
    { value: 'data-deletion', label: 'Delete My Personal Data (GDPR Article 17)' },
    { value: 'data-portability', label: 'Data Portability Request (GDPR Article 20)' },
    { value: 'processing-restriction', label: 'Restrict Data Processing (GDPR Article 18)' },
    { value: 'opt-out', label: 'Opt Out of Data Processing (GDPR Article 21)' },
    { value: 'cookie-preferences', label: 'Update Cookie Preferences' },
    { value: 'complaint', label: 'Privacy Concern or Complaint' },
    { value: 'other', label: 'Other Privacy Request' }
  ];

  const urgencyLevels = [
    { value: 'standard', label: 'Standard (30 days)' },
    { value: 'urgent', label: 'Urgent (72 hours)' },
    { value: 'immediate', label: 'Immediate (Data Breach)' }
  ];

  const privacySections = [
    {
      id: 'gdpr',
      title: 'GDPR Rights & Requests',
      icon: '🛡️',
      description: 'Exercise your rights under the General Data Protection Regulation'
    },
    {
      id: 'cookies',
      title: 'Cookie Management',
      icon: '🍪',
      description: 'Manage your cookie preferences and tracking settings'
    },
    {
      id: 'data-processing',
      title: 'Data Processing',
      icon: '🔒',
      description: 'Learn about how we process and protect your data'
    },
    {
      id: 'contact-dpo',
      title: 'Data Protection Officer',
      icon: '👤',
      description: 'Contact our Data Protection Officer directly'
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const formData = {
        ...data,
        section: activeSection,
        submittedAt: new Date()?.toISOString(),
        ipAddress: 'hidden', // Server-side handling
        requestId: `PRIVACY-${Date.now()}` // Generate unique request ID
      };

      console.log('Privacy request submission:', formData);
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Privacy request submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderGDPRSection = () => (
    <div className="space-y-6">
      <div className="bg-info/5 border border-info/20 rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-3">Your GDPR Rights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-text-primary mb-2">Data Subject Rights:</h4>
            <ul className="space-y-1 text-text-secondary">
              <li>• Right to access your personal data</li>
              <li>• Right to rectification of inaccurate data</li>
              <li>• Right to erasure ("right to be forgotten")</li>
              <li>• Right to restrict processing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-text-primary mb-2">Additional Rights:</h4>
            <ul className="space-y-1 text-text-secondary">
              <li>• Right to data portability</li>
              <li>• Right to object to processing</li>
              <li>• Rights related to automated decision making</li>
              <li>• Right to withdraw consent</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name *
            </label>
            <Input
              {...register('fullName', { required: 'Full name is required' })}
              placeholder="Enter your full name"
              className={errors?.fullName ? 'border-destructive' : ''}
            />
            {errors?.fullName && (
              <p className="mt-1 text-sm text-destructive">{errors?.fullName?.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="your.email@example.com"
              className={errors?.email ? 'border-destructive' : ''}
            />
            {errors?.email && (
              <p className="mt-1 text-sm text-destructive">{errors?.email?.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Request Type *
            </label>
            <Select
              {...register('requestType', { required: 'Please select a request type' })}
              options={requestTypes}
              placeholder="Select your request type"
              className={errors?.requestType ? 'border-destructive' : ''}
            />
            {errors?.requestType && (
              <p className="mt-1 text-sm text-destructive">{errors?.requestType?.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Urgency Level *
            </label>
            <Select
              {...register('urgency', { required: 'Please select urgency level' })}
              options={urgencyLevels}
              placeholder="Select urgency level"
              className={errors?.urgency ? 'border-destructive' : ''}
            />
            {errors?.urgency && (
              <p className="mt-1 text-sm text-destructive">{errors?.urgency?.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Account Information
          </label>
          <textarea
            {...register('accountInfo')}
            rows="3"
            placeholder="Please provide any account information that can help us locate your data (username, account ID, approximate signup date, etc.)"
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Request Details *
          </label>
          <textarea
            {...register('requestDetails', { 
              required: 'Please provide request details',
              minLength: { value: 20, message: 'Please provide at least 20 characters of detail' }
            })}
            rows="6"
            placeholder="Please describe your request in detail. For data access requests, specify what information you're looking for. For deletion requests, confirm you want all data removed."
            className={`
              w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y
              ${errors?.requestDetails ? 'border-destructive' : 'border-border'}
            `}
          />
          {errors?.requestDetails && (
            <p className="mt-1 text-sm text-destructive">{errors?.requestDetails?.message}</p>
          )}
        </div>

        <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-2">⚠️ Important Information</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• We may need to verify your identity before processing your request</li>
            <li>• Data deletion requests are irreversible and may affect service functionality</li>
            <li>• Standard processing time is 30 days, urgent requests within 72 hours</li>
            <li>• You have the right to file a complaint with your local supervisory authority</li>
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('identityVerification', { required: 'You must consent to identity verification' })}
              id="identity-verification"
              className="rounded border-border"
            />
            <label htmlFor="identity-verification" className="text-sm text-text-secondary">
              I consent to identity verification procedures as required by law
            </label>
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </form>
    </div>
  );

  const renderCookiesSection = () => (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4">Cookie Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Essential Cookies</h4>
              <p className="text-sm text-text-secondary">Required for basic website functionality</p>
            </div>
            <div className="text-success">Always Active</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Analytics Cookies</h4>
              <p className="text-sm text-text-secondary">Help us understand how visitors use our site</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Advertising Cookies</h4>
              <p className="text-sm text-text-secondary">Used to show relevant ads and measure ad performance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Functional Cookies</h4>
              <p className="text-sm text-text-secondary">Remember your preferences and settings</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Button>Save Preferences</Button>
          <Button variant="outline">Accept All</Button>
          <Button variant="outline">Reject All</Button>
        </div>
      </div>

      <div className="bg-info/5 border border-info/20 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-2">About Our Cookies</h4>
        <p className="text-sm text-text-secondary mb-3">
          We use cookies and similar technologies to enhance your experience, analyze site traffic, 
          and serve personalized content. You can manage your preferences above.
        </p>
        <Button variant="outline" size="sm">
          View Cookie Policy
        </Button>
      </div>
    </div>
  );

  const renderDataProcessingSection = () => (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4">How We Process Your Data</h3>
        
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-medium text-text-primary mb-1">Data Collection</h4>
            <p className="text-sm text-text-secondary">
              We collect information when you use our conversion tools, create an account, 
              or contact us for support.
            </p>
          </div>

          <div className="border-l-4 border-success pl-4">
            <h4 className="font-medium text-text-primary mb-1">Data Usage</h4>
            <p className="text-sm text-text-secondary">
              Your data helps us provide accurate conversions, improve our services, 
              and offer personalized experiences.
            </p>
          </div>

          <div className="border-l-4 border-info pl-4">
            <h4 className="font-medium text-text-primary mb-1">Data Protection</h4>
            <p className="text-sm text-text-secondary">
              We use industry-standard security measures including encryption, 
              secure servers, and access controls.
            </p>
          </div>

          <div className="border-l-4 border-warning pl-4">
            <h4 className="font-medium text-text-primary mb-1">Data Sharing</h4>
            <p className="text-sm text-text-secondary">
              We do not sell your personal data. We only share data with trusted partners 
              for essential services like analytics and support.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-3">Data Retention</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Account data: Kept while account is active</li>
            <li>• Conversion history: 2 years for registered users</li>
            <li>• Analytics data: Aggregated and anonymized</li>
            <li>• Support tickets: 3 years for quality assurance</li>
          </ul>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-3">Your Control</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Update your information anytime</li>
            <li>• Control email preferences</li>
            <li>• Request data export</li>
            <li>• Delete your account and data</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderDPOSection = () => (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-semibold text-text-primary mb-4">Contact Our Data Protection Officer</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-text-primary mb-3">Direct Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-text-secondary">📧</span>
                <a href="mailto:dpo@universalconverterhub.com" className="text-primary hover:underline">
                  dpo@universalconverterhub.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-text-secondary">📞</span>
                <a href="tel:+15551234569" className="text-primary hover:underline">
                  +1 (555) 123-4569
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-text-secondary">📍</span>
                <div className="text-sm text-text-secondary">
                  <p>Data Protection Office</p>
                  <p>Universal Converter Hub Inc.</p>
                  <p>123 Innovation Drive, Suite 400</p>
                  <p>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-text-primary mb-3">When to Contact DPO</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Complex privacy concerns</li>
              <li>• Data breach notifications</li>
              <li>• Legal compliance questions</li>
              <li>• Escalated privacy requests</li>
              <li>• Third-party data sharing concerns</li>
              <li>• International data transfer questions</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-info/5 border border-info/20 rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-2">Response Times</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-success">General Inquiries:</span>
              <p className="text-text-secondary">5 business days</p>
            </div>
            <div>
              <span className="font-medium text-warning">Complex Issues:</span>
              <p className="text-text-secondary">10 business days</p>
            </div>
            <div>
              <span className="font-medium text-destructive">Data Breaches:</span>
              <p className="text-text-secondary">24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg p-8 shadow-brand">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Privacy Contact Options</h2>
        <p className="text-text-secondary mb-6">
          Manage your privacy preferences, exercise your data rights, and contact our privacy team 
          for any concerns about data protection and compliance.
        </p>

        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-success">✓</span>
              <p className="text-success font-medium">
                Privacy request submitted successfully! You'll receive a confirmation email with your request ID.
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-destructive">✗</span>
              <p className="text-destructive font-medium">
                Failed to submit privacy request. Please try again or contact us directly.
              </p>
            </div>
          </div>
        )}

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {privacySections?.map(section => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activeSection === section?.id
                  ? 'bg-primary text-primary-foreground shadow-brand'
                  : 'bg-background text-text-secondary hover:text-text-primary hover:bg-surface'
                }
              `}
            >
              <span>{section?.icon}</span>
              <span>{section?.title}</span>
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        {activeSection === 'gdpr' && renderGDPRSection()}
        {activeSection === 'cookies' && renderCookiesSection()}
        {activeSection === 'data-processing' && renderDataProcessingSection()}
        {activeSection === 'contact-dpo' && renderDPOSection()}
      </div>

      {/* Regulatory Information */}
      <div className="bg-surface rounded-lg p-6 shadow-brand">
        <h3 className="font-semibold text-text-primary mb-4">Regulatory Compliance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary">🇪🇺</span>
            </div>
            <h4 className="font-medium text-text-primary mb-1">GDPR Compliant</h4>
            <p className="text-text-secondary">Full compliance with EU data protection regulations</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-success">🇺🇸</span>
            </div>
            <h4 className="font-medium text-text-primary mb-1">CCPA Compliant</h4>
            <p className="text-text-secondary">California Consumer Privacy Act compliance</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-info">🔒</span>
            </div>
            <h4 className="font-medium text-text-primary mb-1">SOC 2 Type II</h4>
            <p className="text-text-secondary">Security and availability standards certified</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyContactOptions;