import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <>
            <Helmet>
                <title>About Us | BANcat - Fighting Cancer Together</title>
                <meta name="description" content="Learn about BANcat's mission to support cancer patients in Bangladesh through crowdfunding, advocacy, and community support." />
            </Helmet>

            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                    color: 'white',
                    py: 10,
                    textAlign: 'center',
                    borderRadius: '0 0 50px 50px',
                    mb: 6
                }}
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                        Who We Are
                    </Typography>
                    <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: '800px', mx: 'auto' }}>
                        We are a community-driven platform dedicated to giving every cancer patient in Bangladesh a fighting chance.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mb: 10 }}>
                {/* Mission & Vision */}
                <Grid container spacing={6} sx={{ mb: 10 }}>
                    <Grid item xs={12} md={6}>
                        <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <Box sx={{ p: 4, bgcolor: '#e3f2fd', borderRadius: 4, height: '100%' }}>
                                <Typography variant="h4" color="primary.main" fontWeight="bold" gutterBottom>
                                    Our Mission
                                </Typography>
                                <Typography variant="body1" fontSize="1.1rem" color="text.secondary">
                                    To bridge the financial gap for underprivileged cancer patients by connecting them with compassionate donors. We aim to ensure that financial constraints never stand in the way of life-saving treatment.
                                </Typography>
                            </Box>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <Box sx={{ p: 4, bgcolor: '#fce4ec', borderRadius: 4, height: '100%' }}>
                                <Typography variant="h4" color="secondary.main" fontWeight="bold" gutterBottom>
                                    Our Vision
                                </Typography>
                                <Typography variant="body1" fontSize="1.1rem" color="text.secondary">
                                    A Bangladesh where quality cancer care is accessible to all, and every patient feels the warmth of community support throughout their journey to recovery.
                                </Typography>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>

                {/* Values Section */}
                <Box sx={{ mb: 10 }}>
                    <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
                        Core Values
                    </Typography>
                    <Grid container spacing={4}>
                        {[
                            { title: 'Transparency', desc: '100% of direct donations go to the patients. We maintain open records.' },
                            { title: 'Empathy', desc: 'We treat every patient story with dignity, respect, and deep care.' },
                            { title: 'Community', desc: 'We believe in the collective power of people to create change.' },
                            { title: 'Integrity', desc: 'We uphold the highest standards of honesty in all our operations.' }
                        ].map((value, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <motion.div
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                                                {value.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {value.desc}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* CTA */}
                <Box
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        p: 6,
                        borderRadius: 4,
                        textAlign: 'center',
                        backgroundSize: 'cover',
                        backgroundImage: 'url(/assets/pattern.png) ' // potential placeholder
                    }}
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Join Our Fight Against Cancer
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                        Whether you donate, volunteer, or advocate, your support matters.
                    </Typography>
                    <Button
                        component={Link}
                        to="/volunteer"
                        variant="contained"
                        color="secondary"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ px: 5, py: 1.5, fontSize: '1.1rem', borderRadius: 50, bgcolor: 'secondary.main', color: 'white' }}
                    >
                        Become a Volunteer
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default AboutPage;
