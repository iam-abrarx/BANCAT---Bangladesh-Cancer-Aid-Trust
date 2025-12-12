import api from './patientService';

export interface DonationRecord {
    id: number;
    amount: string;
    currency: string;
    status: string;
    created_at: string;
    transaction_id: string;
    patient?: {
        id: number;
        name_en: string;
        name_bn: string;
    };
    campaign?: {
        id: number;
        name_en: string;
        name_bn: string;
    };
}

export interface DashboardStats {
    total_donated: number;
    donation_count: number;
    impact_count: number;
}

export const dashboardService = {
    getStats: async () => {
        const response = await api.get<DashboardStats>('/dashboard/stats');
        return response.data;
    },
    getDonations: async (page = 1) => {
        const response = await api.get<{ data: DonationRecord[], current_page: number, last_page: number }>(`/dashboard/donations?page=${page}`);
        return response.data;
    }
};
