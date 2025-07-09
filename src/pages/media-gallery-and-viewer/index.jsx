import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MediaGrid from './components/MediaGrid';
import MediaViewer from './components/MediaViewer';
import AlbumSidebar from './components/AlbumSidebar';
import UploadModal from './components/UploadModal';
import SearchAndFilter from './components/SearchAndFilter';

const MediaGalleryAndViewer = () => {
  const navigate = useNavigate();
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [currentMediaItem, setCurrentMediaItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    mediaType: 'all',
    dateRange: 'all',
    privacy: 'all',
    sortBy: 'newest'
  });

  // Mock data for albums
  const [albums, setAlbums] = useState([
    {
      id: 1,
      name: "Vacation 2024",
      mediaCount: 45,
      createdAt: "2024-01-15T10:30:00Z",
      privacy: "public",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Family Moments",
      mediaCount: 23,
      createdAt: "2024-02-20T14:15:00Z",
      privacy: "private",
      thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Work Events",
      mediaCount: 18,
      createdAt: "2024-03-10T09:45:00Z",
      privacy: "public",
      thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=400&fit=crop"
    }
  ]);

  // Mock data for media items
  const [allMediaItems] = useState([
    {
      id: 1,
      title: "Sunset Beach",
      type: "image",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      createdAt: "2024-01-15T18:30:00Z",
      size: 2.5,
      privacy: "public",
      albumId: 1,
      albumName: "Vacation 2024",
      location: "Malibu, CA",
      tags: ["sunset", "beach", "vacation"]
    },
    {
      id: 2,
      title: "Family Dinner",
      type: "video",
      url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop",
      createdAt: "2024-02-20T19:15:00Z",
      duration: 120,
      size: 15.8,
      privacy: "private",
      albumId: 2,
      albumName: "Family Moments",
      location: "Home",
      tags: ["family", "dinner", "celebration"]
    },
    {
      id: 3,
      title: "Mountain Hike",
      type: "image",
      url: "https://images.unsplash.com/photo-1464822759844-d150baec0494?w=1200&h=800&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400&h=400&fit=crop",
      createdAt: "2024-01-20T12:00:00Z",
      size: 3.2,
      privacy: "public",
      albumId: 1,
      albumName: "Vacation 2024",
      location: "Rocky Mountains, CO",
      tags: ["hiking", "mountains", "nature"]
    },
    {
      id: 4,
      title: "Conference Presentation",
      type: "video",
      url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=400&fit=crop",
      createdAt: "2024-03-10T14:30:00Z",
      duration: 300,
      size: 25.4,
      privacy: "public",
      albumId: 3,
      albumName: "Work Events",
      location: "San Francisco, CA",
      tags: ["work", "presentation", "conference"]
    },
    {
      id: 5,
      title: "City Lights",
      type: "image",
      url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=400&fit=crop",
      createdAt: "2024-01-25T20:45:00Z",
      size: 4.1,
      privacy: "public",
      albumId: null,
      albumName: null,
      location: "New York, NY",
      tags: ["city", "lights", "night"]
    },
    {
      id: 6,
      title: "Birthday Party",
      type: "image",
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=800&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop",
      createdAt: "2024-02-25T16:20:00Z",
      size: 2.8,
      privacy: "private",
      albumId: 2,
      albumName: "Family Moments",
      location: "Home",
      tags: ["birthday", "party", "celebration"]
    }
  ]);

  // Filter media items based on selected album, search, and filters
  const filteredMediaItems = allMediaItems.filter(item => {
    // Album filter
    if (selectedAlbum && item.albumId !== selectedAlbum.id) return false;
    
    // Search filter
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Media type filter
    if (filters.mediaType !== 'all' && item.type !== filters.mediaType) return false;
    
    // Privacy filter
    if (filters.privacy !== 'all' && item.privacy !== filters.privacy) return false;
    
    // Date range filter
    if (filters.dateRange !== 'all') {
      const itemDate = new Date(item.createdAt);
      const now = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          if (itemDate.toDateString() !== now.toDateString()) return false;
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (itemDate < weekAgo) return false;
          break;
        case 'month':
          const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          if (itemDate < monthAgo) return false;
          break;
        case 'year':
          const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          if (itemDate < yearAgo) return false;
          break;
      }
    }
    
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'name':
        return a.title.localeCompare(b.title);
      case 'size':
        return b.size - a.size;
      default: // newest
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item) => {
    if (isSelectionMode) {
      handleItemSelect(item.id);
    } else {
      setCurrentMediaItem(item);
      setShowViewer(true);
    }
  };

  const handleViewerNext = () => {
    const currentIndex = filteredMediaItems.findIndex(item => item.id === currentMediaItem.id);
    const nextIndex = (currentIndex + 1) % filteredMediaItems.length;
    setCurrentMediaItem(filteredMediaItems[nextIndex]);
  };

  const handleViewerPrevious = () => {
    const currentIndex = filteredMediaItems.findIndex(item => item.id === currentMediaItem.id);
    const prevIndex = currentIndex === 0 ? filteredMediaItems.length - 1 : currentIndex - 1;
    setCurrentMediaItem(filteredMediaItems[prevIndex]);
  };

  const handleCreateAlbum = (name) => {
    const newAlbum = {
      id: Date.now(),
      name,
      mediaCount: 0,
      createdAt: new Date().toISOString(),
      privacy: "public",
      thumbnail: null
    };
    setAlbums(prev => [...prev, newAlbum]);
  };

  const handleDeleteAlbum = (albumId) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      setAlbums(prev => prev.filter(album => album.id !== albumId));
      if (selectedAlbum?.id === albumId) {
        setSelectedAlbum(null);
      }
    }
  };

  const handleUpload = (files, albumId) => {
    console.log('Uploading files:', files, 'to album:', albumId);
    // In a real app, this would upload files to the server
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Delete ${selectedItems.length} selected items?`)) {
          console.log('Deleting items:', selectedItems);
          setSelectedItems([]);
          setIsSelectionMode(false);
        }
        break;
      case 'share': console.log('Sharing items:', selectedItems);
        break;
      case 'download':
        console.log('Downloading items:', selectedItems);
        break;
      case 'move': console.log('Moving items:', selectedItems);
        break;
    }
  };

  const handleShare = (item) => {
    console.log('Sharing item:', item);
  };

  const handleDownload = (item) => {
    console.log('Downloading item:', item);
  };

  const handleDelete = (item) => {
    if (window.confirm('Delete this item?')) {
      console.log('Deleting item:', item);
      setShowViewer(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                iconName="ArrowLeft"
                className="lg:hidden"
              />
              <div>
                <h1 className="text-2xl font-bold text-onSurface">Media Gallery</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedAlbum ? selectedAlbum.name : 'All Media'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={isSelectionMode ? 'primary' : 'outline'}
                onClick={() => {
                  setIsSelectionMode(!isSelectionMode);
                  setSelectedItems([]);
                }}
                iconName="CheckSquare"
                className="hidden sm:flex"
              >
                Select
              </Button>
              
              <Button
                variant="primary"
                onClick={() => setShowUploadModal(true)}
                iconName="Upload"
              >
                Upload
              </Button>

              {/* Navigation Menu */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  iconName="Menu"
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
                  <div className="py-2">
                    <button
                      onClick={() => navigate('/user-profile-management')}
                      className="w-full text-left px-4 py-2 text-sm text-onSurface hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2"
                    >
                      <Icon name="User" size={16} />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => navigate('/real-time-chat-interface')}
                      className="w-full text-left px-4 py-2 text-sm text-onSurface hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2"
                    >
                      <Icon name="MessageCircle" size={16} />
                      <span>Chat</span>
                    </button>
                    <button
                      onClick={() => navigate('/friend-discovery-and-management')}
                      className="w-full text-left px-4 py-2 text-sm text-onSurface hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2"
                    >
                      <Icon name="Users" size={16} />
                      <span>Friends</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <AlbumSidebar
          albums={albums}
          selectedAlbum={selectedAlbum}
          onAlbumSelect={setSelectedAlbum}
          onCreateAlbum={handleCreateAlbum}
          onDeleteAlbum={handleDeleteAlbum}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search and Filter */}
          <SearchAndFilter
            onSearch={setSearchQuery}
            onFilter={setFilters}
            onViewModeChange={setViewMode}
            viewMode={viewMode}
            totalItems={filteredMediaItems.length}
            selectedItems={selectedItems}
            onClearSelection={() => setSelectedItems([])}
            onBulkAction={handleBulkAction}
          />

          {/* Media Grid */}
          <MediaGrid
            mediaItems={filteredMediaItems}
            selectedItems={selectedItems}
            onItemSelect={handleItemSelect}
            onItemClick={handleItemClick}
            isSelectionMode={isSelectionMode}
            viewMode={viewMode}
          />
        </div>
      </div>

      {/* Media Viewer */}
      <MediaViewer
        mediaItem={currentMediaItem}
        mediaItems={filteredMediaItems}
        isOpen={showViewer}
        onClose={() => setShowViewer(false)}
        onNext={handleViewerNext}
        onPrevious={handleViewerPrevious}
        onShare={handleShare}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
        albums={albums}
      />
    </div>
  );
};

export default MediaGalleryAndViewer;