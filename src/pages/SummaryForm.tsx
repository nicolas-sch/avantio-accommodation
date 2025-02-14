import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Button from '../components/Button';

interface SummaryFormProps {
  onSubmit: (data: any) => void;
  onReset: () => void;
}

const SummaryForm = ({ onSubmit, onReset }: SummaryFormProps) => {
  const accommodationData = useSelector((state: RootState) => state.form.accommodation);
  const ownerData = useSelector((state: RootState) => state.form.owner);

  // Function to submit form data
  const handleSubmit = () => {
    const formData = {
      accommodation: accommodationData,
      owner: ownerData,
    };
    onSubmit(formData); // Emit the event with the data

    alert('Form sent successfully!');

    onReset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6 text-center">Form Summary</h2>

        {/* Accommodation Data Summary */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2">Accommodation Details</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {accommodationData.name}</p>
            <p><span className="font-semibold">Location:</span> {accommodationData.location}</p>
            <p><span className="font-semibold">Description:</span> {accommodationData.description || 'Not provided'}</p>
            <p><span className="font-semibold">Type:</span> {accommodationData.type}</p>
            <p><span className="font-semibold">Photos:</span></p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {accommodationData.photos.length > 0 ? (
                accommodationData.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No photos uploaded.</p>
              )}
            </div>
          </div>
        </div>

        {/* Owner Data Summary */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2">Owner Details</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {ownerData.name}</p>
            <p><span className="font-semibold">Email:</span> {ownerData.email}</p>
            <p><span className="font-semibold">Phone:</span> {ownerData.phone || 'Not provided'}</p>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          label="Submit"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SummaryForm;