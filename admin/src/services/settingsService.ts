import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface SeoSettings {
    site_title: string;
    site_description: string;
    site_keywords: string;
    og_image: string;
    twitter_handle: string;
    google_site_verification: string;
    bing_site_verification: string;
    google_analytics_id: string;
    google_tag_manager_id: string;
    facebook_pixel_id: string;
    robots_txt_content: string;
    structured_data_org: {
        name: string;
        url: string;
        logo: string;
        sameAs: string[];
    };
    canonical_url_base: string;
    locale: string;
    allow_indexing: boolean;
}

const defaultSeoSettings: SeoSettings = {
    site_title: '',
    site_description: '',
    site_keywords: '',
    og_image: '',
    twitter_handle: '',
    google_site_verification: '',
    bing_site_verification: '',
    google_analytics_id: '',
    google_tag_manager_id: '',
    facebook_pixel_id: '',
    robots_txt_content: '',
    structured_data_org: {
        name: '',
        url: '',
        logo: '',
        sameAs: [],
    },
    canonical_url_base: '',
    locale: 'en_US',
    allow_indexing: true,
};

export const settingsService = {
    getSeoSettings: async (): Promise<SeoSettings> => {
        const response = await api.get('/settings/seo');
        return { ...defaultSeoSettings, ...response.data.data };
    },

    updateSeoSettings: async (data: Partial<SeoSettings>): Promise<SeoSettings> => {
        const response = await api.put('/admin/settings/seo', data);
        return response.data.data;
    },

    getCompanySettings: async (): Promise<CompanySettings> => {
        const response = await api.get('/settings/company');
        return { ...defaultCompanySettings, ...response.data.data };
    },

    updateCompanySettings: async (data: Partial<CompanySettings>): Promise<void> => {
        await api.put('/admin/settings/company', data);
    },
};

// Company Settings Types
export interface SocialProfile {
    platform: string;
    url: string;
}

export interface CompanySettings {
    city: string;
    country: string;
    state: string;
    zip: string;
    street: string;
    phone: string;
    website: string;
    email: string;
    social_profiles: SocialProfile[];
    footer_site_link: string;
    footer_copyright: string;
    footer_external_text: string;
    footer_external_link: string;
}

const defaultCompanySettings: CompanySettings = {
    city: '',
    country: 'Bangladesh',
    state: '',
    zip: '',
    street: '',
    phone: '',
    website: '',
    email: '',
    social_profiles: [],
    footer_site_link: '',
    footer_copyright: '',
    footer_external_text: '',
    footer_external_link: '',
};
