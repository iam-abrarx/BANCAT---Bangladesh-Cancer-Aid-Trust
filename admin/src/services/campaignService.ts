import api from './patientService';

export interface Campaign {
    id: number;
    slug: string;
    name_en: string;
    name_bn: string;
    description_en: string;
    description_bn: string;
    banner_image: string;
    goal_amount: number;
    raised_amount: number;
    start_date: string;
    end_date: string;
    is_active: boolean;
    is_featured: boolean;
    status: 'pending' | 'approved' | 'rejected';
    submitter_name?: string;
    submitter_email?: string;
    submitter_phone?: string;
    admin_notes?: string;
}

export const campaignService = {
    getAll: async (params?: { featured?: boolean }) => {
        const response = await api.get<Campaign[]>('/campaigns', { params });
        return response.data;
    },

    getBySlug: async (slug: string) => {
        const response = await api.get<Campaign>(`/campaigns/${slug}`);
        return response.data;
    },

    // Admin Methods
    createCampaign: async (data: any) => {
        const response = await api.post('/admin/campaigns', data);
        return response.data;
    },

    updateCampaign: async (id: number, data: any) => {
        const response = await api.put(`/admin/campaigns/${id}`, data);
        return response.data;
    },

    deleteCampaign: async (id: number) => {
        const response = await api.delete(`/admin/campaigns/${id}`);
        return response.data;
    },

    updateStatus: async (id: number, data: { status: string; is_active: boolean }) => {
        const response = await api.put(`/admin/campaigns/${id}`, data);
        return response.data;
    }
};
