import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Grid, Button, Paper, LinearProgress, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '../services/patientService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { ArrowBack } from '@mui/icons-material';
import { useDonationDrawer } from '../contexts/DonationDrawerContext';

export const PatientDetail = () => {
    const { code } = useParams<{ code: string }>();
    const { i18n } = useTranslation();
    const isBn = i18n.language === 'bn';
    const { openDrawer } = useDonationDrawer();

    const { data: patient, isLoading, error } = useQuery({
        queryKey: ['patient', code],
        queryFn: () => patientService.getByCode(code!),
        enabled: !!code,
    });

    if (isLoading) return <LoadingSpinner fullScreen />;
    if (error || !patient) return <Container sx={{ py: 10 }}><Typography color="error">Patient not found</Typography></Container>;

    const percentage = Math.min((patient.treatment_cost_raised / patient.treatment_cost_required) * 100, 100);

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Button component={RouterLink} to="/patients" startIcon={<ArrowBack />} sx={{ mb: 4 }}>
                Back to Patients
            </Button>

            <Grid container spacing={6}>
                {/* Left Column: Image & Updates */}
                <Grid item xs={12} md={7}>
                    <Box
                        component="img"
                        src={patient.photo || 'https://placehold.co/800x600?text=No+Image'}
                        alt={patient.name_en}
                        sx={{ width: '100%', borderRadius: 4, mb: 4 }}
                    />

                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Medical Summary
                    </Typography>
                    <Typography variant="body1" paragraph color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                        {isBn ? patient.medical_summary_bn : patient.medical_summary_en}
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Updates
                    </Typography>
                    {/* Updates placeholders - real implementation would map through patient.updates */}
                    <Typography variant="body2" color="text.secondary">
                        No updates yet.
                    </Typography>
                </Grid>

                {/* Right Column: Donation Card */}
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, position: 'sticky', top: 100 }}>
                        <Typography variant="overline" color="primary" fontWeight="bold">
                            {patient.cancer_type}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {isBn ? patient.name_bn : patient.name_en}
                        </Typography>

                        <Box sx={{ my: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                    ৳{patient.treatment_cost_raised.toLocaleString()}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    raised of ৳{patient.treatment_cost_required.toLocaleString()}
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={percentage}
                                sx={{ height: 12, borderRadius: 6, bgcolor: 'grey.100' }}
                            />
                            <Typography variant="body2" align="right" color="text.secondary" sx={{ mt: 0.5 }}>
                                {percentage.toFixed(1)}% Funded
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ py: 2, fontSize: '1.1rem', mb: 2 }}
                            onClick={() => openDrawer()}
                        >
                            Donate Now
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            fullWidth
                        >
                            Share This Story
                        </Button>

                        <Box sx={{ mt: 4, bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                🛡️ 100% Verified Case
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                This patient has been physically verified by the BANcat team. Your donation goes directly to their treatment.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
