import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { Favorite, Groups, VerifiedUser, LocalHospital } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const metrics = [
    { icon: <Groups fontSize="large" />, value: '5000+', label: 'metrics.lives_touched', color: '#1976D2' },
    { icon: <VerifiedUser fontSize="large" />, value: '1.2M', label: 'metrics.funds_raised', color: '#00897B' },
    { icon: <LocalHospital fontSize="large" />, value: '50+', label: 'metrics.partner_hospitals', color: '#E91E63' }, // Pink kept for accent
    { icon: <Favorite fontSize="large" />, value: '200+', label: 'metrics.volunteers', color: '#FF9800' },
];

export const ImpactMetrics = () => {
    const { t } = useTranslation();

    return (
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {metrics.map((metric, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    bgcolor: 'transparent',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        color: metric.color,
                                        mb: 1,
                                        transform: 'scale(1.2)',
                                    }}
                                >
                                    {metric.icon}
                                </Box>
                                <Typography variant="h3" fontWeight="bold" color="text.primary">
                                    {metric.value}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" fontWeight="medium">
                                    {t(metric.label, metric.label.replace('metrics.', ''))}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};
