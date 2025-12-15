import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

export const DonationSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get('trxId');

    return (
        <Container maxWidth="sm" sx={{ py: 10 }}>
            <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <CheckCircleOutline
                        sx={{
                            fontSize: 80,
                            color: 'success.main',
                            animation: 'pulse 1.5s ease-in-out'
                        }}
                    />
                </Box>

                <Typography variant="h4" fontWeight="bold" gutterBottom color="success.main">
                    Payment Successful!
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'text.primary' }}>
                    Thank you for your kind donation
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph>
                    Your generous contribution will help save lives and bring hope to cancer patients.
                </Typography>

                {transactionId && (
                    <Box sx={{ my: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Transaction ID
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                            {transactionId}
                        </Typography>
                    </Box>
                )}

                <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                    A confirmation email has been sent to your email address.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        size="large"
                    >
                        Back to Home
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/patients')}
                        size="large"
                    >
                        View Patients
                    </Button>
                </Box>
            </Paper>

            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `}</style>
        </Container>
    );
};
