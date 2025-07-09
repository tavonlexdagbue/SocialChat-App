import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch, placeholder = "Search people..." }) => {
  return (
    <div className="relative mb-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearSearch}
              className="p-1 hover:bg-gray-100 rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;