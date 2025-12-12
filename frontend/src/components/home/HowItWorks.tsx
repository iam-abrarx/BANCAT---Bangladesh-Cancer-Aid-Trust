import { Box, Container, Typography, useTheme, useMediaQuery, Button } from '@mui/material';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { VolunteerActivism, Spa, LightMode, Favorite } from '@mui/icons-material';
import confetti from 'canvas-confetti';
import { Link as RouterLink } from 'react-router-dom';
import { useDonationDrawer } from '../../contexts/DonationDrawerContext';

const steps = [
    {
        icon: VolunteerActivism,
        title: "CARE",
        quote: "Not all healing begins in hospitals.",
        image: "/images/mission-care.jpg",
        description: [
            "BANCAT offers care to those who feel unheard or alone.",
            "Care means guidance, presence, comfort, and standing beside people when their world feels heavy.",
            "It is the first step of support—reminding every patient and family: You are not alone."
        ]
    },
    {
        icon: Spa,
        title: "HEAL",
        quote: "Healing is a shared journey.",
        image: "/images/mission-heal.jpg",
        description: [
            "We may not provide medical treatment, but we help heal the mind and spirit.",
            "Through awareness, safe spaces, and emotional support, we rebuild strength where fear and uncertainty take over.",
            "Healing grows when compassion becomes action."
        ]
    },
    {
        icon: LightMode,
        title: "HOPE",
        quote: "Hope is the fight inside all of us.",
        image: "/images/mission-hope.jpg",
        description: [
            "Cancer affects everyone—patients, families, friends, coworkers, communities. Each becomes a fighter in their own way.",
            "Hope is courage, connection, and refusing to give up.",
            "BANCAT protects that hope so no one walks the battle alone. Where hope survives, possibilities open."
        ]
    }
];

export const HowItWorks = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [showButton, setShowButton] = useState(false);
    const { openDrawer } = useDonationDrawer();

    // Track scroll progress relative to the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Smooth out the scroll progress
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Check if bottom is in view to trigger confetti
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !showButton) {
                    setShowButton(true);
                    triggerFireworks();
                }
            },
            { threshold: 0.5 }
        );

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => observer.disconnect();
    }, [showButton]);

    const triggerFireworks = () => {
        const duration = 2000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 20 * (timeLeft / duration);

            // Subtler Red and Pink Hearts
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#FF0000', '#FF69B4'],
                shapes: ['circle'],
                scalar: 1.5
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#FF0000', '#FF69B4'],
                shapes: ['circle'],
                scalar: 1.5
            });
        }, 250);
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                py: { xs: 6, md: 10 },
                bgcolor: 'white', // Cleaner background
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Typography
                        variant="overline"
                        align="center"
                        display="block"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 700,
                            letterSpacing: 3,
                            mb: 1,
                        }}
                    >
                        Our Mission
                    </Typography>
                    <Typography
                        variant="h3"
                        align="center"
                        gutterBottom
                        fontWeight={700}
                        sx={{ mb: 8 }}
                    >
                        The Journey of Care, Healing & Hope
                    </Typography>
                </motion.div>

                <Box sx={{ position: 'relative', mt: 4 }}>
                    {/* The gray background line - Thinner */}
                    {!isMobile && (
                        <Box
                            sx={{
                                position: 'absolute',
                                left: '50%',
                                top: 0,
                                bottom: 0,
                                width: 2,
                                bgcolor: 'grey.100',
                                transform: 'translateX(-50%)',
                                zIndex: 0
                            }}
                        />
                    )}

                    {/* The animated fill line - Thinner */}
                    {!isMobile && (
                        <motion.div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: 0,
                                bottom: 0,
                                width: 2,
                                background: 'linear-gradient(180deg, #1976D2 0%, #00897B 100%)',
                                transformOrigin: 'top',
                                scaleY,
                                x: '-50%',
                                zIndex: 1
                            }}
                        />
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 8, md: 16 } }}>
                        {steps.map((step, index) => (
                            <StepCard
                                key={index}
                                step={step}
                                index={index}
                                isMobile={isMobile}
                            />
                        ))}
                    </Box>

                    {/* Trigger and Popup Area */}
                    <Box
                        ref={bottomRef}
                        sx={{
                            mt: 6,
                            minHeight: 80,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: 10 // Ensure button is above the line
                        }}
                    >
                        <AnimatePresence>
                            {showButton && (
                                <Box
                                    component={motion.div}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    sx={{
                                        bgcolor: 'white', // Hide the line behind button
                                        p: 2,
                                        borderRadius: '50%', // Circle/Rounded area
                                    }}
                                >
                                    <Button
                                        onClick={() => openDrawer()}
                                        variant="outlined"
                                        size="large"
                                        startIcon={<Favorite />}
                                        sx={{
                                            px: 5,
                                            py: 1.5,
                                            fontSize: '1.2rem',
                                            borderRadius: 50,
                                            borderWidth: 2,
                                            borderColor: 'primary.main',
                                            color: 'primary.main',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            bgcolor: 'white',
                                            '&:hover': {
                                                bgcolor: 'primary.50',
                                                borderWidth: 2,
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        Join the Journey
                                    </Button>
                                </Box>
                            )}
                        </AnimatePresence>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

const StepCard = ({ step, index, isMobile }: { step: any, index: number, isMobile: boolean }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: { xs: 3, md: 0 },
                }}
            >
                {/* Image Side - Always on opposite side of content */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.9, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    sx={{
                        width: { xs: '100%', md: '40%' },
                        order: isMobile ? 0 : (isEven ? 0 : 2),
                        display: 'flex',
                        justifyContent: isEven ? 'flex-start' : 'flex-end',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: { xs: '100%', md: '95%' },
                            borderRadius: 4,
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            '&:hover img': {
                                transform: 'scale(1.05)',
                            }
                        }}
                    >
                        <Box
                            component="img"
                            src={step.image}
                            alt={step.title}
                            sx={{
                                width: '100%',
                                height: { xs: 280, md: 380 },
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease',
                            }}
                        />
                        {/* Gradient overlay */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '40%',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
                            }}
                        />
                    </Box>
                </Box>

                {/* Center Node/Icon (Desktop only) */}
                {!isMobile && (
                    <Box
                        component={motion.div}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        sx={{
                            width: '10%',
                            display: 'flex',
                            justifyContent: 'center',
                            order: 1,
                            zIndex: 3,
                        }}
                    >
                        <Box
                            className="step-icon"
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                bgcolor: 'white',
                                border: '3px solid',
                                borderColor: 'primary.light',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'primary.main',
                                boxShadow: '0 0 0 6px white, 0 4px 20px rgba(0,0,0,0.1)',
                            }}
                        >
                            <step.icon sx={{ fontSize: 28 }} color="inherit" />
                        </Box>
                    </Box>
                )}

                {/* Content Card */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    sx={{
                        p: { xs: 0, md: 3 },
                        width: { xs: '100%', md: '40%' },
                        textAlign: isMobile ? 'center' : (isEven ? 'left' : 'right'),
                        order: isMobile ? 1 : (isEven ? 2 : 0),
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight={800}
                        gutterBottom
                        sx={{
                            color: 'text.primary',
                            mb: 2,
                            letterSpacing: -0.5,
                        }}
                    >
                        {step.title}
                    </Typography>

                    <Box
                        sx={{
                            mb: 3,
                            display: 'flex',
                            justifyContent: isMobile ? 'center' : (isEven ? 'flex-start' : 'flex-end'),
                        }}
                    >
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            color="primary.main"
                            sx={{
                                fontStyle: 'italic',
                                position: 'relative',
                                display: 'inline-block',
                                fontSize: '1.1rem',
                                pl: isEven || isMobile ? 2 : 0,
                                pr: isEven && !isMobile ? 0 : 2,
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: isEven || isMobile ? 0 : 'auto',
                                    right: !isEven && !isMobile ? 0 : 'auto',
                                    top: 0,
                                    width: 4,
                                    height: '100%',
                                    bgcolor: 'secondary.main',
                                    borderRadius: 1,
                                },
                            }}
                        >
                            "{step.quote}"
                        </Typography>
                    </Box>

                    {step.description.map((text: string, i: number) => (
                        <Typography
                            key={i}
                            variant="body1"
                            color="text.secondary"
                            sx={{ lineHeight: 1.9, mb: 1.5, fontSize: '1.05rem' }}
                        >
                            {text}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </motion.div>
    );
};
