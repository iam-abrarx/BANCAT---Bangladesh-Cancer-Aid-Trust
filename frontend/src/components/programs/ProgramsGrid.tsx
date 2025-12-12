import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { usePrograms } from '../../hooks/useProgramsCampaigns';
import { ProgramCard } from './ProgramCard';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowForward } from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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

export const ProgramsGrid = () => {
    const { t } = useTranslation();
    const { data: programs } = usePrograms();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const displayPrograms = programs?.slice(0, 3) || [];

    if (displayPrograms.length === 0) return null;

    return (
        <Box
            ref={ref}
            sx={{
                py: { xs: 10, md: 14 },
                bgcolor: 'grey.50',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative background */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '50%',
                    height: '100%',
                    background: 'radial-gradient(circle at 100% 0%, rgba(25, 118, 210, 0.05) 0%, transparent 50%)',
                    pointerEvents: 'none',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={6}>
                        <Box>
                            <Typography
                                variant="overline"
                                sx={{
                                    color: 'primary.main',
                                    fontWeight: 700,
                                    letterSpacing: 3,
                                }}
                            >
                                {t('home.programs_subtitle', 'Our Impact')}
                            </Typography>
                            <Typography
                                variant="h3"
                                component="h2"
                                fontWeight={700}
                                sx={{
                                    background: 'linear-gradient(135deg, #1976D2, #00897B)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {t('home.programs_title', 'Programs')}
                            </Typography>
                        </Box>
                        <motion.div whileHover={{ x: 5 }}>
                            <Button
                                component={RouterLink}
                                to="/programs"
                                endIcon={<ArrowForward />}
                                size="large"
                                sx={{
                                    fontWeight: 600,
                                    '&:hover': {
                                        bgcolor: 'rgba(25, 118, 210, 0.08)',
                                    },
                                }}
                            >
                                {t('action.view_all', 'View All')}
                            </Button>
                        </motion.div>
                    </Box>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <Grid container spacing={4}>
                        {displayPrograms.map((program, index) => (
                            <Grid item xs={12} md={4} key={program.id}>
                                <motion.div variants={cardVariants}>
                                    <Box
                                        sx={{
                                            height: '100%',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                            },
                                        }}
                                    >
                                        <ProgramCard program={program} />
                                    </Box>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};
