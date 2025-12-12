import api from './patientService'; // reusing basic axios instance

export interface Story {
    id: number;
    slug: string;
    type: 'survivor' | 'caregiver' | 'volunteer' | 'testimonial';
    title_en: string;
    title_bn: string;
    subject_name_en: string;
    subject_name_bn: string;
    excerpt_en: string;
    excerpt_bn: string;
    content_en: string;
    content_bn: string;
    featured_image: string;
    video_url?: string;
    is_published: boolean;
    view_count: number;
    created_at: string;
}

export const storyService = {
    getAll: async (params?: { type?: string; page?: number; search?: string; sort?: string }) => {
        const response = await api.get<{ data: Story[], links: any, meta: any }>('/stories', { params });
        return response.data;
    },

    getBySlug: async (slug: string) => {
        const response = await api.get<Story>(`/stories/${slug}`);
        return response.data;
    },

    // Admin Methods
    createStory: async (data: any) => {
        const response = await api.post('/admin/stories', data);
        return response.data;
    },

    updateStory: async (id: number, data: any) => {
        const response = await api.put(`/admin/stories/${id}`, data);
        return response.data;
    },

    deleteStory: async (id: number) => {
        const response = await api.delete(`/admin/stories/${id}`);
        return response.data;
    }
};
