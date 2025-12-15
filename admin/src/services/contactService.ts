import api from './patientService';

export interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface PartnershipData {
    organization_name: string;
    contact_person: string;
    email: string;
    phone?: string;
    type?: string;
    message: string;
}

export const contactService = {
    sendContact: async (data: ContactData) => {
        const response = await api.post('/contact', data);
        return response.data;
    },

    sendPartnership: async (data: PartnershipData) => {
        const response = await api.post('/partnership', data);
        return response.data;
    },

    getAllContacts: async (params?: any) => {
        const response = await api.get('/admin/contacts', { params });
        return response.data;
    }
};
