import React from 'react';
import Input from '../../../components/ui/Input';
import ProfilePictureUpload from './ProfilePictureUpload';
import Icon from '../../../components/AppIcon';

const ProfileSetupSection = ({ 
  formData, 
  handleInputChange, 
  profilePicture, 
  setProfilePicture, 
  errors 
}) => {
  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-lg font-semibold text-onSurface mb-4">Profile Setup</h2>
      
      <ProfilePictureUpload 
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
        errors={errors}
      />
      
      <div>
        <textarea
          name="bio"
          placeholder="Tell us about yourself (optional)"
          value={formData.bio}
          onChange={handleInputChange}
          rows={3}
          maxLength={150}
          className="w-full px-3 py-3 bg-surface border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base resize-none"
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formData.bio.length}/150 characters
          </span>
        </div>
        {errors.bio && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.bio}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-md font-medium text-onSurface">Privacy Preferences</h3>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <Input
              type="checkbox"
              name="profileVisibility"
              checked={formData.profileVisibility}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="text-sm text-onSurface">Make my profile visible to everyone</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <Input
              type="checkbox"
              name="allowFriendRequests"
              checked={formData.allowFriendRequests}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="text-sm text-onSurface">Allow friend requests from anyone</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <Input
              type="checkbox"
              name="emailNotifications"
              checked={formData.emailNotifications}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="text-sm text-onSurface">Receive email notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupSection;