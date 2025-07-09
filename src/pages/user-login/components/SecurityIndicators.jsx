import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Secured',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: 'Lock',
      text: 'Privacy Protected',
      description: 'We never share your personal information'
    },
    {
      icon: 'CheckCircle',
      text: 'Verified Platform',
      description: 'Trusted by millions of users worldwide'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
            <Icon name={feature.icon} size={16} className="text-green-500 flex-shrink-0" />
            <div>
              <p className="font-medium">{feature.text}</p>
              <p className="text-xs text-gray-500 hidden sm:block">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:text-primary-500 underline">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary hover:text-primary-500 underline">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SecurityIndicators;