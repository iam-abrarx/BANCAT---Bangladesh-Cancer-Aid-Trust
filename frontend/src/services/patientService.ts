import axios from 'axios';
import type { Patient } from '../types';

// Configure base URL (should be in env, but hardcoding for dev now if not set)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

export const patientService = {
    getAll: async (params?: { featured?: boolean; cancer_type?: string; page?: number; district?: string; search?: string; sort?: string }) => {
        const response = await api.get<{ data: Patient[], links: any, meta: any }>('/patients', { params });
        return response.data;
    },

    getByCode: async (code: string) => {
        const response = await api.get<Patient & { updates?: any[] }>(`/patients/${code}`);
        return response.data;
    },

    // Admin Methods
    createPatient: async (data: any) => {
        const response = await api.post('/admin/patients', data);
        return response.data;
    },

    updatePatient: async (id: number, data: any) => {
        const response = await api.put(`/admin/patients/${id}`, data);
        return response.data;
    },

    deletePatient: async (id: number) => {
        const response = await api.delete(`/admin/patients/${id}`);
        return response.data;
    }
};

export default api;
