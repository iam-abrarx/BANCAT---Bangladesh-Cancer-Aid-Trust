import { Card, CardMedia, CardContent, Typography, LinearProgress, Box, Button, Chip, CardActions } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Patient } from '../../types';
import { useDonationDrawer } from '../../contexts/DonationDrawerContext';

interface PatientCardProps {
    patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
    const { t } = useTranslation();
    const { openDrawer } = useDonationDrawer();
    const percentage = Math.min(
        (patient.treatment_cost_raised / patient.treatment_cost_required) * 100,
        100
    );

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                },
            }}
        >
            <CardMedia
                component="img"
                height="240"
                image={patient.photo ? (patient.photo.startsWith('http') ? patient.photo : `${import.meta.env.VITE_API_URL?.replace('/api/v1', '')}${patient.photo}`) : 'https://via.placeholder.com/400x240?text=No+Image'}
                alt={patient.name_en}
                sx={{ objectFit: 'cover' }}
                onError={(e: any) => e.target.src = 'https://via.placeholder.com/400x240?text=No+Image'}
            />
            <CardContent sx={{ flexGrow: 1, pb: 0 }}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {patient.name_en}
                    </Typography>
                    {patient.is_featured && (
                        <Chip
                            label="Featured"
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 600 }}
                        />
                    )}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {patient.cancer_type} • {patient.location}
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight="600" color="primary">
                            ৳{patient.treatment_cost_raised.toLocaleString()} raised
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            of ৳{patient.treatment_cost_required.toLocaleString()}
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{ height: 8, borderRadius: 5, bgcolor: 'grey.100' }}
                    />
                </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => openDrawer()}
                >
                    {t('action.donate_now', 'Donate Now')}
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    component={RouterLink}
                    to={`/patients/${patient.code}`}
                >
                    {t('action.view_details', 'View Details')}
                </Button>
            </CardActions>
        </Card>
    );
};
