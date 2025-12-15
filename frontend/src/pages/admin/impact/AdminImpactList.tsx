import { useState } from 'react';
import {
    Box, Paper, Typography, Button, IconButton, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { impactService } from '../../../services/impactService';
import type { ImpactMetric } from '../../../services/impactService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const AdminImpactList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data: metrics, isLoading } = useQuery({
        queryKey: ['admin-impact'],
        queryFn: () => impactService.getAll(),
    });

    const deleteMutation = useMutation({
        mutationFn: impactService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-impact'] });
            setDeleteId(null);
        }
    });

    const handleDeleteConfirm = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    const list = (metrics as any) || [];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Impact Metrics</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/impact/new')}
                >
                    Add Metric
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order</TableCell>
                            <TableCell>Label</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Key</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((metric: ImpactMetric) => (
                            <TableRow key={metric.id}>
                                <TableCell>{metric.order}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{metric.label_en}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{metric.value.toLocaleString()}</TableCell>
                                <TableCell sx={{ fontFamily: 'monospace' }}>{metric.metric_key}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={metric.is_visible ? 'Visible' : 'Hidden'}
                                        color={metric.is_visible ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/admin/impact/${metric.id}`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => setDeleteId(metric.id)}
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
                        Are you sure you want to delete this metric?
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
