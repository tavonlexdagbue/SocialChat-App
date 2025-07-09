import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialLoginButtons = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.name}
            onClick={() => onSocialLogin(provider.name.toLowerCase())}
            disabled={isLoading}
            className={`${provider.color} ${provider.textColor} flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-12`}
          >
            <Icon name={provider.icon} size={20} className="mr-2" />
            {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialLoginButtons;