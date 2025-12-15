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
    active_patients?: number;
    pending_volunteers?: number;
}

export interface AdminStats {
    total_donated: number;
    total_patients: number;
    total_campaigns: number;
    total_programs: number;
    top_campaigns: Array<{
        id: number;
        name_en: string;
        raised_amount: number;
        goal_amount: number;
        status: string;
    }>;
    current_programs: Array<{
        id: number;
        name_en: string;
        is_active: boolean;
    }>;
    donation_trends: Array<{
        month: string;
        total: number;
    }>;
}

export const dashboardService = {
    getStats: async () => {
        const response = await api.get<DashboardStats>('/dashboard/stats');
        return response.data;
    },
    getAdminStats: async () => {
        const response = await api.get<DashboardStats & { pending_volunteers: number }>('/admin/stats');
        return response.data;
    },
    getDonations: async (page = 1) => {
        const response = await api.get<{ data: DonationRecord[], current_page: number, last_page: number }>(`/dashboard/donations?page=${page}`);
        return response.data;
    }
};
