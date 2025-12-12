import { useForm, Controller } from 'react-hook-form';
import { Box, Paper, TextField, Button, Grid, Typography, FormControlLabel, Switch, Alert, MenuItem } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { teamService } from '../../../services/teamService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { useEffect } from 'react';

interface TeamFormData {
    name_en: string;
    name_bn: string;
    role_en: string;
    role_bn: string;
    category: string;
    photo: string;
    bio_en: string;
    bio_bn: string;
    email: string;
    linkedin: string;
    order: number;
    is_active: boolean;
}

const CATEGORIES = [
    { value: 'leadership', label: 'Leadership' },
    { value: 'medical_advisor', label: 'Medical Advisor' },
    { value: 'coordinator', label: 'Coordinator' },
    { value: 'trustee', label: 'Trustee' },
    { value: 'ambassador', label: 'Ambassador' },
];

export const AdminTeamForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditMode = !!id;

    const { control, handleSubmit, reset, formState: { errors } } = useForm<TeamFormData>({
        defaultValues: {
            name_en: '',
            name_bn: '',
            role_en: '',
            role_bn: '',
            category: 'leadership',
            photo: '',
            bio_en: '',
            bio_bn: '',
            email: '',
            linkedin: '',
            order: 0,
            is_active: true,
        }
    });

    const { data: member, isLoading: isLoadingMember } = useQuery({
        queryKey: ['team-member', id],
        queryFn: () => teamService.getById(Number(id)),
        enabled: isEditMode,
    });

    useEffect(() => {
        if (member) {
            reset(member);
        }
    }, [member, reset]);

    const mutation = useMutation({
        mutationFn: (data: TeamFormData) => {
            if (isEditMode) {
                return teamService.update(Number(id), data);
            }
            return teamService.create(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-team'] });
            navigate('/admin/team');
        },
    });

    const onSubmit = (data: TeamFormData) => {
        mutation.mutate(data);
    };

    if (isEditMode && isLoadingMember) return <LoadingSpinner />;
    if (mutation.isPending) return <LoadingSpinner />;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {isEditMode ? 'Edit Team Member' : 'Add Team Member'}
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
                                name="role_en"
                                control={control}
                                rules={{ required: 'Role/Designation (English) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Role (English)" fullWidth required error={!!errors.role_en} helperText={errors.role_en?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="role_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Role (Bangla)" fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: 'Category is required' }}
                                render={({ field }) => (
                                    <TextField {...field} select label="Category" fullWidth required>
                                        {CATEGORIES.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="order"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} type="number" label="Sort Order" fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="photo"
                                control={control}
                                rules={{ required: 'Photo URL is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Photo URL" fullWidth required error={!!errors.photo} helperText={errors.photo?.message} placeholder="https://..." />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Controller
                                name="is_active"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Switch checked={field.value} onChange={field.onChange} />}
                                        label="Active"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Email (Optional)" fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="linkedin"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="LinkedIn URL (Optional)" fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="bio_en"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Bio (English)" multiline rows={3} fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="bio_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Bio (Bangla)" multiline rows={3} fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button variant="outlined" onClick={() => navigate('/admin/team')}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" size="large">
                                {isEditMode ? 'Update Member' : 'Create Member'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};
