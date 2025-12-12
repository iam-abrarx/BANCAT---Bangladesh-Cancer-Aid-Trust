import { useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Paper, TextField, Button, Grid, Typography, FormControlLabel, Switch, Alert } from '@mui/material';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { programService } from '../../../services/programService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { CloudUpload } from '@mui/icons-material';

interface ProgramFormData {
    name_en: string;
    name_bn: string;
    tagline_en: string;
    tagline_bn: string;
    description_en: string;
    description_bn: string;
    icon: string;
    banner_image: string | File;
    is_active: boolean;
    order: number;
}

export const AdminProgramForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditMode = !!id;
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Fetch existing data if edit mode
    const { data: existingProgram, isLoading } = useQuery({
        queryKey: ['program', id],
        queryFn: () => programService.getById(Number(id)),
        enabled: isEditMode,
    });

    const { control, handleSubmit, formState: { errors }, watch, reset } = useForm<ProgramFormData>({
        defaultValues: {
            name_en: '',
            name_bn: '',
            tagline_en: '',
            tagline_bn: '',
            description_en: '',
            description_bn: '',
            icon: '',
            banner_image: '',
            is_active: true,
            order: 0,
        }
    });

    // Populate form if data exists
    useEffect(() => {
        if (existingProgram) {
            console.log("Existing Program Data Loaded:", existingProgram);
            reset({
                name_en: existingProgram.name_en,
                name_bn: existingProgram.name_bn || '',
                tagline_en: existingProgram.tagline_en || '',
                tagline_bn: existingProgram.tagline_bn || '',
                description_en: existingProgram.description_en,
                description_bn: existingProgram.description_bn || '',
                icon: existingProgram.icon || '',
                is_active: existingProgram.is_active,
                order: existingProgram.order,
                banner_image: existingProgram.banner_image || '',
            });

            // Set preview URL for image if it exists
            if (existingProgram.banner_image && typeof existingProgram.banner_image === 'string') {
                setPreviewUrl(existingProgram.banner_image.startsWith('http') ? existingProgram.banner_image : `http://localhost:8000${existingProgram.banner_image}`);
            }
        }
    }, [existingProgram, reset]);

    // Memoize Quill modules to prevent re-renders
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }), []);

    const mutation = useMutation({
        mutationFn: (data: ProgramFormData) => {
            const formData = new FormData();
            formData.append('name_en', data.name_en);
            formData.append('name_bn', data.name_bn || '');
            formData.append('tagline_en', data.tagline_en || '');
            formData.append('tagline_bn', data.tagline_bn || '');
            formData.append('description_en', data.description_en);
            formData.append('description_bn', data.description_bn || '');
            formData.append('icon', data.icon || '');
            formData.append('is_active', String(data.is_active));
            formData.append('order', String(data.order));

            if (selectedImage) {
                formData.append('banner_image', selectedImage);
            }

            if (isEditMode) {
                return programService.updateProgram(Number(id), formData);
            }
            return programService.createProgram(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
            navigate('/admin/programs');
        },
    });

    const onSubmit = (data: ProgramFormData) => {
        mutation.mutate(data);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    if (mutation.isPending || isLoading) return <LoadingSpinner />;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {isEditMode ? 'Edit Program' : 'Add New Program'}
            </Typography>

            <Paper sx={{ p: 4, mb: 4 }}>
                {mutation.isError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {(mutation.error as any)?.response?.data?.message || 'An error occurred'}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="name_en"
                                control={control}
                                rules={{ required: 'Name (English) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Name (English)" fullWidth required error={!!errors.name_en} helperText={errors.name_en?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="name_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Name (Bangla)" fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="tagline_en"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Tagline (English)" fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="tagline_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Tagline (Bangla)" fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="order"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} type="number" label="Sort Order" fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Controller
                                name="icon"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Icon Name (MUI Icon)" fullWidth />
                                )}
                            />
                        </Grid>

                        {/* Image Upload Section */}
                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography variant="subtitle2" gutterBottom>Banner Image</Typography>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<CloudUpload />}
                                    fullWidth
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>
                                {(previewUrl || watch('banner_image')) && (
                                    <Box mt={2} sx={{ width: '100%', height: 100, overflow: 'hidden', borderRadius: 1 }}>
                                        <img
                                            src={previewUrl || (typeof watch('banner_image') === 'string' ? watch('banner_image') as string : '')}
                                            alt="Preview"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>Description (English) *</Typography>
                            <Controller
                                name="description_en"
                                control={control}
                                rules={{ required: 'Description (English) is required' }}
                                render={({ field }) => (
                                    <ReactQuill
                                        theme="snow"
                                        value={field.value}
                                        onChange={field.onChange}
                                        modules={modules}
                                        style={{ height: '200px', marginBottom: '50px' }}
                                    />
                                )}
                            />
                            {errors.description_en && <Typography color="error" variant="caption">{errors.description_en.message}</Typography>}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>Description (Bangla)</Typography>
                            <Controller
                                name="description_bn"
                                control={control}
                                render={({ field }) => (
                                    <ReactQuill
                                        theme="snow"
                                        value={field.value}
                                        onChange={field.onChange}
                                        modules={modules}
                                        style={{ height: '200px', marginBottom: '50px' }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="is_active"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Switch checked={field.value} onChange={field.onChange} />}
                                        label="Active (Visible publicly)"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
                            <Button variant="outlined" onClick={() => navigate('/admin/programs')}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" size="large">
                                {isEditMode ? 'Update Program' : 'Create Program'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};
