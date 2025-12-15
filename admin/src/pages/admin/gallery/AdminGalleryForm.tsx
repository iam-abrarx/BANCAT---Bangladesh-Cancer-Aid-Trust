import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Paper, TextField, Grid,
    FormControlLabel, Switch
} from '@mui/material';
import { Save as SaveIcon, ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { galleryService, type Gallery } from '../../../services/galleryService';
import { ImageUpload } from '../../../components/common/ImageUpload';

const AdminGalleryForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [existingImages, setExistingImages] = useState<any[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [featuredFile, setFeaturedFile] = useState<File | null>(null);
    const [featuredPreview, setFeaturedPreview] = useState<string>('');

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            title_en: '',
            title_bn: '',
            description_en: '',
            description_bn: '',
            date: new Date().toISOString().split('T')[0],
            is_published: true,
        }
    });

    useEffect(() => {
        if (isEdit && id) {
            loadGallery(parseInt(id));
        }
    }, [id]);

    const loadGallery = async (galleryId: number) => {
        try {
            const data = await galleryService.getById(galleryId);
            reset({
                title_en: data.title_en,
                title_bn: data.title_bn,
                description_en: data.description_en,
                description_bn: data.description_bn,
                date: data.date ? data.date.split('T')[0] : '',
                is_published: data.is_published,
            });
            if (data.images) {
                setExistingImages(data.images);
            }
            if (data.featured_image) {
                setFeaturedPreview(data.featured_image);
            }
        } catch (error) {
            console.error('Failed to load gallery', error);
        }
    };

    const onSubmit = async (data: any) => {
        console.log('Submitting Gallery Form', data);
        const formData = new FormData();
        formData.append('title_en', data.title_en);
        if (data.title_bn) formData.append('title_bn', data.title_bn);
        if (data.description_en) formData.append('description_en', data.description_en);
        if (data.description_bn) formData.append('description_bn', data.description_bn);
        if (data.date) formData.append('date', data.date);
        formData.append('is_published', data.is_published ? '1' : '0');

        if (featuredFile) {
            formData.append('featured_image', featuredFile);
        }

        try {
            if (isEdit && id) {
                // For update, we append _method=PUT to url or here, but service handles standard update.
                // However, our service update takes FormData now and adds _method=PUT to URL query or body.
                // Let's add it to body to be safe if service relies on body.
                formData.append('_method', 'PUT');
                const updated = await galleryService.update(parseInt(id), formData);
                console.log('Gallery Updated', updated);

                // Handle new images separately for update
                if (newImages.length > 0) {
                    const imgFormData = new FormData();
                    newImages.forEach((file) => {
                        imgFormData.append('images[]', file);
                    });
                    await galleryService.addImage(parseInt(id), imgFormData);
                }
            } else {
                // For create
                if (newImages.length > 0) {
                    newImages.forEach((file) => {
                        formData.append('images[]', file);
                    });
                }
                const created = await galleryService.create(formData);
                console.log('Gallery Created', created);
                if (created.id) {
                    navigate('/admin/gallery');
                    return;
                }
            }
            navigate('/admin/gallery');
        } catch (error) {
            console.error('Failed to save gallery', error);
            alert('Failed to save gallery');
        }
    };

    const handleDeleteExistingImage = async (imgId: number) => {
        if (!isEdit || !id) return;
        if (window.confirm('Delete this image?')) {
            try {
                await galleryService.deleteImage(parseInt(id), imgId);
                setExistingImages(prev => prev.filter(img => img.id !== imgId));
            } catch (err) {
                console.error("Failed to delete image", err);
            }
        }
    };

    return (
        <Box>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/admin/gallery')} sx={{ mb: 2 }}>
                Back to List
            </Button>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    {isEdit ? 'Edit Gallery' : 'Create New Gallery'}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="title_en"
                                        control={control}
                                        rules={{ required: 'English title is required' }}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                {...field}
                                                label="Title (English)"
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="title_bn"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField {...field} label="Title (Bangla)" fullWidth />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="date"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField {...field} type="date" label="Event Date" fullWidth InputLabelProps={{ shrink: true }} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="description_en"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField {...field} label="Description (English)" multiline rows={3} fullWidth />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="is_published"
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <FormControlLabel
                                                control={<Switch checked={value} onChange={onChange} />}
                                                label="Published"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" gutterBottom>Featured Image</Typography>
                            <ImageUpload
                                onFileSelect={(files) => setFeaturedFile(files[0])}
                                previewUrls={featuredPreview ? [featuredPreview] : []}
                                label="Upload Cover"
                            />
                        </Grid>
                    </Grid>

                    {/* Image Management Section */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Gallery Images</Typography>

                        <ImageUpload
                            multiple
                            onFileSelect={(files) => setNewImages(files)}
                            label="Add Images"
                            previewUrls={existingImages.map(img => img.image_url)}
                            onRemovePreview={(index) => {
                                // This index maps to existingImages array
                                const img = existingImages[index];
                                if (img) handleDeleteExistingImage(img.id);
                            }}
                        />
                        {/* Note: The ImageUpload implementation above was simple. 
                             Ideally we separate "Existing Images" (remote) from "New Images" (local).
                             The reuse of ImageUpload for both simultaneously is tricky if not designed for it.
                             Let's keep Existing Images display separate to avoid complex prop drilling/state sync.
                         */}
                    </Box>

                    {/* Separate Display for Existing Images to allow granular control */}
                    {existingImages.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2">Current Images:</Typography>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                {existingImages.map((img) => (
                                    <Grid item xs={6} sm={4} md={2} key={img.id}>
                                        <Box sx={{ position: 'relative' }}>
                                            <img src={img.image_url} alt="" style={{ width: '100%', borderRadius: 4 }} />
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteExistingImage(img.id)}
                                                sx={{ position: 'absolute', top: 0, right: 0, minWidth: 0, p: 0.5, bg: 'white' }}
                                            >
                                                x
                                            </Button>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            startIcon={<SaveIcon />}
                        >
                            {isEdit ? 'Update Gallery' : 'Create Gallery'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default AdminGalleryForm;
