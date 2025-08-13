import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-brand hover:shadow-brand-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">{stat?.label}</p>
              <p className="text-2xl font-bold text-text-primary mt-1">{stat?.value}</p>
              {stat?.change && (
                <div className={`flex items-center mt-2 text-sm ${
                  stat?.change?.type === 'increase' ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={stat?.change?.type === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                    className="mr-1" 
                  />
                  <span>{stat?.change?.value}</span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={24} color={stat?.iconColor} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;