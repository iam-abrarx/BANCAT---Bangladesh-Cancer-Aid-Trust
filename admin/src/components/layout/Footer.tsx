import { Box, Container, Grid, Typography, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Footer = () => {

    return (
        <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 8, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Brand & Bio */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary.light">
                            BANcat
                        </Typography>
                        <Typography variant="body2" color="grey.400" sx={{ maxWidth: 300 }}>
                            Supporting cancer patients in Bangladesh with financial aid, care, and hope. Join our mission today.
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Links
                        </Typography>
                        <Stack spacing={1}>
                            <Link component={RouterLink} to="/about" color="grey.400" underline="hover">About Us</Link>
                            <Link component={RouterLink} to="/programs" color="grey.400" underline="hover">Programs</Link>
                            <Link component={RouterLink} to="/stories" color="grey.400" underline="hover">Success Stories</Link>
                            <Link component={RouterLink} to="/contact" color="grey.400" underline="hover">Contact</Link>
                        </Stack>
                    </Grid>

                    {/* Legal */}
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Legal
                        </Typography>
                        <Stack spacing={1}>
                            <Link href="/privacy" color="grey.400" underline="hover">Privacy</Link>
                            <Link href="/terms" color="grey.400" underline="hover">Terms</Link>
                        </Stack>
                    </Grid>

                    {/* Contact */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="grey.400">
                            Email: info@bancat.org<br />
                            Phone: +880 1234 567890<br />
                            Address: Dhaka, Bangladesh
                        </Typography>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 8, pt: 4, borderTop: 1, borderColor: 'grey.800', textAlign: 'center' }}>
                    <Typography variant="body2" color="grey.500">
                        © {new Date().getFullYear()} BANcat. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};
