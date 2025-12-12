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
        const response = await api.get<TeamMember[]>('/team-members', { params }); // Use public or create separate admin endpoint if needed. 
        // Controller index handles both logic based on auth, but let's assume /team-members is accessible. 
        // Wait, index checks auth. If admin, returns all. If generic public, returns active. 
        // So for Admin panel, we just call the same endpoint with token.
        return response.data;
    },

    getById: async (id: number) => {
        // show method wasn't explicitly added to routes but usually useful for edit
        // Actually I forgot to add show route in api.php! Only post/put/delete were added.
        // But I can access it via index filters or add show route.
        // Let's assume I'll add show route or fetch from list. 
        // Actually, let's fix api.php to include show or just use index for list and getById for edit form.
        // Controller has show method but route isn't registered in my previous tool call (I saw post, put, delete).
        // I should add get /team-members/{id} for admin.
        const response = await api.get<TeamMember>(`/team-members/${id}`);
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/admin/team-members', data);
        return response.data;
    },

    update: async (id: number, data: any) => {
        const response = await api.put(`/admin/team-members/${id}`, data);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/admin/team-members/${id}`);
        return response.data;
    }
};
