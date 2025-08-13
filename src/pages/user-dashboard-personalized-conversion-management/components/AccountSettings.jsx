import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountSettings = ({ settings, onUpdateSettings }) => {
  const { user, userProfile, updateProfile, changePassword, deleteAccount } = useAuth();
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    delete: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSettingChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
    setError('');
  };

  const handleSave = async () => {
    try {
      setLoading(prev => ({ ...prev, profile: true }));
      setError('');
      setSuccess('');

      // Update profile with preferences and privacy settings
      const result = await updateProfile({
        full_name: localSettings?.fullName,
        email: localSettings?.email,
        preferences: {
          defaultPrecision: localSettings?.defaultPrecision,
          measurementSystem: localSettings?.measurementSystem,
          currencyDisplay: localSettings?.currencyDisplay,
          numberFormat: localSettings?.numberFormat,
          emailNotifications: localSettings?.emailNotifications,
          weeklyReport: localSettings?.weeklyReport,
          featureUpdates: localSettings?.featureUpdates,
          educationalContent: localSettings?.educationalContent
        },
        privacy_settings: {
          saveHistory: localSettings?.saveHistory,
          shareAnalytics: localSettings?.shareAnalytics,
          publicProfile: localSettings?.publicProfile
        }
      });

      if (result?.success) {
        setHasChanges(false);
        setSuccess('Settings updated successfully!');
        onUpdateSettings?.(localSettings);
      } else {
        setError(result?.error || 'Failed to update settings');
      }
    } catch (error) {
      setError('Failed to update settings. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setHasChanges(false);
    setError('');
    setSuccess('');
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleChangePassword = async () => {
    try {
      setError('');
      setSuccess('');

      if (!passwordData?.newPassword) {
        setError('New password is required');
        return;
      }

      if (passwordData?.newPassword?.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      if (passwordData?.newPassword !== passwordData?.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      setLoading(prev => ({ ...prev, password: true }));

      const result = await changePassword(passwordData?.newPassword);

      if (result?.success) {
        setSuccess('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError(result?.error || 'Failed to change password');
      }
    } catch (error) {
      setError('Failed to change password. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, password: false }));
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data.')) {
      return;
    }

    try {
      setLoading(prev => ({ ...prev, delete: true }));
      setError('');

      const result = await deleteAccount();

      if (result?.success) {
        setSuccess('Account deleted successfully. You will be redirected shortly.');
        // Redirect will happen automatically through AuthContext
      } else {
        setError(result?.error || 'Failed to delete account');
      }
    } catch (error) {
      setError('Failed to delete account. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Account Settings</h2>
          {hasChanges && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                disabled={loading?.profile}
                iconName={loading?.profile ? "Loader2" : "Save"}
                iconPosition="left"
              >
                {loading?.profile ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 space-y-8">
        {/* Alert Messages */}
        {error && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={20} className="text-error mr-2" />
              <p className="text-sm text-error font-medium">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center">
              <Icon name="CheckCircle" size={20} className="text-success mr-2" />
              <p className="text-sm text-success font-medium">{success}</p>
            </div>
          </div>
        )}

        {/* Profile Settings */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
            <Icon name="User" size={20} className="mr-2" />
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              value={localSettings?.fullName || userProfile?.full_name || ''}
              onChange={(e) => handleSettingChange('fullName', e?.target?.value)}
              placeholder="Enter your full name"
            />
            <Input
              label="Email Address"
              type="email"
              value={localSettings?.email || userProfile?.email || ''}
              onChange={(e) => handleSettingChange('email', e?.target?.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4">
            <p className="text-sm text-text-secondary">
              <strong>Username:</strong> {userProfile?.username || 'Not set'}
            </p>
            <p className="text-sm text-text-secondary">
              <strong>Role:</strong> {userProfile?.role || 'user'}
            </p>
            <p className="text-sm text-text-secondary">
              <strong>Member since:</strong> {userProfile?.created_at ? new Date(userProfile.created_at)?.toLocaleDateString() : 'Unknown'}
            </p>
          </div>
        </div>

        {/* Password Change */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Lock" size={20} className="mr-2" />
            Change Password
          </h3>
          <div className="space-y-4">
            <div className="relative">
              <Input
                label="New Password"
                type={showPasswords?.new ? 'text' : 'password'}
                value={passwordData?.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
                placeholder="Enter new password"
                iconName="Lock"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon name={showPasswords?.new ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm New Password"
                type={showPasswords?.confirm ? 'text' : 'password'}
                value={passwordData?.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
                placeholder="Confirm new password"
                iconName="Lock"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon name={showPasswords?.confirm ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </div>

            <Button
              onClick={handleChangePassword}
              variant="outline"
              size="sm"
              disabled={loading?.password || !passwordData?.newPassword || !passwordData?.confirmPassword}
              iconName={loading?.password ? "Loader2" : "Key"}
              iconPosition="left"
            >
              {loading?.password ? 'Changing Password...' : 'Change Password'}
            </Button>
          </div>
        </div>

        {/* Conversion Preferences */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Settings" size={20} className="mr-2" />
            Conversion Preferences
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Default Precision
                </label>
                <select
                  value={localSettings?.defaultPrecision || '4'}
                  onChange={(e) => handleSettingChange('defaultPrecision', e?.target?.value)}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="2">2 decimal places</option>
                  <option value="4">4 decimal places</option>
                  <option value="6">6 decimal places</option>
                  <option value="8">8 decimal places</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Measurement System
                </label>
                <select
                  value={localSettings?.measurementSystem || 'metric'}
                  onChange={(e) => handleSettingChange('measurementSystem', e?.target?.value)}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="metric">Metric (SI)</option>
                  <option value="imperial">Imperial (US)</option>
                  <option value="mixed">Mixed (Auto-detect)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Currency Display
                </label>
                <select
                  value={localSettings?.currencyDisplay || 'symbol'}
                  onChange={(e) => handleSettingChange('currencyDisplay', e?.target?.value)}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="symbol">Symbol ($, €, £)</option>
                  <option value="code">Code (USD, EUR, GBP)</option>
                  <option value="name">Name (Dollar, Euro, Pound)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Number Format
                </label>
                <select
                  value={localSettings?.numberFormat || 'us'}
                  onChange={(e) => handleSettingChange('numberFormat', e?.target?.value)}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="us">US (1,234.56)</option>
                  <option value="eu">European (1.234,56)</option>
                  <option value="in">Indian (1,23,456.78)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Bell" size={20} className="mr-2" />
            Notifications
          </h3>
          <div className="space-y-4">
            <Checkbox
              label="Email notifications for currency rate alerts"
              description="Get notified when your watched currencies change significantly"
              checked={localSettings?.emailNotifications || false}
              onChange={(e) => handleSettingChange('emailNotifications', e?.target?.checked)}
            />
            <Checkbox
              label="Weekly usage summary"
              description="Receive a weekly report of your conversion activity"
              checked={localSettings?.weeklyReport || false}
              onChange={(e) => handleSettingChange('weeklyReport', e?.target?.checked)}
            />
            <Checkbox
              label="New feature announcements"
              description="Be the first to know about new converters and features"
              checked={localSettings?.featureUpdates || false}
              onChange={(e) => handleSettingChange('featureUpdates', e?.target?.checked)}
            />
            <Checkbox
              label="Educational content recommendations"
              description="Get personalized learning recommendations based on your usage"
              checked={localSettings?.educationalContent || false}
              onChange={(e) => handleSettingChange('educationalContent', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Shield" size={20} className="mr-2" />
            Privacy & Data
          </h3>
          <div className="space-y-4">
            <Checkbox
              label="Save conversion history"
              description="Allow the platform to save your conversion history for analytics"
              checked={localSettings?.saveHistory || false}
              onChange={(e) => handleSettingChange('saveHistory', e?.target?.checked)}
            />
            <Checkbox
              label="Share usage analytics"
              description="Help improve the platform by sharing anonymous usage data"
              checked={localSettings?.shareAnalytics || false}
              onChange={(e) => handleSettingChange('shareAnalytics', e?.target?.checked)}
            />
            <Checkbox
              label="Public profile"
              description="Allow others to see your custom conversion sets"
              checked={localSettings?.publicProfile || false}
              onChange={(e) => handleSettingChange('publicProfile', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-medium text-error mb-4 flex items-center">
            <Icon name="AlertTriangle" size={20} className="mr-2" />
            Danger Zone
          </h3>
          <div className="bg-error/5 border border-error/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-error">Delete Account</h4>
                <p className="text-sm text-text-secondary mt-1">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteAccount}
                disabled={loading?.delete}
                iconName={loading?.delete ? "Loader2" : "Trash2"}
              >
                {loading?.delete ? 'Deleting...' : 'Delete Account'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;