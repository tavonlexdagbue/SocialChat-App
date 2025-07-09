import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CoverPhotoSection from './components/CoverPhotoSection';
import ProfilePictureSection from './components/ProfilePictureSection';
import BioSection from './components/BioSection';
import PhotoGallery from './components/PhotoGallery';
import RecentPosts from './components/RecentPosts';
import FriendsList from './components/FriendsList';
import PrivacySettings from './components/PrivacySettings';
import AccountSettings from './components/AccountSettings';

const UserProfileManagement = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    id: "user_12345",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b9c5e8c1?w=400&h=400&fit=crop&crop=face",
    coverPhoto: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
    bio: `Digital marketing specialist passionate about creating meaningful connections and sharing life's beautiful moments. Love traveling, photography, and discovering new coffee shops around the city.\n\nCurrently working on exciting projects in social media strategy and always looking to connect with like-minded professionals.`,
    location: "San Francisco, CA",
    occupation: "Digital Marketing Specialist at TechCorp",
    joinDate: "March 2022",
    friendsCount: 342,
    isOnline: true
  });

  // Mock photos data
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
      caption: "Beautiful sunset at the beach",
      uploadDate: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      caption: "Mountain hiking adventure",
      uploadDate: "2024-01-10T14:20:00Z"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
      caption: "Forest trail exploration",
      uploadDate: "2024-01-08T09:15:00Z"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      caption: "City skyline view",
      uploadDate: "2024-01-05T16:45:00Z"
    }
  ]);

  // Mock posts data
  const [posts] = useState([
    {
      id: 1,
      content: "Just finished an amazing project with my team! The collaboration and creativity that went into this campaign was incredible. Grateful to work with such talented people who inspire me every day.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      timestamp: "2024-01-20T15:30:00Z",
      likes: 45,
      comments: 12,
      shares: 3,
      privacy: "Public"
    },
    {
      id: 2,
      content: "Weekend coffee shop hopping in the city! Found this amazing little place with the best latte art I've ever seen. The barista was so skilled and passionate about their craft. Sometimes it's the small discoveries that make the biggest impact on your day.",
      timestamp: "2024-01-18T11:20:00Z",
      likes: 28,
      comments: 8,
      shares: 1,
      privacy: "Friends"
    },
    {
      id: 3,
      content: "Reflecting on this year's goals and feeling motivated about the journey ahead. Growth happens outside our comfort zone, and I'm ready to embrace new challenges and opportunities.",
      timestamp: "2024-01-15T09:45:00Z",
      likes: 67,
      comments: 15,
      shares: 5,
      privacy: "Public"
    }
  ]);

  // Mock friends data
  const [friends] = useState([
    {
      id: 1,
      name: "Michael Chen",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      mutualFriends: 23,
      isOnline: true
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      mutualFriends: 18,
      isOnline: false
    },
    {
      id: 3,
      name: "David Kim",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      mutualFriends: 31,
      isOnline: true
    },
    {
      id: 4,
      name: "Lisa Thompson",
      profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      mutualFriends: 12,
      isOnline: false
    },
    {
      id: 5,
      name: "Alex Johnson",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      mutualFriends: 27,
      isOnline: true
    },
    {
      id: 6,
      name: "Maria Garcia",
      profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      mutualFriends: 15,
      isOnline: false
    }
  ]);

  // Mock privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'friends',
    photoVisibility: 'friends',
    postVisibility: 'public',
    allowFriendRequests: true,
    allowEmailSearch: false,
    showOnlineStatus: true,
    showLastSeen: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'photos', label: 'Photos', icon: 'Image' },
    { id: 'friends', label: 'Friends', icon: 'Users' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const handleCoverPhotoChange = (newCoverPhoto) => {
    setUserData(prev => ({ ...prev, coverPhoto: newCoverPhoto }));
    showSaveConfirmation();
  };

  const handleProfilePictureChange = (newProfilePicture) => {
    setUserData(prev => ({ ...prev, profilePicture: newProfilePicture }));
    showSaveConfirmation();
  };

  const handleBioChange = (newBio) => {
    setUserData(prev => ({ ...prev, bio: newBio }));
    showSaveConfirmation();
  };

  const handlePhotoAdd = (newPhotos) => {
    setPhotos(prev => [...newPhotos, ...prev]);
    showSaveConfirmation();
  };

  const handlePhotoDelete = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    showSaveConfirmation();
  };

  const handlePostDelete = (postId) => {
    // In a real app, this would delete the post
    console.log('Delete post:', postId);
  };

  const handleMessageFriend = (friend) => {
    navigate('/real-time-chat-interface', { state: { selectedFriend: friend } });
  };

  const handlePrivacySettingsChange = (newSettings) => {
    setPrivacySettings(newSettings);
    showSaveConfirmation();
  };

  const handlePasswordChange = (passwordData) => {
    // In a real app, this would update the password
    console.log('Password change:', passwordData);
    showSaveConfirmation();
  };

  const handleDataExport = () => {
    // In a real app, this would export user data
    console.log('Exporting user data...');
    showSaveConfirmation();
  };

  const showSaveConfirmation = () => {
    setShowSaveIndicator(true);
    setTimeout(() => setShowSaveIndicator(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <BioSection
              user={userData}
              isEditing={isEditing}
              onBioChange={handleBioChange}
            />
            <RecentPosts
              posts={posts}
              user={userData}
              onPostDelete={handlePostDelete}
            />
          </div>
        );
      case 'photos':
        return (
          <PhotoGallery
            photos={photos}
            isEditing={isEditing}
            onPhotoAdd={handlePhotoAdd}
            onPhotoDelete={handlePhotoDelete}
          />
        );
      case 'friends':
        return (
          <FriendsList
            friends={friends}
            onMessageFriend={handleMessageFriend}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings
            settings={privacySettings}
            onSettingsChange={handlePrivacySettingsChange}
          />
        );
      case 'settings':
        return (
          <AccountSettings
            user={userData}
            onPasswordChange={handlePasswordChange}
            onDataExport={handleDataExport}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                iconSize={20}
                onClick={() => navigate(-1)}
              />
              <h1 className="text-xl font-semibold text-gray-800">
                {userData.name}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {showSaveIndicator && (
                <div className="flex items-center space-x-2 text-green-600 text-sm">
                  <Icon name="Check" size={16} />
                  <span>Saved</span>
                </div>
              )}
              
              <Button
                variant={isEditing ? "primary" : "outline"}
                size="sm"
                iconName={isEditing ? "Check" : "Edit"}
                iconSize={16}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Done' : 'Edit'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Desktop Navigation */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white' :'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Header */}
            <div className="mb-6">
              <CoverPhotoSection
                user={userData}
                isEditing={isEditing}
                onCoverPhotoChange={handleCoverPhotoChange}
              />
              <ProfilePictureSection
                user={userData}
                isEditing={isEditing}
                onProfilePictureChange={handleProfilePictureChange}
              />
            </div>

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden mb-6">
              <div className="bg-white rounded-lg shadow-sm p-2">
                <div className="flex space-x-1 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-white' :'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <Button
            variant="ghost"
            size="sm"
            iconName="Home"
            iconSize={20}
            onClick={() => navigate('/')}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Search"
            iconSize={20}
            onClick={() => navigate('/friend-discovery-and-management')}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageCircle"
            iconSize={20}
            onClick={() => navigate('/real-time-chat-interface')}
          />
          <Button
            variant="primary"
            size="sm"
            iconName="User"
            iconSize={20}
          />
        </div>
      </nav>
    </div>
  );
};

export default UserProfileManagement;