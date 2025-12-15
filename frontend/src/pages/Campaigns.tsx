import { Container, Typography, Box, Grid } from '@mui/material';
import { useCampaigns } from '../hooks/useProgramsCampaigns';
import { CampaignCard } from '../components/campaigns/CampaignCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useTranslation } from 'react-i18next';

export const Campaigns = () => {
    const { t } = useTranslation();
    const { data: campaigns, isLoading, error } = useCampaigns();

    if (isLoading) return <LoadingSpinner fullScreen />;
    if (error) return <Typography color="error">Error loading campaigns</Typography>;

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box mb={6} textAlign="center">
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
                    {t('nav.campaigns', 'Active Campaigns')}
                </Typography>
                <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
                    Time-bound fundraising drives for urgent needs and special projects.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {campaigns?.map((campaign) => (
                    <Grid item xs={12} md={4} key={campaign.id}>
                        <CampaignCard campaign={campaign} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
