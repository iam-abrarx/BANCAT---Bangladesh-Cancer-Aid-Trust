import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import type { Campaign } from '../../services/campaignService';

interface CampaignCardProps {
    campaign: Campaign;
}

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
    const { t, i18n } = useTranslation();
    const isBn = i18n.language === 'bn';

    const percentage = Math.min((campaign.raised_amount / campaign.goal_amount) * 100, 100);

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="200"
                image={campaign.banner_image || 'https://placehold.co/600x400?text=Campaign'}
                alt={isBn ? campaign.name_bn : campaign.name_en}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" fontWeight={600}>
                    {isBn ? campaign.name_bn : campaign.name_en}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden' }}>
                    {isBn ? campaign.description_bn : campaign.description_en}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" fontWeight={600}>
                            ৳{campaign.raised_amount.toLocaleString()} raised
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            of ৳{campaign.goal_amount.toLocaleString()}
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
                    to={`/campaigns/${campaign.slug}`}
                >
                    {t('action.donate_campaign', 'Donate to Campaign')}
                </Button>
            </CardActions>
        </Card>
    );
};
