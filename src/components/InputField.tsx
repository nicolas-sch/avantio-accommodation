import React from 'react';

interface InputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number;
  getCharacterCountColor?: (count: number, min: number, max: number) => string;
}

const InputField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  maxLength = 128,
  getCharacterCountColor,
}: InputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between">
        <p className="text-red-500 text-sm">{error}</p>
        {getCharacterCountColor && (
          <p className={`text-sm ${getCharacterCountColor(value.length, 4, maxLength)}`}>
            {value.length} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
