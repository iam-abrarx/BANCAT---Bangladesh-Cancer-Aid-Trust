import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Chip, Alert, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { donationService } from '../../services/donationService';
import { patientService } from '../../services/patientService';
import { campaignService } from '../../services/campaignService';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const AdminDashboard = () => {

    // 1. Fetch Donations
    const { data: donationsData, isLoading: donationsLoading } = useQuery({
        queryKey: ['admin-donations'],
        queryFn: () => donationService.getAllDonations({ page: 1 })
    });

    // 2. Fetch Patients
    const { data: patientsData, isLoading: patientsLoading } = useQuery({
        queryKey: ['admin-patients'],
        queryFn: () => patientService.getAll({ page: 1 })
    });

    // 3. Fetch Campaigns
    const { data: campaignsData, isLoading: campaignsLoading } = useQuery({
        queryKey: ['admin-campaigns'],
        queryFn: () => campaignService.getAll()
    });

    // Helper: Format Currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 }).format(amount);
    };

    if (donationsLoading || patientsLoading || campaignsLoading) {
        return <LoadingSpinner fullScreen />;
    }

    // Calculations (Client-Side estimation based on fetched page)
    // Note: In production, these should come from a dedicated /admin/stats endpoint

    // Total Donations Count
    const totalDonationCount = donationsData?.meta?.total || donationsData?.data?.length || 0;

    // Total Raised (Summing visible donations - partial accuracy if paginated)
    // Ideally this comes from backend stats
    const totalRaised = donationsData?.data?.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0) || 0;

    // Active Needs Calculation
    const activeNeeds = [
        ...(patientsData?.data || []).map((p: any) => ({
            id: `p-${p.id}`,
            title: p.name_en,
            type: 'Patient',
            goal: Number(p.target_amount),
            raised: Number(p.collected_amount),
            needed: Math.max(0, Number(p.target_amount) - Number(p.collected_amount))
        })),
        ...(Array.isArray(campaignsData) ? campaignsData : []).map((c: any) => ({
            id: `c-${c.id}`,
            title: c.name_en,
            type: 'Campaign',
            goal: Number(c.goal_amount),
            raised: Number(c.raised_amount),
            needed: Math.max(0, Number(c.goal_amount) - Number(c.raised_amount))
        }))
    ].sort((a, b) => b.needed - a.needed).slice(0, 10); // Top 10 needs

    const totalNeeded = activeNeeds.reduce((acc, curr) => acc + curr.needed, 0);

    return (
        <Box maxWidth="xl">
            <Helmet>
                <title>Admin Dashboard - BANcat</title>
            </Helmet>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="800" gutterBottom color="#1a1a1a">
                    Dashboard Overview
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Real-time financial performance and requirement tracking.
                </Typography>
            </Box>

            {/* Top Level Metrics */}
            <Grid container spacing={3} sx={{ mb: 5 }}>
                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            bgcolor: '#E3F2FD',
                            border: '1px solid',
                            borderColor: '#90CAF9',
                            borderRadius: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="overline" color="primary.main" fontWeight={700}>Total Funds Raised</Typography>
                        <Typography variant="h3" fontWeight={800} color="primary.dark" sx={{ my: 1 }}>
                            {formatCurrency(totalRaised)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            (Visible page only)
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            bgcolor: '#F3E5F5',
                            border: '1px solid',
                            borderColor: '#CE93D8',
                            borderRadius: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="overline" color="secondary.main" fontWeight={700}>Total Donations</Typography>
                        <Typography variant="h3" fontWeight={800} color="secondary.dark" sx={{ my: 1 }}>
                            {totalDonationCount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Successful transactions
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            bgcolor: '#FFF3E0',
                            border: '1px solid',
                            borderColor: '#FFCC80',
                            borderRadius: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="overline" color="warning.dark" fontWeight={700}>Pending Requirements</Typography>
                        <Typography variant="h3" fontWeight={800} color="warning.dark" sx={{ my: 1 }}>
                            {formatCurrency(totalNeeded)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Top active funding gaps
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Detailed Breakdown */}
            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: 0, borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#FAFAFA' }}>
                            <Typography variant="h6" fontWeight={700}>Funding Gap Analysis</Typography>
                            <Typography variant="body2" color="text.secondary">Active causes sorted by remaining need</Typography>
                        </Box>
                        <Box>
                            {/* Header Row */}
                            <Grid container sx={{ p: 2, bgcolor: '#f5f5f5', fontWeight: 600, color: 'text.secondary', fontSize: '0.875rem' }}>
                                <Grid item xs={5}>CAUSE / PROJECT</Grid>
                                <Grid item xs={2} textAlign="right">GOAL</Grid>
                                <Grid item xs={2} textAlign="right">RAISED</Grid>
                                <Grid item xs={3} textAlign="right">REMAINING NEED</Grid>
                            </Grid>

                            {/* Data Rows */}
                            {activeNeeds.length > 0 ? (
                                activeNeeds.map((item, index) => (
                                    <Grid
                                        container
                                        key={item.id}
                                        sx={{
                                            p: 2,
                                            borderTop: index === 0 ? 'none' : '1px solid',
                                            borderColor: 'divider',
                                            '&:hover': { bgcolor: '#F8F9FA' }
                                        }}
                                        alignItems="center"
                                    >
                                        <Grid item xs={5}>
                                            <Typography variant="body2" fontWeight={600} color="text.primary">{item.title}</Typography>
                                            <Chip label={item.type} size="small" sx={{ height: 20, fontSize: '0.7rem', mt: 0.5 }} />
                                        </Grid>
                                        <Grid item xs={2} textAlign="right">
                                            <Typography variant="body2" color="text.secondary">{formatCurrency(item.goal)}</Typography>
                                        </Grid>
                                        <Grid item xs={2} textAlign="right">
                                            <Typography variant="body2" color="success.main" fontWeight={500}>{formatCurrency(item.raised)}</Typography>
                                        </Grid>
                                        <Grid item xs={3} textAlign="right">
                                            <Typography variant="body2" color="error.main" fontWeight={700}>{formatCurrency(item.needed)}</Typography>
                                        </Grid>
                                    </Grid>
                                ))
                            ) : (
                                <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                                    No active campaigns or patients found.
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Grid>

                {/* Quick Tips Side Panel */}
                <Grid item xs={12} lg={4}>
                    <Box component="aside">
                        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            ⚡ Quick Tips
                        </Typography>
                        <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                                    Patient Verification
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Cross-check medical reports with hospital registry. Ensure financial goals match estimates.
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                                    Reconciliation
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Verify Transaction IDs for manual transfers before marking 'Completed'.
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                                    Story Formatting
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Use 1:1 aspect ratio images. Keep narratives emotional but factual.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                                    Security
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Don't share Super Admin credentials. Use L3 roles for juniors.
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
