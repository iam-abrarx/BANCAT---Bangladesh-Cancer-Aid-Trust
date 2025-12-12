import api from './patientService';
import type { User } from './authService';

export const userService = {
    getUsers: async () => {
        const response = await api.get<User[]>('/admin/users');
        return response.data;
    },

    updateUserRole: async (id: number, role: string) => {
        const response = await api.put<{ message: string; user: User }>(`/admin/users/${id}/role`, { role });
        return response.data;
    },

    createUser: async (data: Partial<User> & { password: string }) => {
        const response = await api.post<User>('/admin/users', data);
        return response.data;
    },
};
