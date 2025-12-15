import { useState } from 'react';
import {
    Box, Paper, Typography, Button, IconButton, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, LinearProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { campaignService } from '../../../services/campaignService';
import type { Campaign } from '../../../services/campaignService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const AdminCampaignList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // Fetch campaigns
    const { data: campaigns, isLoading } = useQuery({
        queryKey: ['admin-campaigns'],
        queryFn: () => campaignService.getAll(),
    });

    const deleteMutation = useMutation({
        mutationFn: campaignService.deleteCampaign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
            setDeleteId(null);
        }
    });

    const handleDeleteConfirm = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    // Handling simple list return from controller (getAll doesn't pagination locally in controller yet? 
    // Wait, Controller returns ->get() not paginate() for index currently. 
    // We should probably update controller to paginate eventually, but for now assuming list.
    // Actually, update implementation added pagination? 
    // No, index implementation: return $query->orderBy('created_at', 'desc')->get();
    // So it returns array. We'll handle client-side pagination here for now or update controller later.
    const campaignsList = (campaigns as any) || [];

    // Simple client-side pagination
    const paginatedCampaigns = campaignsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Campaigns</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/campaigns/new')}
                >
                    Add Campaign
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Progress</TableCell>
                            <TableCell>Raised / Goal</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCampaigns.map((campaign: Campaign) => {
                            const progress = (campaign.raised_amount / campaign.goal_amount) * 100;
                            return (
                                <TableRow key={campaign.id}>
                                    <TableCell>{campaign.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{campaign.name_en}</TableCell>
                                    <TableCell sx={{ width: '20%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <LinearProgress variant="determinate" value={Math.min(progress, 100)} />
                                            </Box>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        ৳{campaign.raised_amount.toLocaleString()} / ৳{campaign.goal_amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={campaign.is_active ? 'Active' : 'Ended'}
                                            color={campaign.is_active ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => navigate(`/admin/campaigns/${campaign.id}/edit`)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => setDeleteId(campaign.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={campaignsList.length}
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
                    <DialogContentText>
                        Are you sure you want to delete this campaign?
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
