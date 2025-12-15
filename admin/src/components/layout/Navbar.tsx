import { AppBar, Toolbar, Button, Container, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { SearchBar } from '../common/SearchBar';
import { LanguageToggle } from '../common/LanguageToggle';
import { MobileDrawer } from './MobileDrawer';
import { useState, useEffect } from 'react';

export const Navbar = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <AppBar
                position="sticky"
                color="default"
                elevation={scrolled ? 4 : 0}
                sx={{
                    bgcolor: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease-in-out',
                    borderBottom: scrolled ? 'none' : '1px solid #eee'
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: scrolled ? 64 : 80, transition: 'min-height 0.3s' }}>
                        {/* Logo */}
                        <Box component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 700, fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
                            BANcat
                        </Box>

                        {/* Desktop Search */}
                        {!isMobile && (
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', maxWidth: 500, mx: 4 }}>
                                <SearchBar fullWidth placeholder={t('common.search', 'Search...')} />
                            </Box>
                        )}

                        {/* Desktop Nav */}
                        {!isMobile && (
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Button component={RouterLink} to="/" color="inherit">{t('nav.home')}</Button>
                                <Button component={RouterLink} to="/about" color="inherit">About</Button>
                                <Button component={RouterLink} to="/impact" color="inherit">Impact</Button>
                                <Button component={RouterLink} to="/programs" color="inherit">{t('nav.programs')}</Button>
                                <Button component={RouterLink} to="/stories" color="inherit">{t('nav.stories')}</Button>
                                <Button component={RouterLink} to="/volunteer" color="inherit">Volunteer</Button>

                                <Box sx={{ mx: 1 }}>
                                    <LanguageToggle />
                                </Box>

                                {/* Auth Buttons */}
                                {user ? (
                                    <>
                                        <Button
                                            variant="outlined"
                                            component={RouterLink}
                                            to="/dashboard"
                                            size="small"
                                            sx={{ ml: 1 }}
                                        >
                                            Dashboard
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        component={RouterLink}
                                        to="/login"
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        sx={{ ml: 1 }}
                                    >
                                        {t('nav.login')}
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    component={RouterLink}
                                    to="/campaigns"
                                    color="primary"
                                    sx={{ ml: 1 }}
                                >
                                    {t('nav.donate')}
                                </Button>
                            </Box>
                        )}

                        {/* Mobile Menu Icon */}
                        {isMobile && (
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setDrawerOpen(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    );
};
