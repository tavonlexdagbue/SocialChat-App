import React from 'react';
import Button from '../../../components/ui/Button';


const TabNavigation = ({ activeTab, onTabChange, requestCount = 0 }) => {
  const tabs = [
    { id: 'discover', label: 'Discover', icon: 'Search' },
    { id: 'requests', label: 'Requests', icon: 'UserPlus', badge: requestCount },
    { id: 'friends', label: 'Friends', icon: 'Users' }
  ];

  return (
    <div className="bg-surface rounded-lg shadow-md mb-4">
      <div className="flex">
        {tabs.map((tab, index) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'ghost'}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 relative ${
              index === 0 ? 'rounded-r-none' : 
              index === tabs.length - 1 ? 'rounded-l-none' : 'rounded-none'
            }`}
            iconName={tab.icon}
            iconPosition="left"
          >
            {tab.label}
            {tab.badge > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {tab.badge > 99 ? '99+' : tab.badge}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;