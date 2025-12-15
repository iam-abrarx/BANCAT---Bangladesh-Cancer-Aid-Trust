import { Box, Paper, Typography, Grid, Fade, Popper, useTheme, alpha } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyboardArrowRight } from '@mui/icons-material';
import type { MenuSection } from './menuConfig';

interface MegaMenuProps {
    sections: MenuSection[];
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    featuredImage?: {
        src: string;
        caption?: string;
    };
}

// Enhanced Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for "fluid" feel
            staggerChildren: 0.04,
            delayChildren: 0.05,
        },
    },
    exit: {
        opacity: 0,
        y: 10,
        transition: { duration: 0.05, ease: "easeInOut" }, // Faster exit
    },
};

const sectionVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
};

export const MegaMenu = ({
    sections,
    anchorEl,
    open,
    onClose,
    onMouseEnter,
    onMouseLeave,
    featuredImage,
}: MegaMenuProps) => {
    const theme = useTheme();

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
            transition
            style={{ zIndex: 1300 }}
            modifiers={[
                {
                    name: 'offset',
                    options: {
                        offset: [0, 11], // Offset to align with navbar bottom edge
                    },
                },
                {
                    name: 'eventListeners',
                    options: {
                        scroll: false, // Disable scroll repositioning to prevent lag
                    },
                },
            ]}
            popperOptions={{
                strategy: 'fixed', // Fixed positioning prevents scroll jitter
            }}
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={{ enter: 350, exit: 100 }}>
                    <Paper
                        component={motion.div}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        elevation={0}
                        sx={{
                            minWidth: featuredImage ? 900 : 700,
                            maxWidth: 1100,
                            p: 0, // Remove default padding to control layout better
                            borderRadius: '0 0 24px 24px', // Only bottom corners rounded for attached look
                            // Premium Glassmorphism
                            background: alpha('#ffffff', 0.55),
                            backdropFilter: 'blur(25px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                            border: '1px solid rgba(255, 255, 255, 0.6)',
                            boxShadow: `
                                0 40px 80px -20px rgba(50, 50, 93, 0.25), 
                                0 30px 60px -30px rgba(0, 0, 0, 0.3), 
                                0 -2px 6px 0 rgba(255, 255, 255, 0.5) inset
                            `,
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        {/* Decorative Top Gradient Line */}
                        <Box
                            sx={{
                                height: '4px',
                                width: '100%',
                                background: 'linear-gradient(90deg, #4318FF 0%, #00B2FF 50%, #4318FF 100%)',
                                backgroundSize: '200% auto',
                                animation: 'gradientFlow 3s linear infinite',
                                '@keyframes gradientFlow': {
                                    '0%': { backgroundPosition: '0% 50%' },
                                    '100%': { backgroundPosition: '200% 50%' },
                                }
                            }}
                        />

                        <Grid container>
                            {/* Links Section */}
                            <Grid item xs={12} md={featuredImage ? 8 : 12} sx={{ p: 4.5 }}>
                                <Grid container spacing={5}>
                                    {sections.map((section, sectionIndex) => (
                                        <Grid item xs={12} sm={6} key={sectionIndex}>
                                            <motion.div variants={sectionVariants}>
                                                <Typography
                                                    variant="overline"
                                                    sx={{
                                                        color: 'primary.main',
                                                        fontWeight: 800,
                                                        letterSpacing: '0.15em',
                                                        mb: 2.5,
                                                        display: 'inline-block',
                                                        borderBottom: '2px solid',
                                                        borderColor: alpha(theme.palette.primary.main, 0.1),
                                                        pb: 0.5,
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    {section.title}
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                    {section.items.map((item, itemIndex) => (
                                                        <motion.div
                                                            key={itemIndex}
                                                            variants={itemVariants}
                                                        >
                                                            <Box
                                                                component={RouterLink}
                                                                to={item.path}
                                                                onClick={onClose}
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 2,
                                                                    p: 1.5,
                                                                    mx: -1.5, // Negative margin to align text with cleaner edge
                                                                    borderRadius: '16px',
                                                                    textDecoration: 'none',
                                                                    color: 'text.primary',
                                                                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                                                    position: 'relative',
                                                                    '&:hover': {
                                                                        bgcolor: alpha(theme.palette.primary.main, 0.06),
                                                                        transform: 'translateX(6px)',
                                                                    },
                                                                    '& .icon-arrow': {
                                                                        opacity: 0,
                                                                        transform: 'translateX(-10px)',
                                                                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                                    },
                                                                    '&:hover .icon-arrow': {
                                                                        opacity: 1,
                                                                        transform: 'translateX(0)',
                                                                    }
                                                                }}
                                                            >
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{
                                                                            fontWeight: 600,
                                                                            fontSize: '0.95rem',
                                                                            color: '#1B254B', // Darker navy for better contrast
                                                                        }}
                                                                    >
                                                                        {item.label}
                                                                    </Typography>
                                                                    {item.description && (
                                                                        <Typography
                                                                            variant="caption"
                                                                            sx={{
                                                                                color: 'text.secondary',
                                                                                display: 'block',
                                                                                mt: 0.25,
                                                                                fontSize: '0.8rem',
                                                                                fontWeight: 400,
                                                                                lineHeight: 1.4,
                                                                            }}
                                                                        >
                                                                            {item.description}
                                                                        </Typography>
                                                                    )}
                                                                </Box>
                                                                <KeyboardArrowRight
                                                                    className="icon-arrow"
                                                                    sx={{
                                                                        fontSize: 20,
                                                                        color: 'primary.main',
                                                                    }}
                                                                />
                                                            </Box>
                                                        </motion.div>
                                                    ))}
                                                </Box>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>

                            {/* Featured Image Section */}
                            {featuredImage && (
                                <Grid item xs={12} md={4} sx={{ position: 'relative' }}>
                                    <motion.div
                                        initial={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
                                        animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ height: '100%', width: '100%' }}
                                    >
                                        <Box
                                            sx={{
                                                height: '100%',
                                                minHeight: 320,
                                                position: 'relative',
                                                backgroundImage: `url(${featuredImage.src})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                // Create a soft visual separation
                                                boxShadow: '-1px 0 0 rgba(0,0,0,0.06)',
                                            }}
                                        >
                                            {/* Gradient Overlay */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'linear-gradient(to top, rgba(17, 25, 39, 0.8) 0%, rgba(17, 25, 39, 0) 60%)',
                                                }}
                                            />

                                            {featuredImage.caption && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        left: 0,
                                                        right: 0,
                                                        p: 4,
                                                        zIndex: 2,
                                                    }}
                                                >
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.4 }}
                                                    >
                                                        <Typography
                                                            variant="h5"
                                                            fontWeight={700}
                                                            color="white"
                                                            sx={{
                                                                textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                                                mb: 1
                                                            }}
                                                        >
                                                            {featuredImage.caption}
                                                        </Typography>
                                                        <Typography
                                                            variant="button"
                                                            sx={{
                                                                color: 'white',
                                                                fontWeight: 600,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 1,
                                                                opacity: 0.9,
                                                                fontSize: '0.85rem'
                                                            }}
                                                        >
                                                            Learn More <KeyboardArrowRight fontSize="small" />
                                                        </Typography>
                                                    </motion.div>
                                                </Box>
                                            )}
                                        </Box>
                                    </motion.div>
                                </Grid>
                            )}
                        </Grid>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
};

export default MegaMenu;
