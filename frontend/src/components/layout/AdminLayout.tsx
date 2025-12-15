import {
    Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
    ListItemText, AppBar, Toolbar, Typography, Button, Divider
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    VolunteerActivism as VolunteerIcon,
    Article as ArticleIcon,
    Campaign as CampaignIcon,
    Logout as LogoutIcon,
    Campaign as CampaignIcon,
    Logout as LogoutIcon,
    Settings as SettingsIcon,
    Handshake as HandshakeIcon,
    Category as CategoryIcon,
    Groups as GroupsIcon,
    ContactMail as ContactIcon
} from '@mui/icons-material';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

export const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
        { text: 'Patients', icon: <PeopleIcon />, path: '/admin/patients' },
        { text: 'Stories', icon: <ArticleIcon />, path: '/admin/stories' },
        { text: 'Campaigns', icon: <CampaignIcon />, path: '/admin/campaigns' },
        { text: 'Campaigns', icon: <CampaignIcon />, path: '/admin/campaigns' },
        { text: 'Programs', icon: <CategoryIcon />, path: '/admin/programs' },
        { text: 'Donations', icon: <VolunteerIcon />, path: '/admin/donations' },
        { text: 'Team', icon: <GroupsIcon />, path: '/admin/team' },
        { text: 'Volunteers', icon: <HandshakeIcon />, path: '/admin/volunteers' },
        { text: 'Contacts', icon: <ContactIcon />, path: '/admin/contacts' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'grey.900' }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'secondary.main', fontWeight: 'bold' }}>
                        BANcat Admin
                    </Typography>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                        {user?.name}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    selected={location.pathname === item.path}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><SettingsIcon /></ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'grey.100', minHeight: '100vh' }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};
