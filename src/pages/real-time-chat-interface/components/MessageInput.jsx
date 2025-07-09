import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ 
  onSendMessage, 
  onFileUpload, 
  replyTo, 
  onCancelReply,
  isRecording,
  onStartRecording,
  onStopRecording 
}) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage({
        type: 'text',
        content: message.trim(),
        replyTo: replyTo
      });
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            onFileUpload(file);
            setUploadProgress(null);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '😢', '😡'];

  return (
    <div className="bg-surface border-t border-gray-200 dark:border-gray-700 p-4">
      {replyTo && (
        <div className="mb-3 p-2 bg-gray-100 dark:bg-gray-700 rounded border-l-4 border-primary flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Replying to {replyTo.sender}</p>
            <p className="text-sm text-onSurface">{replyTo.content}</p>
          </div>
          <button
            onClick={onCancelReply}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      )}
      
      {uploadProgress !== null && (
        <div className="mb-3 p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-onSurface">Uploading...</span>
            <span className="text-sm text-gray-500">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="flex items-end space-x-2">
        <div className="flex space-x-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <Icon name="Paperclip" size={20} />
          </button>
          
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <Icon name="Smile" size={20} />
          </button>
        </div>
        
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-onSurface placeholder-gray-500 dark:placeholder-gray-400"
            rows="1"
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />
          
          {showEmojiPicker && (
            <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg z-10">
              <div className="grid grid-cols-6 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {message.trim() ? (
          <Button
            variant="primary"
            onClick={handleSend}
            className="rounded-full p-2 min-w-[40px] h-10"
          >
            <Icon name="Send" size={20} />
          </Button>
        ) : (
          <button
            onMouseDown={onStartRecording}
            onMouseUp={onStopRecording}
            onTouchStart={onStartRecording}
            onTouchEnd={onStopRecording}
            className={`p-2 rounded-full transition-colors ${
              isRecording 
                ? 'bg-red-500 text-white' :'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Icon name="Mic" size={20} />
          </button>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default MessageInput;