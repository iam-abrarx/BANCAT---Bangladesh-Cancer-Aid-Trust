import {
    Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
    ListItemText, Typography, Avatar, Divider, IconButton, Tooltip,
    useTheme
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    VolunteerActivism as VolunteerIcon,
    Article as ArticleIcon,
    Campaign as CampaignIcon,
    Logout as LogoutIcon,
    Business as BusinessIcon,
    RateReview as RateReviewIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Settings as SettingsIcon,
    Handshake as HandshakeIcon,
    ContactMail as ContactIcon,
    MenuBook as MenuBookIcon
} from '@mui/icons-material';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DRAWER_WIDTH = 280;
const COLLAPSED_DRAWER_WIDTH = 88;

export const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const { toggleColorMode } = useThemeContext();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { text: 'General', icon: <DashboardIcon />, path: '/admin' },
        { text: 'Patients', icon: <PeopleIcon />, path: '/admin/patients' },
        { text: 'Stories', icon: <ArticleIcon />, path: '/admin/stories' },
        { text: 'Campaigns', icon: <CampaignIcon />, path: '/admin/campaigns' },
        { text: 'Programs', icon: <VolunteerIcon />, path: '/admin/programs' },
        { text: 'Donations', icon: <VolunteerIcon />, path: '/admin/donations' },
        { text: 'Partners', icon: <BusinessIcon />, path: '/admin/partners' },
        { text: 'Pages', icon: <ArticleIcon />, path: '/admin/pages' },
        { text: 'Gallery', icon: <DashboardIcon />, path: '/admin/gallery' },
        { text: 'Testimonials', icon: <RateReviewIcon />, path: '/admin/testimonials' },
        { text: 'Team', icon: <PeopleIcon />, path: '/admin/team' },
        { text: 'Volunteers', icon: <HandshakeIcon />, path: '/admin/volunteers' },
        { text: 'Contacts', icon: <ContactIcon />, path: '/admin/contacts' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
    ];

    const documentationItem = { text: 'Documentation', icon: <MenuBookIcon />, path: 'http://localhost:3000', external: true };

    return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: isCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    [`& .MuiDrawer-paper`]: {
                        width: isCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
                        overflowX: 'hidden',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        bgcolor: 'background.paper',
                        borderRight: `1px solid ${theme.palette.divider}`,
                        boxShadow: 'none',
                    },
                }}
            >
                {/* Company Logo/Name/Toggle */}
                <Box
                    sx={{
                        px: 2,
                        py: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isCollapsed ? 'center' : 'space-between',
                        minHeight: 80,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
                        <Avatar
                            sx={{
                                bgcolor: 'primary.main',
                                width: 40,
                                height: 40,
                                transition: 'all 0.3s ease',
                                transform: isCollapsed ? 'scale(1.1)' : 'scale(1)',
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                color: 'white',
                            }}
                        >
                            {user?.name ? user.name.charAt(0).toUpperCase() : <BusinessIcon sx={{ color: 'white' }} />}
                        </Avatar>

                        <AnimatePresence>
                            {!isCollapsed && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                                            {user?.name || 'Admin'}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'nowrap', display: 'block' }}>
                                            {user?.role || 'Administrator'}
                                        </Typography>
                                    </Box>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Box>

                    {!isCollapsed && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IconButton
                                onClick={toggleColorMode}
                                size="small"
                                sx={{
                                    color: 'text.secondary',
                                    borderRadius: '10px',
                                    '&:hover': { bgcolor: 'action.hover' }
                                }}
                            >
                                {theme.palette.mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                            </IconButton>
                            <IconButton
                                onClick={() => setIsCollapsed(true)}
                                size="small"
                                sx={{
                                    color: 'text.secondary',
                                    borderRadius: '10px',
                                    '&:hover': { bgcolor: 'action.hover' }
                                }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {/* Collapsed Toggle Button (Centered) */}
                {isCollapsed && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <IconButton
                            onClick={() => setIsCollapsed(false)}
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { bgcolor: 'action.hover' }
                            }}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                )}

                {/* Menu Items */}
                <Box sx={{ px: 2, flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                    <List disablePadding>
                        {menuItems.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                                <Tooltip
                                    title={isCollapsed ? item.text : ""}
                                    placement="right"
                                    arrow
                                    disableHoverListener={!isCollapsed}
                                >
                                    <ListItemButton
                                        component={Link}
                                        to={item.path}
                                        selected={location.pathname === item.path}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: isCollapsed ? 'center' : 'initial',
                                            px: isCollapsed ? 1 : 2.5,
                                            borderRadius: '12px',
                                            transition: 'all 0.2s',
                                            mb: 0.5,
                                            bgcolor: location.pathname === item.path ? 'primary.main' : 'transparent',
                                            color: location.pathname === item.path ? 'white' : 'text.secondary',
                                            '&:hover': {
                                                bgcolor: location.pathname === item.path ? 'primary.dark' : 'action.hover',
                                                color: location.pathname === item.path ? 'white' : 'text.primary',
                                                '& .MuiListItemIcon-root': {
                                                    color: location.pathname === item.path ? 'white' : 'primary.main',
                                                }
                                            },
                                            '&.Mui-selected': {
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                '&:hover': {
                                                    bgcolor: 'primary.dark',
                                                    color: 'white',
                                                },
                                                '& .MuiListItemIcon-root': {
                                                    color: 'white',
                                                },
                                                '& .MuiTypography-root': {
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }
                                            },
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: isCollapsed ? 0 : 2,
                                                justifyContent: 'center',
                                                color: 'inherit',
                                                transition: 'margin 0.2s',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>

                                        {!isCollapsed && (
                                            <ListItemText
                                                primary={item.text}
                                                primaryTypographyProps={{
                                                    fontSize: '14px',
                                                    fontWeight: location.pathname === item.path ? 600 : 500,
                                                    noWrap: true, // Prevent text wrapping
                                                }}
                                                sx={{
                                                    opacity: 1,
                                                    display: 'block',
                                                }}
                                            />
                                        )}
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Documentation Link */}
                <Box sx={{ px: 2, pb: 1 }}>
                    <Divider sx={{ mb: 1, opacity: 0.5 }} />
                    <ListItem disablePadding>
                        <Tooltip title={isCollapsed ? documentationItem.text : ""} placement="right" arrow disableHoverListener={!isCollapsed}>
                            <ListItemButton
                                component="a"
                                href={documentationItem.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    borderRadius: '12px',
                                    minHeight: 48,
                                    justifyContent: isCollapsed ? 'center' : 'initial',
                                    px: isCollapsed ? 1 : 2.5,
                                    overflow: 'hidden',
                                    color: 'text.secondary',
                                    '&:hover': { bgcolor: 'action.hover', color: 'primary.main' }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: isCollapsed ? 0 : 2,
                                        justifyContent: 'center',
                                        color: 'inherit',
                                    }}
                                >
                                    {documentationItem.icon}
                                </ListItemIcon>
                                {!isCollapsed && (
                                    <ListItemText
                                        primary={documentationItem.text}
                                        primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }}
                                    />
                                )}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </Box>

                {/* Bottom Section - Sign out */}
                <Box sx={{ px: 2, pb: 3 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Tooltip title={isCollapsed ? "Sign out" : ""} placement="right" disableHoverListener={!isCollapsed}>
                        <ListItemButton
                            onClick={handleLogout}
                            sx={{
                                borderRadius: '12px',
                                minHeight: 48,
                                justifyContent: isCollapsed ? 'center' : 'initial',
                                px: isCollapsed ? 1 : 2.5,
                                overflow: 'hidden',
                                '&:hover': { bgcolor: '#FFF5F5', color: '#E31A1A' }
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isCollapsed ? 0 : 2,
                                    justifyContent: 'center',
                                    color: 'inherit',
                                }}
                            >
                                <LogoutIcon />
                            </ListItemIcon>
                            {!isCollapsed && (
                                <ListItemText
                                    primary="Sign out"
                                    primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }}
                                />
                            )}
                        </ListItemButton>
                    </Tooltip>
                </Box>
            </Drawer>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    bgcolor: 'background.default',
                    minHeight: '100vh',
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

