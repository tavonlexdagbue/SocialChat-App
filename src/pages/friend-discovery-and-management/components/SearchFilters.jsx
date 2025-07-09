import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const SearchFilters = ({ onApplyFilters, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    workplace: '',
    education: '',
    mutualFriends: false,
    ageRange: { min: '', max: '' }
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAgeRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      ageRange: {
        ...prev.ageRange,
        [type]: value
      }
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    setIsExpanded(false);
  };

  const handleClear = () => {
    const clearedFilters = {
      location: '',
      workplace: '',
      education: '',
      mutualFriends: false,
      ageRange: { min: '', max: '' }
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <div className="bg-surface rounded-lg shadow-md mb-4">
      <div className="p-4 border-b">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          Advanced Filters
        </Button>
      </div>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">
                Location
              </label>
              <Input
                type="text"
                placeholder="Enter city or region"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">
                Workplace
              </label>
              <Input
                type="text"
                placeholder="Enter company name"
                value={filters.workplace}
                onChange={(e) => handleFilterChange('workplace', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">
                Education
              </label>
              <Input
                type="text"
                placeholder="Enter school or university"
                value={filters.education}
                onChange={(e) => handleFilterChange('education', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-onSurface mb-2">
                Age Range
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.ageRange.min}
                  onChange={(e) => handleAgeRangeChange('min', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.ageRange.max}
                  onChange={(e) => handleAgeRangeChange('max', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="mutualFriends"
              checked={filters.mutualFriends}
              onChange={(e) => handleFilterChange('mutualFriends', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="mutualFriends" className="text-sm text-onSurface">
              Only show people with mutual friends
            </label>
          </div>
          
          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="primary"
              onClick={handleApply}
              className="flex-1"
              iconName="Search"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              className="flex-1"
              iconName="X"
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;