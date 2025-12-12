import { useState } from 'react';
import {
    Box, Paper, Typography, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, TextField, InputAdornment
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { donationService } from '../../../services/donationService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const AdminDonationList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15); // increased for donations
    const [searchTerm, setSearchTerm] = useState('');

    const { data: donationsData, isLoading } = useQuery({
        queryKey: ['admin-donations', page, searchTerm],
        queryFn: () => donationService.getAllDonations({ page: page + 1, search: searchTerm }),
    });

    if (isLoading) return <LoadingSpinner />;

    const donations = donationsData?.data || [];
    const total = donationsData?.total || donations.length;

    const getTargetName = (donation: any) => {
        if (donation.campaign) return `Campaign: ${donation.campaign.name_en}`;
        if (donation.patient) return `Patient: ${donation.patient.name_en}`;
        if (donation.program) return `Program: ${donation.program.name_en}`;
        return 'General Fund';
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

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Trx ID</TableCell>
                            <TableCell>Donor</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Target</TableCell>
                            <TableCell>Status</TableCell>
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
                                            {d.donor ? d.donor.name : (d.guest_name || 'Anonymous')}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {d.donor ? d.donor.email : d.guest_email}
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
                                        label={d.status}
                                        color={d.status === 'completed' ? 'success' : d.status === 'failed' ? 'error' : 'warning'}
                                        size="small"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {donations.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
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
