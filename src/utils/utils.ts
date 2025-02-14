// Function to validate the "Name" field
export const validateName = (value: string): string => {
    if (!value) {
      return 'Name is required.';
    }
    if (value.length < 4 || value.length > 128) {
      return 'Name must be between 4 and 128 characters.';
    }
    if (/\d/.test(value)) {
      return 'Numbers are not allowed in the name.';
    }
    return '';
  };
  
  // Function to validate the "Location" field
  export const validateLocation = (value: string): string => {
    if (!value) {
      return 'Location is required.';
    }
    if (value.length < 4 || value.length > 128) {
      return 'Location must be between 4 and 128 characters.';
    }
    return '';
  };
  
  // Function to validate the "Description" field
  export const validateDescription = (value: string): string => {
    if (value && (value.length < 128 || value.length > 2048)) {
      return 'Description must be between 128 and 2048 characters.';
    }
    return '';
  };
  
  // Function to validate the "Type" field
  export const validateType = (value: string): string => {
    if (!value) {
      return 'Type is required.';
    }
    if (!['apartment', 'villa', 'house'].includes(value)) {
      return 'Type must be apartment, villa, or house.';
    }
    return '';
  };
  
  // Function to validate the "Photos" field
  export const validatePhotos = (files: File[]): string => {
    if (files.length > 2) {
      return 'Maximum of 2 photos allowed.';
    }
    for (const file of files) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width !== 500 || img.height !== 500) {
          return 'Photos must have dimensions of 500x500 pixels.';
        }
      };
    }
    return '';
  };
  
  // Function to calculate the character count color
  export const getCharacterCountColor = (currentLength: number, min: number, max: number): string => {
    if (currentLength < min || currentLength > max) {
      return 'text-red-500'; // Red if outside the range
    }
    return 'text-gray-500'; // Gray if within the range
  };
  
  // Function to validate the "Name" field (OwnerForm)
  export const validateOwnerName = (value: string): string => {
    if (!value) {
      return 'Name is required.';
    }
    if (value.length < 4 || value.length > 64) {
      return 'Name must be between 4 and 64 characters.';
    }
    return '';
  };
  
  // Function to validate the "Email" field (OwnerForm)
  export const validateEmail = (value: string): string => {
    if (!value) {
      return 'Email is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Email must be valid (example: user@domain.com).';
    }
    return '';
  };
  
  // Function to validate the "Phone" field (OwnerForm)
  export const validatePhone = (value: string): string => {
    if (value && !/^\d+$/.test(value)) {
      return 'Phone must contain only numbers.';
    }
    if (value && value.length > 9) {
      return 'Phone must have a maximum of 9 digits.';
    }
    return '';
  };
  
  // Function to validate image dimensions
  export const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width <= 500 && img.height <= 500) {
          resolve(true); // Valid dimensions (less than or equal to 500x500)
        } else {
          resolve(false); // Invalid dimensions (greater than 500x500)
        }
      };
    });
  };