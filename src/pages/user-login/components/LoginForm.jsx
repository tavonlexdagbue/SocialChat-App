import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email or username"
            value={formData.email}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className={`w-full h-12 text-base ${validationErrors.email ? 'border-red-500' : ''}`}
            autoFocus
            required
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {validationErrors.email}
            </p>
          )}
        </div>

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className={`w-full h-12 text-base pr-12 ${validationErrors.password ? 'border-red-500' : ''}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
          {validationErrors.password && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {validationErrors.password}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="mr-2"
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        
        <button
          type="button"
          className="text-sm text-primary hover:text-primary-500 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
          <Icon name="AlertCircle" size={20} className="text-red-500 mr-2" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <Button
        variant="primary"
        type="submit"
        fullWidth
        loading={isLoading}
        className="h-12 text-base font-medium"
      >
        {isLoading ? 'Signing In...' : 'Log In'}
      </Button>
    </form>
  );
};

export default LoginForm;