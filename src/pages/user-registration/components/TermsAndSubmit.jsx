import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const TermsAndSubmit = ({ 
  formData, 
  handleInputChange, 
  handleSubmit, 
  isFormValid, 
  isLoading, 
  errors 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-start space-x-3">
          <Input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="w-4 h-4 mt-1"
          />
          <span className="text-sm text-onSurface leading-relaxed">
            I agree to the{' '}
            <a href="#" className="text-primary hover:text-primary-500 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:text-primary-500 underline">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.agreeToTerms}
          </p>
        )}
      </div>

      <Button
        variant="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={!isFormValid || isLoading}
        loading={isLoading}
        className="py-3 text-base font-medium"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
        By creating an account, you agree to our Terms of Service and Privacy Policy. 
        We'll send you a verification email to confirm your account.
      </p>
    </div>
  );
};

export default TermsAndSubmit;