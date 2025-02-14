import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOwnerData, setStep } from '../redux/slices/formSlice';
import { RootState } from '../redux/store';
import { validateOwnerName, validateEmail, validatePhone, getCharacterCountColor } from '../utils/utils';
import Button from '../components/Button';
import InputField from '../components/InputField';

const OwnerForm = () => {
  const dispatch = useDispatch();
  const ownerData = useSelector((state: RootState) => state.form.owner);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // General form validation
  const validateForm = () => {
    const nameError = validateOwnerName(ownerData.name);
    const emailError = validateEmail(ownerData.email);
    const phoneError = validatePhone(ownerData.phone);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
    });

    setIsFormValid(!nameError && !emailError && !phoneError);
  };

  // Update form state and validate field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setOwnerData({ ...ownerData, [name]: value }));

    if (e.type === 'blur') {
      validateForm();
    }
  };

  // Move to the next step
  const handleNext = () => {
    validateForm();
    if (isFormValid) {
      dispatch(setStep(3)); // Move to the next step
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6 text-center">Owner Details</h2>

        <InputField
          id="name"
          name="name"
          label="Name"
          value={ownerData.name}
          onChange={handleChange}
          onBlur={handleChange}
          error={errors.name}
          maxLength={128}
          getCharacterCountColor={getCharacterCountColor}
        />

        <InputField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={ownerData.email}
          onChange={handleChange}
          onBlur={handleChange}
          error={errors.email}
        />

        <InputField
          id="phone"
          name="phone"
          label="Phone (optional)"
          type="phone"
          value={ownerData.phone}
          onChange={handleChange}
          onBlur={handleChange}
          error={errors.phone}
        />

        <Button 
          label="Next"
          onClick={handleNext}
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default OwnerForm;
