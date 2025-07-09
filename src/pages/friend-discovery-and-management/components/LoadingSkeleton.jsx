import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 6 }) => {
  const SkeletonCard = () => (
    <div className="bg-surface rounded-lg shadow-md p-4 animate-pulse">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-16 mb-3"></div>
        <div className="flex gap-2 w-full">
          <div className="h-8 bg-gray-300 rounded flex-1"></div>
          <div className="h-8 bg-gray-300 rounded flex-1"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonListItem = () => (
    <div className="flex items-center p-3 bg-surface rounded-lg shadow-sm animate-pulse">
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-24"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-gray-300 rounded"></div>
        <div className="w-8 h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className={type === 'card' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {type === 'card' ? <SkeletonCard /> : <SkeletonListItem />}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;