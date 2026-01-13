/**
 * Input Validation Utilities for Checkout Form
 * Provides validation and sanitization functions for user inputs
 */

/**
 * Sanitizes user input to prevent XSS attacks and unwanted characters
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized input string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  // Remove any HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Note: We don't trim here to allow users to type spaces naturally
  // Trimming will be done during final validation
  
  return sanitized;
};

/**
 * Validates email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number (UAE format and international)
 * @param {string} phone - Phone number to validate
 * @returns {boolean|string} - True if valid, error message if invalid
 */
const isValidPhone = (phone) => {
  // Remove all spaces, dashes, and parentheses for validation
  const cleaned = phone.replace(/[\s\-()]/g, '');
  
  // Extract digits only for length check
  const digits = cleaned.replace(/\D/g, '');
  
  // Check if phone starts with country code
  const hasCountryCode = cleaned.startsWith('+');
  
  if (!hasCountryCode) {
    return 'Phone number must include country code (e.g., +971 for UAE)';
  }
  
  // UAE phone validation: +971 followed by 9 digits
  if (cleaned.startsWith('+971')) {
    const uaeNumber = digits.substring(3); // Remove 971
    if (uaeNumber.length !== 9) {
      return 'UAE phone number must have 9 digits after +971 (e.g., +971 50 123 4567)';
    }
    // Check if it starts with valid UAE mobile prefixes (50, 52, 54, 55, 56, 58)
    const prefix = uaeNumber.substring(0, 2);
    if (!['50', '52', '54', '55', '56', '58'].includes(prefix)) {
      return 'Invalid UAE mobile number prefix. Should start with 50, 52, 54, 55, 56, or 58';
    }
    return true;
  }
  
  // For other countries: require + and 10-15 digits total
  if (digits.length < 10 || digits.length > 15) {
    return 'Phone number must be 10-15 digits including country code';
  }
  
  return true;
};

/**
 * Validates ZIP/Postal code
 * @param {string} zipCode - ZIP code to validate
 * @returns {boolean} - True if valid ZIP format
 */
const isValidZipCode = (zipCode) => {
  // Allow alphanumeric ZIP codes (3-10 characters)
  // This accommodates various international postal code formats
  const zipRegex = /^[a-zA-Z0-9\s-]{3,10}$/;
  return zipRegex.test(zipCode);
};

/**
 * Validates name (letters, spaces, hyphens, apostrophes only)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid name format
 */
const isValidName = (name) => {
  // Allow letters, spaces, hyphens, and apostrophes
  // Supports international characters
  const nameRegex = /^[a-zA-Z\s\u00C0-\u017F'-]+$/;
  return nameRegex.test(name);
};

/**
 * Validates city/state name
 * @param {string} location - City or state name to validate
 * @returns {boolean} - True if valid location format
 */
const isValidLocation = (location) => {
  // Allow letters, spaces, hyphens
  const locationRegex = /^[a-zA-Z\s\u00C0-\u017F-]+$/;
  return locationRegex.test(location);
};

/**
 * Validates checkout form and returns errors object
 * @param {Object} formData - Form data object containing all fields
 * @returns {Object} - Object containing field errors
 */
export const validateCheckoutForm = (formData) => {
  const errors = {};

  // Full Name validation
  if (!formData.fullName || formData.fullName.trim() === '') {
    errors.fullName = 'Full name is required';
  } else if (formData.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  } else if (formData.fullName.trim().length > 100) {
    errors.fullName = 'Full name must not exceed 100 characters';
  } else if (!isValidName(formData.fullName)) {
    errors.fullName = 'Full name can only contain letters, spaces, hyphens, and apostrophes';
  }

  // Phone Number validation
  if (!formData.phoneNumber || formData.phoneNumber.trim() === '') {
    errors.phoneNumber = 'Phone number is required';
  } else {
    const phoneValidation = isValidPhone(formData.phoneNumber);
    if (phoneValidation !== true) {
      errors.phoneNumber = phoneValidation; // Use the specific error message
    }
  }

  // Email validation
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email address is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  } else if (formData.email.length > 255) {
    errors.email = 'Email address is too long';
  }

  // Address Line 1 validation
  if (!formData.addressLine1 || formData.addressLine1.trim() === '') {
    errors.addressLine1 = 'Address is required';
  } else if (formData.addressLine1.trim().length < 5) {
    errors.addressLine1 = 'Address must be at least 5 characters';
  } else if (formData.addressLine1.trim().length > 200) {
    errors.addressLine1 = 'Address must not exceed 200 characters';
  }

  // Address Line 2 is optional, but validate length if provided
  if (formData.addressLine2 && formData.addressLine2.trim().length > 200) {
    errors.addressLine2 = 'Address line 2 must not exceed 200 characters';
  }

  // City validation
  if (!formData.city || formData.city.trim() === '') {
    errors.city = 'City is required';
  } else if (formData.city.trim().length < 2) {
    errors.city = 'City must be at least 2 characters';
  } else if (formData.city.trim().length > 100) {
    errors.city = 'City must not exceed 100 characters';
  } else if (!isValidLocation(formData.city)) {
    errors.city = 'City can only contain letters, spaces, and hyphens';
  }

  // State validation
  if (!formData.state || formData.state.trim() === '') {
    errors.state = 'State/Province is required';
  } else if (formData.state.trim().length < 2) {
    errors.state = 'State must be at least 2 characters';
  } else if (formData.state.trim().length > 100) {
    errors.state = 'State must not exceed 100 characters';
  } else if (!isValidLocation(formData.state)) {
    errors.state = 'State can only contain letters, spaces, and hyphens';
  }

  // ZIP Code validation
  if (!formData.zipCode || formData.zipCode.trim() === '') {
    errors.zipCode = 'ZIP/Postal code is required';
  } else if (!isValidZipCode(formData.zipCode)) {
    errors.zipCode = 'Please enter a valid ZIP/Postal code (3-10 characters)';
  }

  // Country validation
  if (!formData.country || formData.country.trim() === '') {
    errors.country = 'Country is required';
  }

  return errors;
};

/**
 * Validates individual field (useful for real-time validation)
 * @param {string} fieldName - Name of the field to validate
 * @param {string} value - Value to validate
 * @param {Object} formData - Complete form data (for context-aware validation)
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (fieldName, value, formData = {}) => {
  const tempFormData = { ...formData, [fieldName]: value };
  const errors = validateCheckoutForm(tempFormData);
  return errors[fieldName] || null;
};

/**
 * Checks if the entire form is valid
 * @param {Object} formData - Form data object
 * @returns {boolean} - True if form has no errors
 */
export const isFormValid = (formData) => {
  const errors = validateCheckoutForm(formData);
  return Object.keys(errors).length === 0;
};