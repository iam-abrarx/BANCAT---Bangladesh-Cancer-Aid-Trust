import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';


import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

const stats = [
    { label: 'Lives Impacted', value: '5,000+', icon: <FavoriteIcon fontSize="large" />, color: '#e91e63' },
    { label: 'Funds Raised', value: '৳2.5Cr+', icon: <MonetizationOnIcon fontSize="large" />, color: '#4caf50' },
    { label: 'Active Donors', value: '12,000+', icon: <VolunteerActivismIcon fontSize="large" />, color: '#2196f3' },
    { label: 'Volunteers', value: '850+', icon: <GroupIcon fontSize="large" />, color: '#ff9800' },
];

const ImpactPage = () => {
    return (
        <>
            <Helmet>
                <title>Our Impact | BANcat - Making a Difference</title>
                <meta name="description" content="See the tangible impact of your donations. Real numbers, real lives saved, and the community growth of BANcat." />
            </Helmet>

            {/* Header */}
            <Box
                sx={{
                    bgcolor: '#fafafa',
                    py: 8,
                    textAlign: 'center',
                    borderBottom: '1px solid #eee'
                }}
            >
                <Container maxWidth="md">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Typography variant="h2" fontWeight="bold" color="primary" gutterBottom>
                            Making a Real Difference
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            Transparency and results are at the core of everything we do.
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 10 }}>
                {/* Stats Grid */}
                <Grid container spacing={4} sx={{ mb: 12 }}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        textAlign: 'center',
                                        borderRadius: 4,
                                        bgcolor: 'white',
                                        border: '1px solid #f0f0f0',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                        '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', transition: 'all 0.3s' }
                                    }}
                                >
                                    <Box sx={{ color: stat.color, mb: 2 }}>
                                        {stat.icon}
                                    </Box>
                                    <Typography variant="h3" fontWeight="900" sx={{ mb: 1, color: '#333' }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" fontWeight="medium">
                                        {stat.label}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Story Highlight */}
                <Grid container spacing={8} alignItems="center" sx={{ mb: 10 }}>
                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2800"
                                alt="Impact Story"
                                sx={{ width: '100%', borderRadius: 4, boxShadow: 3 }}
                            />
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <Typography variant="overline" color="primary" fontWeight="bold" fontSize="1rem">
                                Success Story
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" gutterBottom>
                                A Second Chance for Rahim
                            </Typography>
                            <Typography variant="body1" paragraph fontSize="1.1rem" color="text.secondary">
                                "I thought my diagnosis was the end. But the BANcat community stepped in when I had lost all hope. Today, I am cancer-free and back to supporting my family."
                            </Typography>
                            <Button component={Link} to="/stories" variant="outlined" size="large" sx={{ borderRadius: 20 }}>
                                Read More Stories
                            </Button>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ImpactPage;
