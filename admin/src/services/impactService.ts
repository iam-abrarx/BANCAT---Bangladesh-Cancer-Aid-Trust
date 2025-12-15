import api from './patientService';

export interface ImpactMetric {
    id: number;
    metric_key: string;
    label_en: string;
    label_bn: string;
    value: number;
    icon: string;
    order: number;
    is_visible: boolean;
}

export const impactService = {
    getAll: async () => {
        const response = await api.get<ImpactMetric[]>('/admin/impact-metrics');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get<ImpactMetric>(`/admin/impact-metrics/${id}`);
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post('/admin/impact-metrics', data);
        return response.data;
    },

    update: async (id: number, data: any) => {
        const response = await api.put(`/admin/impact-metrics/${id}`, data);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/admin/impact-metrics/${id}`);
        return response.data;
    }
};
