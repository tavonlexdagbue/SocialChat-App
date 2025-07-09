import React, { useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfilePictureUpload = ({ profilePicture, setProfilePicture, errors }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture({
          file: file,
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } };
      handleFileSelect(fakeEvent);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-onSurface mb-3">Profile Picture</h3>
      
      <div className="flex flex-col items-center">
        <div 
          className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          {profilePicture ? (
            <div className="relative w-full h-full">
              <Image
                src={profilePicture.preview}
                alt="Profile preview"
                className="w-full h-full rounded-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeProfilePicture();
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Icon name="Camera" size={24} color="var(--color-primary)" />
              <p className="text-xs text-gray-500 mt-1">Add Photo</p>
            </div>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex space-x-2 mt-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-primary hover:text-primary-500 transition-colors"
          >
            <Icon name="Upload" size={16} />
            <span>Upload</span>
          </button>
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-primary hover:text-primary-500 transition-colors"
          >
            <Icon name="Camera" size={16} />
            <span>Camera</span>
          </button>
        </div>
        
        {errors.profilePicture && (
          <p className="text-error text-sm mt-2 flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.profilePicture}
          </p>
        )}
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          Drag and drop or click to upload<br />
          Max size: 5MB
        </p>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;