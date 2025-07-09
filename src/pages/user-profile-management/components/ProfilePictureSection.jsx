import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProfilePictureSection = ({ user, isEditing, onProfilePictureChange }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        const newProfilePicture = URL.createObjectURL(file);
        onProfilePictureChange(newProfilePicture);
        setIsUploading(false);
      }, 1500);
    }
  };

  return (
    <div className="relative -mt-16 md:-mt-20 ml-4 md:ml-8">
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <Image
          src={user.profilePicture}
          alt="Profile Picture"
          className="w-full h-full rounded-full border-4 border-white object-cover shadow-lg"
        />
        
        {/* Upload Button */}
        {isEditing && (
          <div className="absolute bottom-0 right-0">
            <label htmlFor="profile-picture-upload" className="cursor-pointer">
              <div className="bg-primary hover:bg-opacity-90 rounded-full p-2 transition-all duration-200">
                {isUploading ? (
                  <Icon name="Loader2" size={16} className="animate-spin text-white" />
                ) : (
                  <Icon name="Camera" size={16} className="text-white" />
                )}
              </div>
            </label>
            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
          </div>
        )}
        
        {/* Online Status */}
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
      </div>
    </div>
  );
};

export default ProfilePictureSection;