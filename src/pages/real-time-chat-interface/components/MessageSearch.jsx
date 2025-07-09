import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageSearch = ({ 
  messages, 
  isVisible, 
  onClose, 
  onMessageSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = messages.filter(message =>
        message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.sender.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setCurrentResultIndex(0);
    } else {
      setSearchResults([]);
      setCurrentResultIndex(0);
    }
  }, [searchTerm, messages]);

  const handlePrevious = () => {
    if (currentResultIndex > 0) {
      setCurrentResultIndex(currentResultIndex - 1);
      onMessageSelect(searchResults[currentResultIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentResultIndex < searchResults.length - 1) {
      setCurrentResultIndex(currentResultIndex + 1);
      onMessageSelect(searchResults[currentResultIndex + 1]);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="bg-surface border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-onSurface placeholder-gray-500 dark:placeholder-gray-400"
            autoFocus
          />
        </div>
        
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      
      {searchResults.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentResultIndex + 1} of {searchResults.length} results
            </span>
            
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={currentResultIndex === 0}
                iconName="ChevronUp"
              />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                disabled={currentResultIndex === searchResults.length - 1}
                iconName="ChevronDown"
              />
            </div>
          </div>
        </div>
      )}
      
      {searchTerm && searchResults.length === 0 && (
        <div className="text-center py-4">
          <Icon name="Search" size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
          <p className="text-gray-500 dark:text-gray-400">No messages found</p>
        </div>
      )}
      
      {searchResults.length > 0 && (
        <div className="mt-4 max-h-48 overflow-y-auto space-y-2">
          {searchResults.slice(0, 5).map((result, index) => (
            <div
              key={result.id}
              onClick={() => onMessageSelect(result)}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                index === currentResultIndex
                  ? 'bg-primary bg-opacity-10 border border-primary' :'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-onSurface">
                  {result.sender.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTime(result.timestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                {result.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageSearch;