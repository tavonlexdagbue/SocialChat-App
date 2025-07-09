import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <header className="bg-surface border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="MessageCircle" size={32} color="var(--color-primary)" />
          <span className="text-xl font-bold text-onSurface">SocialChat</span>
        </div>
        <Link 
          to="/user-login" 
          className="text-primary hover:text-primary-500 text-sm font-medium transition-colors"
        >
          Already have an account?
        </Link>
      </div>
    </header>
  );
};

export default RegistrationHeader;