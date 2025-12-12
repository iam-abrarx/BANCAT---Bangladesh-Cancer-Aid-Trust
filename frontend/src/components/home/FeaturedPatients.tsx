import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePatients } from '../../hooks/usePatients';
import { LoadingSpinner } from '../common/LoadingSpinner';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
        },
    },
};

export const FeaturedPatients = () => {
    const { t } = useTranslation();
    const { data: response, isLoading, error } = usePatients({ is_featured: true });
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    if (isLoading) return <LoadingSpinner />;
    if (error) return null;

    const patients = response?.data || [];

    if (patients.length === 0) return null;

    const displayPatients = patients.slice(0, 3);

    return (
        <Box ref={ref} sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 8 }, bgcolor: 'white' }}>
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <Typography
                        variant="overline"
                        sx={{
                            display: 'block',
                            textAlign: 'center',
                            color: 'secondary.main',
                            fontWeight: 700,
                            letterSpacing: 3,
                            mb: 1,
                        }}
                    >
                        Support a Patient
                    </Typography>
                    <Typography
                        variant="h3"
                        align="center"
                        gutterBottom
                        fontWeight={700}
                        sx={{
                            background: 'linear-gradient(135deg, #1976D2, #00897B)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {t('section.patients_title', 'Help Them Fight')}
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        color="text.secondary"
                        sx={{ mb: 8, maxWidth: 600, mx: 'auto', fontWeight: 400 }}
                    >
                        Your donation can be the difference between despair and hope. Choose a patient to support today.
                    </Typography>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <Grid container spacing={4}>
                        {displayPatients.map((patient: any, index: number) => (
                            <Grid item xs={12} md={4} key={patient.id}>
                                <motion.div variants={cardVariants}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 4,
                                            overflow: 'hidden',
                                            border: '1px solid',
                                            borderColor: 'grey.100',
                                            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                transform: 'translateY(-12px)',
                                                boxShadow: '0 30px 60px -15px rgba(25, 118, 210, 0.25)',
                                                '& .patient-image': {
                                                    transform: 'scale(1.08)',
                                                },
                                                '& .donate-btn': {
                                                    background: 'linear-gradient(135deg, #00897B 0%, #1976D2 100%)',
                                                },
                                            },
                                        }}
                                    >
                                        <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                                            <CardMedia
                                                component="img"
                                                className="patient-image"
                                                height="240"
                                                image={patient.photo ? (patient.photo.startsWith('http') ? patient.photo : `${import.meta.env.VITE_API_URL?.replace('/api/v1', '')}${patient.photo}`) : 'https://placehold.co/600x400/grey/white?text=No+Image'}
                                                alt={patient.name_en}
                                                sx={{
                                                    transition: 'transform 0.6s ease',
                                                }}
                                                onError={(e: any) => e.target.src = 'https://placehold.co/600x400/grey/white?text=Error'}
                                            />
                                            {/* Gradient overlay */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '50%',
                                                    background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                                                    pointerEvents: 'none',
                                                }}
                                            />
                                        </Box>
                                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                            <Typography gutterBottom variant="h5" component="div" fontWeight={700}>
                                                {patient.name_en}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'inline-flex',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 2,
                                                    bgcolor: 'secondary.main',
                                                    color: 'white',
                                                    mb: 2,
                                                }}
                                            >
                                                <Typography variant="caption" fontWeight={600}>
                                                    {patient.age} years • {patient.cancer_type}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ mt: 2 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                    <Typography variant="body2" fontWeight={700} color="primary.main">
                                                        ৳{(patient.total_raised || 0).toLocaleString()} raised
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        of ৳{(patient.treatment_cost_required || 0).toLocaleString()}
                                                    </Typography>
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={Math.min(((patient.total_raised || 0) / (patient.treatment_cost_required || 1)) * 100, 100)}
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        bgcolor: 'grey.100',
                                                        '& .MuiLinearProgress-bar': {
                                                            borderRadius: 5,
                                                            background: 'linear-gradient(90deg, #1976D2, #00897B)',
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </CardContent>
                                        <CardActions sx={{ p: 3, pt: 0 }}>
                                            <Button
                                                className="donate-btn"
                                                fullWidth
                                                variant="contained"
                                                component={RouterLink}
                                                to={`/patients/${patient.code}`}
                                                sx={{
                                                    py: 1.5,
                                                    borderRadius: 3,
                                                    fontWeight: 600,
                                                    background: 'linear-gradient(135deg, #1976D2 0%, #00897B 100%)',
                                                    transition: 'background 0.4s ease',
                                                }}
                                            >
                                                {t('action.donate_now', 'Donate Now')}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <Box sx={{ textAlign: 'center', mt: 8 }}>
                        <Button
                            variant="outlined"
                            size="large"
                            component={RouterLink}
                            to="/patients"
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                borderWidth: 2,
                                fontWeight: 600,
                                '&:hover': {
                                    borderWidth: 2,
                                },
                            }}
                        >
                            {t('action.view_all', 'View All Patients')}
                        </Button>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};
