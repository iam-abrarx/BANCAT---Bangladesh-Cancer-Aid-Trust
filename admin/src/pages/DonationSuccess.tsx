import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

export const DonationSuccess = () => {
    const [searchParams] = useSearchParams();
    const trxId = searchParams.get('trxId');

    return (
        <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
            <Box sx={{ color: 'success.main', mb: 3 }}>
                <CheckCircleOutline sx={{ fontSize: 80 }} />
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Thank You for Your Donation!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Your transaction was successful.
            </Typography>
            <Typography variant="body2" sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1, display: 'inline-block', mb: 4 }}>
                Transaction ID: <strong>{trxId}</strong>
            </Typography>

            <Box>
                <Button component={RouterLink} to="/" variant="contained" size="large">
                    Return Home
                </Button>
            </Box>
        </Container>
    );
};
