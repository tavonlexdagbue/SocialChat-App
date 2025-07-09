import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from './components/UserCard';
import FriendListItem from './components/FriendListItem';
import SearchFilters from './components/SearchFilters';
import TabNavigation from './components/TabNavigation';
import SearchBar from './components/SearchBar';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import Button from '../../components/ui/Button';


const FriendDiscoveryAndManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({});

  // Mock data for discovered users
  const [discoveredUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b9b5c2d0?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 3,
      location: "New York, NY",
      isOnline: true,
      workplace: "Tech Corp",
      education: "NYU"
    },
    {
      id: 2,
      name: "Michael Chen",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 1,
      location: "San Francisco, CA",
      isOnline: false,
      workplace: "StartupXYZ",
      education: "Stanford"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 5,
      location: "Los Angeles, CA",
      isOnline: true,
      workplace: "Design Studio",
      education: "UCLA"
    },
    {
      id: 4,
      name: "David Wilson",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 2,
      location: "Chicago, IL",
      isOnline: false,
      workplace: "Finance Inc",
      education: "Northwestern"
    },
    {
      id: 5,
      name: "Jessica Brown",
      profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 0,
      location: "Miami, FL",
      isOnline: true,
      workplace: "Marketing Agency",
      education: "University of Miami"
    },
    {
      id: 6,
      name: "Alex Thompson",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 4,
      location: "Seattle, WA",
      isOnline: false,
      workplace: "Amazon",
      education: "University of Washington"
    }
  ]);

  // Mock data for friend requests
  const [friendRequests] = useState([
    {
      id: 7,
      name: "Lisa Anderson",
      profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 2,
      location: "Boston, MA",
      isOnline: true,
      requestDate: new Date(Date.now() - 86400000), // 1 day ago
      type: 'incoming'
    },
    {
      id: 8,
      name: "Robert Garcia",
      profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 1,
      location: "Austin, TX",
      isOnline: false,
      requestDate: new Date(Date.now() - 172800000), // 2 days ago
      type: 'incoming'
    },
    {
      id: 9,
      name: "Amanda Davis",
      profilePicture: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 3,
      location: "Denver, CO",
      isOnline: true,
      requestDate: new Date(Date.now() - 259200000), // 3 days ago
      type: 'outgoing'
    }
  ]);

  // Mock data for friends list
  const [friendsList] = useState([
    {
      id: 10,
      name: "John Smith",
      profilePicture: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      lastActive: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: 11,
      name: "Maria Gonzalez",
      profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      lastActive: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 12,
      name: "Kevin Lee",
      profilePicture: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      lastActive: new Date()
    },
    {
      id: 13,
      name: "Rachel Green",
      profilePicture: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      lastActive: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: 14,
      name: "Tom Wilson",
      profilePicture: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      lastActive: new Date(Date.now() - 172800000) // 2 days ago
    }
  ]);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    filterData();
  }, [activeTab, searchTerm, filters]);

  const filterData = () => {
    let data = [];
    
    switch (activeTab) {
      case 'discover':
        data = discoveredUsers;
        break;
      case 'requests':
        data = friendRequests;
        break;
      case 'friends':
        data = friendsList;
        break;
      default:
        data = [];
    }

    // Apply search filter
    if (searchTerm) {
      data = data.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply advanced filters for discover tab
    if (activeTab === 'discover' && Object.keys(filters).length > 0) {
      data = data.filter(user => {
        if (filters.location && !user.location?.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
        if (filters.workplace && !user.workplace?.toLowerCase().includes(filters.workplace.toLowerCase())) {
          return false;
        }
        if (filters.education && !user.education?.toLowerCase().includes(filters.education.toLowerCase())) {
          return false;
        }
        if (filters.mutualFriends && user.mutualFriends === 0) {
          return false;
        }
        return true;
      });
    }

    setFilteredData(data);
  };

  const handleAddFriend = (userId) => {
    console.log('Adding friend:', userId);
    // Mock success animation or notification
  };

  const handleMessage = (userId) => {
    navigate('/real-time-chat-interface', { state: { userId } });
  };

  const handleAcceptRequest = (userId) => {
    console.log('Accepting friend request:', userId);
    // Mock success animation
  };

  const handleDeclineRequest = (userId) => {
    console.log('Declining friend request:', userId);
  };

  const handleUnfriend = (userId) => {
    console.log('Unfriending user:', userId);
  };

  const handleBlock = (userId) => {
    console.log('Blocking user:', userId);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleExportFriends = () => {
    const friendsData = friendsList.map(friend => ({
      name: friend.name,
      status: friend.isOnline ? 'Online' : 'Offline',
      lastActive: friend.lastActive.toISOString()
    }));
    
    const dataStr = JSON.stringify(friendsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'friends-list.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getIncomingRequestsCount = () => {
    return friendRequests.filter(req => req.type === 'incoming').length;
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton type={activeTab === 'friends' ? 'list' : 'card'} />;
    }

    if (filteredData.length === 0) {
      const emptyType = searchTerm ? 'search' : activeTab;
      return (
        <EmptyState 
          type={emptyType} 
          onAction={searchTerm ? handleClearSearch : () => setActiveTab('discover')}
        />
      );
    }

    switch (activeTab) {
      case 'discover':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map(user => (
              <UserCard
                key={user.id}
                user={user}
                type="discover"
                onAddFriend={handleAddFriend}
                onMessage={handleMessage}
              />
            ))}
          </div>
        );
      
      case 'requests':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-onSurface">
                Incoming Requests ({friendRequests.filter(req => req.type === 'incoming').length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredData.filter(req => req.type === 'incoming').map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  type="incoming"
                  onAcceptRequest={handleAcceptRequest}
                  onDeclineRequest={handleDeclineRequest}
                />
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-onSurface">
                Sent Requests ({friendRequests.filter(req => req.type === 'outgoing').length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.filter(req => req.type === 'outgoing').map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  type="outgoing"
                />
              ))}
            </div>
          </div>
        );
      
      case 'friends':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-onSurface">
                Friends ({filteredData.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={handleExportFriends}
              >
                Export
              </Button>
            </div>
            <div className="space-y-3">
              {filteredData.map(friend => (
                <FriendListItem
                  key={friend.id}
                  friend={friend}
                  onMessage={handleMessage}
                  onUnfriend={handleUnfriend}
                  onBlock={handleBlock}
                />
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                iconName="ArrowLeft"
                onClick={() => navigate(-1)}
                className="mr-4"
              />
              <h1 className="text-xl font-semibold text-onSurface">
                Friends & Discovery
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                iconName="Settings"
                onClick={() => navigate('/user-profile-management')}
              />
              <Button
                variant="ghost"
                iconName="MessageCircle"
                onClick={() => navigate('/real-time-chat-interface')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6">
              <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                requestCount={getIncomingRequestsCount()}
              />
              
              {activeTab === 'discover' && (
                <SearchFilters
                  onApplyFilters={handleApplyFilters}
                  onClearFilters={handleClearFilters}
                />
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Mobile Tab Navigation */}
            <div className="lg:hidden mb-4">
              <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                requestCount={getIncomingRequestsCount()}
              />
            </div>

            {/* Search Bar */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onClearSearch={handleClearSearch}
              placeholder={`Search ${activeTab}...`}
            />

            {/* Mobile Filters */}
            {activeTab === 'discover' && (
              <div className="lg:hidden mb-4">
                <SearchFilters
                  onApplyFilters={handleApplyFilters}
                  onClearFilters={handleClearFilters}
                />
              </div>
            )}

            {/* Content */}
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t">
        <div className="flex justify-around py-2">
          <Button
            variant="ghost"
            iconName="Home"
            onClick={() => navigate('/')}
            className="flex-1 flex-col h-12"
          />
          <Button
            variant="ghost"
            iconName="Users"
            onClick={() => navigate('/friend-discovery-and-management')}
            className="flex-1 flex-col h-12 text-primary"
          />
          <Button
            variant="ghost"
            iconName="MessageCircle"
            onClick={() => navigate('/real-time-chat-interface')}
            className="flex-1 flex-col h-12"
          />
          <Button
            variant="ghost"
            iconName="User"
            onClick={() => navigate('/user-profile-management')}
            className="flex-1 flex-col h-12"
          />
        </div>
      </div>
    </div>
  );
};

export default FriendDiscoveryAndManagement;