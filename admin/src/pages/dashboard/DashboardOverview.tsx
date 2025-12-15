import { Container, Typography, Grid, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar, LinearProgress, Stack, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../services/dashboardService';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AttachMoney, VolunteerActivism, Favorite, TrendingUp, ArrowForward } from '@mui/icons-material';

// Styled Stat Card Component
const StatCard = ({ title, value, icon, color, trend }: any) => (
    <Paper
        sx={{
            p: 3,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
        }}
    >
        <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
                {title}
            </Typography>
            <Typography variant="h3" fontWeight={700} sx={{
                background: `linear-gradient(45deg, ${color} 30%, ${color}88 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
            }}>
                {value}
            </Typography>
            {trend && (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="caption" color="success.main" fontWeight={600}>
                        {trend}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        since last month
                    </Typography>
                </Stack>
            )}
        </Box>
        <Box
            sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: `${color}15`, // 15% opacity
                color: color
            }}
        >
            {icon}
        </Box>
    </Paper>
);

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
        <Container maxWidth="xl" sx={{ py: 5 }}>
            {/* Header Section */}
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="caption" color="primary" fontWeight={600} letterSpacing={1.2} textTransform="uppercase">
                        Overview
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                        Hello, {user?.name} 👋
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        Here's what's happening with your platform today.
                    </Typography>
                </Box>
                <Box>
                    <Button variant="contained" endIcon={<ArrowForward />}>
                        View Reports
                    </Button>
                </Box>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 5 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Donations"
                        value={`৳${stats?.total_donated.toLocaleString() ?? 0}`}
                        icon={<AttachMoney fontSize="large" />}
                        color="#4318FF"
                        trend="+12%"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Active Donors"
                        value={stats?.donation_count ?? 0}
                        icon={<VolunteerActivism fontSize="large" />}
                        color="#05CD99"
                        trend="+5%"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Lives Impacted"
                        value={stats?.impact_count ?? 0}
                        icon={<Favorite fontSize="large" />}
                        color="#EE5D50"
                        trend="+18%"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="New Campaigns"
                        value="12"
                        icon={<TrendingUp fontSize="large" />}
                        color="#FFB547"
                        trend="+2"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                {/* Recent Transactions Table */}
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: 0, overflow: 'hidden' }}>
                        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" fontWeight={700}>Recent Donations</Typography>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Donor / Recipient</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {donationsData?.data.slice(0, 5).map((donation) => (
                                        <TableRow key={donation.id} hover>
                                            <TableCell>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
                                                        {donation.transaction_id.charAt(0)}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight={600}>
                                                            {donation.transaction_id}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {donation.patient ? `For: ${donation.patient.name_en}` : donation.campaign ? `For: ${donation.campaign.name_en}` : 'General Fund'}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={donation.status}
                                                    size="small"
                                                    color={donation.status === 'completed' ? 'success' : 'warning'}
                                                    sx={{ borderRadius: '6px', fontWeight: 600, textTransform: 'uppercase', fontSize: '11px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="text.secondary">
                                                    {new Date(donation.created_at).toLocaleDateString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="body2" fontWeight={700} color="primary">
                                                    ৳{Number(donation.amount).toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {(!donationsData?.data || donationsData.data.length === 0) && (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                                <Typography color="text.secondary">No recent transactions</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>

                {/* Side Widgets / Goals */}
                <Grid item xs={12} lg={4}>
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom>Monthly Goal</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Target funds for this month based on active campaigns.
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" fontWeight={600}>Funds Raised</Typography>
                                <Typography variant="body2" fontWeight={600} color="primary">75%</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 4, bgcolor: 'primary.100' }} />
                        </Box>

                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2" fontWeight={600}>Donors Target</Typography>
                                <Typography variant="body2" fontWeight={600} color="warning.main">40%</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={40} color="warning" sx={{ height: 8, borderRadius: 4, bgcolor: 'warning.100' }} />
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom>Pro Tip</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                            Review pending volunteer applications to speed up community engagement.
                        </Typography>
                        <Button variant="contained" color="secondary" size="small" fullWidth sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}>
                            Review Now
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
