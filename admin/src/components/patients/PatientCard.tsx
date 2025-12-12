import { Card, CardMedia, CardContent, CardActions, Typography, Button, LinearProgress, Box, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import type { Patient } from '../../types';

interface PatientCardProps {
    patient: Patient;
}

import { LazyImage } from '../common/LazyImage';

interface PatientCardProps {
    patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
    const { t, i18n } = useTranslation();
    const isBn = i18n.language === 'bn';

    const percentage = Math.min((patient.treatment_cost_raised / patient.treatment_cost_required) * 100, 100);

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {patient.is_featured && (
                <Chip
                    label="Featured"
                    color="primary"
                    size="small"
                    sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
                />
            )}
            <LazyImage
                src={patient.photo || 'https://placehold.co/600x400?text=No+Image'}
                alt={isBn ? patient.name_bn : patient.name_en}
                height={220}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" fontWeight={600}>
                    {isBn ? patient.name_bn : patient.name_en}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {patient.age} {t('years_old', 'years')} • {patient.cancer_type}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    mb: 2,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                }}>
                    {isBn ? patient.medical_summary_bn : patient.medical_summary_en}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" fontWeight={600}>
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
                    component={RouterLink}
                    to={`/patients/${patient.code}`}
                >
                    {t('action.donate_now', 'Donate Now')}
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    component={RouterLink}
                    to={`/patients/${patient.code}`}
                >
                    {t('action.details', 'Details')}
                </Button>
            </CardActions>
        </Card>
    );
};
