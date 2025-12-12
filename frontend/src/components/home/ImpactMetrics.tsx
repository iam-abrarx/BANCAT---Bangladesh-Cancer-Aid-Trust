import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { Favorite, Groups, VerifiedUser, LocalHospital } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Animated counter component
const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [displayValue, setDisplayValue] = useState(0);

    const spring = useSpring(0, {
        stiffness: 50,
        damping: 30,
        mass: 1
    });

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, value, spring]);

    useEffect(() => {
        const unsubscribe = spring.on('change', (latest) => {
            setDisplayValue(Math.round(latest));
        });
        return unsubscribe;
    }, [spring]);

    return (
        <span ref={ref}>
            {displayValue.toLocaleString()}{suffix}
        </span>
    );
};

const metrics = [
    {
        icon: <Groups sx={{ fontSize: 40 }} />,
        value: 5000,
        suffix: '+',
        label: 'metrics.lives_touched',
        color: '#1976D2',
        gradient: 'linear-gradient(135deg, #1976D2, #42A5F5)',
    },
    {
        icon: <VerifiedUser sx={{ fontSize: 40 }} />,
        value: 1200000,
        displayValue: '1.2M',
        label: 'metrics.funds_raised',
        color: '#00897B',
        gradient: 'linear-gradient(135deg, #00897B, #4DB6AC)',
    },
    {
        icon: <LocalHospital sx={{ fontSize: 40 }} />,
        value: 50,
        suffix: '+',
        label: 'metrics.partner_hospitals',
        color: '#E91E63',
        gradient: 'linear-gradient(135deg, #E91E63, #F48FB1)',
    },
    {
        icon: <Favorite sx={{ fontSize: 40 }} />,
        value: 200,
        suffix: '+',
        label: 'metrics.volunteers',
        color: '#FF9800',
        gradient: 'linear-gradient(135deg, #FF9800, #FFB74D)',
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
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

export const ImpactMetrics = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <Box
            ref={ref}
            sx={{
                py: { xs: 6, md: 8 },
                bgcolor: 'grey.50',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative background */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '150%',
                    height: '150%',
                    background: 'radial-gradient(circle, rgba(25, 118, 210, 0.03) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            <Container maxWidth="lg">
                {/* Section header */}
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
                            color: 'primary.main',
                            fontWeight: 700,
                            letterSpacing: 3,
                            mb: 1,
                        }}
                    >
                        Our Impact
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            mb: 6,
                            color: 'text.primary',
                        }}
                    >
                        Making a Real Difference
                    </Typography>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <Grid container spacing={4}>
                        {metrics.map((metric, index) => (
                            <Grid item xs={6} md={3} key={index}>
                                <motion.div variants={cardVariants}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 4,
                                            textAlign: 'center',
                                            borderRadius: 4,
                                            background: 'rgba(255, 255, 255, 0.7)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.8)',
                                            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
                                            transition: 'all 0.3s ease',
                                            cursor: 'default',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.12)',
                                                '& .icon-container': {
                                                    transform: 'scale(1.1) rotate(5deg)',
                                                },
                                            },
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                height: '4px',
                                                background: metric.gradient,
                                            },
                                        }}
                                    >
                                        <Box
                                            className="icon-container"
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 80,
                                                height: 80,
                                                borderRadius: 3,
                                                mb: 2,
                                                background: `${metric.color}15`,
                                                color: metric.color,
                                                transition: 'transform 0.3s ease',
                                            }}
                                        >
                                            {metric.icon}
                                        </Box>
                                        <Typography
                                            variant="h3"
                                            fontWeight="bold"
                                            sx={{
                                                background: metric.gradient,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                mb: 1,
                                            }}
                                        >
                                            {metric.displayValue ? (
                                                metric.displayValue
                                            ) : (
                                                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                                            )}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            fontWeight={500}
                                        >
                                            {t(metric.label, metric.label.replace('metrics.', '').replace('_', ' '))}
                                        </Typography>
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};
