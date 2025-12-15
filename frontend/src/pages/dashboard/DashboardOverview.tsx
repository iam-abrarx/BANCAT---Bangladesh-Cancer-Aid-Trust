import { Container, Typography, Grid, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../services/dashboardService';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const DashboardOverview = () => {
    const { user } = useAuth();

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: dashboardService.getStats
    });

    const { data: donationsData, isLoading: donationsLoading } = useQuery({
        queryKey: ['dashboard-donations'],
        queryFn: () => dashboardService.getDonations(1)
    });

    if (statsLoading || donationsLoading) return <LoadingSpinner fullScreen />;

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Welcome back, {user?.name}!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Here is an overview of your impact and donation history.
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.50' }}>
                        <Typography variant="h3" fontWeight="bold" color="primary">
                            ৳{stats?.total_donated.toLocaleString() ?? 0}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">Total Donated</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'secondary.50' }}>
                        <Typography variant="h3" fontWeight="bold" color="secondary">
                            {stats?.donation_count ?? 0}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">Donations Made</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'success.50' }}>
                        <Typography variant="h3" fontWeight="bold" color="success.main">
                            {stats?.impact_count ?? 0}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">Lives Impacted</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Donation History */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Recent Donations
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Recipient</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donationsData?.data.map((donation) => (
                            <TableRow key={donation.id}>
                                <TableCell>{new Date(donation.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>{donation.transaction_id}</TableCell>
                                <TableCell>
                                    {donation.patient ? `Patient: ${donation.patient.name_en}` :
                                        donation.campaign ? `Campaign: ${donation.campaign.name_en}` : 'General'}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>৳{Number(donation.amount).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={donation.status.toUpperCase()}
                                        color={donation.status === 'completed' ? 'success' : 'warning'}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {donationsData?.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                    No donations found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};
