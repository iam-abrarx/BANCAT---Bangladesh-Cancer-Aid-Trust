import api from './patientService';

export const partnerService = {
    getAll: (params?: any) => api.get('/admin/partners', { params }),
    get: (id: number) => api.get(`/admin/partners/${id}`),
    update: (id: number, data: any) => api.put(`/admin/partners/${id}`, data),
    delete: (id: number) => api.delete(`/admin/partners/${id}`),
    updateStatus: (id: number, status: string) => api.put(`/admin/partners/${id}/status`, { status }),
};
