import React, { useState, useEffect } from 'react';

const BusinessContactInfo = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeZones = [
    { zone: 'PST', offset: -8, label: 'Pacific' },
    { zone: 'MST', offset: -7, label: 'Mountain' },
    { zone: 'CST', offset: -6, label: 'Central' },
    { zone: 'EST', offset: -5, label: 'Eastern' },
    { zone: 'GMT', offset: 0, label: 'London' },
    { zone: 'CET', offset: 1, label: 'Europe' },
    { zone: 'JST', offset: 9, label: 'Tokyo' }
  ];

  const getTimeInZone = (offset) => {
    const utc = currentTime?.getTime() + (currentTime?.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc + (offset * 3600000));
    return targetTime?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isBusinessHours = (offset) => {
    const utc = currentTime?.getTime() + (currentTime?.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc + (offset * 3600000));
    const hour = targetTime?.getHours();
    const day = targetTime?.getDay();
    return day >= 1 && day <= 5 && hour >= 9 && hour <= 17;
  };

  const contactMethods = [
    {
      type: 'Phone',
      icon: '📞',
      primary: '+1 (555) 123-4567',
      secondary: '+1 (555) 123-4568 (Technical)',
      description: 'Direct line for urgent inquiries',
      available: '24/7 Emergency Support'
    },
    {
      type: 'Email',
      icon: '📧',
      primary: 'contact@universalconverterhub.com',
      secondary: 'support@universalconverterhub.com',
      description: 'General inquiries and support',
      available: 'Response within 24 hours'
    },
    {
      type: 'Business',
      icon: '🏢',
      primary: 'partnerships@universalconverterhub.com',
      secondary: 'media@universalconverterhub.com',
      description: 'Partnerships and media inquiries',
      available: 'Business hours only'
    },
    {
      type: 'Technical',
      icon: '🔧',
      primary: 'api@universalconverterhub.com',
      secondary: 'developers@universalconverterhub.com',
      description: 'API access and technical integration',
      available: 'Developer support'
    }
  ];

  const officeLocations = [
    {
      name: 'Headquarters',
      address: '123 Innovation Drive, Suite 400',
      city: 'San Francisco, CA 94105',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      timezone: 'PST',
      isPrimary: true
    },
    {
      name: 'European Office',
      address: '45 Tech Square, Floor 8',
      city: 'London, SW1A 1AA',
      country: 'United Kingdom',
      phone: '+44 20 7123 4567',
      timezone: 'GMT',
      isPrimary: false
    },
    {
      name: 'Asia Pacific',
      address: '2-1-1 Shibuya, Shibuya City',
      city: 'Tokyo, 150-0002',
      country: 'Japan',
      phone: '+81 3-1234-5678',
      timezone: 'JST',
      isPrimary: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Business Contact Methods */}
      <div className="bg-surface rounded-lg p-8 shadow-brand">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Business Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods?.map((contact, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:shadow-brand-focus transition-shadow duration-200">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{contact?.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-1">{contact?.type} Contact</h3>
                  <div className="space-y-1">
                    <a 
                      href={contact?.type === 'Phone' ? `tel:${contact?.primary}` : `mailto:${contact?.primary}`}
                      className="block text-primary hover:underline font-mono text-sm"
                    >
                      {contact?.primary}
                    </a>
                    {contact?.secondary && (
                      <a 
                        href={contact?.type === 'Phone' ? `tel:${contact?.secondary}` : `mailto:${contact?.secondary}`}
                        className="block text-text-secondary hover:text-primary hover:underline font-mono text-sm"
                      >
                        {contact?.secondary}
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mt-2">{contact?.description}</p>
                  <div className="mt-2 inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    {contact?.available}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Physical Office Locations */}
      <div className="bg-surface rounded-lg p-8 shadow-brand">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Office Locations</h2>
        
        <div className="space-y-6">
          {officeLocations?.map((office, index) => (
            <div key={index} className={`
              border rounded-lg p-6 transition-all duration-200
              ${office?.isPrimary 
                ? 'border-primary bg-primary/5 shadow-brand-focus' 
                : 'border-border hover:border-primary/30'
              }
            `}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <h3 className="text-lg font-semibold text-text-primary">{office?.name}</h3>
                    {office?.isPrimary && (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-text-secondary text-sm">📍</span>
                      <div>
                        <p className="text-text-primary">{office?.address}</p>
                        <p className="text-text-secondary">{office?.city}</p>
                        <p className="text-text-secondary">{office?.country}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-text-secondary text-sm">📞</span>
                      <a href={`tel:${office?.phone}`} className="text-primary hover:underline">
                        {office?.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-text-secondary mb-1">{office?.timezone}</p>
                  <p className="text-lg font-mono text-text-primary">
                    {getTimeInZone(timeZones?.find(tz => tz?.zone === office?.timezone)?.offset || 0)}
                  </p>
                  <div className={`
                    inline-block px-2 py-1 rounded text-xs
                    ${isBusinessHours(timeZones?.find(tz => tz?.zone === office?.timezone)?.offset || 0)
                      ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                    }
                  `}>
                    {isBusinessHours(timeZones?.find(tz => tz?.zone === office?.timezone)?.offset || 0)
                      ? 'Open' :'Closed'
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours Across Time Zones */}
      <div className="bg-surface rounded-lg p-8 shadow-brand">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Global Business Hours</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {timeZones?.map((tz, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-text-primary">{tz?.label}</h3>
                <div className={`
                  w-2 h-2 rounded-full
                  ${isBusinessHours(tz?.offset) ? 'bg-success animate-pulse' : 'bg-muted'}
                `}></div>
              </div>
              <p className="text-lg font-mono text-text-primary">{getTimeInZone(tz?.offset)}</p>
              <p className="text-sm text-text-secondary">{tz?.zone}</p>
              <p className="text-xs text-text-secondary mt-1">
                Business Hours: 9:00 AM - 5:00 PM
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-info/5 border border-info/20 rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-2">📅 Business Hours Policy</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Standard hours: Monday - Friday, 9:00 AM - 5:00 PM (local time)</li>
            <li>• Emergency technical support: Available 24/7</li>
            <li>• Weekend support: Limited to critical issues only</li>
            <li>• Holiday schedule: Reduced hours during major holidays</li>
            <li>• International support: Coverage across major time zones</li>
          </ul>
        </div>
      </div>

      {/* Legal and Compliance Information */}
      <div className="bg-surface rounded-lg p-8 shadow-brand">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Legal & Compliance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Business Registration</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-text-secondary">Company Name:</span> Universal Converter Hub Inc.</p>
              <p><span className="text-text-secondary">Registration No:</span> 12345678</p>
              <p><span className="text-text-secondary">Tax ID:</span> 98-7654321</p>
              <p><span className="text-text-secondary">Incorporation:</span> Delaware, USA</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Compliance Contacts</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-text-secondary">Legal:</span> legal@universalconverterhub.com</p>
              <p><span className="text-text-secondary">Privacy:</span> privacy@universalconverterhub.com</p>
              <p><span className="text-text-secondary">GDPR:</span> gdpr@universalconverterhub.com</p>
              <p><span className="text-text-secondary">Security:</span> security@universalconverterhub.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessContactInfo;