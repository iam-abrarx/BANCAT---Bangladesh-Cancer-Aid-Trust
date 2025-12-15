import { AppBar, Toolbar, Button, Container, Box, IconButton, useTheme, useMediaQuery, ClickAwayListener } from '@mui/material';
import { Menu as MenuIcon, KeyboardArrowDown } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { SearchBar } from '../common/SearchBar';
import { LanguageToggle } from '../common/LanguageToggle';
import { MobileDrawer } from './MobileDrawer';
import { MegaMenu } from './MegaMenu';
import { DropdownMenu } from './DropdownMenu';
import { useDonationDrawer } from '../../contexts/DonationDrawerContext';
import { useState, useEffect, useMemo } from 'react';
import { menuConfig as initialMenuConfig, type NavItem } from './menuConfig';
import { usePrograms } from '../../hooks/useProgramsCampaigns';

export const Navbar = () => {
    const { t, i18n } = useTranslation();
    const isBn = i18n.language === 'bn';
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { openDrawer } = useDonationDrawer();
    const [scrolled, setScrolled] = useState(false);

    // Fetch dynamic programs
    const { data: programs } = usePrograms();

    // Dynamically update menu config
    const menuConfig = useMemo(() => {
        if (!programs) return initialMenuConfig;

        const updatedConfig = [...initialMenuConfig];
        const ourWorkIndex = updatedConfig.findIndex(item => item.id === 'our-work');

        if (ourWorkIndex !== -1 && updatedConfig[ourWorkIndex].sections) {
            // Clone the item to avoid mutating original
            const ourWorkItem = { ...updatedConfig[ourWorkIndex] };
            const sections = ourWorkItem.sections ? [...ourWorkItem.sections] : [];

            // Define categories
            const initiativesSlugs = ['awareness', 'holistic-care', 'mental-wellness'];
            const infoSupportSlugs = ['all-about-cancer-in-bangladesh', 'patient-caregiver-support', '24-7-helpline'];

            // Update Initiatives Section
            const initiativesIndex = sections.findIndex(s => s.title === 'Initiatives');
            if (initiativesIndex !== -1) {
                const intiativePrograms = programs.filter(p => initiativesSlugs.includes(p.slug));
                if (intiativePrograms.length > 0) {
                    sections[initiativesIndex] = {
                        ...sections[initiativesIndex],
                        items: intiativePrograms.map(p => ({
                            label: isBn ? (p.name_bn || p.name_en) : p.name_en,
                            path: `/programs/${p.slug}`
                        }))
                    };
                }
            }

            // Update Information & Support Section
            const infoIndex = sections.findIndex(s => s.title === 'Information & Support');
            if (infoIndex !== -1) {
                const infoPrograms = programs.filter(p => infoSupportSlugs.includes(p.slug));
                if (infoPrograms.length > 0) {
                    sections[infoIndex] = {
                        ...sections[infoIndex],
                        items: infoPrograms.map(p => ({
                            label: isBn ? (p.name_bn || p.name_en) : p.name_en,
                            path: `/programs/${p.slug}`
                        }))
                    };
                }
            }

            ourWorkItem.sections = sections;
            updatedConfig[ourWorkIndex] = ourWorkItem;
        }
        return updatedConfig;
    }, [programs, isBn]);

    // Menu state
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [menuAnchors, setMenuAnchors] = useState<Record<string, HTMLElement | null>>({});

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

    const handleMenuOpen = (menuId: string, event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchors(prev => ({ ...prev, [menuId]: event.currentTarget }));
        setActiveMenu(menuId);
    };

    const handleMenuClick = (menuId: string, event: React.MouseEvent<HTMLElement>) => {
        if (activeMenu === menuId) {
            // Close if clicking the currently active menu
            setActiveMenu(null);
        } else {
            // Open new menu
            setMenuAnchors(prev => ({ ...prev, [menuId]: event.currentTarget }));
            setActiveMenu(menuId);
        }
    };

    const handleMenuClose = () => {
        setActiveMenu(null);
    };

    const renderNavItem = (item: NavItem) => {
        const isActive = activeMenu === item.id;

        if (item.type === 'link') {
            return (
                <Button
                    key={item.id}
                    component={RouterLink}
                    to={item.path!}
                    color="inherit"
                    sx={{
                        fontWeight: 500,
                        px: 1.5,
                        '&:hover': {
                            bgcolor: 'rgba(25, 118, 210, 0.08)',
                        },
                    }}
                >
                    {item.label}
                </Button>
            );
        }

        if (item.type === 'cta') {
            return (
                <Box
                    key={item.id}
                    onMouseEnter={(e) => handleMenuOpen(item.id, e)}
                    onMouseLeave={handleMenuClose}
                    sx={{ position: 'relative' }}
                >
                    <Button
                        variant="contained"
                        onClick={() => openDrawer()}
                        color="primary"
                        endIcon={<KeyboardArrowDown sx={{
                            transition: 'transform 0.2s',
                            transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)'
                        }} />}
                        sx={{
                            ml: 1,
                            background: 'linear-gradient(45deg, #1976D2 30%, #42A5F5 90%)',
                            boxShadow: '0 3px 15px rgba(25, 118, 210, 0.3)',
                            fontWeight: 600,
                            px: 2.5,
                            '&:hover': {
                                boxShadow: '0 5px 20px rgba(25, 118, 210, 0.4)',
                                transform: 'translateY(-1px)',
                            },
                        }}
                    >
                        {t('nav.donate')}
                    </Button>
                    {item.items && (
                        <DropdownMenu
                            items={item.items}
                            anchorEl={menuAnchors[item.id] || null}
                            open={isActive}
                            onClose={handleMenuClose}
                            onMouseEnter={() => { }}
                            onMouseLeave={() => { }}
                        />
                    )}
                </Box>
            );
        }

        // Dropdown or Mega menu
        return (
            <ClickAwayListener key={item.id} onClickAway={isActive ? handleMenuClose : () => { }}>
                <Box sx={{ position: 'relative' }}>
                    <Button
                        color="inherit"
                        onClick={(e) => handleMenuClick(item.id, e)}
                        endIcon={<KeyboardArrowDown sx={{
                            fontSize: 18,
                            transition: 'transform 0.2s',
                            transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)'
                        }} />}
                        sx={{
                            fontWeight: 500,
                            px: 1.5,
                            color: isActive ? 'primary.main' : 'inherit',
                            bgcolor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                            '&:hover': {
                                bgcolor: 'rgba(25, 118, 210, 0.08)',
                            },
                        }}
                    >
                        {item.label}
                    </Button>

                    {item.type === 'dropdown' && item.items && (
                        <DropdownMenu
                            items={item.items}
                            anchorEl={menuAnchors[item.id] || null}
                            open={isActive}
                            onClose={handleMenuClose}
                            onMouseEnter={() => { }}
                            onMouseLeave={() => { }}
                        />
                    )}

                    {item.type === 'mega' && item.sections && (
                        <MegaMenu
                            sections={item.sections}
                            anchorEl={menuAnchors[item.id] || null}
                            open={isActive}
                            onClose={handleMenuClose} // Pass handleMenuClose cleanly
                            onMouseEnter={() => { }}
                            onMouseLeave={() => { }}
                            featuredImage={item.featuredImage}
                        />
                    )}
                </Box>
            </ClickAwayListener>
        );
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
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: scrolled ? 64 : 72, transition: 'min-height 0.3s' }}>
                        {/* Logo */}
                        <Box component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 700, fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
                            BANcat
                        </Box>

                        {/* Desktop Nav */}
                        {!isMobile && (
                            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                                {menuConfig.filter(item => item.type !== 'cta').map(renderNavItem)}
                            </Box>
                        )}

                        {/* Right side */}
                        {!isMobile && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <SearchBar placeholder={t('common.search', 'Search...')} />
                                <LanguageToggle />
                                {user ? (
                                    <Button
                                        color="inherit"
                                        onClick={handleLogout}
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {t('nav.logout', 'Logout')}
                                    </Button>
                                ) : (
                                    <Button
                                        color="inherit"
                                        component={RouterLink}
                                        to="/login"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {t('nav.login', 'Login')}
                                    </Button>
                                )}
                                {menuConfig.filter(item => item.type === 'cta').map(renderNavItem)}
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
