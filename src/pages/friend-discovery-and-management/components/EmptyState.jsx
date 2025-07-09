import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type, onAction }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'discover':
        return {
          icon: 'Search',
          title: 'No users found',
          description: 'Try adjusting your search filters or search terms to find more people.',
          actionText: 'Clear Filters',
          actionIcon: 'RefreshCw'
        };
      case 'requests':
        return {
          icon: 'UserPlus',
          title: 'No friend requests',
          description: 'You don\'t have any pending friend requests at the moment.',
          actionText: 'Discover People',
          actionIcon: 'Search'
        };
      case 'friends':
        return {
          icon: 'Users',
          title: 'No friends yet',
          description: 'Start connecting with people to build your network.',
          actionText: 'Find Friends',
          actionIcon: 'UserPlus'
        };
      case 'search':
        return {
          icon: 'Search',
          title: 'No results found',
          description: 'Try searching with different keywords or check your spelling.',
          actionText: 'Clear Search',
          actionIcon: 'X'
        };
      default:
        return {
          icon: 'AlertCircle',
          title: 'Nothing here',
          description: 'There\'s nothing to show at the moment.',
          actionText: 'Refresh',
          actionIcon: 'RefreshCw'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon name={content.icon} size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-onSurface mb-2">{content.title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm">{content.description}</p>
      {onAction && (
        <Button
          variant="primary"
          onClick={onAction}
          iconName={content.actionIcon}
          iconPosition="left"
        >
          {content.actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;