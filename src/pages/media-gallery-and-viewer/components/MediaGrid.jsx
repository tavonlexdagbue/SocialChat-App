import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MediaGrid = ({ 
  mediaItems, 
  selectedItems, 
  onItemSelect, 
  onItemClick, 
  isSelectionMode,
  viewMode = 'grid'
}) => {
  const [loadedItems, setLoadedItems] = useState(20);

  const handleLoadMore = () => {
    setLoadedItems(prev => Math.min(prev + 20, mediaItems.length));
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGridClasses = () => {
    switch (viewMode) {
      case 'list':
        return 'grid grid-cols-1 gap-2';
      case 'large':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
      default:
        return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className={getGridClasses()}>
        {mediaItems.slice(0, loadedItems).map((item) => (
          <div
            key={item.id}
            className={`relative group cursor-pointer rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 ${
              viewMode === 'list' ? 'flex items-center p-3' : 'aspect-square'
            }`}
            onClick={() => onItemClick(item)}
          >
            {/* Selection Checkbox */}
            {isSelectionMode && (
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onItemSelect(item.id);
                  }}
                  className="w-5 h-5 text-primary bg-white border-2 border-gray-300 rounded focus:ring-primary"
                />
              </div>
            )}

            {/* Media Thumbnail */}
            <div className={`${viewMode === 'list' ? 'w-16 h-16 flex-shrink-0 mr-3' : 'w-full h-full'} relative`}>
              <Image
                src={item.thumbnail}
                alt={item.title || 'Media item'}
                className="w-full h-full object-cover"
              />
              
              {/* Video Duration Overlay */}
              {item.type === 'video' && (
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                  {formatDuration(item.duration)}
                </div>
              )}

              {/* Privacy Indicator */}
              {item.privacy === 'private' && (
                <div className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1">
                  <Icon name="Lock" size={12} />
                </div>
              )}
            </div>

            {/* List View Details */}
            {viewMode === 'list' && (
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-onSurface truncate">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {item.type === 'video' ? formatDuration(item.duration) : `${item.size} MB`}
                </p>
              </div>
            )}

            {/* Hover Overlay for Grid View */}
            {viewMode !== 'list' && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Icon name="Eye" size={24} color="white" />
                </div>
              </div>
            )}

            {/* Album Badge */}
            {item.albumName && viewMode !== 'list' && (
              <div className="absolute bottom-1 left-1 bg-primary bg-opacity-90 text-white text-xs px-1.5 py-0.5 rounded">
                {item.albumName}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {loadedItems < mediaItems.length && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            iconName="ChevronDown"
            iconPosition="right"
          >
            Load More ({mediaItems.length - loadedItems} remaining)
          </Button>
        </div>
      )}

      {/* Empty State */}
      {mediaItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon name="Image" size={48} className="text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-onSurface mb-2">No media found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Upload your first photo or video to get started
          </p>
          <Button variant="primary" iconName="Upload">
            Upload Media
          </Button>
        </div>
      )}
    </div>
  );
};

export default MediaGrid;