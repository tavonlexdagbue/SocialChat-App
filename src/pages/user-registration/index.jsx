import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import RegistrationHeader from './components/RegistrationHeader';
import SocialRegistration from './components/SocialRegistration';
import BasicInfoSection from './components/BasicInfoSection';
import ProfileSetupSection from './components/ProfileSetupSection';
import TermsAndSubmit from './components/TermsAndSubmit';
import SuccessMessage from './components/SuccessMessage';
import authService from '../../utils/authService';

const UserRegistration = () => {
  const navigate = useNavigate();
  const { signUp, user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState('registration');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    bio: '',
    profileVisibility: true,
    allowFriendRequests: true,
    emailNotifications: true,
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Redirect if user is already logged in
    if (user && !loading) {
      navigate('/real-time-chat-interface');
    }
  }, [user, loading, navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    if (password.length >= 10 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return 'strong';
    return 'medium';
  };

  const generateUsername = (fullName) => {
    return fullName.toLowerCase().replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Bio validation (optional but has limits)
    if (formData.bio.length > 150) {
      newErrors.bio = 'Bio must be 150 characters or less';
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: newValue };
      
      // Auto-generate username from full name
      if (name === 'fullName' && !prev.username) {
        updated.username = generateUsername(value);
      }
      
      return updated;
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Update password strength in real-time
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp(formData.email, formData.password, {
        fullName: formData.fullName,
        username: formData.username,
        bio: formData.bio,
        profileVisibility: formData.profileVisibility,
        allowFriendRequests: formData.allowFriendRequests,
        emailNotifications: formData.emailNotifications
      });

      if (result.success) {
        setCurrentStep('success');
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      console.log('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegistration = async (provider) => {
    try {
      const result = await authService.signInWithOAuth(provider);
      if (!result.success) {
        setErrors({ submit: result.error });
      }
      // OAuth redirect will handle success case
    } catch (error) {
      setErrors({ submit: `Failed to register with ${provider}` });
    }
  };

  const isFormValid = () => {
    return formData.fullName.trim() &&
           formData.email.trim() &&
           formData.password &&
           formData.confirmPassword &&
           formData.username.trim() &&
           formData.password === formData.confirmPassword &&
           formData.agreeToTerms &&
           validateEmail(formData.email);
  };

  useEffect(() => {
    document.title = 'Sign Up - SocialChat';
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-background">
        <RegistrationHeader />
        <main className="px-4 py-8">
          <div className="max-w-md mx-auto">
            <SuccessMessage userEmail={formData.email} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RegistrationHeader />
      
      <main className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-surface rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-onSurface mb-2">Join SocialChat</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with friends and start chatting
              </p>
            </div>

            <SocialRegistration onSocialRegister={handleSocialRegistration} />

            <form onSubmit={handleSubmit} className="space-y-6">
              <BasicInfoSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
                passwordStrength={passwordStrength}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />

              <ProfileSetupSection
                formData={formData}
                handleInputChange={handleInputChange}
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
                errors={errors}
              />

              <TermsAndSubmit
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isFormValid={isFormValid()}
                isLoading={isLoading}
                errors={errors}
              />

              {errors.submit && (
                <div className="bg-red-50 dark:bg-red-900 p-3 rounded-lg">
                  <p className="text-error text-sm text-center">{errors.submit}</p>
                </div>
              )}
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/user-login')}
                className="text-primary hover:text-primary-500 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistration;