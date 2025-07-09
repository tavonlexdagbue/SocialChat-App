import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialRegister = async (provider) => {
    setLoadingProvider(provider);
    try {
      await onSocialRegister?.(provider);
    } catch (error) {
      console.log('Social registration error:', error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 gap-3">
        <button
          type="button"
          onClick={() => handleSocialRegister('google')}
          disabled={loadingProvider === 'google'}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loadingProvider === 'google' ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
          ) : (
            <Icon name="Chrome" size={16} className="mr-2" />
          )}
          Continue with Google
        </button>
        
        <button
          type="button"
          onClick={() => handleSocialRegister('github')}
          disabled={loadingProvider === 'github'}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loadingProvider === 'github' ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
          ) : (
            <Icon name="Github" size={16} className="mr-2" />
          )}
          Continue with GitHub
        </button>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;