import { Box, Container, Grid, Typography, Link, Stack, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Facebook, Twitter, Instagram, YouTube, Email, Phone, LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <YouTube />, href: '#', label: 'YouTube' },
];

export const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'grey.900', color: 'white', pt: 10, pb: 4, mt: 'auto', position: 'relative' }}>
            {/* Gradient top border */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(90deg, #1976D2 0%, #00897B 50%, #42A5F5 100%)',
                }}
            />

            <Container maxWidth="lg">
                <Grid container spacing={6}>
                    {/* Brand & Bio */}
                    <Grid item xs={12} md={4}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                                sx={{
                                    background: 'linear-gradient(135deg, #42A5F5, #4DB6AC)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                BANcat
                            </Typography>
                            <Typography variant="body2" color="grey.400" sx={{ maxWidth: 300, mb: 3, lineHeight: 1.8 }}>
                                Supporting cancer patients in Bangladesh with financial aid, care, and hope.
                                Join our mission to fight cancer together.
                            </Typography>

                            {/* Social Links */}
                            <Stack direction="row" spacing={1}>
                                {socialLinks.map((social, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <IconButton
                                            href={social.href}
                                            aria-label={social.label}
                                            sx={{
                                                color: 'grey.400',
                                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    color: 'white',
                                                    bgcolor: 'primary.main',
                                                },
                                            }}
                                        >
                                            {social.icon}
                                        </IconButton>
                                    </motion.div>
                                ))}
                            </Stack>
                        </motion.div>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={6} md={2}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ color: 'grey.200' }}>
                                Quick Links
                            </Typography>
                            <Stack spacing={1.5} sx={{ mt: 2 }}>
                                {[
                                    { label: 'About Us', path: '/about' },
                                    { label: 'Programs', path: '/programs' },
                                    { label: 'Stories', path: '/stories' },
                                    { label: 'Volunteer', path: '/volunteer' },
                                    { label: 'Zakat Calculator', path: '/zakat-calculator' },
                                    { label: 'Contact', path: '/contact' },
                                ].map((link, i) => (
                                    <Link
                                        key={i}
                                        component={RouterLink}
                                        to={link.path}
                                        underline="none"
                                        sx={{
                                            color: 'grey.400',
                                            transition: 'all 0.2s ease',
                                            display: 'inline-block',
                                            '&:hover': {
                                                color: 'primary.light',
                                                transform: 'translateX(4px)',
                                            },
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </Stack>
                        </motion.div>
                    </Grid>

                    {/* Legal */}
                    <Grid item xs={6} md={2}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ color: 'grey.200' }}>
                                Legal
                            </Typography>
                            <Stack spacing={1.5} sx={{ mt: 2 }}>
                                {[
                                    { label: 'Privacy Policy', path: '/privacy-policy' },
                                    { label: 'Terms of Use', path: '/terms-of-use' },
                                    { label: 'Refund Policy', path: '/refund-policy' },
                                    { label: 'FAQ', path: '/faq' },
                                ].map((link, i) => (
                                    <Link
                                        key={i}
                                        component={RouterLink}
                                        to={link.path}
                                        underline="none"
                                        sx={{
                                            color: 'grey.400',
                                            transition: 'all 0.2s ease',
                                            display: 'inline-block',
                                            '&:hover': {
                                                color: 'primary.light',
                                                transform: 'translateX(4px)',
                                            },
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </Stack>
                        </motion.div>
                    </Grid>

                    {/* Contact */}
                    <Grid item xs={12} md={4}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ color: 'grey.200' }}>
                                Contact Us
                            </Typography>
                            <Stack spacing={2} sx={{ mt: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Email sx={{ color: 'primary.light', fontSize: 20 }} />
                                    <Typography variant="body2" color="grey.400">
                                        info@bancat.org
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Phone sx={{ color: 'primary.light', fontSize: 20 }} />
                                    <Typography variant="body2" color="grey.400">
                                        +880 1234 567890
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                    <LocationOn sx={{ color: 'primary.light', fontSize: 20 }} />
                                    <Typography variant="body2" color="grey.400">
                                        House 12, Road 5, Dhanmondi<br />
                                        Dhaka-1205, Bangladesh
                                    </Typography>
                                </Box>
                            </Stack>
                        </motion.div>
                    </Grid>
                </Grid>

                {/* Bottom bar */}
                <Box
                    sx={{
                        mt: 8,
                        pt: 4,
                        borderTop: '1px solid',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography variant="body2" color="grey.500">
                        © {new Date().getFullYear()} BANcat. All rights reserved.
                    </Typography>
                    <Typography variant="body2" color="grey.500">
                        Made with ❤️ for cancer warriors everywhere
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};
