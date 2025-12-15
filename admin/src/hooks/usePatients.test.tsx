import { renderHook, waitFor } from '@testing-library/react';
import { usePatients } from './usePatients';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { patientService } from '../services/patientService';
import { vi } from 'vitest';
import React from 'react'; // Checking if needed for wrapper

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

vi.mock('../services/patientService');

describe('usePatients Hook', () => {
    it('fetches patient list', async () => {
        const mockPatients = { data: [{ id: 1, name: 'John' }] };
        (patientService.getAll as any).mockResolvedValue(mockPatients);

        const { result } = renderHook(() => usePatients({}), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockPatients);
        expect(patientService.getAll).toHaveBeenCalled();
    });
});
