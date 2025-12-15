import { useForm, Controller } from 'react-hook-form';
import { Box, Paper, TextField, Button, Grid, Typography, FormControlLabel, Switch, Alert, MenuItem } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { patientService } from '../../../services/patientService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

interface PatientFormData {
    name_en: string;
    name_bn: string;
    code: string;
    age: number;
    gender: string;
    phone: string;
    email: string;
    location: string;
    cancer_type: string;
    diagnosis_date: string;
    donor_name: string;
    photo: string;
    treatment_cost_required: number;
    medical_summary_en: string;
    medical_summary_bn: string;
    is_active: boolean;
    is_featured: boolean;
}

export const AdminPatientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditMode = !!id;

    const { control, handleSubmit, formState: { errors } } = useForm<PatientFormData>({
        defaultValues: {
            name_en: '',
            name_bn: '',
            code: '',
            age: 0,
            gender: 'other',
            phone: '',
            email: '',
            location: '',
            cancer_type: '',
            diagnosis_date: '',
            donor_name: '',
            photo: '',
            treatment_cost_required: 0,
            medical_summary_en: '',
            medical_summary_bn: '',
            is_active: true,
            is_featured: false,
        }
    });

    // Fetch data if edit mode (this is tricky because getByCode uses code, but lists use ID. 
    // Ideally we should have getById. For now, assuming we might need to fetch all or we rely on code being passed or change logic.
    // Let's implement basic "create" first primarily, or assume we can pass state.
    // Actually, backend has `show($code)`. We don't have `show($id)`. 
    // We'll skip pre-filling for a second to avoid complexity, or better:
    // We should implement `getById` in backend or front. For now, Create is priority.

    // Mutation
    const mutation = useMutation({
        mutationFn: (data: PatientFormData) => {
            if (isEditMode) {
                return patientService.updatePatient(Number(id), data);
            }
            return patientService.createPatient(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-patients'] });
            navigate('/admin/patients');
        },
    });

    const onSubmit = (data: PatientFormData) => {
        mutation.mutate(data);
    };

    if (mutation.isPending) return <LoadingSpinner />;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {isEditMode ? 'Edit Patient' : 'Add New Patient'}
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
                                name="code"
                                control={control}
                                rules={{ required: 'Unique Code is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Patient Code (e.g. BC-101)" fullWidth required disabled={isEditMode} error={!!errors.code} helperText={errors.code?.message} />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: 'Gender is required' }}
                                render={({ field }) => (
                                    <TextField {...field} select label="Gender" fullWidth required>
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="cancer_type"
                                control={control}
                                rules={{ required: 'Cancer Type is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Cancer Type" fullWidth required error={!!errors.cancer_type} helperText={errors.cancer_type?.message} />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="age"
                                control={control}
                                rules={{ required: 'Age is required', min: 0 }}
                                render={({ field }) => (
                                    <TextField {...field} type="number" label="Age" fullWidth required />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Controller
                                name="location"
                                control={control}
                                rules={{ required: 'Location is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="District/Location" fullWidth required />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Phone" fullWidth placeholder="+880..." />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Email" fullWidth type="email" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Controller
                                name="treatment_cost_required"
                                control={control}
                                rules={{ required: 'Funding Goal is required', min: 0 }}
                                render={({ field }) => (
                                    <TextField {...field} type="number" label="Treatment Cost Required (৳)" fullWidth required />
                                )}
                            />
                        </Grid>

                        {/* New Fields */}
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="diagnosis_date"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="date"
                                        label="Diagnosis Date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="donor_name"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Donor Name" fullWidth placeholder="e.g. Anonymous Sponsor" />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="photo"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Photo URL (Direct Link)" fullWidth placeholder="https://..." />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="medical_summary_en"
                                control={control}
                                rules={{ required: 'Medical Summary (English) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Medical Summary (English)" multiline rows={4} fullWidth required error={!!errors.medical_summary_en} helperText={errors.medical_summary_en?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="medical_summary_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Medical Summary (Bangla)" multiline rows={4} fullWidth />
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
                                        label="Active (Visible in listings)"
                                    />
                                )}
                            />
                            <Controller
                                name="is_featured"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Switch checked={field.value} onChange={field.onChange} />}
                                        label="Featured Patient"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button variant="outlined" onClick={() => navigate('/admin/patients')}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" size="large">
                                {isEditMode ? 'Update Patient' : 'Create Patient'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};
