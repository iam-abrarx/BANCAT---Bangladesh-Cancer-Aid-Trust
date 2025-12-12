import { useQuery } from '@tanstack/react-query';
import { patientService } from '../services/patientService';

export const usePatients = (filters: any) => {
    return useQuery({
        queryKey: ['patients', filters],
        queryFn: () => patientService.getAll(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const usePatient = (code: string | undefined) => {
    return useQuery({
        queryKey: ['patient', code],
        queryFn: () => patientService.getByCode(code!),
        enabled: !!code,
    });
};
