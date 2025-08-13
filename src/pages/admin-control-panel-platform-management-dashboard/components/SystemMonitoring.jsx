import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemMonitoring = () => {
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const performanceData = [
    { time: '00:00', cpu: 45, memory: 62, response: 120, uptime: 99.9 },
    { time: '04:00', cpu: 38, memory: 58, response: 110, uptime: 99.9 },
    { time: '08:00', cpu: 72, memory: 71, response: 180, uptime: 99.8 },
    { time: '12:00', cpu: 85, memory: 78, response: 220, uptime: 99.8 },
    { time: '16:00', cpu: 91, memory: 82, response: 250, uptime: 99.7 },
    { time: '20:00', cpu: 67, memory: 69, response: 160, uptime: 99.8 },
    { time: '24:00', cpu: 52, memory: 64, response: 140, uptime: 99.9 }
  ];

  const apiData = [
    { endpoint: '/api/convert', requests: 2847291, avgResponse: 145, errors: 23, uptime: 99.9 },
    { endpoint: '/api/currency', requests: 1234567, avgResponse: 320, errors: 12, uptime: 99.8 },
    { endpoint: '/api/search', requests: 987654, avgResponse: 89, errors: 5, uptime: 99.9 },
    { endpoint: '/api/user', requests: 456789, avgResponse: 67, errors: 8, uptime: 99.9 },
    { endpoint: '/api/admin', requests: 123456, avgResponse: 234, errors: 2, uptime: 100 }
  ];

  const cdnNodes = [
    { location: 'US East', status: 'healthy', latency: 45, traffic: '2.3TB', uptime: 99.9 },
    { location: 'US West', status: 'healthy', latency: 52, traffic: '1.8TB', uptime: 99.8 },
    { location: 'Europe', status: 'healthy', latency: 38, traffic: '1.5TB', uptime: 99.9 },
    { location: 'Asia Pacific', status: 'warning', latency: 89, traffic: '1.2TB', uptime: 99.5 },
    { location: 'South America', status: 'healthy', latency: 67, traffic: '0.8TB', uptime: 99.7 }
  ];

  const securityEvents = [
    {
      id: 1,
      type: 'Suspicious Activity',
      severity: 'medium',
      description: 'Multiple failed login attempts from IP 192.168.1.100',
      timestamp: '2025-01-07 14:23:15',
      status: 'investigating'
    },
    {
      id: 2,
      type: 'Rate Limit Exceeded',
      severity: 'low',
      description: 'API rate limit exceeded for user ID 12345',
      timestamp: '2025-01-07 13:45:22',
      status: 'resolved'
    },
    {
      id: 3,
      type: 'SSL Certificate',
      severity: 'high',
      description: 'SSL certificate expires in 7 days',
      timestamp: '2025-01-07 12:00:00',
      status: 'pending'
    },
    {
      id: 4,
      type: 'Database Connection',
      severity: 'medium',
      description: 'Temporary database connection timeout',
      timestamp: '2025-01-07 11:15:33',
      status: 'resolved'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const metrics = [
    { value: 'performance', label: 'Performance', icon: 'Activity' },
    { value: 'api', label: 'API Health', icon: 'Zap' },
    { value: 'security', label: 'Security', icon: 'Shield' }
  ];

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">System Monitoring</h2>
            <p className="text-sm text-text-secondary mt-1">
              Real-time system performance, API health, and security monitoring
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            {metrics?.map((metric) => (
              <Button
                key={metric?.value}
                variant={selectedMetric === metric?.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric(metric?.value)}
                iconName={metric?.icon}
                iconPosition="left"
              >
                {metric?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* System Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Server" size={16} className="text-success" />
              <span className="text-sm font-medium text-text-secondary">System Uptime</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">99.8%</p>
            <p className="text-xs text-success">29 days, 23 hours</p>
          </div>
          
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Cpu" size={16} className="text-warning" />
              <span className="text-sm font-medium text-text-secondary">CPU Usage</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">67%</p>
            <p className="text-xs text-warning">Above normal</p>
          </div>
          
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="HardDrive" size={16} className="text-primary" />
              <span className="text-sm font-medium text-text-secondary">Memory Usage</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">69%</p>
            <p className="text-xs text-success">Within limits</p>
          </div>
          
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-success" />
              <span className="text-sm font-medium text-text-secondary">Avg Response</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">160ms</p>
            <p className="text-xs text-success">Excellent</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="h-80">
          <h3 className="text-lg font-medium text-text-primary mb-4">System Performance (24h)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="cpu" 
                stackId="1"
                stroke="#f59e0b" 
                fill="#f59e0b"
                fillOpacity={0.3}
                name="CPU %"
              />
              <Area 
                type="monotone" 
                dataKey="memory" 
                stackId="2"
                stroke="#1e40af" 
                fill="#1e40af"
                fillOpacity={0.3}
                name="Memory %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Performance */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">API Performance</h3>
          <div className="space-y-3">
            {apiData?.map((api, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{api?.endpoint}</p>
                    <p className="text-xs text-text-secondary">{api?.requests?.toLocaleString()} requests</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{api?.avgResponse}ms</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary">{api?.uptime}%</span>
                    <div className={`w-2 h-2 rounded-full ${api?.uptime >= 99.9 ? 'bg-success' : api?.uptime >= 99.5 ? 'bg-warning' : 'bg-destructive'}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CDN Status */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">CDN Node Status</h3>
          <div className="space-y-3">
            {cdnNodes?.map((node, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Icon name="Globe" size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{node?.location}</p>
                    <p className="text-xs text-text-secondary">{node?.traffic} transferred</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(node?.status)}`}>
                      {node?.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{node?.latency}ms latency</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Security Events */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary">Security Events</h3>
          <Button variant="outline" iconName="Shield" iconPosition="left" size="sm">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {securityEvents?.map((event) => (
            <div key={event.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={16} className="text-destructive" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-text-primary">{event.type}</h4>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">{event.description}</p>
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span>{event.timestamp}</span>
                  <span className="capitalize">Status: {event.status}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" iconName="Eye" iconSize={14} />
                <Button variant="ghost" size="icon" iconName="MoreHorizontal" iconSize={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;