import { Box, Grid, Paper, Typography, Card, CardContent, Divider, Chip } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../services/dashboardService';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import {
    People as PeopleIcon,
    Campaign as CampaignIcon,
    Category as ProgramIcon,
    MonetizationOn as DonationIcon
} from '@mui/icons-material';

export const AdminDashboard = () => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: dashboardService.getAdminStats,
    });

    if (isLoading) return <LoadingSpinner />;

    const kpiCards = [
        { label: 'Total Patients', value: stats?.total_patients || 0, icon: <PeopleIcon sx={{ color: '#4318FF' }} />, color: '#F4F7FE' },
        { label: 'Total Campaigns', value: stats?.total_campaigns || 0, icon: <CampaignIcon sx={{ color: '#FFB547' }} />, color: '#FFF7E8' },
        { label: 'Programs', value: stats?.total_programs || 0, icon: <ProgramIcon sx={{ color: '#05CD99' }} />, color: '#E6FAF5' },
        { label: 'Total Donations', value: `৳${(stats?.total_donated || 0).toLocaleString()}`, icon: <DonationIcon sx={{ color: '#E31A1A' }} />, color: '#FEEEEE' },
    ];

    return (
        <Box>
            <Helmet>
                <title>Admin Dashboard - BANcat</title>
            </Helmet>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'text.primary' }}>
                    Dashboard Overview
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Track your organization's impact and growth.
                </Typography>
            </Box>

            {/* KPI Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {kpiCards.map((kpi, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ borderRadius: '20px', boxShadow: '0px 4px 20px rgba(112, 144, 176, 0.08)', height: '100%' }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 56,
                                        height: 56,
                                        borderRadius: '50%',
                                        bgcolor: kpi.color,
                                        mr: 2,
                                    }}
                                >
                                    {kpi.icon}
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {kpi.label}
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                                        {kpi.value}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                {/* Donation Trends Chart */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0px 4px 20px rgba(112, 144, 176, 0.08)', height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                            Donation Trends
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={stats?.donation_trends || []}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4318FF" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4318FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5F2" />
                                <XAxis dataKey="month" stroke="#A3AED0" tick={{ fontSize: 12 }} />
                                <YAxis stroke="#A3AED0" tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0px 4px 20px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="total" stroke="#4318FF" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Top Campaigns List */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0px 4px 20px rgba(112, 144, 176, 0.08)', height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                            Top Campaigns
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {stats?.top_campaigns?.map((campaign) => (
                                <Box key={campaign.id}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                        <Typography variant="body2" fontWeight="600" noWrap sx={{ maxWidth: '60%' }}>
                                            {campaign.name_en}
                                        </Typography>
                                        <Typography variant="body2" fontWeight="700" color="primary">
                                            ৳{campaign.raised_amount.toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', height: 6, bgcolor: '#E9EDF7', borderRadius: 3 }}>
                                        <Box
                                            sx={{
                                                width: `${Math.min((campaign.raised_amount / campaign.goal_amount) * 100, 100)}%`,
                                                height: '100%',
                                                bgcolor: '#4318FF',
                                                borderRadius: 3
                                            }}
                                        />
                                    </Box>
                                </Box>
                            ))}
                            {(!stats?.top_campaigns || stats.top_campaigns.length === 0) && (
                                <Typography color="text.secondary">No campaigns found.</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>

                {/* Current Programs */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0px 4px 20px rgba(112, 144, 176, 0.08)' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Active Programs
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {stats?.current_programs?.map((program) => (
                                <Chip
                                    key={program.id}
                                    label={program.name_en}
                                    color="success"
                                    variant="outlined"
                                    sx={{ borderRadius: '8px', fontWeight: 600 }}
                                />
                            ))}
                            {(!stats?.current_programs || stats.current_programs.length === 0) && (
                                <Typography color="text.secondary">No active programs.</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    {/* Placeholder for future analytics or milestones */}
                    <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0px 4px 20px rgba(112, 144, 176, 0.08)' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Impact Milestones
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Detailed impact metrics and milestones will appear here.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
