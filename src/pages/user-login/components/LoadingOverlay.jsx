import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingOverlay = ({ isVisible, message = 'Signing you in...' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
        <div className="animate-spin mb-4 flex justify-center">
          <Icon name="Loader2" size={32} className="text-primary" />
        </div>
        <p className="text-gray-700 font-medium">{message}</p>
        <p className="text-sm text-gray-500 mt-2">Please wait a moment...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;