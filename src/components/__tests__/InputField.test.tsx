import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../InputField';

describe('InputField Component', () => {
  it('renders with correct label and value', () => {
    render(
      <InputField
        id="input-1"
        name="input1"
        label="Username"
        value="testuser"
        onChange={() => {}}
        onBlur={() => {}}
      />
    );

    const inputElement = screen.getByLabelText('Username');
    expect(inputElement).toHaveValue('testuser');
  });

  it('renders input of correct type', () => {
    render(
      <InputField
        id="input-2"
        name="input2"
        label="Password"
        type="password"
        value=""
        onChange={() => {}}
        onBlur={() => {}}
      />
    );
    const inputElement = screen.getByLabelText('Password');
    expect(inputElement).toHaveAttribute('type', 'password');
  });
});
