import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { useProgram } from '../hooks/useProgramsCampaigns';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { ArrowBack } from '@mui/icons-material';

export const ProgramDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const { i18n } = useTranslation();
    const isBn = i18n.language === 'bn';

    const { data: program, isLoading, error } = useProgram(slug);

    if (isLoading) return <LoadingSpinner fullScreen />;
    if (error || !program) return <Container sx={{ py: 10 }}><Typography color="error">Program not found</Typography></Container>;

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Button component={RouterLink} to="/programs" startIcon={<ArrowBack />} sx={{ mb: 4 }}>
                Back to Programs
            </Button>

            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom color="primary">
                    {isBn ? program.name_bn : program.name_en}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    {isBn ? program.tagline_bn : program.tagline_en}
                </Typography>
            </Box>

            <Box
                component="img"
                src={program.banner_image || 'https://placehold.co/1200x600?text=Program+Banner'}
                alt={program.name_en}
                sx={{ width: '100%', borderRadius: 4, mb: 6 }}
            />

            <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', lineHeight: 1.8, whiteSpace: 'pre-line', mb: 6 }}>
                {isBn ? program.description_bn : program.description_en}
            </Typography>

            {/* Impact Metrics Display */}
            {program.impact_metrics && program.impact_metrics.length > 0 && (
                <Box sx={{ bgcolor: 'grey.100', p: 4, borderRadius: 4 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center" mb={4}>
                        Program Impact
                    </Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center">
                        {program.impact_metrics.map((metric, index) => (
                            <Box key={index} textAlign="center">
                                <Typography variant="h3" fontWeight="bold" color="primary">
                                    {metric.value}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {isBn ? metric.label_bn : metric.label_en}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}
        </Container>
    );
};
