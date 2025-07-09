import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FriendsList = ({ friends, onMessageFriend }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedFriends = showAll ? friends : friends.slice(0, 6);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Friends ({friends.length})
        </h3>
        {friends.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary hover:underline text-sm"
          >
            {showAll ? 'Show less' : 'See all'}
          </button>
        )}
      </div>

      {friends.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Icon name="Users" size={48} className="mx-auto mb-2 opacity-50" />
          <p>No friends yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {displayedFriends.map((friend) => (
            <div key={friend.id} className="text-center group">
              <div className="relative mb-2">
                <Image
                  src={friend.profilePicture}
                  alt={friend.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto"
                />
                
                {/* Online Status */}
                {friend.isOnline && (
                  <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <h4 className="font-medium text-gray-800 text-sm mb-1 truncate">
                {friend.name}
              </h4>
              
              <p className="text-xs text-gray-500 mb-2">
                {friend.mutualFriends} mutual friends
              </p>
              
              <Button
                variant="outline"
                size="xs"
                iconName="MessageCircle"
                iconSize={12}
                onClick={() => onMessageFriend(friend)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Message
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsList;