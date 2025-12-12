import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container, Typography, Box, Button, Chip } from '@mui/material';
import { storyService } from '../services/storyService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { ArrowBack, PlayCircleOutline } from '@mui/icons-material';

export const StoryDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const { i18n } = useTranslation();
    const isBn = i18n.language === 'bn';

    const { data: story, isLoading, error } = useQuery({
        queryKey: ['story', slug],
        queryFn: () => storyService.getBySlug(slug!),
        enabled: !!slug,
    });

    if (isLoading) return <LoadingSpinner fullScreen />;
    if (error || !story) return <Container sx={{ py: 10 }}><Typography color="error">Story not found</Typography></Container>;

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Button component={RouterLink} to="/stories" startIcon={<ArrowBack />} sx={{ mb: 4 }}>
                Back to Stories
            </Button>

            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Chip label={story.type.toUpperCase()} color="secondary" sx={{ mb: 2 }} />
                <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                    {isBn ? story.name_bn : story.name_en}
                </Typography>
            </Box>

            <Box
                component="img"
                src={story.featured_image || 'https://placehold.co/800x400?text=Story+Cover'}
                alt={story.name_en}
                sx={{ width: '100%', borderRadius: 4, mb: 6 }}
            />

            <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {isBn ? story.content_bn : story.content_en}
            </Typography>

            {story.video_url && (
                <Box sx={{ mt: 6, p: 4, bgcolor: 'grey.100', borderRadius: 4, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>Watch Video Story</Typography>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<PlayCircleOutline />}
                        href={story.video_url}
                        target="_blank"
                    >
                        Watch on YouTube
                    </Button>
                </Box>
            )}
        </Container>
    );
};
