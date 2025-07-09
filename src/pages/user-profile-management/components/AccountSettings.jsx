import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSettings = ({ user, onPasswordChange, onDataExport }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    friendRequestNotifications: true,
    postLikeNotifications: false,
    commentNotifications: true
  });
  const [isExporting, setIsExporting] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onPasswordChange(passwordData);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordForm(false);
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDataExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      onDataExport();
      setIsExporting(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Account Settings</h3>

      {/* Password Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-800">Password</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            iconName="Key"
            iconSize={16}
          >
            Change Password
          </Button>
        </div>

        {showPasswordForm && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <Input
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData(prev => ({
                ...prev,
                currentPassword: e.target.value
              }))}
              required
            />
            <Input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData(prev => ({
                ...prev,
                newPassword: e.target.value
              }))}
              required
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData(prev => ({
                ...prev,
                confirmPassword: e.target.value
              }))}
              required
            />
            <div className="flex space-x-2">
              <Button type="submit" variant="primary" size="sm">
                Update Password
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">Notification Preferences</h4>
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={
                    key.includes('email') ? 'Mail' :
                    key.includes('push') ? 'Smartphone' :
                    key.includes('message') ? 'MessageCircle' :
                    key.includes('friend') ? 'UserPlus' :
                    key.includes('like') ? 'Heart' :
                    'MessageSquare'
                  } 
                  size={16} 
                  className="text-gray-500" 
                />
                <span className="text-sm capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
              <button
                onClick={() => handleNotificationToggle(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-800 mb-4">Data Management</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Download" size={16} className="text-gray-500" />
              <div>
                <span className="text-sm font-medium">Export Data</span>
                <p className="text-xs text-gray-500">Download a copy of your data</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDataExport}
              loading={isExporting}
              iconName={isExporting ? "Loader2" : "Download"}
              iconSize={16}
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Trash2" size={16} className="text-red-500" />
              <div>
                <span className="text-sm font-medium text-red-600">Delete Account</span>
                <p className="text-xs text-gray-500">Permanently delete your account</p>
              </div>
            </div>
            <Button
              variant="danger"
              size="sm"
              iconName="AlertTriangle"
              iconSize={16}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div>
        <h4 className="font-medium text-gray-800 mb-4">Account Information</h4>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Email:</span>
            <span className="text-sm font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Member since:</span>
            <span className="text-sm font-medium">{user.joinDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Account ID:</span>
            <span className="text-sm font-medium font-mono">{user.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;