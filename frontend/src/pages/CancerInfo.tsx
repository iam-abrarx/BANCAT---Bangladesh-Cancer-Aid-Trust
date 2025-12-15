import { Box, Container, Typography, Grid, Paper, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandMore, HealthAndSafety, Warning, LocalHospital, Biotech } from '@mui/icons-material';
import { motion } from 'framer-motion';

export const CancerInfo = () => {
    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '300px', md: '450px' },
                    backgroundImage: 'url(https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80)',
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
                        backgroundColor: 'rgba(57, 73, 171, 0.7)'
                    }
                }}
            >
                <Container sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HealthAndSafety sx={{ fontSize: 80, mb: 2 }} />
                        <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
                            Cancer in Bangladesh
                        </Typography>
                        <Typography variant="h5" sx={{ maxWidth: '800px', mx: 'auto', opacity: 0.9 }}>
                            Understanding the enemy is the first step to defeating it.
                            Knowledge, awareness, and early detection save lives.
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            {/* Statistics Section */}
            <Container sx={{ py: 8 }}>
                <Grid container spacing={4} justifyContent="center" sx={{ textAlign: 'center', mb: 8 }}>
                    {[
                        { count: '150,000+', label: 'New Cases Annually' },
                        { count: '100,000+', label: 'Deaths Annually' },
                        { count: 'Top 3', label: 'Causes of Death' },
                        { count: '30-50%', label: 'Preventable Cases' }
                    ].map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Typography variant="h3" fontWeight={800} color="primary.main">
                                {stat.count}
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
                                {stat.label}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={6}>
                    {/* Common Types */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ borderLeft: '6px solid #1976d2', pl: 2 }}>
                            Common Cancer Types
                        </Typography>
                        <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
                            In Bangladesh, certain types of cancer are more prevalent due to lifestyle, environmental factors, and lack of awareness.
                        </Typography>

                        <Paper elevation={0} variant="outlined" sx={{ mb: 4, overflow: 'hidden' }}>
                            <Box sx={{ bgcolor: 'primary.light', p: 2, color: 'white' }}>
                                <Typography variant="h6" fontWeight={600}>Top Cancers in Men</Typography>
                            </Box>
                            <List>
                                {[
                                    'Lun Cancer (Smoking/Tobacco)',
                                    'Oral Cancer (Tobacco/Betel Nut)',
                                    'Colorectal Cancer',
                                    'Stomach Cancer',
                                    'Lymphoma'
                                ].map((item, i) => (
                                    <ListItem key={i} divider={i !== 4}>
                                        <ListItemIcon><Warning color="error" /></ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        <Paper elevation={0} variant="outlined" sx={{ overflow: 'hidden' }}>
                            <Box sx={{ bgcolor: 'secondary.light', p: 2, color: 'white' }}>
                                <Typography variant="h6" fontWeight={600}>Top Cancers in Women</Typography>
                            </Box>
                            <List>
                                {[
                                    'Breast Cancer',
                                    'Cervical Cancer',
                                    'Oral Cancer',
                                    'Ovarian Cancer',
                                    'Gallbladder Cancer'
                                ].map((item, i) => (
                                    <ListItem key={i} divider={i !== 4}>
                                        <ListItemIcon><Warning color="error" /></ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Sidebar / Prevention */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 4, bgcolor: 'grey.900', color: 'white', borderRadius: 2 }}>
                            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <Biotech sx={{ mr: 1 }} /> Prevention
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                                More than 30% of cancer cases could be prevented by modifying or avoiding key risk factors.
                            </Typography>

                            <List>
                                <ListItem disableGutters>
                                    <ListItemIcon><HealthAndSafety sx={{ color: 'success.light' }} /></ListItemIcon>
                                    <ListItemText primary="Quit Tobacco" secondary={<span style={{ color: 'grey' }}>Smoking & chewing tobacco is #1 cause</span>} />
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemIcon><HealthAndSafety sx={{ color: 'success.light' }} /></ListItemIcon>
                                    <ListItemText primary="Healthy Diet" secondary={<span style={{ color: 'grey' }}>Eat fruits/veg, avoid processed food</span>} />
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemIcon><HealthAndSafety sx={{ color: 'success.light' }} /></ListItemIcon>
                                    <ListItemText primary="Physical Activity" secondary={<span style={{ color: 'grey' }}>Exercise 30 mins daily</span>} />
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemIcon><HealthAndSafety sx={{ color: 'success.light' }} /></ListItemIcon>
                                    <ListItemText primary="Vaccination" secondary={<span style={{ color: 'grey' }}>Hepatitis B & HPV vaccines</span>} />
                                </ListItem>
                            </List>
                        </Paper>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" fontWeight={700} gutterBottom color="primary">
                                Early Detection
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                Finding cancer early can make a huge difference in survival rates.
                            </Typography>

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography fontWeight={600}>7 Warning Signs</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List dense>
                                        <ListItem><ListItemText primary="1. Change in bowel/bladder habits" /></ListItem>
                                        <ListItem><ListItemText primary="2. A sore that does not heal" /></ListItem>
                                        <ListItem><ListItemText primary="3. Unusual bleeding or discharge" /></ListItem>
                                        <ListItem><ListItemText primary="4. Thickening or lump in breast/elsewhere" /></ListItem>
                                        <ListItem><ListItemText primary="5. Indigestion or swallowing difficulty" /></ListItem>
                                        <ListItem><ListItemText primary="6. Obvious change in wart or mole" /></ListItem>
                                        <ListItem><ListItemText primary="7. Nagging cough or hoarseness" /></ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Typography fontWeight={600}>Screening Tests</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2">
                                        <strong>Women:</strong> Mammography (Breast), Pap Smear (Cervix).<br />
                                        <strong>Men:</strong> PSA (Prostate), Colonoscopy.<br />
                                        <strong>Both:</strong> Low-dose CT (Lung - smokers).
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* CTA */}
            <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 6, textAlign: 'center' }}>
                <Container>
                    <LocalHospital sx={{ fontSize: 50, mb: 1 }} />
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Need Medical Advice?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        If you notice any symptoms or have questions, consult a doctor immediately.
                    </Typography>
                    <Typography variant="h5" fontWeight={800}>
                        Call our Helpline: 01234-567890
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};
