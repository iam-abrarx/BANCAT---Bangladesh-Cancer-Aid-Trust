import { Box, Container, Typography, Grid, Paper, Button, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Favorite, Bed, MedicalServices, Psychology, VolunteerActivism, Payment } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDonationDrawer } from '../contexts/DonationDrawerContext';

export const AlokNibash = () => {
    const { t } = useTranslation();
    const { openDrawer } = useDonationDrawer();

    const services = [
        {
            icon: <MedicalServices fontSize="large" color="primary" />,
            title: "Palliative Care",
            description: "Specialized medical care focused on providing relief from the symptoms and stress of a serious illness."
        },
        {
            icon: <Bed fontSize="large" color="primary" />,
            title: "Comfortable Accommodation",
            description: "A serene, home-like environment where patients can live with dignity and peace."
        },
        {
            icon: <Psychology fontSize="large" color="primary" />,
            title: "Psychological Support",
            description: "Counseling and emotional support for both patients and their families to navigate difficult times."
        },
        {
            icon: <VolunteerActivism fontSize="large" color="primary" />,
            title: "24/7 Caregiving",
            description: "Dedicated nursing staff and volunteers ensuring patients are never alone."
        }
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '300px', md: '500px' },
                    backgroundImage: 'url(https://images.unsplash.com/photo-1519494474186-f533d2b2679d?auto=format&fit=crop&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }
                }}
            >
                <Container sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
                            Alok Nibash
                        </Typography>
                        <Typography variant="h5" sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
                            A Heaven for the Terminally Ill — adding life to days when days can't be added to life.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => openDrawer()}
                            startIcon={<Favorite />}
                            sx={{ borderRadius: 50, px: 4, py: 1.5, fontSize: '1.1rem' }}
                        >
                            Support This Home
                        </Button>
                    </motion.div>
                </Container>
            </Box>

            {/* About Section */}
            <Container sx={{ py: 8 }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="overline" color="primary" fontWeight={700}>
                            Signature Project
                        </Typography>
                        <Typography variant="h3" fontWeight={700} gutterBottom sx={{ mt: 1 }}>
                            A Home for Dignity and Peace
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                            Alok Nibash is Bangladesh's first dedicated hospice and palliative care center run by BANCAT.
                            We believe that even when a cure is no longer possible, care is never-ending.
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                            Our mission is to provide a sanctuary where terminally ill cancer patients can spend their final days
                            free from pain, surrounded by love, and treated with the utmost dignity.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 1,
                                borderRadius: 4,
                                transform: 'rotate(2deg)',
                                transition: 'transform 0.3s',
                                '&:hover': { transform: 'rotate(0deg)' }
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1516549655169-df83a253831f?auto=format&fit=crop&q=80"
                                alt="Patient Care"
                                sx={{ width: '100%', borderRadius: 3 }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Services Grid */}
            <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
                <Container>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            Our Services
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Comprehensive care designed for comfort and quality of life.
                        </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        {services.map((service, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        borderRadius: 4,
                                        textAlign: 'center',
                                        transition: 'all 0.3s',
                                        '&:hover': { transform: 'translateY(-8px)', boxShadow: 4 }
                                    }}
                                >
                                    <Box sx={{ mb: 2 }}>{service.icon}</Box>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {service.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Sponsor / CTA Section */}
            <Container sx={{ py: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, md: 8 },
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                        color: 'white',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                        Adopt a Room, Adopt a Life
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '800px', mx: 'auto' }}>
                        You can sponsor a bed or an entire room at Alok Nibash to ensure a patient receives
                        food, medicine, and care for free. Your contribution gives them a peaceful ending.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            startIcon={<Payment />}
                            onClick={() => openDrawer()}
                            sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                fontWeight: 700,
                                '&:hover': { bgcolor: 'grey.100' }
                            }}
                        >
                            Sponsor a Bed now
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            size="large"
                            sx={{ fontWeight: 600, borderColor: 'white' }}
                        >
                            Contact for Admission
                        </Button>
                    </Box>
                </Paper>
            </Container>

            {/* Admission Info */}
            <Box sx={{ py: 6 }}>
                <Container maxWidth="md">
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        Admission Guidelines
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <List>
                        <ListItem>
                            <ListItemIcon><MedicalServices color="success" /></ListItemIcon>
                            <ListItemText
                                primary="Eligibility"
                                secondary="Patients with advanced terminal illness (Stage 4) where curative treatment is no longer effective."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><VolunteerActivism color="success" /></ListItemIcon>
                            <ListItemText
                                primary="Referral"
                                secondary="Must be referred by a registered oncologist with medical history."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><Favorite color="success" /></ListItemIcon>
                            <ListItemText
                                primary="Cost"
                                secondary="Service is completely FREE for financially underprivileged patients."
                            />
                        </ListItem>
                    </List>
                </Container>
            </Box>
        </Box>
    );
};
