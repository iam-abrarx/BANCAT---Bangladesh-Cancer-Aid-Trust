import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/admin/testimonials';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const getTestimonials = async () => {
    // For public list we use the public endpoint, but for admin management we might want admin specific endpoint if different. 
    // Usually Admin uses the same listing or a specific admin one. The plan said /api/v1/testimonials is public.
    // Let's use the public one for listing for now, or the admin specific if blocked.
    // Wait, the controller has index() public. 
    // But admin might need to see ALL (e.g. including hidden ones if any). 
    // For now, let's just use the public one for reading list:
    const response = await axios.get('http://localhost:8000/api/v1/testimonials');
    return response.data;
};

export const createTestimonial = async (data: any) => {
    // Determine if data is FormData (has file) or plain object (no file but needs conversion)
    // Actually, we should always convert to FormData if we want to support file uploads in a consistent way 
    // or just let the component handle the FormData creation.
    // Let's assume the component sends FormData directly.
    const response = await axios.post(API_URL, data, {
        headers: {
            ...getAuthHeader().headers,
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateTestimonial = async (id: number, data: any) => {
    // For update with files in Laravel using PUT/PATCH, we often need to use POST with _method=PUT
    // because PHP can't handle multipart/form-data on PUT requests natively well.
    // So we check if it's FormData
    if (data instanceof FormData) {
        data.append('_method', 'PUT');
        const response = await axios.post(`${API_URL}/${id}`, data, {
            headers: {
                ...getAuthHeader().headers,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } else {
        const response = await axios.put(`${API_URL}/${id}`, data, getAuthHeader());
        return response.data;
    }
};

export const deleteTestimonial = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
};
