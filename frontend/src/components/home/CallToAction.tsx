import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Favorite, ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useDonationDrawer } from '../../contexts/DonationDrawerContext';

export const CallToAction = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { openDrawer } = useDonationDrawer();

    return (
        <Box
            ref={ref}
            sx={{
                pt: { xs: 8, md: 10 },
                pb: { xs: 12, md: 16 },
                position: 'relative',
                overflow: 'hidden',
                // Animated gradient background
                background: 'linear-gradient(135deg, #1976D2 0%, #00897B 50%, #1565C0 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 8s ease infinite',
                '@keyframes gradientShift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            }}
        >
            {/* Floating decorative elements */}
            <motion.div
                style={{
                    position: 'absolute',
                    right: '-5%',
                    top: '10%',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                }}
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                style={{
                    position: 'absolute',
                    left: '-10%',
                    bottom: '-20%',
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                }}
                animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.08, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />

            {/* Pattern overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 0%, transparent 50%)
                    `,
                    pointerEvents: 'none',
                }}
            />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <Box sx={{ textAlign: 'center', color: 'white' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                        >
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                    mb: 4,
                                }}
                            >
                                <Favorite sx={{ fontSize: 40 }} />
                            </Box>
                        </motion.div>

                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                mb: 3,
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                            }}
                        >
                            Be the Reason Someone Survives
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                opacity: 0.9,
                                mb: 5,
                                fontWeight: 400,
                                lineHeight: 1.7,
                                maxWidth: 600,
                                mx: 'auto',
                            }}
                        >
                            Your donation today can provide life-saving treatment, hope, and a chance
                            at life for a cancer patient in Bangladesh.
                        </Typography>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            justifyContent="center"
                        >
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => openDrawer()}
                                    startIcon={<Favorite />}
                                    sx={{
                                        px: 5,
                                        py: 2,
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        borderRadius: 3,
                                        bgcolor: 'white',
                                        color: 'primary.main',
                                        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
                                        '&:hover': {
                                            bgcolor: 'grey.100',
                                            boxShadow: '0 15px 40px -10px rgba(0, 0, 0, 0.4)',
                                        },
                                    }}
                                >
                                    Donate Now
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    component={RouterLink}
                                    to="/volunteer"
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        px: 4,
                                        py: 2,
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        borderRadius: 3,
                                        borderWidth: 2,
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        color: 'white',
                                        '&:hover': {
                                            borderWidth: 2,
                                            borderColor: 'white',
                                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    Become a Volunteer
                                </Button>
                            </motion.div>
                        </Stack>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default CallToAction;
