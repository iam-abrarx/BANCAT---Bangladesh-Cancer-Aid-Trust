import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Button, Stack, Paper, Grid, useTheme, alpha } from '@mui/material';
import { useProgram } from '../hooks/useProgramsCampaigns';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { ArrowBack, VolunteerActivism, Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';

export const ProgramDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const { i18n } = useTranslation();
    const isBn = i18n.language === 'bn';
    const theme = useTheme();

    const { data: program, isLoading, error } = useProgram(slug);

    if (isLoading) return <LoadingSpinner fullScreen />;
    if (error || !program) return <Container sx={{ py: 10 }}><Typography color="error">Program not found</Typography></Container>;

    const getImageUrl = (path: string | null) => {
        if (!path) return 'https://placehold.co/1200x600?text=Program+Banner';
        if (path.startsWith('http')) return path;
        return `http://127.0.0.1:8000${path}`;
    };

    const heroImage = getImageUrl(program.banner_image);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Hero Section */}
            <Box
                className="hero-section"
                sx={{
                    position: 'relative',
                    height: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${heroImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.5)',
                        zIndex: 1,
                    },
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        fontWeight="800"
                        gutterBottom
                        sx={{
                            textShadow: '0px 4px 20px rgba(0,0,0,0.5)',
                            fontSize: { xs: '2.5rem', md: '4rem' }
                        }}
                    >
                        {isBn ? program.name_bn : program.name_en}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            textShadow: '0px 2px 10px rgba(0,0,0,0.5)',
                            maxWidth: '800px',
                            mx: 'auto',
                            opacity: 0.9
                        }}
                    >
                        {isBn ? program.tagline_bn : program.tagline_en}
                    </Typography>
                </Container>
            </Box>

            {/* Content Section with Glassmorphism overlap */}
            <Container maxWidth="lg" sx={{ mt: -10, position: 'relative', zIndex: 3, pb: 10 }}>
                <Paper
                    elevation={3}
                    component={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    sx={{
                        p: { xs: 3, md: 6 },
                        borderRadius: 4,
                        backdropFilter: 'blur(20px)',
                        bgcolor: alpha(theme.palette.background.paper, 0.95),
                    }}
                >
                    <Button
                        component={RouterLink}
                        to="/programs"
                        startIcon={<ArrowBack />}
                        sx={{ mb: 4, color: 'text.secondary' }}
                    >
                        Back to Programs
                    </Button>

                    <Grid container spacing={6}>
                        {/* Main Content */}
                        <Grid item xs={12} md={8}>
                            <Box sx={{
                                '& p': { fontSize: '1.2rem', lineHeight: 1.8, mb: 3, color: 'text.secondary' },
                                '& strong': { color: 'text.primary', fontWeight: 600 },
                                '& li': { fontSize: '1.1rem', mb: 1.5, color: 'text.secondary', pl: 1 },
                                '& ul': { listStyleType: 'none', pl: 0, '& li::before': { content: '"•"', color: 'primary.main', fontWeight: 'bold', display: 'inline-block', width: '1em', marginLeft: '-1em' } },
                                '& h2': { fontSize: '1.8rem', fontWeight: 700, color: 'primary.main', mt: 4, mb: 2, borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`, pb: 1 },
                                '& h3': { fontSize: '1.4rem', fontWeight: 600, color: 'text.primary', mt: 4, mb: 2 },
                                '& img': { width: '100%', height: 'auto', borderRadius: 3, my: 4, boxShadow: theme.shadows[4] },
                                '& table': { width: '100%', borderCollapse: 'separate', borderSpacing: '0', mb: 4, borderRadius: 2, overflow: 'hidden', border: `1px solid ${theme.palette.divider}` },
                                '& th': { bgcolor: 'primary.main', color: 'white', p: 2, textAlign: 'left', fontWeight: 600 },
                                '& td': { p: 2, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' },
                                '& tr:last-child td': { borderBottom: 'none' }
                            }}>
                                <div dangerouslySetInnerHTML={{ __html: isBn ? program.description_bn : program.description_en }} />
                            </Box>
                        </Grid>

                        {/* Sidebar / Stats */}
                        <Grid item xs={12} md={4}>
                            <Stack spacing={4}>
                                {program.impact_metrics && program.impact_metrics.length > 0 && (
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                                            Impact at a Glance
                                        </Typography>
                                        <Stack spacing={2}>
                                            {program.impact_metrics.map((metric, index) => (
                                                <Paper
                                                    key={index}
                                                    elevation={0}
                                                    component={motion.div}
                                                    whileHover={{ scale: 1.02 }}
                                                    sx={{
                                                        p: 3,
                                                        borderRadius: 3,
                                                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    <Typography variant="h3" fontWeight="800" color="primary.main">
                                                        {metric.value}
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight="500" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                                                        {isBn ? metric.label_bn : metric.label_en}
                                                    </Typography>
                                                </Paper>
                                            ))}
                                        </Stack>
                                    </Box>
                                )}

                                <Paper elevation={4} sx={{ p: 4, borderRadius: 3, background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, color: 'white' }}>
                                    <VolunteerActivism sx={{ fontSize: 40, mb: 2, opacity: 0.9 }} />
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        Make a Difference
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                                        Your support can help us continue this vital work. Before you leave, consider joining our cause.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        component={RouterLink}
                                        to="/volunteer"
                                        sx={{
                                            bgcolor: 'white',
                                            color: 'primary.main',
                                            fontWeight: 'bold',
                                            '&:hover': { bgcolor: alpha('#fff', 0.9) }
                                        }}
                                        fullWidth
                                    >
                                        Get Involved
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        sx={{ mt: 2, borderColor: alpha('#fff', 0.5), '&:hover': { borderColor: 'white', bgcolor: alpha('#fff', 0.1) } }}
                                        fullWidth
                                        startIcon={<Favorite />}
                                    >
                                        Donate Now
                                    </Button>
                                </Paper>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

