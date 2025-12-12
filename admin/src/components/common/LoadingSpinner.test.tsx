import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
    it('renders the spinner', () => {
        render(<LoadingSpinner />);
        // Check if circular progress is present (MUI usually has 'progressbar' role)
        const spinner = screen.getByRole('progressbar');
        expect(spinner).toBeInTheDocument();
    });

    it('renders with custom message', () => {
        const message = 'Please wait...';
        render(<LoadingSpinner message={message} />);
        expect(screen.getByText(message)).toBeInTheDocument();
    });
});
