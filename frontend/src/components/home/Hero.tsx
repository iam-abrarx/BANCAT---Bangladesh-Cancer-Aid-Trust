import { Box, Button, Container, Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useDonationDrawer } from '../../contexts/DonationDrawerContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Favorite, ArrowForward } from '@mui/icons-material';

// Floating shape component
const FloatingShape = ({
    size,
    color,
    left,
    top,
    delay = 0,
    duration = 20
}: {
    size: number;
    color: string;
    left: string;
    top: string;
    delay?: number;
    duration?: number;
}) => (
    <motion.div
        style={{
            position: 'absolute',
            left,
            top,
            width: size,
            height: size,
            borderRadius: '50%',
            background: color,
            filter: 'blur(60px)',
            opacity: 0.6,
        }}
        animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
        }}
    />
);

// Text word animation
const AnimatedWord = ({ children, delay }: { children: string; delay: number }) => (
    <motion.span
        style={{ display: 'inline-block', marginRight: '0.3em' }}
        initial={{ opacity: 0, y: 30, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
            duration: 0.6,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
        }}
    >
        {children}
    </motion.span>
);

export const Hero = () => {
    const { t } = useTranslation();
    const { openDrawer } = useDonationDrawer();
    const { scrollY } = useScroll();

    // Parallax effect
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, -50]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

    const headline = t('hero.headline', 'Together We Can Fight Cancer');
    const words = headline.split(' ');

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                minHeight: { xs: '80vh', md: '85vh' },
                display: 'flex',
                alignItems: 'center',
                // Animated gradient background
                background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 25%, #f0fdf4 50%, #fef3c7 75%, #fdf2f8 100%)',
                backgroundSize: '400% 400%',
                animation: 'gradientBg 15s ease infinite',
                '@keyframes gradientBg': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            }}
        >
            {/* Floating decorative shapes */}
            <FloatingShape size={400} color="rgba(25, 118, 210, 0.15)" left="-10%" top="20%" delay={0} duration={25} />
            <FloatingShape size={300} color="rgba(0, 137, 123, 0.12)" left="70%" top="-10%" delay={2} duration={20} />
            <FloatingShape size={250} color="rgba(233, 30, 99, 0.08)" left="80%" top="60%" delay={4} duration={22} />
            <FloatingShape size={200} color="rgba(255, 152, 0, 0.1)" left="20%" top="70%" delay={1} duration={18} />

            {/* Grid pattern overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    opacity: 0.5,
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div style={{ opacity, y: y2 }}>
                    <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 2.5,
                                    py: 1,
                                    mb: 4,
                                    borderRadius: 50,
                                    bgcolor: 'rgba(25, 118, 210, 0.1)',
                                    border: '1px solid rgba(25, 118, 210, 0.2)',
                                }}
                            >
                                <Favorite sx={{ fontSize: 16, color: 'error.main' }} />
                                <Typography variant="body2" fontWeight={600} color="primary.main">
                                    Bangladesh Cancer Awareness Trust
                                </Typography>
                            </Box>
                        </motion.div>

                        {/* Headline with word animation */}
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                                fontWeight: 800,
                                mb: 3,
                                lineHeight: 1.1,
                                color: 'text.primary',
                                perspective: '1000px',
                            }}
                        >
                            {words.map((word, i) => (
                                <AnimatedWord key={i} delay={0.3 + i * 0.1}>
                                    {word}
                                </AnimatedWord>
                            ))}
                        </Typography>

                        {/* Subtext */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'text.secondary',
                                    mb: 5,
                                    lineHeight: 1.7,
                                    fontWeight: 400,
                                    maxWidth: 700,
                                    mx: 'auto',
                                }}
                            >
                                {t('hero.subtext', 'Providing hope, care, and financial support to cancer patients across Bangladesh. Every donation saves a life.')}
                            </Typography>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                justifyContent="center"
                            >
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => openDrawer()}
                                        startIcon={<Favorite />}
                                        sx={{
                                            px: 5,
                                            py: 2,
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            borderRadius: 3,
                                            background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
                                            boxShadow: '0 10px 30px -10px rgba(25, 118, 210, 0.5)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #1565C0 0%, #0d47a1 100%)',
                                                boxShadow: '0 15px 40px -10px rgba(25, 118, 210, 0.6)',
                                            },
                                        }}
                                    >
                                        {t('nav.donate', 'Donate Now')}
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        component={RouterLink}
                                        to="/programs"
                                        endIcon={<ArrowForward />}
                                        sx={{
                                            px: 4,
                                            py: 2,
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            borderRadius: 3,
                                            borderWidth: 2,
                                            borderColor: 'primary.main',
                                            '&:hover': {
                                                borderWidth: 2,
                                                bgcolor: 'rgba(25, 118, 210, 0.08)',
                                            },
                                        }}
                                    >
                                        {t('nav.programs', 'Our Programs')}
                                    </Button>
                                </motion.div>
                            </Stack>
                        </motion.div>

                        {/* Stats preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.3 }}
                        >
                            <Stack
                                direction="row"
                                spacing={{ xs: 3, md: 6 }}
                                justifyContent="center"
                                sx={{ mt: 8 }}
                                divider={
                                    <Box sx={{ width: 1, bgcolor: 'divider', display: { xs: 'none', sm: 'block' } }} />
                                }
                            >
                                {[
                                    { value: '5000+', label: 'Lives Touched' },
                                    { value: '৳1.2M', label: 'Funds Raised' },
                                    { value: '200+', label: 'Volunteers' },
                                ].map((stat, i) => (
                                    <Box key={i} sx={{ textAlign: 'center' }}>
                                        <Typography
                                            variant="h4"
                                            fontWeight={700}
                                            sx={{
                                                background: 'linear-gradient(135deg, #1976D2, #00897B)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                            }}
                                        >
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </motion.div>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

