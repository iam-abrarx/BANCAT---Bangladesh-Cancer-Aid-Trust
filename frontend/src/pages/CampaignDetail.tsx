import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Button, LinearProgress, Grid, Paper } from '@mui/material';
import { useCampaign } from '../hooks/useProgramsCampaigns';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { ArrowBack } from '@mui/icons-material';
import { DonationModal } from '../components/donations/DonationModal';
import { useState } from 'react';

export const CampaignDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t, i18n } = useTranslation();
    const isBn = i18n.language === 'bn';
    const [openDonate, setOpenDonate] = useState(false);

    const { data: campaign, isLoading, error } = useCampaign(slug);

    if (isLoading) return <LoadingSpinner fullScreen />;
    if (error || !campaign) return <Container sx={{ py: 10 }}><Typography color="error">Campaign not found</Typography></Container>;

    const percentage = Math.min((campaign.raised_amount / campaign.goal_amount) * 100, 100);

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Button component={RouterLink} to="/campaigns" startIcon={<ArrowBack />} sx={{ mb: 4 }}>
                Back to Campaigns
            </Button>

            <Grid container spacing={6}>
                <Grid item xs={12} md={8}>
                    <Box
                        component="img"
                        src={campaign.banner_image || 'https://placehold.co/800x600?text=Campaign'}
                        alt={campaign.name_en}
                        sx={{ width: '100%', borderRadius: 4, mb: 4 }}
                    />
                    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                        {isBn ? campaign.name_bn : campaign.name_en}
                    </Typography>

                    <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                        {isBn ? campaign.description_bn : campaign.description_en}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, position: 'sticky', top: 100 }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Fundraising Goal
                        </Typography>

                        <Box sx={{ my: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                    ৳{campaign.raised_amount.toLocaleString()}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    of ৳{campaign.goal_amount.toLocaleString()}
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
                        >
                            {t('action.donate_campaign', 'Donate Now')}
                        </Button>
                        <Typography variant="caption" color="text.secondary" align="center" display="block">
                            Campaign ends on {new Date(campaign.end_date).toLocaleDateString()}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {campaign && (
                <DonationModal
                    open={openDonate}
                    onClose={() => setOpenDonate(false)}
                    title={isBn ? campaign.name_bn : campaign.name_en}
                    targetId={campaign.id}
                    targetType="campaign"
                />
            )}
        </Container>
    );
};
