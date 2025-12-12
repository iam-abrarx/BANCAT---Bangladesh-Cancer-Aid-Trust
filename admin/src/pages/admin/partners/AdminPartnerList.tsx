import { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Menu, MenuItem, TablePagination } from '@mui/material';
import { MoreVert as MoreVertIcon, CheckCircle as CheckIcon, Cancel as CancelIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partnerService } from '../../../services/partnerService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const AdminPartnerList = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // Fetch partners
    const { data: partnersData, isLoading } = useQuery({
        queryKey: ['admin-partners', page],
        queryFn: () => partnerService.getAll({ page: page + 1 }),
    });

    // Mutations
    const statusMutation = useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) => partnerService.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
            handleCloseMenu();
        }
    });

    const deleteMutation = useMutation({
        mutationFn: partnerService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
            handleCloseMenu();
        }
    });

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };

    const handleStatusUpdate = (status: string) => {
        if (selectedId) {
            statusMutation.mutate({ id: selectedId, status });
        }
    };

    const handleDelete = () => {
        if (selectedId) {
            if (window.confirm('Are you sure you want to delete this application?')) {
                deleteMutation.mutate(selectedId);
            }
        }
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (isLoading) return <LoadingSpinner />;

    const partners = partnersData?.data?.data || [];
    const total = partnersData?.data?.total || partners.length;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Partner Applications</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Organization</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {partners.map((partner: any) => (
                            <TableRow key={partner.id}>
                                <TableCell>
                                    <Typography fontWeight={600}>{partner.org_name}</Typography>
                                    <Typography variant="caption" color="text.secondary">{partner.email}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{partner.contact_person}</Typography>
                                    <Typography variant="caption" color="text.secondary">{partner.phone}</Typography>
                                </TableCell>
                                <TableCell>{partner.type}</TableCell>
                                <TableCell sx={{ maxWidth: 300 }}>
                                    <Typography noWrap variant="body2" title={partner.message}>
                                        {partner.message}
                                    </Typography>
                                </TableCell>
                                <TableCell>{new Date(partner.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={partner.status}
                                        color={partner.status === 'approved' ? 'success' : partner.status === 'rejected' ? 'error' : 'warning'}
                                        size="small"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={(e) => handleMenuClick(e, partner.id)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={() => handleStatusUpdate('approved')}>
                    <CheckIcon fontSize="small" color="success" sx={{ mr: 1 }} /> Approve
                </MenuItem>
                <MenuItem onClick={() => handleStatusUpdate('rejected')}>
                    <CancelIcon fontSize="small" color="error" sx={{ mr: 1 }} /> Reject
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>
        </Box>
    );
};
