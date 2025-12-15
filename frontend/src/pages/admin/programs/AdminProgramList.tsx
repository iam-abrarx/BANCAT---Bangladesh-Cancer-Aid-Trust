import { useState } from 'react';
import {
    Box, Paper, Typography, Button, IconButton, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { programService } from '../../../services/programService';
import type { Program } from '../../../services/programService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const AdminProgramList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // Fetch programs
    const { data: programs, isLoading } = useQuery({
        queryKey: ['admin-programs'],
        queryFn: () => programService.getAll(),
    });

    const deleteMutation = useMutation({
        mutationFn: programService.deleteProgram,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
            setDeleteId(null);
        }
    });

    const handleDeleteConfirm = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    // Programs usually is a small list, no pagination needed yet for this list as per controller.
    const programsList = (programs as any) || [];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Programs</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/programs/new')}
                >
                    Add Program
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Tagline</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {programsList.map((program: Program) => (
                            <TableRow key={program.id}>
                                <TableCell>{program.order}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{program.name_en}</TableCell>
                                <TableCell>{program.tagline_en}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={program.is_active ? 'Active' : 'Inactive'}
                                        color={program.is_active ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/admin/programs/${program.id}/edit`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => setDeleteId(program.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this program?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
