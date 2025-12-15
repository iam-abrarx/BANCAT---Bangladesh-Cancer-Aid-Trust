import { useForm, Controller } from 'react-hook-form';
import { Box, Paper, TextField, Button, Grid, Typography, FormControlLabel, Switch, Alert } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { programService } from '../../../services/programService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

interface ProgramFormData {
    name_en: string;
    name_bn: string;
    tagline_en: string;
    tagline_bn: string;
    description_en: string;
    description_bn: string;
    icon: string;
    banner_image: string;
    is_active: boolean;
    order: number;
}

export const AdminProgramForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditMode = !!id;

    const { control, handleSubmit, formState: { errors } } = useForm<ProgramFormData>({
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

    const mutation = useMutation({
        mutationFn: (data: ProgramFormData) => {
            if (isEditMode) {
                return programService.updateProgram(Number(id), data);
            }
            return programService.createProgram(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
            navigate('/admin/programs');
        },
    });

    const onSubmit = (data: ProgramFormData) => {
        mutation.mutate(data);
    };

    if (mutation.isPending) return <LoadingSpinner />;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {isEditMode ? 'Edit Program' : 'Add New Program'}
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
                        <Grid item xs={12} md={4}>
                            <Controller
                                name="banner_image"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Banner Image URL" fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="description_en"
                                control={control}
                                rules={{ required: 'Description (English) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Description (English)" multiline rows={4} fullWidth required error={!!errors.description_en} helperText={errors.description_en?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="description_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Description (Bangla)" multiline rows={4} fullWidth />
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

                        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
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
