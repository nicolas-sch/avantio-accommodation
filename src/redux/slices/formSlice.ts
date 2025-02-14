import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccommodationData {
  name: string;
  location: string;
  description: string;
  type: string;
  photos: File[];
}

interface OwnerData {
  name: string;
  email: string;
  phone: string;
}

interface FormState {
  step: number; 
  accommodation: AccommodationData;
  owner: OwnerData;
}

const initialState: FormState = {
  step: 1,
  accommodation: {
    name: '',
    location: '',
    description: '',
    type: '',
    photos: [],
  },
  owner: {
    name: '',
    email: '',
    phone: '',
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setAccommodationData: (state, action: PayloadAction<AccommodationData>) => {
      state.accommodation = action.payload;
    },
    setOwnerData: (state, action: PayloadAction<OwnerData>) => {
      state.owner = action.payload;
    },
    resetForm: (state) => {
      state.step = 1;
      state.accommodation = initialState.accommodation;
      state.owner = initialState.owner;
    },
  },
});

export const { setStep, setAccommodationData, setOwnerData, resetForm } = formSlice.actions;

export default formSlice.reducer;