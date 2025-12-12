import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import type { Story } from '../../services/storyService';
import { PlayCircleOutline } from '@mui/icons-material';

interface StoryCardProps {
    story: Story;
}

export const StoryCard = ({ story }: StoryCardProps) => {
    const { t, i18n } = useTranslation();
    const isBn = i18n.language === 'bn';

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={story.featured_image || 'https://placehold.co/600x400?text=Story'}
                    alt={isBn ? story.name_bn : story.name_en}
                />
                <Chip
                    label={t(`story.type.${story.type}`, story.type.toUpperCase())}
                    color="secondary"
                    size="small"
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                />
                {story.video_url && (
                    <Box sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        borderRadius: '50%',
                        display: 'flex',
                        p: 0.5
                    }}>
                        <PlayCircleOutline sx={{ color: 'white' }} />
                    </Box>
                )}
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" fontWeight={600}>
                    {isBn ? story.name_bn : story.name_en}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                }}>
                    {isBn ? story.content_bn : story.content_en}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    size="small"
                    component={RouterLink}
                    to={`/stories/${story.slug}`}
                >
                    {t('action.read_more', 'Read Full Story')}
                </Button>
            </CardActions>
        </Card>
    );
};
