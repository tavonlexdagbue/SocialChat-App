import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PhotoGallery = ({ photos, isEditing, onPhotoAdd, onPhotoDelete }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        const newPhotos = files.map(file => ({
          id: Date.now() + Math.random(),
          url: URL.createObjectURL(file),
          caption: '',
          uploadDate: new Date().toISOString()
        }));
        onPhotoAdd(newPhotos);
        setIsUploading(false);
      }, 1500);
    }
  };

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Photos</h3>
        {isEditing && (
          <label htmlFor="photo-upload" className="cursor-pointer">
            <Button
              variant="outline"
              size="sm"
              iconName={isUploading ? "Loader2" : "Plus"}
              iconSize={16}
              className={isUploading ? "animate-spin" : ""}
            >
              Add Photos
            </Button>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Icon name="Image" size={48} className="mx-auto mb-2 opacity-50" />
          <p>No photos yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group aspect-square">
              <Image
                src={photo.url}
                alt={photo.caption || 'Photo'}
                className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openLightbox(photo)}
              />
              
              {/* Delete Button (Edit Mode) */}
              {isEditing && (
                <button
                  onClick={() => onPhotoDelete(photo.id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="X" size={12} />
                </button>
              )}
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <Icon name="X" size={24} />
            </button>
            <Image
              src={selectedPhoto.url}
              alt={selectedPhoto.caption || 'Photo'}
              className="max-w-full max-h-full object-contain"
            />
            {selectedPhoto.caption && (
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <p className="bg-black bg-opacity-50 rounded px-3 py-2">
                  {selectedPhoto.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;