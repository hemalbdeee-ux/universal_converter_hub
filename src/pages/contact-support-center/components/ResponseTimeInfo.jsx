import React, { useState, useEffect } from 'react';

const ResponseTimeInfo = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const responseTypes = [
    {
      type: 'General Inquiries',
      icon: '💬',
      standardTime: '24 hours',
      urgentTime: '4 hours',
      sla: '95%',
      color: 'primary',
      description: 'Questions about features, usage, and general support'
    },
    {
      type: 'Technical Issues',
      icon: '🔧',
      standardTime: '12 hours',
      urgentTime: '2 hours',
      sla: '98%',
      color: 'info',
      description: 'Bug reports, calculation errors, and technical problems'
    },
    {
      type: 'Account & Billing',
      icon: '💳',
      standardTime: '8 hours',
      urgentTime: '1 hour',
      sla: '99%',
      color: 'success',
      description: 'Account management, billing questions, and subscription issues'
    },
    {
      type: 'Business Partnerships',
      icon: '🤝',
      standardTime: '48 hours',
      urgentTime: '8 hours',
      sla: '90%',
      color: 'warning',
      description: 'Enterprise solutions, API access, and partnership inquiries'
    },
    {
      type: 'Privacy & Legal',
      icon: '🛡️',
      standardTime: '72 hours',
      urgentTime: '24 hours',
      sla: '100%',
      color: 'destructive',
      description: 'GDPR requests, privacy concerns, and legal matters'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      info: 'bg-info/10 text-info border-info/20',
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      destructive: 'bg-destructive/10 text-destructive border-destructive/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const isBusinessHours = () => {
    const hour = currentTime.getHours();
    const day = currentTime.getDay();
    return day >= 1 && day <= 5 && hour >= 9 && hour <= 17; // Monday-Friday 9AM-5PM
  };

  const getNextBusinessHour = () => {
    const now = new Date(currentTime);
    const nextBusinessDay = new Date(now);
    
    // If it's weekend, set to next Monday
    if (now?.getDay() === 0 || now?.getDay() === 6) {
      nextBusinessDay?.setDate(now?.getDate() + (1 + 7 - now?.getDay()) % 7);
      nextBusinessDay?.setHours(9, 0, 0, 0);
    }
    // If it's after business hours on weekday, set to next business day
    else if (now?.getHours() >= 17) {
      if (now?.getDay() === 5) { // Friday after hours -> Monday
        nextBusinessDay?.setDate(now?.getDate() + 3);
      } else { // Other weekdays -> next day
        nextBusinessDay?.setDate(now?.getDate() + 1);
      }
      nextBusinessDay?.setHours(9, 0, 0, 0);
    }
    // If it's before business hours on weekday, set to 9AM today
    else if (now?.getHours() < 9) {
      nextBusinessDay?.setHours(9, 0, 0, 0);
    }
    // If it's during business hours, return current time
    else {
      return null; // Business hours are active
    }
    
    return nextBusinessDay;
  };

  const formatTimeUntilBusiness = () => {
    const nextBusiness = getNextBusinessHour();
    if (!nextBusiness) return null;
    
    const diff = nextBusiness?.getTime() - currentTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours < 24) {
      return `${hours}h ${minutes}m`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days}d ${remainingHours}h`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="bg-surface rounded-lg p-6 shadow-brand">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Support Status</h3>
          <div className={`
            flex items-center space-x-2 px-3 py-1 rounded-full text-sm
            ${isBusinessHours() ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}
          `}>
            <div className={`w-2 h-2 rounded-full ${isBusinessHours() ? 'bg-success animate-pulse' : 'bg-warning'}`}></div>
            <span>{isBusinessHours() ? 'Live Support Active' : 'Outside Business Hours'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-text-secondary mb-1">Current Time:</p>
            <p className="font-mono text-lg text-text-primary">
              {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div>
            <p className="text-text-secondary mb-1">
              {isBusinessHours() ? 'Business Hours Active' : 'Next Business Hours:'}
            </p>
            <p className="font-mono text-lg text-text-primary">
              {isBusinessHours() ? 'Until 5:00 PM' : formatTimeUntilBusiness()}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-text-secondary">
            Business Hours: Monday - Friday, 9:00 AM - 5:00 PM (PST) | 
            Emergency Support: Available 24/7 | 
            Weekend: Limited support for critical issues
          </p>
        </div>
      </div>

      {/* Response Time SLAs */}
      <div className="bg-surface rounded-lg p-6 shadow-brand">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Response Time SLAs</h3>
        
        <div className="space-y-4">
          {responseTypes?.map((item, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:shadow-brand-focus transition-shadow duration-200">
              <div className="flex items-start space-x-3">
                <div className="text-xl">{item?.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">{item?.type}</h4>
                    <div className={`px-2 py-1 text-xs rounded border ${getColorClasses(item?.color)}`}>
                      {item?.sla} SLA
                    </div>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-3">{item?.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Standard Response:</span>
                      <p className="font-medium text-text-primary">{item?.standardTime}</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Urgent Response:</span>
                      <p className="font-medium text-text-primary">{item?.urgentTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-surface rounded-lg p-6 shadow-brand">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Support Performance</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">97.8%</div>
            <div className="text-sm text-text-secondary">SLA Met</div>
            <div className="text-xs text-text-secondary mt-1">This Month</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">18m</div>
            <div className="text-sm text-text-secondary">Avg Response</div>
            <div className="text-xs text-text-secondary mt-1">All Inquiries</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-info">4.9★</div>
            <div className="text-sm text-text-secondary">Satisfaction</div>
            <div className="text-xs text-text-secondary mt-1">User Rating</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">94%</div>
            <div className="text-sm text-text-secondary">First Contact</div>
            <div className="text-xs text-text-secondary mt-1">Resolution</div>
          </div>
        </div>

        <div className="mt-6 bg-info/5 border border-info/20 rounded-lg p-4">
          <h4 className="font-medium text-text-primary mb-2">📊 Performance Commitment</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• We aim to respond to all inquiries within our published SLAs</li>
            <li>• Complex technical issues may require additional investigation time</li>
            <li>• We'll always keep you updated on the progress of your request</li>
            <li>• Emergency issues receive immediate attention regardless of business hours</li>
          </ul>
        </div>
      </div>

      {/* Escalation Process */}
      <div className="bg-surface rounded-lg p-6 shadow-brand">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Escalation Process</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary text-sm font-bold">1</span>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Initial Response</h4>
              <p className="text-sm text-text-secondary">
                Our support team reviews your inquiry and provides an initial response within SLA timeframes.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-info text-sm font-bold">2</span>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Specialist Assignment</h4>
              <p className="text-sm text-text-secondary">
                Complex issues are assigned to specialists in the relevant area (technical, billing, legal).
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-warning text-sm font-bold">3</span>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Management Review</h4>
              <p className="text-sm text-text-secondary">
                If not resolved within 48 hours, cases are escalated to management for review and action.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-success text-sm font-bold">✓</span>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">Resolution & Follow-up</h4>
              <p className="text-sm text-text-secondary">
                We ensure resolution meets your needs and follow up to confirm satisfaction.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-text-secondary mb-2">Not satisfied with our response time?</p>
          <button className="text-primary hover:underline text-sm font-medium">
            Request Escalation →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseTimeInfo;