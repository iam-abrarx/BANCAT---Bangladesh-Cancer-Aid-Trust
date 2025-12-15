import api from './patientService';

export interface Program {
    id: number;
    slug: string;
    name_en: string;
    name_bn: string;
    tagline_en: string;
    tagline_bn: string;
    description_en: string;
    description_bn: string;
    icon: string;
    banner_image: string;
    impact_metrics: {
        label_en: string;
        label_bn: string;
        value: string;
    }[];
    is_active: boolean;
    order: number;
}

export const programService = {
    getAll: async () => {
        const response = await api.get<Program[]>('/programs');
        return response.data;
    },

    getBySlug: async (slug: string) => {
        const response = await api.get<Program>(`/programs/${slug}`);
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get<Program>(`/admin/programs/${id}`);
        return response.data;
    },

    // Admin Methods
    createProgram: async (data: any) => {
        const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
        const response = await api.post('/admin/programs', data, { headers });
        return response.data;
    },

    updateProgram: async (id: number, data: any) => {
        const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};

        // If it's FormData, we must use POST with _method=PUT for Laravel to handle files correctly
        if (data instanceof FormData) {
            data.append('_method', 'PUT');
            const response = await api.post(`/admin/programs/${id}`, data, { headers });
            return response.data;
        }

        const response = await api.put(`/admin/programs/${id}`, data);
        return response.data;
    },

    deleteProgram: async (id: number) => {
        const response = await api.delete(`/admin/programs/${id}`);
        return response.data;
    }
};
