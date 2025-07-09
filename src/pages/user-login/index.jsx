import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../components/AppIcon';

import LoginForm from './components/LoginForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import SecurityIndicators from './components/SecurityIndicators';
import LoadingOverlay from './components/LoadingOverlay';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import authService from '../../utils/authService';

const UserLogin = () => {
  const navigate = useNavigate();
  const { signIn, user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  useEffect(() => {
    // Redirect if user is already logged in
    if (user && !loading) {
      navigate('/real-time-chat-interface');
    }
  }, [user, loading, navigate]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');
    setShowLoadingOverlay(true);

    try {
      const result = await signIn(formData.email, formData.password);

      if (result.success) {
        setShowLoadingOverlay(false);
        navigate('/real-time-chat-interface');
      } else {
        setError(result.error || 'Login failed');
        setShowLoadingOverlay(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setShowLoadingOverlay(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');
    setShowLoadingOverlay(true);

    try {
      const result = await authService.signInWithOAuth(provider);

      if (!result.success) {
        setError(result.error || `Failed to sign in with ${provider}`);
        setShowLoadingOverlay(false);
      }
      // OAuth redirect will handle success case
    } catch (err) {
      setError(`Failed to sign in with ${provider}. Please try again.`);
      setShowLoadingOverlay(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      const result = await authService.resetPassword(email);
      if (result.success) {
        setError('');
        return { success: true, message: 'Password reset email sent successfully!' };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Failed to send reset email' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="MessageCircle" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SocialChat</span>
            </Link>

            {/* Registration Link */}
            <Link
              to="/user-registration"
              className="text-primary hover:text-primary-500 font-medium transition-colors"
            >
              Need an account?
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <Icon name="Users" size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue your conversations</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            {/* Social Login Buttons */}
            <SocialLoginButtons 
              onSocialLogin={handleSocialLogin}
              isLoading={isLoading}
            />

            {/* Login Form */}
            <div className="mt-6">
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-primary hover:text-primary-500 transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          {/* Security Indicators */}
          <SecurityIndicators />

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Icon name="Info" size={20} className="text-blue-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Demo Credentials</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Email: <strong>user@socialchat.com</strong><br />
                  Password: <strong>password123</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={showLoadingOverlay}
        message="Signing you in..."
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSubmit={handleForgotPassword}
      />
    </div>
  );
};

export default UserLogin;