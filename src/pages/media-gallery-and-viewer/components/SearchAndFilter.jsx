import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchAndFilter = ({ 
  onSearch, 
  onFilter, 
  onViewModeChange, 
  viewMode,
  totalItems,
  selectedItems,
  onClearSelection,
  onBulkAction
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    mediaType: 'all',
    dateRange: 'all',
    privacy: 'all',
    sortBy: 'newest'
  });

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      mediaType: 'all',
      dateRange: 'all',
      privacy: 'all',
      sortBy: 'newest'
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all' && value !== 'newest');

  return (
    <div className="bg-surface border-b border-gray-200 dark:border-gray-700">
      {/* Main Search Bar */}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <Input
              type="search"
              placeholder="Search photos and videos..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant={showFilters ? 'primary' : 'outline'}
            onClick={() => setShowFilters(!showFilters)}
            iconName="Filter"
            className="relative"
          >
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            )}
          </Button>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              onClick={() => onViewModeChange('grid')}
              iconName="Grid3X3"
              size="sm"
            />
            <Button
              variant={viewMode === 'large' ? 'primary' : 'ghost'}
              onClick={() => onViewModeChange('large')}
              iconName="Square"
              size="sm"
            />
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              onClick={() => onViewModeChange('list')}
              iconName="List"
              size="sm"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mt-3 text-sm text-gray-600 dark:text-gray-400">
          <span>{totalItems} items found</span>
          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-3">
              <span>{selectedItems.length} selected</span>
              <Button
                variant="ghost"
                onClick={onClearSelection}
                size="sm"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedItems.length > 0 && (
        <div className="px-4 py-3 bg-primary bg-opacity-10 border-t border-primary border-opacity-20">
          <div className="flex items-center justify-between">
            <span className="text-primary font-medium">
              {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => onBulkAction('share')}
                iconName="Share"
                size="sm"
              >
                Share
              </Button>
              <Button
                variant="outline"
                onClick={() => onBulkAction('download')}
                iconName="Download"
                size="sm"
              >
                Download
              </Button>
              <Button
                variant="outline"
                onClick={() => onBulkAction('move')}
                iconName="FolderOpen"
                size="sm"
              >
                Move
              </Button>
              <Button
                variant="danger"
                onClick={() => onBulkAction('delete')}
                iconName="Trash2"
                size="sm"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className="px-4 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Media Type Filter */}
            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">
                Media Type
              </label>
              <select
                value={filters.mediaType}
                onChange={(e) => handleFilterChange('mediaType', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-onSurface"
              >
                <option value="all">All Media</option>
                <option value="image">Photos Only</option>
                <option value="video">Videos Only</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-onSurface"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>

            {/* Privacy Filter */}
            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">
                Privacy
              </label>
              <select
                value={filters.privacy}
                onChange={(e) => handleFilterChange('privacy', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-onSurface"
              >
                <option value="all">All Items</option>
                <option value="public">Public Only</option>
                <option value="private">Private Only</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-onSurface"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="size">File Size</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              iconName="X"
              size="sm"
            >
              Clear Filters
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => setShowFilters(false)}
              iconName="ChevronUp"
              size="sm"
            >
              Hide Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;