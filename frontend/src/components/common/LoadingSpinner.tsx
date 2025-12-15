import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingSpinnerProps {
    message?: string;
    fullScreen?: boolean;
}

export const LoadingSpinner = ({ message, fullScreen = false }: LoadingSpinnerProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: fullScreen ? '100vh' : '200px',
                width: '100%',
                gap: 2,
            }}
        >
            <CircularProgress color="primary" size={48} thickness={4} />
            {message && (
                <Typography variant="body1" color="text.secondary">
                    {message}
                </Typography>
            )}
        </Box>
    );
};
