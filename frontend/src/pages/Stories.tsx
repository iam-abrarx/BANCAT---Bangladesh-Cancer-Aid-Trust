import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStories } from '../hooks/useStories';
import { StoryGrid } from '../components/stories/StoryGrid';
import { useTranslation } from 'react-i18next';

const CATEGORY_MAP: Record<string, string> = {
    'warriors': 'survivor',
    'testimonials': 'testimonial',
    'caregivers': 'caregiver',
    'volunteers': 'volunteer',
};

const REVERSE_CATEGORY_MAP: Record<string, string> = {
    'survivor': 'warriors',
    'testimonial': 'testimonials',
    'caregiver': 'caregivers',
    'volunteer': 'volunteers',
    'all': 'all'
};

export const Stories = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    // Determine initial tab value based on URL param
    const getInitialTab = () => {
        if (!categoryParam) return 'all';
        return CATEGORY_MAP[categoryParam] || 'all';
    };

    const [tabValue, setTabValue] = useState(getInitialTab());

    // Sync tab with URL if URL changes externally
    useEffect(() => {
        setTabValue(getInitialTab());
    }, [categoryParam]);

    const filters = tabValue === 'all' ? {} : { type: tabValue };
    const { data, isLoading, error } = useStories(filters);

    if (error) return <Typography color="error">Error loading stories</Typography>;

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);

        // Update URL
        if (newValue === 'all') {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            const categorySlug = REVERSE_CATEGORY_MAP[newValue];
            if (categorySlug) {
                setSearchParams({ category: categorySlug });
            }
        }
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
                    <Tab label="Survivors (Warriors)" value="survivor" />
                    <Tab label="Patient Testimonials" value="testimonial" />
                    <Tab label="Caregiver Stories" value="caregiver" />
                    <Tab label="Volunteer Spotlights" value="volunteer" />
                </Tabs>
            </Box>

            <StoryGrid stories={data?.data || []} loading={isLoading} />
        </Container>
    );
};
