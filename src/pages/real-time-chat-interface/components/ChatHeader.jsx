import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ChatHeader = ({ 
  conversation, 
  isGroupChat, 
  onlineStatus, 
  onSettingsClick,
  onVideoCall,
  onVoiceCall 
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-surface border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={handleBackClick}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Icon name="ArrowLeft" size={20} />
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={conversation.avatar}
              alt={conversation.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {!isGroupChat && onlineStatus && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
            )}
          </div>
          
          <div>
            <h1 className="font-semibold text-onSurface">
              {conversation.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isGroupChat 
                ? `${conversation.memberCount} members`
                : onlineStatus 
                  ? 'Online' 
                  : `Last seen ${conversation.lastSeen}`
              }
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onVoiceCall}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Icon name="Phone" size={20} />
        </button>
        
        <button
          onClick={onVideoCall}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Icon name="Video" size={20} />
        </button>
        
        <button
          onClick={onSettingsClick}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Icon name="MoreVertical" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;