import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GroupMembersList = ({ 
  members, 
  isAdmin, 
  onRemoveMember, 
  onMakeAdmin, 
  onAddMembers,
  isVisible,
  onToggle 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMemberAction = (memberId, action) => {
    switch (action) {
      case 'remove':
        onRemoveMember(memberId);
        break;
      case 'makeAdmin':
        onMakeAdmin(memberId);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`bg-surface border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isVisible ? 'max-h-96' : 'max-h-0 overflow-hidden'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-onSurface">
            Group Members ({members.length})
          </h3>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Icon name={isVisible ? "ChevronUp" : "ChevronDown"} size={20} />
          </button>
        </div>
        
        {isVisible && (
          <>
            <div className="mb-4 flex space-x-2">
              <div className="flex-1 relative">
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-onSurface placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              
              {isAdmin && (
                <Button
                  variant="primary"
                  onClick={onAddMembers}
                  iconName="UserPlus"
                  size="sm"
                >
                  Add
                </Button>
              )}
            </div>
            
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-onSurface">{member.name}</p>
                        {member.isAdmin && (
                          <span className="px-2 py-1 bg-primary text-onPrimary text-xs rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {member.isOnline ? 'Online' : `Last seen ${member.lastSeen}`}
                      </p>
                    </div>
                  </div>
                  
                  {isAdmin && !member.isAdmin && member.id !== 'current-user' && (
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleMemberAction(member.id, 'makeAdmin')}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-blue-500"
                        title="Make Admin"
                      >
                        <Icon name="Shield" size={16} />
                      </button>
                      
                      <button
                        onClick={() => handleMemberAction(member.id, 'remove')}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-red-500"
                        title="Remove Member"
                      >
                        <Icon name="UserMinus" size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupMembersList;