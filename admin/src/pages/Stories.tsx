import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { useStories } from '../hooks/useStories';
import { StoryGrid } from '../components/stories/StoryGrid';
import { useTranslation } from 'react-i18next';

export const Stories = () => {
    const { t } = useTranslation();
    const [tabValue, setTabValue] = useState('all');

    const filters = tabValue === 'all' ? {} : { type: tabValue };
    const { data, isLoading, error } = useStories(filters);

    if (error) return <Typography color="error">Error loading stories</Typography>;

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box mb={6} textAlign="center">
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
                    {t('nav.stories', 'Inspiring Stories')}
                </Typography>
                <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
                    Real stories of courage, hope, and resilience from our community.
                </Typography>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4, display: 'flex', justifyContent: 'center' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="story types">
                    <Tab label="All Stories" value="all" />
                    <Tab label="Survivors" value="survivor" />
                    <Tab label="Caregivers" value="caregiver" />
                    <Tab label="Volunteers" value="volunteer" />
                </Tabs>
            </Box>

            <StoryGrid stories={data?.data || []} loading={isLoading} />
        </Container>
    );
};
