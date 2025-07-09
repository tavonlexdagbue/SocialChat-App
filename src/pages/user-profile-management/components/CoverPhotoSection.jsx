import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CoverPhotoSection = ({ user, isEditing, onCoverPhotoChange }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleCoverPhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        const newCoverPhoto = URL.createObjectURL(file);
        onCoverPhotoChange(newCoverPhoto);
        setIsUploading(false);
      }, 1500);
    }
  };

  return (
    <div className="relative w-full h-48 md:h-64 bg-gray-200 rounded-lg overflow-hidden">
      <Image
        src={user.coverPhoto}
        alt="Cover Photo"
        className="w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Upload Button */}
      {isEditing && (
        <div className="absolute bottom-4 right-4">
          <label htmlFor="cover-photo-upload" className="cursor-pointer">
            <div className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200">
              {isUploading ? (
                <Icon name="Loader2" size={20} className="animate-spin text-gray-600" />
              ) : (
                <Icon name="Camera" size={20} className="text-gray-600" />
              )}
            </div>
          </label>
          <input
            id="cover-photo-upload"
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoUpload}
            className="hidden"
          />
        </div>
      )}
      
      {/* User Info Overlay */}
      <div className="absolute bottom-4 left-4 text-white">
        <h1 className="text-xl md:text-2xl font-bold">{user.name}</h1>
        <p className="text-sm opacity-90">{user.friendsCount} friends</p>
      </div>
    </div>
  );
};

export default CoverPhotoSection;