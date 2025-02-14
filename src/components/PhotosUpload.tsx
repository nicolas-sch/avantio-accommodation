import React, { useCallback, useState } from 'react';
import { validateImageDimensions } from '../utils/utils';

interface PhotosUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles: number;
}

const PhotosUpload = ({ onFilesSelected, maxFiles }: PhotosUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  // Function to handle drag and drop
  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // Function to handle file drop
  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFiles = Array.from(e.dataTransfer.files);

        // Check if the maximum number of files will be exceeded
        if (files.length + newFiles.length > maxFiles) {
          setError(`Maximum of ${maxFiles} photos allowed.`);
          return;
        }

        // Validate image dimensions
        for (const file of newFiles) {
          const isValid = await validateImageDimensions(file);
          if (!isValid) {
            setError('Photos cannot exceed 500x500 pixels.');
            return;
          }
        }

        setError('');
        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        onFilesSelected(updatedFiles);
      }
    },
    [files, maxFiles, onFilesSelected]
  );

  // Function to handle file selection via input
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      // Check if the maximum number of files will be exceeded
      if (files.length + newFiles.length > maxFiles) {
        setError(`Maximum of ${maxFiles} photos allowed.`);
        return;
      }

      // Validate image dimensions
      for (const file of newFiles) {
        const isValid = await validateImageDimensions(file);
        if (!isValid) {
          setError('Photos cannot exceed 500x500 pixels.');
          return;
        }
      }

      setError('');
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesSelected(updatedFiles);
    }
  };

  // Function to remove a photo
  const handleRemovePhoto = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  return (
    <div
      className={`w-full p-6 border-2 border-dashed rounded-lg ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <span className="text-gray-600">
          Drag and drop photos here or{' '}
          <span className="text-blue-500 underline">click to select</span>.
        </span>
        <span className="text-sm text-gray-500 mt-2">Maximum of {maxFiles} photos.</span>
      </label>

      {/* Display photo thumbnails */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {files.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`Photo ${index + 1}`}
              className="w-full h-24 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default PhotosUpload;