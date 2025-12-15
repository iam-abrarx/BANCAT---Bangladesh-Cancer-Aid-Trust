import { useForm, Controller } from 'react-hook-form';
import { Box, Paper, TextField, Button, Grid, Typography, FormControlLabel, Switch, Alert } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { patientService } from '../../../services/patientService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { useState, useEffect, type ChangeEvent } from 'react';

interface PatientFormData {
    name_en: string;
    name_bn?: string;
    code: string;
    age: number;
    phone?: string;
    email?: string;
    gender?: string;
    donor_name?: string;
    location: string;
    cancer_type: string;
    photo?: any; // File or string
    treatment_cost_required: number;
    fund_raised?: number;
    medical_summary_en: string;
    medical_summary_bn?: string;
    is_active: boolean;
    is_featured: boolean;
}

export const AdminPatientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditMode = !!id;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<PatientFormData>({
        defaultValues: {
            name_en: '',
            name_bn: '',
            code: '',
            age: 0,
            phone: '',
            email: '',
            gender: 'male',
            donor_name: '',
            location: '',
            cancer_type: '',
            photo: '',
            treatment_cost_required: 0,
            fund_raised: 0,
            medical_summary_en: '',
            medical_summary_bn: '',
            is_active: true,
            is_featured: false,
        }
    });

    const currentPhotoUrl = watch('photo');

    // Fetch existing patient data if edit mode
    const { data: patient, isLoading: isLoadingPatient } = useQuery({
        queryKey: ['patient', id],
        queryFn: () => patientService.getPatientById(Number(id)),
        enabled: isEditMode,
    });

    useEffect(() => {
        if (patient) {
            reset({
                name_en: patient.name_en,
                name_bn: patient.name_bn || '',
                code: patient.code,
                age: patient.age,
                phone: patient.phone || '',
                email: patient.email || '',
                gender: patient.gender || 'male',
                donor_name: patient.donor_name || '',
                location: patient.location,
                cancer_type: patient.cancer_type,
                photo: patient.photo || '',
                treatment_cost_required: patient.treatment_cost_required,
                fund_raised: patient.fund_raised || 0,
                medical_summary_en: patient.medical_summary_en,
                medical_summary_bn: patient.medical_summary_bn || '',
                is_active: Boolean(patient.is_active),
                is_featured: Boolean(patient.is_featured),
            });
        }
    }, [patient, reset]);

    const mutation = useMutation({
        mutationFn: (data: FormData) => {
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
        const formData = new FormData();

        // Append fields with type handling
        Object.keys(data).forEach(key => {
            const value = data[key as keyof PatientFormData];

            if (key === 'photo') return; // Handled separately
            if (value === undefined || value === null) return;

            if (typeof value === 'boolean') {
                formData.append(key, value ? '1' : '0');
            } else {
                formData.append(key, value.toString());
            }
        });

        // Append file if selected
        if (selectedFile) {
            formData.append('photo', selectedFile);
        }

        mutation.mutate(formData);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    if (mutation.isPending || isLoadingPatient) return <LoadingSpinner />;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'text.primary' }}>
                {isEditMode ? 'Edit Patient' : 'Add New Patient'}
            </Typography>

            <Paper sx={{ p: 4, borderRadius: '20px' }}>
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
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Patient Name *" fullWidth required error={!!errors.name_en} helperText={errors.name_en?.message} />
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
                                name="code"
                                control={control}
                                rules={!isEditMode ? { required: 'Patient Code is required' } : {}}
                                render={({ field }) => (
                                    <TextField {...field} label={isEditMode ? "Patient Code" : "Patient Code (e.g. PT-001) *"} fullWidth required={!isEditMode} disabled={isEditMode} error={!!errors.code} helperText={errors.code?.message} />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Contact Number" fullWidth placeholder="+880123456789" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} type="email" label="Email" fullWidth placeholder="patient@example.com" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Controller
                                name="donor_name"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Donor Name (if available)" fullWidth placeholder="John Doe" />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="cancer_type"
                                control={control}
                                rules={{ required: 'Cancer Type is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Cancer Type *" fullWidth required error={!!errors.cancer_type} helperText={errors.cancer_type?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: 'Gender is required' }}
                                render={({ field }) => (
                                    <TextField {...field} select label="Gender *" fullWidth required SelectProps={{ native: true }}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="location"
                                control={control}
                                rules={{ required: 'Location is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="District/Location *" fullWidth required error={!!errors.location} helperText={errors.location?.message} />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="age"
                                control={control}
                                rules={{ required: 'Age is required', min: 0 }}
                                render={({ field }) => (
                                    <TextField {...field} type="number" label="Age *" fullWidth required error={!!errors.age} helperText={errors.age?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Controller
                                name="treatment_cost_required"
                                control={control}
                                rules={{ required: 'Treatment Cost is required', min: 0 }}
                                render={({ field }) => (
                                    <TextField {...field} type="number" label="Treatment Cost Required (৳) *" fullWidth required error={!!errors.treatment_cost_required} helperText={errors.treatment_cost_required?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Controller
                                name="fund_raised"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} type="number" label="Fund Raised (৳)" fullWidth placeholder="0" />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Patient Photo</Typography>
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
                                    id="photo-upload"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="photo-upload">
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
                                                {selectedFile ? selectedFile.name : 'Current Photo'}
                                            </Typography>
                                            <Button size="small" component="span">
                                                Change Photo
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box sx={{ cursor: 'pointer', py: 2 }}>
                                            <Box
                                                component="img"
                                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%239e9e9e' stroke-width='2'%3E%3Cpath d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/%3E%3Cpolyline points='17 8 12 3 7 8'/%3E%3Cline x1='12' y1='3' x2='12' y2='15'/%3E%3C/svg%3E"
                                                alt="Upload"
                                                sx={{ width: 48, height: 48, opacity: 0.5, mb: 1 }}
                                            />
                                            <Typography variant="body1" color="primary" fontWeight="bold">
                                                Click to Upload Photo
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                SVG, PNG, JPG or GIF (max. 5MB)
                                            </Typography>
                                        </Box>
                                    )}
                                </label>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="medical_summary_en"
                                control={control}
                                rules={{ required: 'Medical Summary is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Medical Summary *" multiline rows={4} fullWidth required error={!!errors.medical_summary_en} helperText={errors.medical_summary_en?.message} />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Controller
                                        name="is_active"
                                        control={control}
                                        render={({ field }) => <Switch checked={field.value} onChange={field.onChange} />}
                                    />
                                }
                                label="Active (Visible in listings)"
                            />
                            <FormControlLabel
                                control={
                                    <Controller
                                        name="is_featured"
                                        control={control}
                                        render={({ field }) => <Switch checked={field.value} onChange={field.onChange} />}
                                    />
                                }
                                label="Featured Patient"
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
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
