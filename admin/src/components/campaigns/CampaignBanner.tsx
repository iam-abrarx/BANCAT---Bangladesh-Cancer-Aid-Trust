import { Box, Container, Typography, Button, LinearProgress, Paper, Stack } from '@mui/material';
import { useCampaigns } from '../../hooks/useProgramsCampaigns';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VolunteerActivism } from '@mui/icons-material';

export const CampaignBanner = () => {
    const { i18n } = useTranslation();
    const isBn = i18n.language === 'bn';
    const { data: campaigns } = useCampaigns({ featured: true });

    // Show the first featured campaign
    const campaign = campaigns?.[0];

    if (!campaign) return null;

    const percentage = Math.min((campaign.raised_amount / campaign.goal_amount) * 100, 100);

    return (
        <Box sx={{ py: 10 }}>
            <Container maxWidth="lg">
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        borderRadius: 6,
                        overflow: 'hidden',
                        bgcolor: 'primary.main',
                        color: 'white'
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            backgroundImage: `url(${campaign.banner_image || 'https://placehold.co/800x600/1976D2/FFFFFF?text=Campaign'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            minHeight: 300
                        }}
                    />

                    <Box sx={{ flex: 1, p: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="overline" sx={{ opacity: 0.8, mb: 1 }}>
                            Featured Campaign
                        </Typography>
                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                            {isBn ? campaign.name_bn : campaign.name_en}
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9, mb: 4, maxWidth: '90%' }}>
                            {isBn ? campaign.description_bn : campaign.description_en}
                        </Typography>

                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    ৳{campaign.raised_amount.toLocaleString()}
                                </Typography>
                                <Typography variant="h6">
                                    {percentage.toFixed(0)}%
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={percentage}
                                sx={{ height: 10, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.3)', '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main' } }}
                            />
                        </Box>

                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<VolunteerActivism />}
                                component={RouterLink}
                                to={`/campaigns/${campaign.slug}`}
                            >
                                Donate Now
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                size="large"
                                component={RouterLink}
                                to="/campaigns"
                            >
                                View All
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
