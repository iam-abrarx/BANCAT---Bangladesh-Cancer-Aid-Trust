import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
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

export const seoService = {
    getSettings: async (): Promise<SeoSettings> => {
        const response = await api.get('/settings/seo');
        return response.data.data;
    },
};
