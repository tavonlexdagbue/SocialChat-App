import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImageViewer = ({ 
  images, 
  currentIndex, 
  isVisible, 
  onClose, 
  onPrevious, 
  onNext 
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isVisible) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isVisible, currentIndex]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.5, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.5, 0.5));
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e) => {
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
      case '+': case'=':
        handleZoomIn();
        break;
      case '-':
        handleZoomOut();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isVisible, isDragging, dragStart, position, scale]);

  if (!isVisible || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 p-4 flex items-center justify-between text-white z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <Icon name="X" size={24} color="white" />
          </button>
          
          <div>
            <h3 className="font-medium">{currentImage.sender}</h3>
            <p className="text-sm opacity-70">
              {new Date(currentImage.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm">
            {currentIndex + 1} of {images.length}
          </span>
          
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <Icon name="ZoomOut" size={20} color="white" />
          </button>
          
          <span className="text-sm min-w-[3rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <Icon name="ZoomIn" size={20} color="white" />
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors text-white z-10"
            disabled={currentIndex === 0}
          >
            <Icon name="ChevronLeft" size={24} color="white" />
          </button>
          
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors text-white z-10"
            disabled={currentIndex === images.length - 1}
          >
            <Icon name="ChevronRight" size={24} color="white" />
          </button>
        </>
      )}
      
      {/* Image */}
      <div className="flex-1 flex items-center justify-center p-16">
        <div
          className={`transition-transform ${isDragging ? 'cursor-grabbing' : scale > 1 ? 'cursor-grab' : 'cursor-default'}`}
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          }}
          onMouseDown={handleMouseDown}
        >
          <Image
            src={currentImage.src}
            alt="Full size image"
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
          />
        </div>
      </div>
      
      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
          <div className="flex justify-center space-x-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  // This would trigger parent component to change currentIndex
                  setScale(1);
                  setPosition({ x: 0, y: 0 });
                }}
                className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                  index === currentIndex
                    ? 'border-white' :'border-transparent hover:border-gray-400'
                }`}
              >
                <Image
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageViewer;