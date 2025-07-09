import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MediaViewer = ({ 
  mediaItem, 
  mediaItems, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious,
  onShare,
  onDownload,
  onDelete
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setShowControls(false), 3000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case ' ':
          e.preventDefault();
          if (mediaItem?.type === 'video') {
            setVideoPlaying(!videoPlaying);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose, onNext, onPrevious, videoPlaying, mediaItem]);

  const handleZoom = (delta) => {
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
    setIsZoomed(true);
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setIsZoomed(false);
  };

  const formatFileSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (!isOpen || !mediaItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      {/* Header Controls */}
      <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent p-4 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              className="text-white hover:bg-white hover:bg-opacity-20"
            />
            <div className="text-white">
              <h3 className="font-medium">{mediaItem.title}</h3>
              <p className="text-sm opacity-80">
                {new Date(mediaItem.createdAt).toLocaleDateString()} • {formatFileSize(mediaItem.size * 1024 * 1024)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {mediaItem.type === 'image' && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleZoom(0.2)}
                  iconName="ZoomIn"
                  className="text-white hover:bg-white hover:bg-opacity-20"
                />
                <Button
                  variant="ghost"
                  onClick={() => handleZoom(-0.2)}
                  iconName="ZoomOut"
                  className="text-white hover:bg-white hover:bg-opacity-20"
                />
                <Button
                  variant="ghost"
                  onClick={resetZoom}
                  iconName="RotateCcw"
                  className="text-white hover:bg-white hover:bg-opacity-20"
                />
              </>
            )}
            <Button
              variant="ghost"
              onClick={() => onShare(mediaItem)}
              iconName="Share"
              className="text-white hover:bg-white hover:bg-opacity-20"
            />
            <Button
              variant="ghost"
              onClick={() => onDownload(mediaItem)}
              iconName="Download"
              className="text-white hover:bg-white hover:bg-opacity-20"
            />
            <Button
              variant="ghost"
              onClick={() => onDelete(mediaItem)}
              iconName="Trash2"
              className="text-white hover:bg-white hover:bg-opacity-20"
            />
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        onClick={onPrevious}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        iconName="ChevronLeft"
        size="lg"
      />
      
      <Button
        variant="ghost"
        onClick={onNext}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        iconName="ChevronRight"
        size="lg"
      />

      {/* Media Content */}
      <div 
        className="relative w-full h-full flex items-center justify-center cursor-pointer"
        onClick={() => setShowControls(!showControls)}
      >
        {mediaItem.type === 'image' ? (
          <div 
            className="relative max-w-full max-h-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <Image
              src={mediaItem.url}
              alt={mediaItem.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          <video
            src={mediaItem.url}
            controls
            autoPlay={videoPlaying}
            className="max-w-full max-h-full"
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
          />
        )}
      </div>

      {/* Bottom Info */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            {mediaItem.location && (
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">{mediaItem.location}</span>
              </div>
            )}
            {mediaItem.tags && mediaItem.tags.length > 0 && (
              <div className="flex items-center space-x-1">
                <Icon name="Tag" size={16} />
                <span className="text-sm">{mediaItem.tags.join(', ')}</span>
              </div>
            )}
          </div>
          
          <div className="text-sm opacity-80">
            {mediaItems.findIndex(item => item.id === mediaItem.id) + 1} of {mediaItems.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaViewer;