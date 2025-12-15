import { useForm, Controller } from 'react-hook-form';
import { Box, Paper, TextField, Button, Grid, Typography, FormControlLabel, Switch, Alert, MenuItem } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { storyService } from '../../../services/storyService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { useState, useEffect, type ChangeEvent } from 'react';

interface StoryFormData {
    title_en: string;
    title_bn: string;
    subject_name_en: string;
    subject_name_bn: string;
    type: string;
    content_en: string;
    content_bn: string;
    excerpt_en: string;
    excerpt_bn: string;
    featured_image: any; // File or string
    video_url: string;
    is_published: boolean;
    is_featured: boolean;
}

export const AdminStoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditMode = !!id;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<StoryFormData>({
        defaultValues: {
            title_en: '',
            title_bn: '',
            subject_name_en: '',
            subject_name_bn: '',
            type: 'survivor',
            content_en: '',
            content_bn: '',
            excerpt_en: '',
            excerpt_bn: '',
            featured_image: '',
            video_url: '',
            is_published: true,
            is_featured: false,
        }
    });

    const currentPhotoUrl = watch('featured_image');

    // Fetch existing story data if edit mode
    const { data: story, isLoading: isLoadingStory } = useQuery({
        queryKey: ['story', id],
        queryFn: () => storyService.getStoryById(Number(id)),
        enabled: isEditMode,
    });

    useEffect(() => {
        if (story) {
            reset({
                title_en: story.name_en || (story as any).title_en, // Handle API inconsistency if any
                title_bn: story.name_bn || (story as any).title_bn || '',
                subject_name_en: (story as any).subject_name_en || '',
                subject_name_bn: (story as any).subject_name_bn || '',
                type: story.type,
                content_en: story.content_en,
                content_bn: story.content_bn || '',
                excerpt_en: (story as any).excerpt_en || '',
                excerpt_bn: (story as any).excerpt_bn || '',
                featured_image: story.featured_image || '',
                video_url: story.video_url || '',
                is_published: Boolean(story.is_published),
                is_featured: Boolean((story as any).is_featured),
            });
        }
    }, [story, reset]);

    const mutation = useMutation({
        mutationFn: (data: FormData) => {
            if (isEditMode) {
                return storyService.updateStory(Number(id), data);
            }
            return storyService.createStory(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
            navigate('/admin/stories');
        },
    });

    const onSubmit = (data: StoryFormData) => {
        const formData = new FormData();

        // Append fields
        Object.keys(data).forEach(key => {
            const value = data[key as keyof StoryFormData];

            if (key === 'featured_image') return; // Handled separately
            if (value === undefined || value === null) return;

            if (typeof value === 'boolean') {
                formData.append(key, value ? '1' : '0');
            } else {
                formData.append(key, value.toString());
            }
        });

        // Append file if selected
        if (selectedFile) {
            formData.append('featured_image', selectedFile);
        }

        mutation.mutate(formData);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    if (mutation.isPending || isLoadingStory) return <LoadingSpinner />;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {isEditMode ? 'Edit Story' : 'Add New Story'}
            </Typography>

            <Paper sx={{ p: 4 }}>
                {mutation.isError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {(mutation.error as any)?.response?.data?.message || 'An error occurred'}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="title_en"
                                control={control}
                                rules={{ required: 'Title (English) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Title (English) *" fullWidth required error={!!errors.title_en} helperText={errors.title_en?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="title_bn"
                                control={control}
                                rules={{ required: 'Title (Bangla) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Title (Bangla) *" fullWidth required error={!!errors.title_bn} helperText={errors.title_bn?.message} />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="subject_name_en"
                                control={control}
                                rules={{ required: 'Subject Name (English) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Subject Name (e.g. Patient Name) *" fullWidth required error={!!errors.subject_name_en} helperText={errors.subject_name_en?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="subject_name_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Subject Name (Bangla)" fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="type"
                                control={control}
                                rules={{ required: 'Type is required' }}
                                render={({ field }) => (
                                    <TextField {...field} select label="Story Type *" fullWidth required>
                                        <MenuItem value="survivor">Survivor</MenuItem>
                                        <MenuItem value="caregiver">Caregiver</MenuItem>
                                        <MenuItem value="volunteer">Volunteer</MenuItem>
                                        <MenuItem value="testimonial">Testimonial</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="video_url"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Video URL (Optional)" fullWidth placeholder="https://youtube.com/..." />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Featured Image</Typography>
                            <Box
                                sx={{
                                    border: '2px dashed #e0e0e0',
                                    borderRadius: 2,
                                    p: 3,
                                    textAlign: 'center',
                                    bgcolor: 'background.default',
                                    transition: 'all 0.2s',
                                    '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' }
                                }}
                            >
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="featured-image-upload"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="featured-image-upload">
                                    {(selectedFile || (isEditMode && currentPhotoUrl && typeof currentPhotoUrl === 'string')) ? (
                                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                            <Box
                                                component="img"
                                                src={selectedFile ? URL.createObjectURL(selectedFile) : (currentPhotoUrl ? (currentPhotoUrl.startsWith('http') ? currentPhotoUrl : `${import.meta.env.VITE_API_URL?.replace('/api/v1', '')}${currentPhotoUrl}`) : '')}
                                                alt="Preview"
                                                sx={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 2, mb: 2 }}
                                                onError={(e: any) => { if (!e.target.dataset.errored) { e.target.dataset.errored = 'true'; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%23e0e0e0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='16' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E"; } }}
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                {selectedFile ? selectedFile.name : 'Current Image'}
                                            </Typography>
                                            <Button size="small" component="span">
                                                Change Image
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box sx={{ cursor: 'pointer', py: 2 }}>
                                            <Typography variant="body1" color="primary" fontWeight="bold">
                                                Click to Upload Image
                                            </Typography>
                                        </Box>
                                    )}
                                </label>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="excerpt_en"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Excerpt (English) - Short Summary" multiline rows={2} fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="excerpt_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Excerpt (Bangla)" multiline rows={2} fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="content_en"
                                control={control}
                                rules={{ required: 'Content (English) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Content (English) *" multiline rows={6} fullWidth required error={!!errors.content_en} helperText={errors.content_en?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="content_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Content (Bangla)" multiline rows={6} fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="is_published"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Switch checked={field.value} onChange={field.onChange} />}
                                        label="Published (Visible to public)"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="is_featured"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Switch checked={field.value} onChange={field.onChange} />}
                                        label="Featured (Show on homepage)"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button variant="outlined" onClick={() => navigate('/admin/stories')}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" size="large">
                                {isEditMode ? 'Update Story' : 'Create Story'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};
