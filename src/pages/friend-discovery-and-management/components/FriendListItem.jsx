import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FriendListItem = ({ friend, onMessage, onUnfriend, onBlock }) => {
  const getLastActiveText = (lastActive) => {
    const now = new Date();
    const lastActiveDate = new Date(lastActive);
    const diffInMinutes = Math.floor((now - lastActiveDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Active now';
    if (diffInMinutes < 60) return `Active ${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `Active ${Math.floor(diffInMinutes / 60)}h ago`;
    return `Active ${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="flex items-center p-3 bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative mr-3">
        <Image
          src={friend.profilePicture}
          alt={friend.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {friend.isOnline && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-surface"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-onSurface truncate">{friend.name}</h3>
        <p className="text-sm text-gray-600 truncate">
          {friend.isOnline ? 'Active now' : getLastActiveText(friend.lastActive)}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          iconName="MessageCircle"
          onClick={() => onMessage(friend.id)}
          className="p-2"
        />
        <div className="relative group">
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            className="p-2"
          />
          <div className="absolute right-0 top-full mt-1 w-32 bg-surface rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <button
              onClick={() => onUnfriend(friend.id)}
              className="w-full px-3 py-2 text-left text-sm text-error hover:bg-gray-100 rounded-t-lg flex items-center"
            >
              <Icon name="UserMinus" size={14} className="mr-2" />
              Unfriend
            </button>
            <button
              onClick={() => onBlock(friend.id)}
              className="w-full px-3 py-2 text-left text-sm text-error hover:bg-gray-100 rounded-b-lg flex items-center"
            >
              <Icon name="Ban" size={14} className="mr-2" />
              Block
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendListItem;