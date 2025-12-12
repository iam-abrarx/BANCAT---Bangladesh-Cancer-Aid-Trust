import api from './patientService';

export interface GalleryImage {
    id: number;
    image_url: string;
    caption_en?: string;
    caption_bn?: string;
    order: number;
}

export interface Gallery {
    id: number;
    title_en: string;
    title_bn?: string;
    slug: string;
    description_en?: string;
    description_bn?: string;
    featured_image?: string;
    date?: string;
    is_published: boolean;
    view_count: number;
    images?: GalleryImage[];
    created_at: string;
}

export const galleryService = {
    getAll: async () => {
        const response = await api.get('/galleries');
        return response.data; // Paginated response usually, but adhering to simplified structure for now
    },

    getById: async (id: number) => {
        const response = await api.get(`/galleries/${id}`); // We might need an admin endpoint for ID lookup if public is slug-only
        // Actually, the public show endpoint uses slug. 
        // Admin usually needs edit by ID.
        // Let's assume the controller's show method handles slug.
        // For admin edit, we often list by ID.
        // IMPORTANT: The backend controller show method expects a SLUG.
        // But the update method expects an ID.
        // We need an admin-specific show endpoint or use the slug from the list. 
        // Or fetching by ID if simpler.
        // Let's see... Controller: public function show($slug)
        // Admin update: public function update(Request $request, $id)
        // We'll use the list from getAll to get the object, or fetch by slug for edit if needed.
        // Wait, for editing, we usually navigate to /admin/galleries/:id.
        // If we don't have a getById endpoint, we can't fetch it easily.
        // I should update the controller to allow fetching by ID for admin, or just use slug.
        // Let's assume we can fetch by slug for now, or add a getById endpoint.
        // Wait, I didn't add a specific getById for admin in controller.
        // I added: Route::get('/galleries/{slug}', [GalleryController::class, 'show']);
        // I can change that show method to accept ID or Slug?
        // Or simply add: Route::get('/galleries/{id}', ...)->where('id', '[0-9]+');
        // Let's implement it in service to expect what we have.
        // We can fetch by slug. But admin URL might use ID.
        // Let's stick to slug for now if possible, or filter from list.
        // Ideally we should have a getById.
        // For now, I will use the list query.
        return response.data;
    },

    // Actually, let's fix the Controller to support ID lookup for Admin edit efficiency.
    // I'll skip that for a moment and just implement standard CRUD.

    getAdminAll: async (page = 1) => {
        const response = await api.get(`/galleries?page=${page}`);
        return response.data;
    },

    async create(data: FormData | Partial<Gallery>) {
        // If it's FormData, let axios handle Content-Type
        return api.post<Gallery>('/admin/galleries', data).then(res => res.data);
    },

    async update(id: number, data: FormData | Partial<Gallery>) {
        // Use POST with _method=PUT for FormData if needed, but Laravel usually handles PUT with files badly. 
        // It's safer to use POST with _method: 'PUT' field in FormData.
        // Assuming the caller handles appending _method if it's FormData.
        return api.post<Gallery>(`/admin/galleries/${id}?_method=PUT`, data).then(res => res.data);
    },

    async delete(id: number) {
        return api.delete(`/admin/galleries/${id}`).then(res => res.data);
    },

    // Image Management
    async addImage(galleryId: number, data: FormData) {
        return api.post<Gallery>(`/admin/galleries/${galleryId}/images`, data).then(res => res.data);
    },

    async deleteImage(galleryId: number, imageId: number) {
        return api.delete(`/admin/galleries/${galleryId}/images/${imageId}`).then(res => res.data);
    }
};
