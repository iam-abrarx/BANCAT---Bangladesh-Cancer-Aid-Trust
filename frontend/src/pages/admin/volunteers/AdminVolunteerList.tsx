import { useState } from 'react';
import {
    Box, Paper, Typography, Button, IconButton, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@mui/material';
import { Visibility as ViewIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { volunteerService } from '../../../services/volunteerService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const AdminVolunteerList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data: volunteersData, isLoading } = useQuery({
        queryKey: ['admin-volunteers', page],
        queryFn: () => volunteerService.getAll({ page: page + 1 }),
    });

    const deleteMutation = useMutation({
        mutationFn: volunteerService.deleteVolunteer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-volunteers'] });
            setDeleteId(null);
        }
    });

    const handleDeleteConfirm = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    // Handle pagination data
    const volunteers = volunteersData?.data || [];
    const total = volunteersData?.meta?.total || volunteers.length;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'success';
            case 'rejected': return 'error';
            default: return 'warning';
        }
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Volunteers</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Skills</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {volunteers.map((v: any) => (
                            <TableRow key={v.id}>
                                <TableCell sx={{ fontWeight: 600 }}>{v.name}</TableCell>
                                <TableCell>{v.email}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                        {v.skills?.slice(0, 3).map((skill: string) => (
                                            <Chip key={skill} label={skill} size="small" />
                                        ))}
                                        {v.skills?.length > 3 && <Chip label={`+${v.skills.length - 3}`} size="small" />}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={v.status}
                                        color={getStatusColor(v.status) as any}
                                        size="small"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/admin/volunteers/${v.id}`)}
                                    >
                                        <ViewIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => setDeleteId(v.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
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

            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this application?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
