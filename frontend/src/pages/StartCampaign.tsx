import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Paper, Typography, TextField, Button, Box, Alert, Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { campaignService } from '../services/campaignService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

export const StartCampaign = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name_en: '',
            description_en: '',
            goal_amount: '',
            start_date: '',
            end_date: '',
            submitter_name: '',
            submitter_email: '',
            submitter_phone: ''
        }
    });

    const mutation = useMutation({
        mutationFn: campaignService.submit,
        onSuccess: () => {
            setSuccessMsg('Your campaign has been submitted for review! We will convert it to an active campaign after verification.');
            setErrorMsg('');
            reset();
            window.scrollTo(0, 0);
        },
        onError: (err: any) => {
            setErrorMsg(err.response?.data?.message || 'Failed to submit campaign. Please try again.');
            setSuccessMsg('');
            window.scrollTo(0, 0);
        }
    });

    const onSubmit = (data: any) => {
        const payload = {
            ...data,
            name_bn: data.name_en,
            description_bn: data.description_en,
            banner_image: 'https://placehold.co/600x400'
        };
        mutation.mutate(payload);
    };

    if (mutation.isPending) return <LoadingSpinner />;

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '90vh', py: 8 }}>
            <Helmet>
                <title>Start a Campaign - BANcat</title>
            </Helmet>

            <Container maxWidth="md">
                <Paper elevation={3} sx={{ p: 5, borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" align="center" color="primary">
                        Start a Fundraising Campaign
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        Tell us your story and help us raise funds for those in need. All campaigns are reviewed before going live.
                    </Typography>

                    {successMsg && <Alert severity="success" sx={{ mb: 3 }}>{successMsg}</Alert>}
                    {errorMsg && <Alert severity="error" sx={{ mb: 3 }}>{errorMsg}</Alert>}

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom color="primary">Campaign Details</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="name_en"
                                    control={control}
                                    rules={{ required: 'Campaign Title is required' }}
                                    render={({ field }) => (
                                        <TextField {...field} label="Campaign Title" fullWidth required error={!!errors.name_en} helperText={errors.name_en?.message} />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="goal_amount"
                                    control={control}
                                    rules={{ required: 'Goal Amount is required', pattern: { value: /^[0-9]+$/, message: 'Please enter a valid number' } }}
                                    render={({ field }) => (
                                        <TextField {...field} label="Goal Amount (BDT)" fullWidth required error={!!errors.goal_amount} helperText={errors.goal_amount?.message} />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="end_date"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="description_en"
                                    control={control}
                                    rules={{ required: 'Description is required' }}
                                    render={({ field }) => (
                                        <TextField {...field} label="Campaign Story" multiline rows={6} fullWidth required error={!!errors.description_en} helperText={errors.description_en?.message} placeholder="Explain why you are raising funds..." />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>Your Contact Information</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="submitter_name"
                                    control={control}
                                    rules={{ required: 'Your Name is required' }}
                                    render={({ field }) => (
                                        <TextField {...field} label="Your Name" fullWidth required error={!!errors.submitter_name} helperText={errors.submitter_name?.message} />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="submitter_phone"
                                    control={control}
                                    rules={{ required: 'Phone Number is required' }}
                                    render={({ field }) => (
                                        <TextField {...field} label="Phone Number" fullWidth required error={!!errors.submitter_phone} helperText={errors.submitter_phone?.message} />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="submitter_email"
                                    control={control}
                                    rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } }}
                                    render={({ field }) => (
                                        <TextField {...field} label="Email Address" fullWidth required error={!!errors.submitter_email} helperText={errors.submitter_email?.message} />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" size="large" sx={{ py: 1.5, mt: 2 }}>
                                    Submit for Review
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
