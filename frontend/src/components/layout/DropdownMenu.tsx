import { Box, Paper, Typography, Fade, Popper, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyboardArrowRight } from '@mui/icons-material';
import type { MenuItem } from './menuConfig';

interface DropdownMenuProps {
    items: MenuItem[];
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const containerVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.25,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.03,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25,
        },
    },
};

export const DropdownMenu = ({
    items,
    anchorEl,
    open,
    onClose,
    onMouseEnter,
    onMouseLeave,
}: DropdownMenuProps) => {
    // Group items by policies section
    const regularItems = items.filter(item =>
        !['Privacy Policy', 'Terms of Use', 'Refund Policy'].includes(item.label)
    );
    const policyItems = items.filter(item =>
        ['Privacy Policy', 'Terms of Use', 'Refund Policy'].includes(item.label)
    );

    const renderMenuItem = (item: MenuItem, index: number) => (
        <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
        >
            <Box
                component={RouterLink}
                to={item.path}
                onClick={onClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    py: 1.25,
                    px: 2,
                    borderRadius: 2,
                    textDecoration: 'none',
                    color: 'text.primary',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%) scaleY(0)',
                        width: '3px',
                        height: '60%',
                        background: 'linear-gradient(180deg, #1976D2, #00897B)',
                        borderRadius: '0 4px 4px 0',
                        transition: 'transform 0.2s ease',
                    },
                    '&:hover': {
                        bgcolor: 'rgba(25, 118, 210, 0.08)',
                        '&::before': {
                            transform: 'translateY(-50%) scaleY(1)',
                        },
                        '& .arrow-icon': {
                            opacity: 1,
                            transform: 'translateX(0)',
                        },
                    },
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
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
                            }}
                        >
                            {item.description}
                        </Typography>
                    )}
                </Box>
                <KeyboardArrowRight
                    className="arrow-icon"
                    sx={{
                        fontSize: 16,
                        opacity: 0,
                        transform: 'translateX(-8px)',
                        transition: 'all 0.2s ease',
                        color: 'primary.main',
                    }}
                />
            </Box>
        </motion.div>
    );

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
                        offset: [0, 12],
                    },
                },
            ]}
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={{ enter: 200, exit: 100 }}>
                    <Paper
                        component={motion.div}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        elevation={0}
                        sx={{
                            minWidth: 240,
                            py: 1.5,
                            px: 1,
                            borderRadius: 3,
                            // Glassmorphism
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                            overflow: 'hidden',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '3px',
                                background: 'linear-gradient(90deg, #1976D2 0%, #00897B 50%, #42A5F5 100%)',
                                backgroundSize: '200% 100%',
                                animation: 'gradientShift 3s ease infinite',
                            },
                            '@keyframes gradientShift': {
                                '0%': { backgroundPosition: '0% 50%' },
                                '50%': { backgroundPosition: '100% 50%' },
                                '100%': { backgroundPosition: '0% 50%' },
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                            {regularItems.map((item, index) => renderMenuItem(item, index))}

                            {policyItems.length > 0 && (
                                <>
                                    <Divider sx={{ my: 1.5, mx: 2 }} />
                                    <Typography
                                        variant="overline"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: '0.65rem',
                                            px: 2,
                                            mb: 0.5,
                                            letterSpacing: 1.5,
                                        }}
                                    >
                                        Policies
                                    </Typography>
                                    {policyItems.map((item, index) =>
                                        renderMenuItem(item, regularItems.length + index)
                                    )}
                                </>
                            )}
                        </Box>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
};

export default DropdownMenu;
