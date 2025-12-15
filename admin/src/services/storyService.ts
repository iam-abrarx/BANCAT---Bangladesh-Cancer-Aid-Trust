import api from './patientService'; // reusing basic axios instance

export interface Story {
    id: number;
    slug: string;
    type: 'survivor' | 'caregiver' | 'volunteer';
    name_en: string;
    name_bn: string;
    content_en: string;
    content_bn: string;
    featured_image: string;
    video_url?: string;
    is_published: boolean;
    views_count: number;
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

    getStoryById: async (id: number) => {
        const response = await api.get<Story>(`/admin/stories/${id}`);
        return response.data;
    },

    // Admin Methods
    // Admin Methods
    createStory: async (data: any) => {
        const response = await api.post('/admin/stories', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    updateStory: async (id: number, data: any) => {
        // If data is FormData, we must use POST with _method: PUT because PHP has trouble with PUT/PATCH and multipart/form-data
        if (data instanceof FormData) {
            data.append('_method', 'PUT');
            const response = await api.post(`/admin/stories/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        }

        // Basic JSON update
        const response = await api.put(`/admin/stories/${id}`, data);
        return response.data;
    },

    deleteStory: async (id: number) => {
        const response = await api.delete(`/admin/stories/${id}`);
        return response.data;
    }
};
