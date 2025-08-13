import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const DataRequestForm = ({ userRegion, user, userProfile }) => {
  const [submitted, setSubmitted] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const requestTypes = {
    'access': {
      title: 'Data Access Request',
      description: 'Request a copy of all personal data we have about you',
      icon: 'Download',
      details: 'You will receive a comprehensive report containing all personal information we have collected, processed, and stored about you.',
      timeframe: '30 days',
      available: ['gdpr', 'ccpa', 'lgpd', 'other']
    },
    'deletion': {
      title: 'Data Deletion Request',
      description: 'Request deletion of your personal data',
      icon: 'Trash2',
      details: 'We will delete all personal data associated with your account, except where we are legally required to retain certain information.',
      timeframe: '30 days',
      available: ['gdpr', 'ccpa', 'lgpd', 'other']
    },
    'portability': {
      title: 'Data Portability Request',
      description: 'Request your data in a machine-readable format',
      icon: 'Share',
      details: 'Receive your personal data in a structured, commonly used, and machine-readable format (JSON/CSV).',
      timeframe: '30 days',
      available: ['gdpr', 'lgpd']
    },
    'opt_out': {
      title: 'Opt-Out of Sale/Sharing',
      description: 'Opt-out of the sale or sharing of your personal information',
      icon: 'ShieldOff',
      details: 'We will stop selling or sharing your personal information with third parties for advertising purposes.',
      timeframe: 'Immediate',
      available: ['ccpa']
    },
    'correction': {
      title: 'Data Correction Request',
      description: 'Request correction of inaccurate personal data',
      icon: 'Edit',
      details: 'We will correct or update any inaccurate or incomplete personal information we have about you.',
      timeframe: '30 days',
      available: ['gdpr', 'lgpd', 'other']
    }
  };

  const availableRequests = Object.entries(requestTypes)?.filter(
    ([_, request]) => request?.available?.includes(userRegion)
  );

  const onSubmit = async (data) => {
    try {
      // In production, this would send to your backend API
      console.log('Data request submitted:', {
        ...data,
        requestType: selectedRequestType,
        userId: user?.id,
        region: userRegion,
        timestamp: new Date()?.toISOString()
      });

      setSubmitted(true);
      setVerificationSent(true);
      reset();
      
      // Simulate verification email sending
      setTimeout(() => {
        setVerificationSent(false);
      }, 5000);
      
    } catch (error) {
      console.error('Failed to submit data request:', error);
    }
  };

  const getRegionInstructions = () => {
    switch (userRegion) {
      case 'gdpr':
        return 'Under GDPR Article 15, 17, 20, and 16, you have the right to access, delete, port, and correct your personal data. We will respond within 30 days.';
      case 'ccpa':
        return 'Under the California Consumer Privacy Act, you have the right to know, delete, and opt-out of the sale of your personal information.';
      case 'lgpd':
        return 'Under the Lei Geral de Proteção de Dados, you have rights regarding access, correction, deletion, and portability of your personal data.';
      default:
        return 'You can request access to, correction of, or deletion of your personal data. We will process your request in accordance with applicable privacy laws.';
    }
  };

  if (submitted) {
    return (
      <div className="bg-card rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Request Submitted Successfully
        </h2>
        
        <p className="text-text-secondary mb-6">
          Your {requestTypes?.[selectedRequestType]?.title?.toLowerCase()} has been submitted. 
          We will process your request within {requestTypes?.[selectedRequestType]?.timeframe}.
        </p>
        
        {verificationSent && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <Icon name="Mail" size={20} className="text-primary mx-auto mb-2" />
            <p className="text-sm text-text-secondary">
              A verification email has been sent to confirm your identity.
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <p className="text-sm text-text-secondary">
            <strong>Reference ID:</strong> DR-{Date.now()}
          </p>
          <p className="text-sm text-text-secondary">
            You will receive email updates about the status of your request.
          </p>
        </div>
        
        <Button
          onClick={() => {
            setSubmitted(false);
            setSelectedRequestType('');
          }}
          variant="outline"
          className="mt-6"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          Data Rights & Requests
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Exercise your privacy rights. {getRegionInstructions()}
        </p>
      </div>

      {/* Request Types */}
      {!selectedRequestType ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableRequests?.map(([type, request]) => (
            <button
              key={type}
              onClick={() => setSelectedRequestType(type)}
              className="bg-card hover:bg-surface border border-border hover:border-border-hover rounded-xl p-6 text-left transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={request?.icon} size={24} className="text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-primary mb-2">
                    {request?.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    {request?.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Icon name="Clock" size={12} />
                    <span>Response time: {request?.timeframe}</span>
                  </div>
                </div>
                
                <Icon name="ChevronRight" size={20} className="text-text-secondary" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl p-6">
          {/* Selected Request Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setSelectedRequestType('')}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <Icon name="ArrowLeft" size={20} />
            </button>
            
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name={requestTypes?.[selectedRequestType]?.icon} size={20} className="text-primary" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-text-primary">
                {requestTypes?.[selectedRequestType]?.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {requestTypes?.[selectedRequestType]?.details}
              </p>
            </div>
          </div>

          {/* Request Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Full Name *
                </label>
                <Input
                  {...register('fullName', { required: 'Full name is required' })}
                  defaultValue={userProfile?.full_name || ''}
                  placeholder="Enter your full name"
                  error={errors?.fullName?.message}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address *
                </label>
                <Input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  defaultValue={user?.email || ''}
                  placeholder="Enter your email address"
                  error={errors?.email?.message}
                />
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Additional Details (Optional)
              </label>
              <textarea
                {...register('details')}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Provide any additional information about your request..."
              />
            </div>

            {/* Identity Verification Notice */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-text-primary mb-1">
                    Identity Verification Required
                  </h4>
                  <p className="text-sm text-text-secondary">
                    To protect your privacy, we may need to verify your identity before processing this request. 
                    You may receive a verification email or be asked to provide additional documentation.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms Acceptance */}
            <div className="flex items-start gap-3">
              <input
                {...register('acceptTerms', { required: 'You must accept the terms' })}
                type="checkbox"
                className="w-5 h-5 text-primary mt-0.5 bg-surface border-border rounded focus:ring-primary focus:ring-2"
              />
              <div className="text-sm">
                <label className="text-text-secondary">
                  I confirm that this request is made in good faith and I understand that 
                  providing false information may result in the rejection of my request. 
                  I have read and agree to the{' '}
                  <a href="/privacy-policy-legal-compliance-center" className="text-primary hover:underline">
                    Privacy Policy
                  </a>.
                </label>
                {errors?.acceptTerms && (
                  <p className="text-danger text-xs mt-1">{errors?.acceptTerms?.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full"
              iconName="Send"
            >
              Submit Request
            </Button>
          </form>
        </div>
      )}

      {/* Contact Information */}
      <div className="bg-surface rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Need Help with Your Request?
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon name="Mail" size={16} className="text-primary" />
            <span className="text-text-secondary">
              Privacy Officer: privacy@universalconverter.com
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-text-secondary">
              Response Time: Up to 30 days (faster for simple requests)
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Icon name="Shield" size={16} className="text-primary" />
            <span className="text-text-secondary">
              All requests are processed securely and confidentially
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataRequestForm;