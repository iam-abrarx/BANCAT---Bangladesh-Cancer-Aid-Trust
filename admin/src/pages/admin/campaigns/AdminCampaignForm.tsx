import { useForm, Controller } from 'react-hook-form';
import { Box, Paper, TextField, Button, Grid, Typography, FormControlLabel, Switch, Alert } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { campaignService } from '../../../services/campaignService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

interface CampaignFormData {
    name_en: string;
    name_bn: string;
    description_en: string;
    description_bn: string;
    banner_image: string;
    goal_amount: number;
    start_date: string;
    end_date: string;
    is_active: boolean;
    is_featured: boolean;
}

export const AdminCampaignForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditMode = !!id;

    const { control, handleSubmit, formState: { errors } } = useForm<CampaignFormData>({
        defaultValues: {
            name_en: '',
            name_bn: '',
            description_en: '',
            description_bn: '',
            banner_image: '',
            goal_amount: 0,
            start_date: '',
            end_date: '',
            is_active: true,
            is_featured: false,
        }
    });

    const mutation = useMutation({
        mutationFn: (data: CampaignFormData) => {
            if (isEditMode) {
                return campaignService.updateCampaign(Number(id), data);
            }
            return campaignService.createCampaign(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
            navigate('/admin/campaigns');
        },
    });

    const onSubmit = (data: CampaignFormData) => {
        mutation.mutate(data);
    };

    if (mutation.isPending) return <LoadingSpinner />;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {isEditMode ? 'Edit Campaign' : 'Add New Campaign'}
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
                                rules={{ required: 'Title (English) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Title (English)" fullWidth required error={!!errors.name_en} helperText={errors.name_en?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="name_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Title (Bangla)" fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="goal_amount"
                                control={control}
                                rules={{ required: 'Goal Amount is required', min: 1 }}
                                render={({ field }) => (
                                    <TextField {...field} type="number" label="Goal Amount (৳)" fullWidth required />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="banner_image"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Banner Image URL" fullWidth placeholder="https://..." />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="start_date"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} type="date" label="Start Date" fullWidth InputLabelProps={{ shrink: true }} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="end_date"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} type="date" label="End Date" fullWidth InputLabelProps={{ shrink: true }} />
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
                                        label="Active (Collecting donations)"
                                    />
                                )}
                            />
                            <Controller
                                name="is_featured"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Switch checked={field.value} onChange={field.onChange} />}
                                        label="Featured on Homepage"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button variant="outlined" onClick={() => navigate('/admin/campaigns')}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" size="large">
                                {isEditMode ? 'Update Campaign' : 'Create Campaign'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};
