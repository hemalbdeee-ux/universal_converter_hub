import React from 'react';
import { MessageCircle, Clock, Globe } from 'lucide-react';

const ContactHero = ({ isBusinessHours, currentTime }) => {
  const timeZones = [
    { zone: "PST (Pacific)", time: currentTime?.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' }) },
    { zone: "EST (Eastern)", time: currentTime?.toLocaleTimeString('en-US', { timeZone: 'America/New_York' }) },
    { zone: "GMT (London)", time: currentTime?.toLocaleTimeString('en-US', { timeZone: 'Europe/London' }) },
    { zone: "CET (Central EU)", time: currentTime?.toLocaleTimeString('en-US', { timeZone: 'Europe/Paris' }) }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact & Support Center
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
            Multiple communication channels and structured inquiry management for users, 
            partners, and media. Professional support with guaranteed response times.
          </p>
          
          {/* Live Status Indicator */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className={`inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20`}>
              <div className={`w-3 h-3 rounded-full ${isBusinessHours() ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">
                {isBusinessHours() ? 'Live Support Available' : 'Outside Business Hours'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-blue-200">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Next available: {isBusinessHours() ? 'Now' : 'Tomorrow 9:00 AM PST'}</span>
            </div>
          </div>

          {/* Global Time Zones */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {timeZones?.map((tz, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">{tz?.zone}</span>
                </div>
                <div className="text-lg font-bold">{tz?.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;