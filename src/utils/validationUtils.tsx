/**
 * Validation Utility Functions
 * ----------------------------
 * Each function returns an array of error strings.
 * If the validation passes, an empty array is returned.
 */

export const validateGender = (gender: string): string[] => {
    return gender !== "select" ? [] : ["Please select a gender."];
  };
  
  export const validateAge = (dob: string): string[] => {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dobDate.getFullYear();
    return age <= 120 ? [] : ["Age should be 120 years or less."];
  };
  
  export const validateNumber = (value: string, fieldName: string): string[] => {
    return /^\d+$/.test(value)
      ? []
      : [`${fieldName} should contain numbers only.`];
  };
  
  export const validatePasswordMatch = (
    password: string,
    confirmPassword: string
  ): string[] => {
    return password === confirmPassword
      ? []
      : ["Password and Confirm Password should match."];
  };
  
  export const validateInputString = (value: string, fieldName = "Field"): string[] => {
    return !value?.trim()
      ? [`Please enter a valid ${fieldName}.`]
      : [];
  };
  
  // 🔁 Named + grouped export
  export const validationUtils = {
    validateGender,
    validateAge,
    validateNumber,
    validatePasswordMatch,
    validateInputString,
  };
  