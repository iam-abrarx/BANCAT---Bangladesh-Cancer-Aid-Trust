import api from './patientService';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const authService = {
    register: async (data: RegisterData) => {
        const response = await api.post<AuthResponse>('/register', data);
        return response.data;
    },
    login: async (data: LoginData) => {
        const response = await api.post<AuthResponse>('/login', data);
        return response.data;
    },
    logout: async () => {
        await api.post('/logout');
    },
    getUser: async () => {
        const response = await api.get<User>('/user');
        return response.data;
    },
};
