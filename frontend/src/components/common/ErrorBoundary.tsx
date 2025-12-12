import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Container sx={{ mt: 5, textAlign: 'center' }}>
                    <Box sx={{ p: 4, bgcolor: '#f8d7da', borderRadius: 2 }}>
                        <Typography variant="h4" color="error" gutterBottom>
                            Something went wrong
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            We apologize for the inconvenience. Please try refreshing the page.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => window.location.reload()}
                            sx={{ mt: 2 }}
                        >
                            Refresh Page
                        </Button>
                        {process.env.NODE_ENV === 'development' && (
                            <Box sx={{ mt: 2, textAlign: 'left', overflow: 'auto' }}>
                                <pre>{this.state.error?.toString()}</pre>
                            </Box>
                        )}
                    </Box>
                </Container>
            );
        }

        return this.props.children;
    }
}
