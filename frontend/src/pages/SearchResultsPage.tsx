import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Typography, Grid, Tabs, Tab, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '../services/patientService';
import { storyService } from '../services/storyService';
import { PatientCard } from '../components/patients/PatientCard';
import { StoryCard } from '../components/stories/StoryCard';
import { SearchBar } from '../components/common/SearchBar';
import { useTranslation } from 'react-i18next';

export const SearchResultsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [tabValue, setTabValue] = useState(0);
    const { t } = useTranslation();

    // Reset tab when query changes (optional, but good for UX)
    // useEffect(() => { setTabValue(0); }, [query]);

    const handleSearch = (newQuery: string) => {
        setSearchParams({ q: newQuery });
    };

    const { data: patientData, isLoading: loadingPatients } = useQuery({
        queryKey: ['search-patients', query],
        queryFn: () => patientService.getAll({ search: query }),
        enabled: !!query,
    });

    const { data: storyData, isLoading: loadingStories } = useQuery({
        queryKey: ['search-stories', query],
        queryFn: () => storyService.getAll({ search: query }),
        enabled: !!query,
    });

    const patients = patientData?.data || [];
    const stories = storyData?.data || [];

    const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ py: 6, minHeight: '80vh' }}>
            <Container>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {t('search.title', 'Search Results')}
                    </Typography>
                    <SearchBar initialValue={query} onSearch={handleSearch} fullWidth />
                </Box>

                {!query ? (
                    <Typography align="center" color="text.secondary">
                        Please enter a search term.
                    </Typography>
                ) : (
                    <Box>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                            <Tabs value={tabValue} onChange={handleChangeTab} centered>
                                <Tab label={`Patients (${loadingPatients ? '...' : patients.length})`} />
                                <Tab label={`Stories (${loadingStories ? '...' : stories.length})`} />
                            </Tabs>
                        </Box>

                        <Box hidden={tabValue !== 0}>
                            {loadingPatients ? <Box display="flex" justifyContent="center"><CircularProgress /></Box> : (
                                <Grid container spacing={3}>
                                    {patients.length > 0 ? patients.map((patient: any) => (
                                        <Grid item xs={12} sm={6} md={4} key={patient.code}>
                                            <PatientCard patient={patient} />
                                        </Grid>
                                    )) : (
                                        <Grid item xs={12}>
                                            <Typography align="center" color="text.secondary">No patients found matching "{query}"</Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            )}
                        </Box>

                        <Box hidden={tabValue !== 1}>
                            {loadingStories ? <Box display="flex" justifyContent="center"><CircularProgress /></Box> : (
                                <Grid container spacing={3}>
                                    {stories.length > 0 ? stories.map((story: any) => (
                                        <Grid item xs={12} sm={6} md={4} key={story.slug}>
                                            <StoryCard story={story} />
                                        </Grid>
                                    )) : (
                                        <Grid item xs={12}>
                                            <Typography align="center" color="text.secondary">No stories found matching "{query}"</Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            )}
                        </Box>
                    </Box>
                )}
            </Container>
        </Box>
    );
};
