import { Box, Grid, Paper, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export const AdminDashboard = () => {
    return (
        <Box>
            <Helmet>
                <title>Admin Dashboard - BANcat</title>
            </Helmet>

            <Typography variant="h4" gutterBottom fontWeight="bold">
                Dashboard Overview
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140 }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Total Donations
                        </Typography>
                        <Typography component="p" variant="h3">
                            ৳ 250,000
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            This Month
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140 }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Active Patients
                        </Typography>
                        <Typography component="p" variant="h3">
                            12
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            Currently funding
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140 }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Pending Volunteers
                        </Typography>
                        <Typography component="p" variant="h3">
                            5
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            Awaiting review
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
