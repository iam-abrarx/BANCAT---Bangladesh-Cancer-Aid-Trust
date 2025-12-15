import api from './patientService';

export interface TeamMember {
    id: number;
    name_en: string;
    name_bn: string;
    role_en: string;
    role_bn: string;
    category: 'leadership' | 'medical_advisor' | 'coordinator' | 'trustee' | 'ambassador';
    photo: string;
    bio_en: string;
    bio_bn: string;
    email: string;
    linkedin: string;
    order: number;
    is_active: boolean;
}

export const teamService = {
    getAll: async (params?: { category?: string }) => {
        const response = await api.get<TeamMember[]>('/team-members', { params });
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get<TeamMember>(`/admin/team-members/${id}`);
        return response.data;
    },

    create: async (data: any) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await api.post('/admin/team-members', data, config);
        return response.data;
    },

    update: async (id: number, data: any) => {
        if (data instanceof FormData) {
            data.append('_method', 'PUT');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const response = await api.post(`/admin/team-members/${id}`, data, config);
            return response.data;
        }
        const response = await api.put(`/admin/team-members/${id}`, data);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/admin/team-members/${id}`);
        return response.data;
    }
};
