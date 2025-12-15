import api from './patientService';

export interface VolunteerData {
    name: string;
    email: string;
    phone: string;
    bio: string;
    skills: string[];
    availability: string;
}

export const volunteerService = {
    apply: async (data: VolunteerData) => {
        const response = await api.post('/volunteers/apply', data);
        return response.data;
    },

    // Admin Methods
    getAll: async (params?: { page?: number; status?: string }) => {
        const response = await api.get('/admin/volunteers', { params });
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get(`/admin/volunteers/${id}`);
        return response.data;
    },

    updateStatus: async (id: number, data: { status?: string; admin_notes?: string }) => {
        const response = await api.put(`/admin/volunteers/${id}`, data);
        return response.data;
    },

    deleteVolunteer: async (id: number) => {
        const response = await api.delete(`/admin/volunteers/${id}`);
        return response.data;
    }
};
