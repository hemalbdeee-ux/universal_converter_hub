import React from 'react';
import { Clock, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

const ResponseTimeCommitments = () => {
  const slaCommitments = [
    {
      category: "Media Inquiries",
      responseTime: "4 hours",
      description: "Press requests and media relations",
      icon: Zap,
      priority: "urgent"
    },
    {
      category: "Technical Support",
      responseTime: "24 hours",
      description: "Bug reports, conversion errors, platform issues",
      icon: AlertTriangle,
      priority: "high"
    },
    {
      category: "Business Inquiries",
      responseTime: "48 hours",
      description: "Partnerships, enterprise solutions, API access",
      icon: CheckCircle,
      priority: "normal"
    },
    {
      category: "General Support",
      responseTime: "72 hours",
      description: "Account help, basic questions, general assistance",
      icon: Clock,
      priority: "standard"
    },
    {
      category: "Educational Licensing",
      responseTime: "5 business days",
      description: "Institutional partnerships, bulk licensing",
      icon: CheckCircle,
      priority: "normal"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'normal': return 'text-blue-600 bg-blue-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="h-5 w-5 text-green-600" />
        <h3 className="font-semibold text-gray-900">Response Time Commitments</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">
        We guarantee response times based on inquiry type. All times are during business hours.
      </p>

      <div className="space-y-4">
        {slaCommitments?.map((sla, index) => {
          const IconComponent = sla?.icon;
          return (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${getPriorityColor(sla?.priority)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{sla?.category}</h4>
                    <p className="text-sm text-gray-600">{sla?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{sla?.responseTime}</div>
                  <div className="text-xs text-gray-500 capitalize">{sla?.priority} priority</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          SLA Guarantee
        </h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• 99.5% on-time response rate</li>
          <li>• Automatic escalation if SLA missed</li>
          <li>• Priority queue for urgent issues</li>
          <li>• 24/7 emergency support for enterprise customers</li>
        </ul>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>
          <strong>Note:</strong> Response times calculated during business hours (Mon-Fri 9AM-5PM). 
          Emergency issues receive immediate attention regardless of business hours.
        </p>
      </div>
    </div>
  );
};

export default ResponseTimeCommitments;