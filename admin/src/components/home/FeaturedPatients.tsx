import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

// Mock data - will be replaced by API call
const mockPatients = [
    {
        id: 1,
        name: 'Rahim Uddin',
        age: 12,
        condition: 'Leukemia',
        image: 'https://placehold.co/600x400/1976D2/FFFFFF?text=Rahim',
        raised: 50000,
        goal: 150000,
    },
    {
        id: 2,
        name: 'Fatema Begum',
        age: 45,
        condition: 'Breast Cancer',
        image: 'https://placehold.co/600x400/00897B/FFFFFF?text=Fatema',
        raised: 25000,
        goal: 80000,
    },
    {
        id: 3,
        name: 'Kamal Hassan',
        age: 30,
        condition: 'Lung Cancer',
        image: 'https://placehold.co/600x400/E91E63/FFFFFF?text=Kamal',
        raised: 120000,
        goal: 200000,
    },
];

export const FeaturedPatients = () => {
    const { t } = useTranslation();

    return (
        <Box sx={{ py: 10, bgcolor: 'white' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" gutterBottom color="primary.main" fontWeight={700}>
                    {t('section.patients_title', 'Help Them Fight')}
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
                    Your donation can be the difference between despair and hope. Choose a patient to support today.
                </Typography>

                <Grid container spacing={4}>
                    {mockPatients.map((patient) => (
                        <Grid item xs={12} md={4} key={patient.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="220"
                                    image={patient.image}
                                    alt={patient.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="div" fontWeight={600}>
                                        {patient.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {patient.age} years • {patient.condition}
                                    </Typography>

                                    <Box sx={{ mt: 2, mb: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="body2" fontWeight={600}>
                                                ৳{patient.raised.toLocaleString()} raised
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                of ৳{patient.goal.toLocaleString()}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(patient.raised / patient.goal) * 100}
                                            sx={{ height: 8, borderRadius: 5, bgcolor: 'grey.100' }}
                                        />
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        component={RouterLink}
                                        to={`/patients/${patient.id}`}
                                    >
                                        {t('action.donate_now', 'Donate Now')}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Button
                        variant="outlined"
                        size="large"
                        component={RouterLink}
                        to="/patients"
                    >
                        {t('action.view_all', 'View All Patients')}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};
