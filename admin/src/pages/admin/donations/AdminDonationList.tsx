import { useState } from 'react';
import {
    Box, Paper, Typography, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, TextField, InputAdornment, Tabs, Tab, Button, CircularProgress
} from '@mui/material';
import { Search as SearchIcon, CheckCircle as CheckIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { donationService } from '../../../services/donationService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';

export const AdminDonationList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'approved'

    const queryClient = useQueryClient();

    const { data: donationsData, isLoading } = useQuery({
        queryKey: ['admin-donations', page, searchTerm, statusFilter],
        queryFn: () => donationService.getAllDonations({
            page: page + 1,
            search: searchTerm,
            status: statusFilter === 'all' ? undefined : statusFilter
        }),
    });

    const approveMutation = useMutation({
        mutationFn: donationService.approveDonation,
        onSuccess: () => {
            toast.success('Donation approved successfully');
            queryClient.invalidateQueries({ queryKey: ['admin-donations'] });
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.error || 'Failed to approve donation');
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const donations = donationsData?.data || [];
    const total = donationsData?.total || donations.length;

    const getTargetName = (donation: any) => {
        if (donation.campaign) return `Campaign: ${donation.campaign.title_en || donation.campaign.name_en}`;
        if (donation.patient) return `Patient: ${donation.patient.name_en}`;
        if (donation.program) return `Program: ${donation.program.name_en}`;
        return 'General Fund';
    };

    const handleApprove = (id: number) => {
        approveMutation.mutate(id);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Donations</Typography>
                <TextField
                    placeholder="Search Transaction ID or Donor..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: 300 }}
                />
            </Box>

            <Paper sx={{ mb: 3 }}>
                <Tabs
                    value={statusFilter}
                    onChange={(_, val) => {
                        setStatusFilter(val);
                        setPage(0);
                    }}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="All" value="all" />
                    <Tab label="Pending Approval" value="pending" />
                    <Tab label="Approved" value="approved" />
                </Tabs>
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Trx ID</TableCell>
                            <TableCell>Donor</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Target</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>Approval Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donations.map((d: any) => (
                            <TableRow key={d.id}>
                                <TableCell>{new Date(d.created_at).toLocaleDateString()}</TableCell>
                                <TableCell sx={{ fontFamily: 'monospace' }}>{d.transaction_id}</TableCell>
                                <TableCell>
                                    <Box>
                                        <Typography variant="body2" fontWeight={600}>
                                            {d.donor ? d.donor.name : (d.donor_name || 'Anonymous')}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {d.donor ? d.donor.email : d.donor_email}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                    {d.currency} {Number(d.amount).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                        {getTargetName(d)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={d.payment_status}
                                        color={d.payment_status === 'completed' ? 'success' : 'error'}
                                        size="small"
                                        variant="outlined"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={d.status}
                                        color={d.status === 'approved' ? 'success' : d.status === 'pending' ? 'warning' : 'default'}
                                        size="small"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {d.status === 'pending' && d.payment_status === 'completed' && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleApprove(d.id)}
                                            startIcon={approveMutation.isPending ? <CircularProgress size={16} /> : <CheckIcon />}
                                            disabled={approveMutation.isPending}
                                        >
                                            Approve
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {donations.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                                    No donations found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[15, 25, 50]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, p) => setPage(p)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(+e.target.value);
                        setPage(0);
                    }}
                />
            </TableContainer>
        </Box>
    );
};
