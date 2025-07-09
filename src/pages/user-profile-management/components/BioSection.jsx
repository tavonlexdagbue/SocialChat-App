import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BioSection = ({ user, isEditing, onBioChange }) => {
  const [bioText, setBioText] = useState(user.bio);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 500;

  const handleBioSave = () => {
    onBioChange(bioText);
  };

  const truncatedBio = bioText.length > 150 && !isExpanded 
    ? bioText.substring(0, 150) + '...' 
    : bioText;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">About</h3>
        {isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBioSave}
            iconName="Check"
            iconSize={16}
          >
            Save
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            placeholder="Tell people about yourself..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={4}
            maxLength={maxLength}
          />
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{bioText.length}/{maxLength} characters</span>
            <div className="flex space-x-2">
              <Icon name="Bold" size={16} className="cursor-pointer hover:text-primary" />
              <Icon name="Italic" size={16} className="cursor-pointer hover:text-primary" />
              <Icon name="Link" size={16} className="cursor-pointer hover:text-primary" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {truncatedBio}
          </p>
          {bioText.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:underline text-sm mt-2"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      )}

      {/* User Details */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <Icon name="MapPin" size={16} className="mr-2" />
          <span className="text-sm">{user.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Icon name="Calendar" size={16} className="mr-2" />
          <span className="text-sm">Joined {user.joinDate}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Icon name="Briefcase" size={16} className="mr-2" />
          <span className="text-sm">{user.occupation}</span>
        </div>
      </div>
    </div>
  );
};

export default BioSection;