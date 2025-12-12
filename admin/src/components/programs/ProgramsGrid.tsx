import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { usePrograms } from '../../hooks/useProgramsCampaigns';
import { ProgramCard } from './ProgramCard';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowForward } from '@mui/icons-material';

export const ProgramsGrid = () => {
    const { t } = useTranslation();
    const { data: programs } = usePrograms();

    // Show only first 3 active programs
    const displayPrograms = programs?.slice(0, 3) || [];

    if (displayPrograms.length === 0) return null;

    return (
        <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
                    <Box>
                        <Typography variant="overline" color="primary" fontWeight="bold">
                            {t('home.programs_subtitle', 'Our Impact')}
                        </Typography>
                        <Typography variant="h3" component="h2" fontWeight="bold">
                            {t('home.programs_title', 'Programs')}
                        </Typography>
                    </Box>
                    <Button
                        component={RouterLink}
                        to="/programs"
                        endIcon={<ArrowForward />}
                        size="large"
                    >
                        {t('action.view_all', 'View All')}
                    </Button>
                </Box>

                <Grid container spacing={4}>
                    {displayPrograms.map((program) => (
                        <Grid item xs={12} md={4} key={program.id}>
                            <ProgramCard program={program} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};
