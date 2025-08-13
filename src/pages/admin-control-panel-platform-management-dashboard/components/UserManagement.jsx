import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      status: "active",
      role: "user",
      joinDate: "2024-12-15",
      lastActive: "2025-01-07",
      conversions: 1247,
      location: "United States",
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      status: "active",
      role: "premium",
      joinDate: "2024-11-22",
      lastActive: "2025-01-07",
      conversions: 2891,
      location: "Canada",
      verified: true
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.rodriguez@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      status: "inactive",
      role: "user",
      joinDate: "2024-10-08",
      lastActive: "2024-12-20",
      conversions: 456,
      location: "Spain",
      verified: false
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      status: "suspended",
      role: "user",
      joinDate: "2024-09-12",
      lastActive: "2024-12-28",
      conversions: 89,
      location: "South Korea",
      verified: true
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      status: "active",
      role: "admin",
      joinDate: "2024-08-05",
      lastActive: "2025-01-07",
      conversions: 3456,
      location: "United Kingdom",
      verified: true
    },
    {
      id: 6,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      status: "active",
      role: "user",
      joinDate: "2024-12-01",
      lastActive: "2025-01-06",
      conversions: 234,
      location: "Egypt",
      verified: true
    }
  ];

  const statusOptions = ['all', 'active', 'inactive', 'suspended'];

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'inactive':
        return 'bg-muted text-text-secondary border-border';
      case 'suspended':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'premium':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'user':
        return 'bg-surface text-text-secondary border-border';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const handleUserAction = (userId, action) => {
    console.log(`Performing ${action} on user ${userId}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">User Management</h2>
            <p className="text-sm text-text-secondary mt-1">
              Manage user accounts, authentication, and access controls
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" iconName="Download" iconPosition="left" size="sm">
              Export Users
            </Button>
            <Button variant="default" iconName="UserPlus" iconPosition="left" size="sm">
              Add User
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-2">
            {statusOptions?.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">User</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">Role</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">Conversions</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">Location</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-text-secondary">Last Active</th>
              <th className="text-right py-3 px-6 text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {user?.verified && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                          <Icon name="Check" size={10} color="white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{user?.name}</p>
                      <p className="text-xs text-text-secondary">{user?.email}</p>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user?.status)}`}>
                    {user?.status}
                  </span>
                </td>
                
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user?.role)}`}>
                    {user?.role}
                  </span>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calculator" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{user?.conversions?.toLocaleString()}</span>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">{user?.location}</span>
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <span className="text-sm text-text-secondary">{user?.lastActive}</span>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUserAction(user?.id, 'view')}
                      iconName="Eye"
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUserAction(user?.id, 'edit')}
                      iconName="Edit"
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUserAction(user?.id, 'suspend')}
                      iconName="Ban"
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MoreHorizontal"
                      iconSize={16}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* User Demographics */}
      <div className="p-6 border-t border-border">
        <h3 className="text-lg font-medium text-text-primary mb-4">User Demographics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm font-medium text-text-secondary">Total Users</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">45,672</p>
            <p className="text-xs text-success">+8.3% this month</p>
          </div>
          
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="UserCheck" size={16} className="text-success" />
              <span className="text-sm font-medium text-text-secondary">Active Users</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">38,945</p>
            <p className="text-xs text-success">85.3% of total</p>
          </div>
          
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Crown" size={16} className="text-accent" />
              <span className="text-sm font-medium text-text-secondary">Premium Users</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">3,247</p>
            <p className="text-xs text-success">7.1% conversion rate</p>
          </div>
          
          <div className="bg-surface rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Globe" size={16} className="text-emerald-600" />
              <span className="text-sm font-medium text-text-secondary">Countries</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">127</p>
            <p className="text-xs text-text-secondary">Global reach</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;