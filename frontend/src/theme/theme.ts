import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Brand Colors
const colors = {
    primary: {
        main: '#1976D2', // Blue - Trust & Stability
        light: '#42A5F5',
        dark: '#1565C0',
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#00897B', // Teal - Healing & Growth
        light: '#4DB6AC',
        dark: '#00695C',
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#F5F5F5',
        paper: '#FFFFFF',
    },
    text: {
        primary: '#212121',
        secondary: '#757575',
    },
};

// Create base theme
let theme = createTheme({
    palette: {
        primary: colors.primary,
        secondary: colors.secondary,
        background: colors.background,
        text: colors.text,
    },
    typography: {
        fontFamily: [
            'Poppins',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none', // Keep natural casing
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                },
                containedPrimary: {
                    background: `linear-gradient(45deg, ${colors.primary.main} 30%, ${colors.primary.light} 90%)`,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
        },
    },
});

// Add responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
