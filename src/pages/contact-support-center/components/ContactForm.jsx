import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'business', label: 'Business Partnership' },
    { value: 'privacy', label: 'Privacy & Data' },
    { value: 'billing', label: 'Billing & Account' },
    { value: 'feedback', label: 'Feedback & Suggestions' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - General Question' },
    { value: 'medium', label: 'Medium - Need Assistance' },
    { value: 'high', label: 'High - Service Issue' },
    { value: 'urgent', label: 'Urgent - Critical Problem' }
  ];

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file?.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
      if (!allowedTypes?.includes(file?.type)) {
        alert('Please upload only images, PDF, or text files');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const formData = {
        ...data,
        attachedFile: selectedFile?.name || null,
        submittedAt: new Date()?.toISOString(),
        userAgent: navigator.userAgent,
        ipAddress: 'hidden' // In real implementation, this would be handled server-side
      };

      console.log('Form submission:', formData);
      
      setSubmitStatus('success');
      reset();
      setSelectedFile(null);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface rounded-lg p-8 shadow-brand">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Contact Form</h2>
        <p className="text-text-secondary">
          Fill out the form below and we'll get back to you within 24 hours. 
          For urgent technical issues, please use our live chat feature.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-success">✓</span>
            <p className="text-success font-medium">
              Message sent successfully! We'll respond within 24 hours.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-destructive">✗</span>
            <p className="text-destructive font-medium">
              Failed to send message. Please try again or contact us directly.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name *
            </label>
            <Input
              {...register('fullName', { 
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              placeholder="Enter your full name"
              className={errors?.fullName ? 'border-destructive focus:ring-destructive/20' : ''}
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
              className={errors?.email ? 'border-destructive focus:ring-destructive/20' : ''}
            />
            {errors?.email && (
              <p className="mt-1 text-sm text-destructive">{errors?.email?.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              {...register('phone')}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Company/Organization
            </label>
            <Input
              {...register('company')}
              placeholder="Your company name (optional)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Inquiry Type *
            </label>
            <Select
              {...register('inquiryType', { required: 'Please select an inquiry type' })}
              options={inquiryTypes}
              placeholder="Select inquiry type"
              className={errors?.inquiryType ? 'border-destructive focus:ring-destructive/20' : ''}
            />
            {errors?.inquiryType && (
              <p className="mt-1 text-sm text-destructive">{errors?.inquiryType?.message}</p>
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
              className={errors?.urgency ? 'border-destructive focus:ring-destructive/20' : ''}
            />
            {errors?.urgency && (
              <p className="mt-1 text-sm text-destructive">{errors?.urgency?.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Subject *
          </label>
          <Input
            {...register('subject', { 
              required: 'Subject is required',
              minLength: { value: 5, message: 'Subject must be at least 5 characters' }
            })}
            placeholder="Brief description of your inquiry"
            className={errors?.subject ? 'border-destructive focus:ring-destructive/20' : ''}
          />
          {errors?.subject && (
            <p className="mt-1 text-sm text-destructive">{errors?.subject?.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Message *
          </label>
          <textarea
            {...register('message', { 
              required: 'Message is required',
              minLength: { value: 20, message: 'Message must be at least 20 characters' }
            })}
            rows="6"
            placeholder="Please provide detailed information about your inquiry. For technical issues, include steps to reproduce the problem and any error messages you've encountered."
            className={`
              w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y min-h-[120px]
              ${errors?.message 
                ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' :'border-border bg-background'
              }
            `}
          />
          {errors?.message && (
            <p className="mt-1 text-sm text-destructive">{errors?.message?.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Attachment (Optional)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/*,.pdf,.txt"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-border rounded-lg cursor-pointer hover:bg-surface transition-colors duration-200"
            >
              <span className="mr-2">📎</span>
              Choose File
            </label>
            {selectedFile && (
              <span className="text-sm text-text-secondary">
                {selectedFile?.name} ({(selectedFile?.size / 1024 / 1024)?.toFixed(2)} MB)
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Supported formats: Images, PDF, TXT. Maximum size: 5MB.
          </p>
        </div>

        <div className="bg-info/5 border border-info/20 rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-2">Before you submit:</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Check our FAQ section for common questions</li>
            <li>• For converter issues, specify which tool you're using</li>
            <li>• Include your browser and device information for technical issues</li>
            <li>• Business inquiries will be forwarded to our partnerships team</li>
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('privacyConsent', { required: 'You must accept the privacy policy' })}
              id="privacy-consent"
              className="rounded border-border"
            />
            <label htmlFor="privacy-consent" className="text-sm text-text-secondary">
              I agree to the{' '}
              <a href="/privacy-policy-legal-compliance-center" className="text-primary hover:underline">
                Privacy Policy
              </a>{' '}
              and consent to data processing
            </label>
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </div>
            ) : (
              'Send Message'
            )}
          </Button>
        </div>

        {errors?.privacyConsent && (
          <p className="text-sm text-destructive">{errors?.privacyConsent?.message}</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;