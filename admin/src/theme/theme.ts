import { createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

// Premium Horizon UI Inspired Palette
const tokens = (mode: PaletteMode) => ({
    ...(mode === 'light'
        ? {
            primary: '#4318FF',
            secondary: '#6AD2FF',
            success: '#05CD99',
            info: '#3366FF',
            warning: '#FFB547',
            error: '#EE5D50',
            dark: '#1B2559',
            light: '#F4F7FE',
            text: {
                primary: '#1B2559',
                secondary: '#5F6C7B', // Darker for better contrast
            },
            background: {
                default: '#F4F7FE',
                paper: '#FFFFFF',
            },
        }
        : {
            // Dark Mode Colors
            primary: '#7551FF', // Slightly lighter for dark mode
            secondary: '#339AF0',
            success: '#05CD99',
            info: '#3366FF',
            warning: '#FFB547',
            error: '#EE5D50',
            dark: '#FFFFFF',
            light: '#0B1437', // Deep Dark Navy
            text: {
                primary: '#FFFFFF',
                secondary: '#8A99AF', // Cleaner, more distinct grey for unselected
            },
            background: {
                default: '#0B1437', // Main background
                paper: '#111C44',   // Card background
            },
        }),
});

export const getTheme = (mode: PaletteMode) => {
    const colors = tokens(mode);

    return createTheme({
        palette: {
            mode,
            primary: {
                main: colors.primary,
                light: mode === 'light' ? '#6F4FFF' : '#8F75FF',
                dark: mode === 'light' ? '#260B95' : '#5737D6',
                contrastText: '#ffffff',
            },
            secondary: {
                main: colors.secondary,
                light: mode === 'light' ? '#9BE0FF' : '#5CAFF5',
                dark: mode === 'light' ? '#00A3E0' : '#1C7ED6',
                contrastText: '#ffffff',
            },
            background: {
                default: colors.background.default,
                paper: colors.background.paper,
            },
            text: {
                primary: colors.text.primary,
                secondary: colors.text.secondary,
            },
            success: { main: colors.success },
            warning: { main: colors.warning },
            error: { main: colors.error },
            divider: mode === 'light' ? '#E9EDF7' : 'rgba(255, 255, 255, 0.1)',
        },
        typography: {
            fontFamily: "'Poppins', sans-serif",
            h1: { fontWeight: 700, fontSize: '2.25rem', color: colors.text.primary },
            h2: { fontWeight: 700, fontSize: '1.875rem', color: colors.text.primary },
            h3: { fontWeight: 700, fontSize: '1.5rem', color: colors.text.primary },
            h4: { fontWeight: 700, fontSize: '1.25rem', color: colors.text.primary },
            h5: { fontWeight: 600, fontSize: '1.125rem', color: colors.text.primary },
            h6: { fontWeight: 600, fontSize: '1rem', color: colors.text.primary },
            body1: { fontSize: '0.875rem', fontWeight: 400, color: colors.text.primary },
            body2: { fontSize: '0.875rem', fontWeight: 400, color: colors.text.secondary },
            button: { fontWeight: 500, textTransform: 'none' },
        },
        shape: {
            borderRadius: 16,
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: colors.background.default,
                        color: colors.text.primary,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: mode === 'light'
                            ? '0px 18px 40px rgba(112, 144, 176, 0.12)'
                            : 'none',
                        borderRadius: '20px',
                        border: 'none',
                        backgroundColor: colors.background.paper,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '50px',
                        boxShadow: 'none',
                        padding: '10px 24px',
                        '&:hover': {
                            boxShadow: mode === 'light'
                                ? '0px 10px 20px rgba(67, 24, 255, 0.2)'
                                : '0px 10px 20px rgba(117, 81, 255, 0.2)',
                        },
                    },
                    containedPrimary: {
                        background: mode === 'light'
                            ? `linear-gradient(135deg, ${colors.primary} 0%, #6F4FFF 100%)`
                            : `linear-gradient(135deg, ${colors.primary} 0%, #8F75FF 100%)`,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        backgroundColor: colors.background.paper,
                        boxShadow: mode === 'light'
                            ? '0px 18px 40px rgba(112, 144, 176, 0.12)'
                            : '0px 4px 20px rgba(0, 0, 0, 0.2)', // Subtle shadow for dark mode
                        borderRadius: '20px',
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderBottom: `1px solid ${mode === 'light' ? '#E9EDF7' : 'rgba(255, 255, 255, 0.05)'}`,
                        padding: '16px 24px',
                        color: colors.text.primary,
                        fontWeight: 500,
                    },
                    head: {
                        color: colors.text.secondary,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        letterSpacing: '0.5px',
                        backgroundColor: mode === 'light' ? colors.light : colors.background.default,
                        borderBottom: 'none',
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: '16px',
                        backgroundColor: mode === 'light' ? '#FFFFFF' : '#0B1437',
                        '& fieldset': {
                            borderColor: mode === 'light' ? '#E0E5F2' : 'rgba(255, 255, 255, 0.1)',
                        },
                        '&:hover fieldset': {
                            borderColor: colors.primary,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: colors.primary,
                        },
                        '& input': {
                            color: colors.text.primary,
                        },
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        borderRight: 'none',
                        backgroundColor: colors.background.paper,
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '10px',
                        marginBottom: '4px',
                        '&.Mui-selected': {
                            backgroundColor: colors.primary,
                            color: '#FFFFFF',
                            '&:hover': {
                                backgroundColor: mode === 'light' ? '#330BF0' : '#5737D6',
                            },
                        },
                        '&:hover': {
                            backgroundColor: mode === 'light' ? '#F4F7FE' : 'rgba(255, 255, 255, 0.05)',
                        },
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        color: colors.text.secondary,
                        minWidth: '40px',
                    },
                },
            },
        },
    });
};

