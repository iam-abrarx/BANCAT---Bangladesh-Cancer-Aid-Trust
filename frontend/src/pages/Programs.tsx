import { Container, Typography, Box, Grid } from '@mui/material';
import { usePrograms } from '../hooks/useProgramsCampaigns';
import { ProgramCard } from '../components/programs/ProgramCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useTranslation } from 'react-i18next';

export const Programs = () => {
    const { t } = useTranslation();
    const { data: programs, isLoading, error } = usePrograms();

    if (isLoading) return <LoadingSpinner fullScreen />;
    if (error) return <Typography color="error">Error loading programs</Typography>;

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box mb={6} textAlign="center">
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
                    {t('nav.programs', 'Our Programs')}
                </Typography>
                <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
                    Sustainable initiatives designed to create lasting impact in the fight against cancer.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {programs?.map((program) => (
                    <Grid item xs={12} md={4} key={program.id}>
                        <ProgramCard program={program} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
