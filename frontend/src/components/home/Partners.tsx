import { Box, Container, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Sample partner logos (using placeholder text for now)
const partners = [
    { name: 'Partner 1', logo: 'https://placehold.co/150x60/e2e8f0/64748b?text=Partner+1' },
    { name: 'Partner 2', logo: 'https://placehold.co/150x60/e2e8f0/64748b?text=Partner+2' },
    { name: 'Partner 3', logo: 'https://placehold.co/150x60/e2e8f0/64748b?text=Partner+3' },
    { name: 'Partner 4', logo: 'https://placehold.co/150x60/e2e8f0/64748b?text=Partner+4' },
    { name: 'Partner 5', logo: 'https://placehold.co/150x60/e2e8f0/64748b?text=Partner+5' },
    { name: 'Partner 6', logo: 'https://placehold.co/150x60/e2e8f0/64748b?text=Partner+6' },
];

export const Partners = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Duplicate partners for seamless infinite scroll
    const duplicatedPartners = [...partners, ...partners];

    return (
        <Box
            ref={ref}
            sx={{
                py: { xs: 6, md: 8 },
                bgcolor: 'white',
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderColor: 'grey.100',
                overflow: 'hidden',
            }}
        >
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
                            color: 'text.secondary',
                            fontWeight: 600,
                            letterSpacing: 3,
                            mb: 4,
                        }}
                    >
                        Trusted By Leading Organizations
                    </Typography>
                </motion.div>
            </Container>

            {/* Infinite scrolling marquee */}
            <Box
                sx={{
                    position: 'relative',
                    '&::before, &::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        width: 100,
                        zIndex: 2,
                        pointerEvents: 'none',
                    },
                    '&::before': {
                        left: 0,
                        background: 'linear-gradient(90deg, white 0%, transparent 100%)',
                    },
                    '&::after': {
                        right: 0,
                        background: 'linear-gradient(270deg, white 0%, transparent 100%)',
                    },
                }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            animation: 'marquee 30s linear infinite',
                            '&:hover': {
                                animationPlayState: 'paused',
                            },
                            '@keyframes marquee': {
                                '0%': { transform: 'translateX(0)' },
                                '100%': { transform: 'translateX(-50%)' },
                            },
                        }}
                    >
                        {duplicatedPartners.map((partner, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flexShrink: 0,
                                    px: 6,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={partner.logo}
                                    alt={partner.name}
                                    sx={{
                                        height: 50,
                                        width: 'auto',
                                        filter: 'grayscale(100%)',
                                        opacity: 0.6,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            filter: 'grayscale(0%)',
                                            opacity: 1,
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
};

export default Partners;
