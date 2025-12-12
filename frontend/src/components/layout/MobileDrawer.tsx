import {
    Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon,
    Box, Typography, Divider, IconButton, Collapse, Button
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Close as CloseIcon, Home, Info, Favorite, Article, VolunteerActivism,
    ExpandLess, ExpandMore, Campaign, WorkOutline, KeyboardArrowRight
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageToggle } from '../common/LanguageToggle';
import { useDonationDrawer } from '../../contexts/DonationDrawerContext';
import { menuConfig, type NavItem, type MenuItem as MenuItemType, type MenuSection } from './menuConfig';
import { useState } from 'react';

interface MobileDrawerProps {
    open: boolean;
    onClose: () => void;
}

// Icon mapping for menu items
const getMenuIcon = (id: string) => {
    const iconMap: Record<string, JSX.Element> = {
        'home': <Home />,
        'about': <Info />,
        'our-work': <WorkOutline />,
        'stories': <Article />,
        'campaigns': <Campaign />,
        'get-involved': <VolunteerActivism />,
        'donate': <Favorite />,
    };
    return iconMap[id] || <KeyboardArrowRight />;
};

export const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { openDrawer } = useDonationDrawer();
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

    const handleLogout = () => {
        logout();
        navigate('/login');
        onClose();
    };

    const toggleExpanded = (menuId: string) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    const handleDonateClick = () => {
        openDrawer();
        onClose();
    };

    const renderMenuItem = (item: MenuItemType, indent: boolean = false) => (
        <ListItem key={item.path} disablePadding>
            <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={onClose}
                sx={{ pl: indent ? 4 : 2 }}
            >
                <ListItemText
                    primary={item.label}
                    secondary={item.description}
                    primaryTypographyProps={{
                        fontSize: indent ? '0.875rem' : '1rem',
                        fontWeight: indent ? 400 : 500,
                    }}
                    secondaryTypographyProps={{
                        fontSize: '0.75rem',
                    }}
                />
            </ListItemButton>
        </ListItem>
    );

    const renderSection = (section: MenuSection, menuId: string) => (
        <Box key={section.title} sx={{ mb: 1 }}>
            <Typography
                variant="overline"
                sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    fontSize: '0.65rem',
                    letterSpacing: 1,
                    px: 4,
                    display: 'block',
                    mt: 1,
                }}
            >
                {section.title}
            </Typography>
            {section.items.map(subItem => renderMenuItem(subItem, true))}
        </Box>
    );

    const renderNavItem = (item: NavItem) => {
        const isExpanded = expandedMenus[item.id] || false;
        const hasSubItems = item.type !== 'link';

        if (item.type === 'cta') {
            return null; // Handle donate separately
        }

        if (item.type === 'link') {
            return (
                <ListItem key={item.id} disablePadding>
                    <ListItemButton component={RouterLink} to={item.path!} onClick={onClose}>
                        <ListItemIcon sx={{ minWidth: 40 }}>{getMenuIcon(item.id)}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
            );
        }

        return (
            <Box key={item.id}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => toggleExpanded(item.id)}>
                        <ListItemIcon sx={{ minWidth: 40 }}>{getMenuIcon(item.id)}</ListItemIcon>
                        <ListItemText primary={item.label} />
                        {isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                        {item.type === 'dropdown' && item.items && (
                            item.items.map(subItem => renderMenuItem(subItem, true))
                        )}
                        {item.type === 'mega' && item.sections && (
                            item.sections.map(section => renderSection(section, item.id))
                        )}
                    </Box>
                </Collapse>
            </Box>
        );
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: 320,
                    background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
                }
            }}
        >
            {/* Header */}
            <Box sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
            }}>
                <Typography variant="h6" color="primary.main" fontWeight="bold">
                    BANcat
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Donate CTA */}
            <Box sx={{ p: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleDonateClick}
                    sx={{
                        py: 1.5,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #1976D2 30%, #42A5F5 90%)',
                        boxShadow: '0 3px 15px rgba(25, 118, 210, 0.3)',
                    }}
                >
                    {t('nav.donate', 'Donate Now')}
                </Button>
            </Box>

            <Divider />

            {/* Navigation List */}
            <List sx={{ flex: 1, overflowY: 'auto' }}>
                {menuConfig.map(renderNavItem)}
            </List>

            {/* Donate sub-items */}
            <Divider />
            <Box sx={{ p: 1 }}>
                <Typography
                    variant="overline"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.65rem',
                        px: 2,
                        display: 'block',
                    }}
                >
                    Quick Links
                </Typography>
                <List dense>
                    {menuConfig.find(item => item.id === 'donate')?.items?.map(item => (
                        <ListItem key={item.path} disablePadding>
                            <ListItemButton component={RouterLink} to={item.path} onClick={onClose} sx={{ py: 0.5 }}>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{ fontSize: '0.875rem' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider />

            {/* Language Toggle */}
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <LanguageToggle />
            </Box>
        </Drawer>
    );
};
