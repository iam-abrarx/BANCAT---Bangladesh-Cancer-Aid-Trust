import { Grid, Box, Typography } from '@mui/material';
import { StoryCard } from './StoryCard';
import type { Story } from '../../services/storyService';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface StoryGridProps {
    stories: Story[];
    loading?: boolean;
}

export const StoryGrid = ({ stories, loading }: StoryGridProps) => {
    if (loading) return <LoadingSpinner />;

    if (stories.length === 0) {
        return (
            <Box textAlign="center" py={8}>
                <Typography variant="h6" color="text.secondary">
                    No stories found.
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={4}>
            {stories.map((story) => (
                <Grid item xs={12} sm={6} md={4} key={story.id}>
                    <StoryCard story={story} />
                </Grid>
            ))}
        </Grid>
    );
};
