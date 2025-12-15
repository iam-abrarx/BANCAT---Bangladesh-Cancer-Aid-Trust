import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Add auth token if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface DonationInitData {
    amount: number;
    payment_method: string;
    patient_id?: number;
    campaign_id?: number;
    message?: string;
}

export interface DonationResponse {
    donation: {
        id: number;
        transaction_id: string;
        amount: string;
        status: string;
    };
    payment_url: string;
}

export const donationService = {
    // Admin Methods
    getAllDonations: async (params?: { page?: number; status?: string; search?: string }) => {
        const response = await api.get('/admin/donations', { params });
        return response.data;
    },

    approveDonation: async (id: number) => {
        const response = await api.put(`/admin/donations/${id}/approve`);
        return response.data;
    }
};

