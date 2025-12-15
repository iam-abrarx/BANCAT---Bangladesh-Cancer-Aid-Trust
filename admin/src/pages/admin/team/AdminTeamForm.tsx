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
    photo: string | File;
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
        const formData = new FormData();
        formData.append('name_en', data.name_en);
        formData.append('role_en', data.role_en);
        formData.append('category', data.category);
        formData.append('order', String(data.order));
        formData.append('is_active', data.is_active ? '1' : '0');

        if (data.name_bn) formData.append('name_bn', data.name_bn);
        if (data.role_bn) formData.append('role_bn', data.role_bn);
        if (data.bio_en) formData.append('bio_en', data.bio_en);
        if (data.bio_bn) formData.append('bio_bn', data.bio_bn);
        if (data.email) formData.append('email', data.email);
        if (data.linkedin) formData.append('linkedin', data.linkedin);

        if (data.photo instanceof File) {
            formData.append('photo', data.photo);
        }

        mutation.mutate(formData as any);
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
                        {JSON.stringify((mutation.error as any)?.response?.data || mutation.error.message)}
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
                                rules={{ required: 'Name (Bangla) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Name (Bangla) *" fullWidth required error={!!errors.name_bn} helperText={errors.name_bn?.message} />
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
                                rules={{ required: 'Role (Bangla) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Role (Bangla) *" fullWidth required error={!!errors.role_bn} helperText={errors.role_bn?.message} />
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
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>Photo</Typography>
                                <Controller
                                    name="photo"
                                    control={control}
                                    rules={{ required: isEditMode ? false : 'Photo is required' }} // Optional in edit mode
                                    render={({ field: { value, onChange, ...field } }) => (
                                        <Box>
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                fullWidth
                                            >
                                                {value instanceof File ? 'Photo Selected' : 'Upload Photo'}
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            onChange(file);
                                                        }
                                                    }}
                                                    {...field}
                                                    value="" // Reset value to allow re-selection
                                                />
                                            </Button>
                                            {/* Preview */}
                                            {value && (
                                                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                                                    {value instanceof File ? (
                                                        <img
                                                            src={URL.createObjectURL(value)}
                                                            alt="Preview"
                                                            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                                                        />
                                                    ) : (
                                                        typeof value === 'string' && (
                                                            <img
                                                                src={value.startsWith('http') ? value : `http://localhost:8000${value}`}
                                                                alt="Current"
                                                                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                                                            />
                                                        )
                                                    )}
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                />
                            </Box>
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
