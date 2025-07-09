import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MessageBubble = ({ 
  message, 
  isOwn, 
  showAvatar, 
  onReact, 
  onReply, 
  onImageClick 
}) => {
  const [showReactions, setShowReactions] = useState(false);

  const handleLongPress = () => {
    setShowReactions(true);
  };

  const handleReaction = (emoji) => {
    onReact(message.id, emoji);
    setShowReactions(false);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sent':
        return <Icon name="Check" size={14} className="text-gray-400" />;
      case 'delivered':
        return <Icon name="CheckCheck" size={14} className="text-gray-400" />;
      case 'read':
        return <Icon name="CheckCheck" size={14} className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-xs sm:max-w-md`}>
        {showAvatar && !isOwn && (
          <Image
            src={message.sender.avatar}
            alt={message.sender.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        
        <div className="relative">
          <div
            className={`px-4 py-2 rounded-2xl ${
              isOwn
                ? 'bg-primary text-onPrimary' :'bg-gray-100 dark:bg-gray-700 text-onSurface'
            }`}
            onContextMenu={(e) => {
              e.preventDefault();
              handleLongPress();
            }}
          >
            {message.replyTo && (
              <div className="mb-2 p-2 bg-black bg-opacity-10 rounded border-l-2 border-primary">
                <p className="text-xs opacity-70">{message.replyTo.sender}</p>
                <p className="text-sm">{message.replyTo.content}</p>
              </div>
            )}
            
            {message.type === 'text' && (
              <p className="text-sm">{message.content}</p>
            )}
            
            {message.type === 'image' && (
              <div className="cursor-pointer" onClick={() => onImageClick(message.content)}>
                <Image
                  src={message.content}
                  alt="Shared image"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
            
            {message.type === 'file' && (
              <div className="flex items-center space-x-2 p-2 bg-black bg-opacity-10 rounded">
                <Icon name="File" size={20} />
                <div>
                  <p className="text-sm font-medium">{message.fileName}</p>
                  <p className="text-xs opacity-70">{message.fileSize}</p>
                </div>
              </div>
            )}
            
            {message.type === 'voice' && (
              <div className="flex items-center space-x-2">
                <button className="p-1 rounded-full bg-black bg-opacity-10">
                  <Icon name="Play" size={16} />
                </button>
                <div className="flex-1 h-1 bg-black bg-opacity-20 rounded">
                  <div className="h-full bg-white rounded" style={{ width: '30%' }}></div>
                </div>
                <span className="text-xs">{message.duration}</span>
              </div>
            )}
            
            <div className={`flex items-center justify-between mt-1 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-xs opacity-70">
                {formatTime(message.timestamp)}
              </span>
              {isOwn && (
                <div className="ml-2">
                  {getStatusIcon()}
                </div>
              )}
            </div>
          </div>
          
          {message.reactions && message.reactions.length > 0 && (
            <div className="absolute -bottom-2 left-2 flex space-x-1">
              {message.reactions.map((reaction, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full px-2 py-1 text-xs flex items-center space-x-1"
                >
                  <span>{reaction.emoji}</span>
                  <span>{reaction.count}</span>
                </div>
              ))}
            </div>
          )}
          
          {showReactions && (
            <div className="absolute top-0 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-2 flex space-x-2 shadow-lg z-10">
              {['👍', '❤️', '😂', '😮', '😢', '😡'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className="text-lg hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
              <button
                onClick={onReply}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Icon name="Reply" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;