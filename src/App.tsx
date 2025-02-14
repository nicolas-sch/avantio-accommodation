import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AccommodationForm from './pages/AccommodationForm';
import OwnerForm from './pages/OwnerForm';
import SummaryForm from './pages/SummaryForm';
import { resetForm } from './redux/slices/formSlice';
import { RootState } from './redux/store';

const App = () => {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.form.step);

  const handleFormSubmit = (data: any) => {
    console.log('Data send:', data);
  };

  const handleResetForm = () => {
    dispatch(resetForm());
  };

  return (
    <div className="p-0">
      {step === 1 && <AccommodationForm />}
      {step === 2 && <OwnerForm />}
      {step === 3 && <SummaryForm onSubmit={handleFormSubmit} onReset={handleResetForm}/>}
    </div>
  );
};

export default App;