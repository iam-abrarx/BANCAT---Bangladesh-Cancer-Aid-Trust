import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    MenuItem,
    Alert,
    Snackbar
} from '@mui/material';
import { Handshake, Business, Send } from '@mui/icons-material';
import { motion } from 'framer-motion';

export const Partners = () => {
    const [formData, setFormData] = useState({
        org_name: '',
        contact_person: '',
        email: '',
        phone: '',
        type: 'CSR',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/partnership', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ org_name: '', contact_person: '', email: '', phone: '', type: 'CSR', message: '' });
            } else {
                console.error('Submission failed');
                const data = await response.json();
                console.error(data);
                alert('Submission failed: ' + JSON.stringify(data.errors));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error occurred.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const mockPartners = [
        "https://via.placeholder.com/150x80?text=Bank+Asia",
        "https://via.placeholder.com/150x80?text=Grameenphone",
        "https://via.placeholder.com/150x80?text=BRAC",
        "https://via.placeholder.com/150x80?text=Square+Pharma",
        "https://via.placeholder.com/150x80?text=City+Bank",
        "https://via.placeholder.com/150x80?text=Beximco"
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 10, textAlign: 'center' }}>
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Handshake sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
                        <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
                            Corporate Partnerships
                        </Typography>
                        <Typography variant="h5" sx={{ opacity: 0.9 }}>
                            Join forces with BANCAT to make a lasting impact in the fight against cancer.
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            {/* Partners Grid */}
            <Container sx={{ py: 8 }}>
                <Typography variant="h4" textAlign="center" fontWeight={700} gutterBottom>
                    Our Valued Partners
                </Typography>
                <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
                    We are proud to collaborate with leading organizations who share our vision of a cancer-free Bangladesh.
                </Typography>

                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    {mockPartners.map((logo, index) => (
                        <Grid item xs={6} sm={4} md={2} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    border: '1px solid #eee',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    filter: 'grayscale(100%)',
                                    transition: 'all 0.3s',
                                    '&:hover': { filter: 'grayscale(0%)', boxShadow: 3 }
                                }}
                            >
                                <img src={logo} alt={`Partner ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CSR Information */}
            <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
                <Container>
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                Corporate Social Responsibility (CSR)
                            </Typography>
                            <Typography variant="body1" paragraph color="text.secondary">
                                Partnering with BANCAT aligns your brand with a cause that touches millions of lives.
                                We offer transparent reporting, impact stories, and co-branded campaigns to showcase your
                                commitment to social good.
                            </Typography>
                            <Typography variant="body1" paragraph color="text.secondary">
                                <strong>Ways to Partner:</strong>
                            </Typography>
                            <ul>
                                <li><Typography variant="body2">Sponsor a Patient's Treatment</Typography></li>
                                <li><Typography variant="body2">Fund a Room at Alok Nibash</Typography></li>
                                <li><Typography variant="body2">Organize Employee Giving Campaigns</Typography></li>
                                <li><Typography variant="body2">Cause Marketing Collaborations</Typography></li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* Application Form */}
                            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Business color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="h5" fontWeight={600}>
                                        Become a Partner
                                    </Typography>
                                </Box>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Organization Name"
                                                name="org_name"
                                                value={formData.org_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Contact Person"
                                                name="contact_person"
                                                value={formData.contact_person}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Email Address"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                select
                                                label="Partnership Interest"
                                                name="type"
                                                value={formData.type}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="CSR">General CSR / Donation</MenuItem>
                                                <MenuItem value="Sponsorship">Event Sponsorship</MenuItem>
                                                <MenuItem value="CauseMarketing">Cause Marketing</MenuItem>
                                                <MenuItem value="Volunteering">Employee Volunteering</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={4}
                                                label="Message / Proposal"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                fullWidth
                                                endIcon={<Send />}
                                                sx={{ py: 1.5, fontWeight: 700 }}
                                            >
                                                Submit Application
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Snackbar
                open={submitted}
                autoHideDuration={6000}
                onClose={() => setSubmitted(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSubmitted(false)} severity="success" sx={{ width: '100%' }}>
                    Thank you for your interest! Our partnerships team will contact you soon.
                </Alert>
            </Snackbar>
        </Box>
    );
};
