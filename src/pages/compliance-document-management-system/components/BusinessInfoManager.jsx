import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BusinessInfoManager = () => {
  const [businessInfo, setBusinessInfo] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  const watchedFields = watch();

  useEffect(() => {
    loadBusinessInfo();
  }, []);

  useEffect(() => {
    // Populate form with loaded data
    if (businessInfo) {
      Object.keys(businessInfo)?.forEach(key => {
        setValue(key, businessInfo?.[key]);
      });
    }
  }, [businessInfo, setValue]);

  const loadBusinessInfo = async () => {
    try {
      // In production, this would fetch from Supabase
      const mockBusinessInfo = {
        business_name: 'Universal Converter Hub',
        business_address: '123 Tech Street, Digital City, DC 12345',
        business_email: 'contact@universalconverter.com',
        business_phone: '+1 (555) 123-4567',
        privacy_officer_email: 'privacy@universalconverter.com',
        adsense_publisher_id: 'ca-pub-XXXXXXXXXXXXXXXX',
        support_hours: 'Monday - Friday, 9 AM - 6 PM EST',
        business_description: 'Universal Converter Hub provides comprehensive unit conversion tools and educational resources for professionals and students worldwide.',
        website_url: 'https://universalconverter.com',
        social_media: {
          twitter: '@UniversalConvert',
          facebook: 'UniversalConverterHub',
          linkedin: 'universal-converter-hub'
        }
      };

      setBusinessInfo(mockBusinessInfo);
    } catch (error) {
      console.error('Failed to load business info:', error);
    }
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      // In production, this would save to Supabase
      console.log('Saving business info:', data);
      
      setBusinessInfo(data);
      setLastSaved(new Date());
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Failed to save business info:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const generateAdsenseHelp = () => {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-2 flex items-center gap-2">
          <Icon name="HelpCircle" size={16} />
          How to find your AdSense Publisher ID
        </h4>
        <ol className="text-sm text-text-secondary space-y-1 ml-4 list-decimal">
          <li>Log in to your Google AdSense account</li>
          <li>Go to Account → Account information</li>
          <li>Find your Publisher ID (starts with "ca-pub-")</li>
          <li>Copy and paste it here</li>
        </ol>
        <a 
          href="https://support.google.com/adsense/answer/105516" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline text-sm flex items-center gap-1 mt-2"
        >
          <Icon name="ExternalLink" size={12} />
          Learn more
        </a>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          Business Information Manager
        </h2>
        <p className="text-text-secondary">
          Update company details that are automatically populated across all legal documents
        </p>
        {lastSaved && (
          <p className="text-sm text-success mt-2">
            Last saved: {lastSaved?.toLocaleString()}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Business Information */}
          <div className="bg-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Icon name="Building" size={20} />
              Basic Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Business Name *
                </label>
                <Input
                  {...register('business_name', { required: 'Business name is required' })}
                  placeholder="Your Company Name"
                  error={errors?.business_name?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Business Address *
                </label>
                <textarea
                  {...register('business_address', { required: 'Business address is required' })}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="123 Main Street, City, State, ZIP Code"
                />
                {errors?.business_address && (
                  <p className="text-danger text-sm mt-1">{errors?.business_address?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Website URL
                </label>
                <Input
                  {...register('website_url')}
                  type="url"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Business Description
                </label>
                <textarea
                  {...register('business_description')}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Brief description of your business..."
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Icon name="Mail" size={20} />
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Business Email *
                </label>
                <Input
                  {...register('business_email', { 
                    required: 'Business email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  placeholder="contact@yourcompany.com"
                  error={errors?.business_email?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Privacy Officer Email *
                </label>
                <Input
                  {...register('privacy_officer_email', { 
                    required: 'Privacy officer email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  placeholder="privacy@yourcompany.com"
                  error={errors?.privacy_officer_email?.message}
                />
                <p className="text-xs text-text-secondary mt-1">
                  Used for GDPR/CCPA compliance and data requests
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Business Phone
                </label>
                <Input
                  {...register('business_phone')}
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Support Hours
                </label>
                <Input
                  {...register('support_hours')}
                  placeholder="Monday - Friday, 9 AM - 6 PM EST"
                />
              </div>
            </div>
          </div>

          {/* AdSense Configuration */}
          <div className="bg-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Icon name="Target" size={20} />
              AdSense Configuration
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  AdSense Publisher ID
                </label>
                <Input
                  {...register('adsense_publisher_id')}
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                />
                <p className="text-xs text-text-secondary mt-1">
                  Used for ads.txt generation and compliance documents
                </p>
              </div>

              {generateAdsenseHelp()}
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-card rounded-xl p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Icon name="Share" size={20} />
              Social Media
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Twitter Handle
                </label>
                <Input
                  {...register('social_media.twitter')}
                  placeholder="@yourcompany"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Facebook Page
                </label>
                <Input
                  {...register('social_media.facebook')}
                  placeholder="YourCompanyPage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  LinkedIn Company
                </label>
                <Input
                  {...register('social_media.linkedin')}
                  placeholder="your-company"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-surface rounded-xl p-6 mt-8">
          <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Icon name="Eye" size={20} />
            Document Preview
          </h3>
          
          <p className="text-text-secondary mb-4">
            This is how your business information will appear in legal documents:
          </p>
          
          <div className="bg-card rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-text-primary mb-2">Contact Information</h4>
            <div className="text-sm text-text-secondary space-y-1">
              <p><strong>Company:</strong> {watchedFields?.business_name || '[Business Name]'}</p>
              <p><strong>Email:</strong> {watchedFields?.business_email || '[Business Email]'}</p>
              <p><strong>Address:</strong> {watchedFields?.business_address || '[Business Address]'}</p>
              <p><strong>Privacy Officer:</strong> {watchedFields?.privacy_officer_email || '[Privacy Email]'}</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center mt-8">
          <Button
            type="submit"
            variant="default"
            size="lg"
            iconName="Save"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Business Information'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfoManager;