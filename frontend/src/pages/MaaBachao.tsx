import { Box, Container, Typography, Grid, Paper, Button, LinearProgress, Stack, Chip } from '@mui/material';
import { Favorite, PlayCircle, MonetizationOn, AccessTime } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDonationDrawer } from '../contexts/DonationDrawerContext';

export const MaaBachao = () => {
    const { openDrawer } = useDonationDrawer();

    const urgentNeeds = [
        { name: "Rafia Begum", need: "Chemotherapy Cycle 2", amount: "15,000", raised: 50 },
        { name: "Salma Akter", need: "Emergency Surgery", amount: "45,000", raised: 75 },
        { name: "Fatema Khatun", need: "Post-Op Medication", amount: "8,000", raised: 20 },
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '400px', md: '600px' },
                    backgroundImage: 'url(https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80)',
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
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))'
                    }
                }}
            >
                <Container sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Chip label="Signature Campaign" color="secondary" sx={{ mb: 2, fontWeight: 'bold' }} />
                        <Typography variant="h2" component="h1" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}>
                            Maa Bachao, Bachao Desh
                        </Typography>
                        <Typography variant="h5" sx={{ maxWidth: '800px', mx: 'auto', mb: 4, fontWeight: 300 }}>
                            Saving Mothers, Saving the Nation. Because when you save a mother, you save an entire family.
                        </Typography>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => openDrawer()}
                                startIcon={<Favorite />}
                                sx={{ borderRadius: 50, px: 4, py: 1.5, fontSize: '1.2rem', fontWeight: 700 }}
                            >
                                Donate for Mothers
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                size="large"
                                startIcon={<PlayCircle />}
                                sx={{ borderRadius: 50, px: 4, py: 1.5, borderColor: 'white', fontWeight: 700 }}
                            >
                                Watch Their Stories
                            </Button>
                        </Stack>
                    </motion.div>
                </Container>
            </Box>

            {/* Impact Statistics */}
            <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
                <Container>
                    <Grid container spacing={4} textAlign="center">
                        {[
                            { value: '500+', label: 'Mothers Saved' },
                            { value: '৳2.5Cr', label: 'Funds Disbursed' },
                            { value: '12', label: 'Districts Covered' },
                            { value: '100%', label: 'Donation Efficiency' },
                        ].map((stat, i) => (
                            <Grid item xs={6} md={3} key={i}>
                                <Typography variant="h3" fontWeight={800}>{stat.value}</Typography>
                                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>{stat.label}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Urgent Needs Ticker */}
            <Container sx={{ py: 8 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <AccessTime color="error" sx={{ mr: 1, fontSize: 30 }} />
                    <Typography variant="h4" fontWeight={700} color="error">
                        Urgent Needs
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {urgentNeeds.map((item, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper elevation={3} sx={{ p: 3, borderTop: '4px solid #d32f2f' }}>
                                <Typography variant="h6" fontWeight={700} gutterBottom>{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Need: <strong>{item.need}</strong>
                                </Typography>
                                <Typography variant="h5" color="primary" fontWeight={700} sx={{ mt: 1 }}>
                                    ৳{item.amount}
                                </Typography>
                                <Box sx={{ mt: 2, mb: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                        <Typography variant="caption">{item.raised}% Raised</Typography>
                                        <Typography variant="caption" color="error">Urgent</Typography>
                                    </Box>
                                    <LinearProgress variant="determinate" value={item.raised} color="warning" sx={{ height: 8, borderRadius: 4 }} />
                                </Box>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => openDrawer()}
                                    sx={{ mt: 2 }}
                                >
                                    Help {item.name.split(' ')[0]}
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Video / Documentary Section */}
            <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 10 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="overline" color="secondary" fontWeight={700}>
                                The Reality
                            </Typography>
                            <Typography variant="h3" fontWeight={700} gutterBottom>
                                A Mother's Fight is a Family's Fight
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.8 }}>
                                In Bangladesh, when a mother falls ill with cancer, the entire household collapses.
                                Children drop out of school, debts pile up, and hope fades.
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.8 }}>
                                "Maa Bachao, Bachao Desh" is not just about medical treatment. It's about keeping families together.
                                It's about ensuring a child doesn't grow up without their mother's love.
                            </Typography>
                            <Button
                                variant="text"
                                color="secondary"
                                size="large"
                                endIcon={<PlayCircle />}
                                sx={{ mt: 2, fontWeight: 700 }}
                            >
                                View Documentary Series
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper
                                elevation={10}
                                sx={{
                                    position: 'relative',
                                    paddingTop: '56.25%', // 16:9 Aspect Ratio
                                    bgcolor: 'black',
                                    borderRadius: 2,
                                    overflow: 'hidden'
                                }}
                            >
                                <Box
                                    component="img"
                                    src="https://images.unsplash.com/photo-1516820208784-270b250306e3?auto=format&fit=crop&q=80"
                                    alt="Video Thumbnail"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: 0.7
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        borderRadius: '50%',
                                        p: 2,
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(4px)',
                                        transition: 'transform 0.3s',
                                        '&:hover': { transform: 'translate(-50%, -50%) scale(1.1)' }
                                    }}
                                >
                                    <PlayCircle sx={{ fontSize: 60, color: 'white' }} />
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Donation CTA */}
            <Container sx={{ py: 10, textAlign: 'center' }}>
                <Paper elevation={0} variant="outlined" sx={{ p: 6, borderRadius: 4, bgcolor: 'primary.50', borderColor: 'primary.100' }}>
                    <MonetizationOn color="primary" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h3" fontWeight={700} gutterBottom color="primary.main">
                        Join the Movement
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                        Your support can save a mother today. 100% of your donation goes directly to patient care.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={() => openDrawer()}
                            sx={{ px: 6, py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
                        >
                            Donate Now
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
