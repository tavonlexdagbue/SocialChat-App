import React from 'react';
import Image from '../../../components/AppImage';

const TypingIndicator = ({ typingUsers }) => {
  if (!typingUsers || typingUsers.length === 0) return null;

  const getTypingText = () => {
    if (typingUsers.length === 1) {
      return `${typingUsers[0].name} is typing...`;
    } else if (typingUsers.length === 2) {
      return `${typingUsers[0].name} and ${typingUsers[1].name} are typing...`;
    } else {
      return `${typingUsers[0].name} and ${typingUsers.length - 1} others are typing...`;
    }
  };

  return (
    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-800">
      <div className="flex -space-x-2">
        {typingUsers.slice(0, 3).map((user, index) => (
          <Image
            key={user.id}
            src={user.avatar}
            alt={user.name}
            className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 object-cover"
          />
        ))}
      </div>
      
      <div className="flex items-center space-x-1">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {getTypingText()}
        </span>
        
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;