import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacySettings = ({ settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (key) => {
    const newSettings = {
      ...localSettings,
      [key]: !localSettings[key]
    };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const handleDropdownChange = (key, value) => {
    const newSettings = {
      ...localSettings,
      [key]: value
    };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setHasChanges(false);
  };

  const privacyOptions = [
    { value: 'public', label: 'Public' },
    { value: 'friends', label: 'Friends Only' },
    { value: 'private', label: 'Only Me' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Privacy Settings</h3>
        {hasChanges && (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              iconName="Check"
              iconSize={16}
            >
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Profile Visibility */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Profile Visibility</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Eye" size={16} className="text-gray-500" />
                <span className="text-sm">Who can see my profile</span>
              </div>
              <select
                value={localSettings.profileVisibility}
                onChange={(e) => handleDropdownChange('profileVisibility', e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {privacyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Image" size={16} className="text-gray-500" />
                <span className="text-sm">Who can see my photos</span>
              </div>
              <select
                value={localSettings.photoVisibility}
                onChange={(e) => handleDropdownChange('photoVisibility', e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {privacyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={16} className="text-gray-500" />
                <span className="text-sm">Who can see my posts</span>
              </div>
              <select
                value={localSettings.postVisibility}
                onChange={(e) => handleDropdownChange('postVisibility', e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {privacyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Friend Requests */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Friend Requests</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="UserPlus" size={16} className="text-gray-500" />
                <span className="text-sm">Allow friend requests</span>
              </div>
              <button
                onClick={() => handleToggle('allowFriendRequests')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  localSettings.allowFriendRequests ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localSettings.allowFriendRequests ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Search" size={16} className="text-gray-500" />
                <span className="text-sm">Allow search by email</span>
              </div>
              <button
                onClick={() => handleToggle('allowEmailSearch')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  localSettings.allowEmailSearch ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localSettings.allowEmailSearch ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Activity Status */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Activity Status</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Circle" size={16} className="text-gray-500" />
                <span className="text-sm">Show when I'm online</span>
              </div>
              <button
                onClick={() => handleToggle('showOnlineStatus')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  localSettings.showOnlineStatus ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localSettings.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-gray-500" />
                <span className="text-sm">Show last seen</span>
              </div>
              <button
                onClick={() => handleToggle('showLastSeen')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  localSettings.showLastSeen ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localSettings.showLastSeen ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;