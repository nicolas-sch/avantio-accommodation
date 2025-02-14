import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccommodationData, setStep } from '../redux/slices/formSlice';
import { RootState } from '../redux/store';
import PhotosUpload from '../components/PhotosUpload';
import {
  validateName,
  validateLocation,
  validateDescription,
  validateType,
  validatePhotos,
  getCharacterCountColor,
} from '../utils/utils';
import InputField from '../components/InputField';
import Button from '../components/Button';

const AccommodationForm = () => {
  const dispatch = useDispatch();
  const accommodationData = useSelector((state: RootState) => state.form.accommodation);

  const [errors, setErrors] = useState({
    name: '',
    location: '',
    description: '',
    type: '',
    photos: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    const updatedData = {
      ...accommodationData,
      photos: files,
    };
    dispatch(setAccommodationData(updatedData));
    validatePhotos(files); // Validate selected photos
  };

  // General form validation
  const validateForm = () => {
    const nameError = validateName(accommodationData.name);
    const locationError = validateLocation(accommodationData.location);
    const descriptionError = validateDescription(accommodationData.description);
    const typeError = validateType(accommodationData.type);
    const photosError = validatePhotos(accommodationData.photos);

    setErrors({
      name: nameError,
      location: locationError,
      description: descriptionError,
      type: typeError,
      photos: photosError,
    });

    const isValid = !nameError && !locationError && !descriptionError && !typeError && !photosError;
    setIsFormValid(isValid);
  };

  // Update form state and validate field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    // Limit the number of characters for Name, Location, and Description
    let updatedValue = value;
    if (name === 'name' || name === 'location') {
      updatedValue = value.slice(0, 128); // Limit to 128 characters
    } else if (name === 'description') {
      updatedValue = value.slice(0, 2048); // Limit to 2048 characters
    }

    const updatedData = {
      ...accommodationData,
      [name]: files ? Array.from(files) : updatedValue,
    };
    dispatch(setAccommodationData(updatedData));

    // Validate field when the user loses focus
    if (e.type === 'blur') {
      validateForm();
    }
  };

  // Move to the next step
  const handleNext = () => {
    validateForm();
    if (isFormValid) {
      dispatch(setStep(2)); // Move to the next step
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6 text-center">Accommodation Details</h2>

        {/* Name Field */}
        <div className="mb-4">
          <InputField
            id="name"
            name="name"
            label="Name"
            value={accommodationData.name}
            onChange={handleChange}
            onBlur={handleChange}
            error={errors.name}
            maxLength={128}
            getCharacterCountColor={getCharacterCountColor}
          />
        </div>

        {/* Location Field */}
        <div className="mb-4">
          <InputField
            id="location"
            name="location"
            label="Location"
            value={accommodationData.location}
            onChange={handleChange}
            onBlur={handleChange}
            error={errors.location}
            maxLength={128}
            getCharacterCountColor={getCharacterCountColor}
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor='description' className="block text-sm font-medium mb-1">Description</label>
          <textarea
            id='description'
            name="description"
            value={accommodationData.description}
            onChange={handleChange}
            onBlur={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <div className="flex justify-between">
            <p className="text-red-500 text-sm">{errors.description}</p>
            <p
              className={`text-sm ${getCharacterCountColor(accommodationData.description.length, 128, 2048)}`}
            >
              {accommodationData.description.length} / 2048
            </p>
          </div>
        </div>

        {/* Type Field */}
        <div className="mb-4">
          <label htmlFor='type' className="block text-sm font-medium mb-1">Type</label>
          <select
            id='type'
            name="type"
            value={accommodationData.type}
            onChange={handleChange}
            onBlur={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>

        {/* Photos Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Photos (max 2)</label>
          <PhotosUpload
            onFilesSelected={handleFilesSelected}
            maxFiles={2}
          />
          {errors.photos && <p className="text-red-500 text-sm mt-2">{errors.photos}</p>}
        </div>

        {/* Next Button */}
        <Button 
          label="Next"
          onClick={handleNext}
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default AccommodationForm;