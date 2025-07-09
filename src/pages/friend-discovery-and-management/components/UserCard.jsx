import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const UserCard = ({ user, onAddFriend, onMessage, onAcceptRequest, onDeclineRequest, type = 'discover' }) => {
  const renderActionButtons = () => {
    switch (type) {
      case 'discover':
        return (
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              iconName="UserPlus"
              onClick={() => onAddFriend(user.id)}
              className="flex-1"
            >
              Add Friend
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              onClick={() => onMessage(user.id)}
              className="flex-1"
            >
              Message
            </Button>
          </div>
        );
      case 'incoming':
        return (
          <div className="flex gap-2">
            <Button
              variant="success"
              size="sm"
              iconName="Check"
              onClick={() => onAcceptRequest(user.id)}
              className="flex-1"
            >
              Accept
            </Button>
            <Button
              variant="danger"
              size="sm"
              iconName="X"
              onClick={() => onDeclineRequest(user.id)}
              className="flex-1"
            >
              Decline
            </Button>
          </div>
        );
      case 'outgoing':
        return (
          <Button
            variant="outline"
            size="sm"
            iconName="Clock"
            disabled
            className="w-full"
          >
            Request Sent
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-3">
          <Image
            src={user.profilePicture}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {user.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-surface"></div>
          )}
        </div>
        
        <h3 className="font-semibold text-onSurface mb-1 truncate w-full">{user.name}</h3>
        
        {user.mutualFriends > 0 && (
          <p className="text-sm text-gray-600 mb-2">
            {user.mutualFriends} mutual friend{user.mutualFriends !== 1 ? 's' : ''}
          </p>
        )}
        
        {user.location && (
          <p className="text-xs text-gray-500 mb-3 flex items-center">
            <Icon name="MapPin" size={12} className="mr-1" />
            {user.location}
          </p>
        )}
        
        {type === 'incoming' && user.requestDate && (
          <p className="text-xs text-gray-500 mb-3">
            Sent {new Date(user.requestDate).toLocaleDateString()}
          </p>
        )}
        
        {renderActionButtons()}
      </div>
    </div>
  );
};

export default UserCard;