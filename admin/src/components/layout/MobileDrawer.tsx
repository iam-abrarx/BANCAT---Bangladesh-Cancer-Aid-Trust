import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Box, Typography, Divider, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Close as CloseIcon, Home, Info, Favorite, Article, VolunteerActivism, Dashboard, Login, Logout } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageToggle } from '../common/LanguageToggle';

interface MobileDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        onClose();
    };

    const menuItems = [
        { label: t('nav.home', 'Home'), path: '/', icon: <Home /> },
        { label: t('nav.about', 'About Us'), path: '/about', icon: <Info /> },
        { label: t('nav.programs', 'Programs'), path: '/programs', icon: <Favorite /> },
        { label: t('nav.stories', 'Stories'), path: '/stories', icon: <Article /> },
        { label: 'Volunteer', path: '/volunteer', icon: <VolunteerActivism /> },
    ];

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { width: 280 } }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" color="primary.main" fontWeight="bold">
                    BANcat
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />

            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton component={RouterLink} to={item.path} onClick={onClose}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider />

            <List>
                {user ? (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton component={RouterLink} to="/dashboard" onClick={onClose}>
                                <ListItemIcon><Dashboard /></ListItemIcon>
                                <ListItemText primary="Dashboard" secondary={`Hello, ${user.name.split(' ')[0]}`} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon><Logout /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    <ListItem disablePadding>
                        <ListItemButton component={RouterLink} to="/login" onClick={onClose}>
                            <ListItemIcon><Login /></ListItemIcon>
                            <ListItemText primary={t('nav.login', 'Login')} />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>

            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <LanguageToggle />
            </Box>
        </Drawer>
    );
};
