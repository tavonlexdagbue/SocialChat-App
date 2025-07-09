import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await onSubmit(email);
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSubmitted(false);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Reset Password</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="text-gray-600 mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className={`w-full h-12 ${error ? 'border-red-500' : ''}`}
                autoFocus
              />
              
              {error && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {error}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleClose}
                fullWidth
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                fullWidth
                loading={isLoading}
              >
                Send Reset Link
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <Icon name="CheckCircle" size={48} className="text-green-500 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Check Your Email</h3>
            <p className="text-gray-600 mb-4">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <Button variant="primary" onClick={handleClose} fullWidth>
              Got It
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;