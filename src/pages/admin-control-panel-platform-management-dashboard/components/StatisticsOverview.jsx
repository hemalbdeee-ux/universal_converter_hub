import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsOverview = () => {
  const stats = [
    {
      id: 1,
      title: "Active Conversions",
      value: "2,347,891",
      change: "+12.5%",
      changeType: "increase",
      icon: "Calculator",
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Total conversions today"
    },
    {
      id: 2,
      title: "User Registrations",
      value: "45,672",
      change: "+8.3%",
      changeType: "increase",
      icon: "Users",
      color: "text-success",
      bgColor: "bg-success/10",
      description: "New users this month"
    },
    {
      id: 3,
      title: "Popular Categories",
      value: "Currency",
      change: "Temperature",
      changeType: "neutral",
      icon: "TrendingUp",
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Most used converter"
    },
    {
      id: 4,
      title: "System Performance",
      value: "99.8%",
      change: "+0.2%",
      changeType: "increase",
      icon: "Activity",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Uptime this month"
    },
    {
      id: 5,
      title: "Revenue Today",
      value: "$12,847",
      change: "+15.7%",
      changeType: "increase",
      icon: "DollarSign",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "AdSense earnings"
    },
    {
      id: 6,
      title: "API Requests",
      value: "8.9M",
      change: "+22.1%",
      changeType: "increase",
      icon: "Zap",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Requests processed"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-lg transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon name={stat?.icon} size={20} className={stat?.color} />
                </div>
                <h3 className="text-sm font-medium text-text-secondary">{stat?.title}</h3>
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl font-bold text-text-primary">{stat?.value}</p>
                <p className="text-xs text-text-secondary">{stat?.description}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-1">
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                stat?.changeType === 'increase' ?'bg-success/10 text-success' 
                  : stat?.changeType === 'decrease' ?'bg-destructive/10 text-destructive' :'bg-muted text-text-secondary'
              }`}>
                {stat?.changeType === 'increase' && <Icon name="TrendingUp" size={12} />}
                {stat?.changeType === 'decrease' && <Icon name="TrendingDown" size={12} />}
                <span>{stat?.change}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsOverview;