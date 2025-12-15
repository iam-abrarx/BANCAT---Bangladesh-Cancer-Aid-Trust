import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export interface DonationInitData {
    amount: number;
    payment_method: string;
    donor_name: string;
    donor_email: string;
    donor_phone?: string;
    patient_id?: number;
    campaign_id?: number;
    message?: string;
    donation_type?: 'general' | 'campaign' | 'patient';
}

export interface DonationResponse {
    donation: {
        id: number;
        transaction_id: string;
        amount: string;
        payment_status: string;
    };
    payment_url: string;
}

export const donationService = {
    initiate: async (data: DonationInitData) => {
        const response = await api.post<DonationResponse>('/donations/initiate', data);
        return response.data;
    },

    // Admin Methods
    getAllDonations: async (params?: { page?: number; status?: string; search?: string }) => {
        const response = await api.get('/admin/donations', { params });
        return response.data;
    },

    // Confirm donation (callback simulation)
    confirmDonation: async (transactionId: string) => {
        const response = await api.post(`/donations/callback?transaction_id=${transactionId}`);
        return response.data;
    }
};
