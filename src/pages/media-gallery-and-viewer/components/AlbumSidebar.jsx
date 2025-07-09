import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AlbumSidebar = ({ 
  albums, 
  selectedAlbum, 
  onAlbumSelect, 
  onCreateAlbum, 
  onDeleteAlbum,
  isOpen,
  onToggle
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');

  const handleCreateAlbum = () => {
    if (newAlbumName.trim()) {
      onCreateAlbum(newAlbumName.trim());
      setNewAlbumName('');
      setIsCreating(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateAlbum();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewAlbumName('');
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        onClick={onToggle}
        className="lg:hidden fixed top-20 left-4 z-20 bg-surface shadow-lg"
        iconName="FolderOpen"
      />

      {/* Sidebar */}
      <div className={`fixed lg:relative top-0 left-0 h-full w-64 bg-surface border-r border-gray-200 dark:border-gray-700 z-10 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-onSurface">Albums</h2>
            <Button
              variant="ghost"
              onClick={onToggle}
              className="lg:hidden"
              iconName="X"
            />
          </div>
          
          <Button
            variant="primary"
            onClick={() => setIsCreating(true)}
            iconName="Plus"
            fullWidth
            size="sm"
          >
            New Album
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* All Media */}
          <div
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
              selectedAlbum === null 
                ? 'bg-primary text-onPrimary' :'hover:bg-gray-100 dark:hover:bg-gray-800 text-onSurface'
            }`}
            onClick={() => onAlbumSelect(null)}
          >
            <Icon name="Image" size={20} />
            <div className="flex-1">
              <p className="font-medium">All Media</p>
              <p className="text-sm opacity-80">
                {albums.reduce((total, album) => total + album.mediaCount, 0)} items
              </p>
            </div>
          </div>

          {/* Create Album Input */}
          {isCreating && (
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Input
                type="text"
                placeholder="Album name"
                value={newAlbumName}
                onChange={(e) => setNewAlbumName(e.target.value)}
                onKeyDown={handleKeyPress}
                className="mb-2"
                autoFocus
              />
              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  onClick={handleCreateAlbum}
                  size="sm"
                  disabled={!newAlbumName.trim()}
                >
                  Create
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsCreating(false);
                    setNewAlbumName('');
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Albums List */}
          <div className="space-y-2">
            {albums.map((album) => (
              <div
                key={album.id}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors group ${
                  selectedAlbum?.id === album.id 
                    ? 'bg-primary text-onPrimary' :'hover:bg-gray-100 dark:hover:bg-gray-800 text-onSurface'
                }`}
                onClick={() => onAlbumSelect(album)}
              >
                <div className="relative">
                  <Icon name="Folder" size={20} />
                  {album.privacy === 'private' && (
                    <Icon 
                      name="Lock" 
                      size={12} 
                      className="absolute -top-1 -right-1 bg-surface rounded-full p-0.5" 
                    />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{album.name}</p>
                  <p className="text-sm opacity-80">
                    {album.mediaCount} items • {new Date(album.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteAlbum(album.id);
                  }}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                    selectedAlbum?.id === album.id ? 'text-onPrimary' : 'text-gray-500'
                  }`}
                  iconName="Trash2"
                  size="sm"
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {albums.length === 0 && !isCreating && (
            <div className="text-center py-8">
              <Icon name="FolderPlus" size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No albums yet
              </p>
              <Button
                variant="outline"
                onClick={() => setIsCreating(true)}
                iconName="Plus"
                size="sm"
              >
                Create your first album
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default AlbumSidebar;