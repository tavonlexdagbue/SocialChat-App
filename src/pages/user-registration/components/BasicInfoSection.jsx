import React from 'react';
import Icon from '../../../components/AppIcon';

const BasicInfoSection = ({ 
  formData, 
  handleInputChange, 
  errors, 
  passwordStrength,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) => {
  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 'weak': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'strong': return 'text-green-600';
      default: return 'text-gray-500';
    }
  };

  const getPasswordStrengthWidth = (strength) => {
    switch (strength) {
      case 'weak': return 'w-1/3';
      case 'medium': return 'w-2/3';
      case 'strong': return 'w-full';
      default: return 'w-0';
    }
  };

  const getPasswordStrengthBg = (strength) => {
    switch (strength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-onSurface">Basic Information</h3>
      
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-onSurface mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.fullName 
              ? 'border-red-500 focus:border-red-500' :'border-gray-300 focus:border-primary'
          }`}
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-onSurface mb-1">
          Username *
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.username 
              ? 'border-red-500 focus:border-red-500' :'border-gray-300 focus:border-primary'
          }`}
          placeholder="Choose a username"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-onSurface mb-1">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.email 
              ? 'border-red-500 focus:border-red-500' :'border-gray-300 focus:border-primary'
          }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-onSurface mb-1">
          Password *
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.password 
                ? 'border-red-500 focus:border-red-500' :'border-gray-300 focus:border-primary'
            }`}
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <Icon 
              name={showPassword ? 'EyeOff' : 'Eye'} 
              size={16} 
              className="text-gray-400" 
            />
          </button>
        </div>
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthWidth(passwordStrength)} ${getPasswordStrengthBg(passwordStrength)}`}
                />
              </div>
              <span className={`text-xs font-medium ${getPasswordStrengthColor(passwordStrength)}`}>
                {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
              </span>
            </div>
          </div>
        )}
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-onSurface mb-1">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.confirmPassword 
                ? 'border-red-500 focus:border-red-500' :'border-gray-300 focus:border-primary'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <Icon 
              name={showConfirmPassword ? 'EyeOff' : 'Eye'} 
              size={16} 
              className="text-gray-400" 
            />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInfoSection;