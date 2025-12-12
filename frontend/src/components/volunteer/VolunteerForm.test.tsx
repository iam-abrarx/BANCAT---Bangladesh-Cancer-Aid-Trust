import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VolunteerForm } from './VolunteerForm';
import { vi } from 'vitest';

// Mock react-query
const mockMutate = vi.fn();
vi.mock('@tanstack/react-query', () => ({
    useMutation: () => ({
        mutate: mockMutate,
        isPending: false,
        isError: false,
        isSuccess: false,
    }),
}));

describe('VolunteerForm', () => {
    beforeEach(() => {
        mockMutate.mockClear();
    });

    it('renders all form fields', () => {
        render(<VolunteerForm />);

        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Why do you want to volunteer/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit Application/i })).toBeInTheDocument();
    });

    it('shows validation errors when submitting empty form', async () => {
        render(<VolunteerForm />);

        const submitBtn = screen.getByRole('button', { name: /Submit Application/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.queryByText(/Name is required/i)).toBeInTheDocument();
            expect(screen.queryByText(/Email is required/i)).toBeInTheDocument();
        });

        expect(mockMutate).not.toHaveBeenCalled();
    });

    it('submits form with valid data', async () => {
        render(<VolunteerForm />);

        fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText(/Why do you want to volunteer/i), { target: { value: 'I want to help.' } });

        const submitBtn = screen.getByRole('button', { name: /Submit Application/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledTimes(1);
            expect(mockMutate).toHaveBeenCalledWith(expect.objectContaining({
                name: 'John Doe',
                email: 'john@example.com',
                phone: '1234567890',
                bio: 'I want to help.'
            }));
        });
    });
});
