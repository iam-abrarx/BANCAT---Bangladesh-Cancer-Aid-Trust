import api from './patientService';

export interface Page {
    id: number;
    slug: string;
    title_en: string;
    title_bn: string;
    content_en: string;
    content_bn: string;
    meta_title_en?: string;
    meta_title_bn?: string;
    meta_description_en?: string;
    meta_description_bn?: string;
    is_published: boolean;
}

export const pageService = {
    getAll: async () => {
        const response = await api.get<Page[]>('/admin/pages');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get<Page>(`/admin/pages/${id}`);
        return response.data;
    },

    getBySlug: async (slug: string) => {
        const response = await api.get<Page>(`/pages/${slug}`);
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/admin/pages', data);
        return response.data;
    },

    update: async (id: number, data: any) => {
        const response = await api.put(`/admin/pages/${id}`, data);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/admin/pages/${id}`);
        return response.data;
    }
};
