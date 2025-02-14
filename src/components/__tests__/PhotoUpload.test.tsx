import { render, screen } from '@testing-library/react';
import PhotosUpload from '../PhotosUpload';

describe('PhotosUpload Component', () => {
  it('renders with correct instructions', () => {
    render(<PhotosUpload onFilesSelected={() => {}} maxFiles={2} />);
    
    expect(screen.getByText(/drag and drop photos here or/i)).toBeInTheDocument();
    expect(screen.getByText(/Maximum of 2 photos./i)).toBeInTheDocument();
  });
});
