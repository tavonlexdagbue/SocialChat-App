import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessMessage = ({ userEmail }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/user-profile-management');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleContinue = () => {
    navigate('/user-profile-management');
  };

  const handleGoToLogin = () => {
    navigate('/user-login');
  };

  return (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={40} color="var(--color-success)" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-onSurface">Welcome to SocialChat!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your account has been created successfully.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Mail" size={20} color="var(--color-info)" className="mt-0.5" />
          <div className="text-left">
            <p className="text-sm font-medium text-info">Verification Email Sent</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              We've sent a verification email to <strong>{userEmail}</strong>. 
              Please check your inbox and click the verification link to activate your account.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="primary"
          fullWidth
          onClick={handleContinue}
          className="py-3"
        >
          Complete Profile Setup
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={handleGoToLogin}
          className="py-3"
        >
          Go to Login
        </Button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Redirecting to profile setup in 5 seconds...
      </p>
    </div>
  );
};

export default SuccessMessage;