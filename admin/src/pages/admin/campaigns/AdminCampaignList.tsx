import { useState } from 'react';
import {
    Box, Paper, Typography, Button, IconButton, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, LinearProgress, Menu, MenuItem
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, MoreVert as MoreVertIcon, CheckCircle as CheckIcon, Cancel as CancelIcon } from '@mui/icons-material';
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

    // Fetch campaigns
    const { data: campaigns, isLoading } = useQuery({
        queryKey: ['admin-campaigns'],
        queryFn: () => campaignService.getAll(),
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status, is_active }: { id: number, status: string, is_active: boolean }) =>
            campaignService.updateStatus(id, { status, is_active }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
            handleCloseMenu();
        }
    });

    const deleteMutation = useMutation({
        mutationFn: campaignService.deleteCampaign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
            setDeleteId(null);
            handleCloseMenu();
        }
    });

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, campaign: Campaign) => {
        setAnchorEl(event.currentTarget);
        setSelectedCampaign(campaign);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedCampaign(null);
    };

    const handleStatusUpdate = (status: string) => {
        if (selectedCampaign) {
            // If approving, also make it active. If rejecting, inactive.
            const is_active = status === 'approved';
            updateStatusMutation.mutate({ id: selectedCampaign.id, status, is_active });
        }
    };

    const handleDeleteConfirm = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    const campaignsList = (campaigns as any) || [];
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
                            <TableCell>Title & Submitter</TableCell>
                            <TableCell>Progress</TableCell>
                            <TableCell>Goal</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCampaigns.map((campaign: Campaign) => {
                            const progress = (campaign.raised_amount / campaign.goal_amount) * 100;
                            return (
                                <TableRow key={campaign.id} sx={campaign.status === 'pending' ? { bgcolor: 'action.hover' } : {}}>
                                    <TableCell>
                                        <Typography fontWeight={600}>{campaign.name_en}</Typography>
                                        {campaign.submitter_name && (
                                            <Typography variant="caption" color="text.secondary">
                                                by {campaign.submitter_name} ({campaign.submitter_email})
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ width: '20%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <LinearProgress variant="determinate" value={Math.min(progress, 100)} />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>৳{campaign.goal_amount.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {campaign.status && (
                                                <Chip
                                                    label={campaign.status}
                                                    color={campaign.status === 'approved' ? 'success' : campaign.status === 'rejected' ? 'error' : 'warning'}
                                                    size="small"
                                                    sx={{ textTransform: 'capitalize' }}
                                                />
                                            )}
                                            <Chip
                                                label={campaign.is_active ? 'Active' : 'Inactive'}
                                                variant="outlined"
                                                size="small"
                                                color={campaign.is_active ? 'success' : 'default'}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={(e) => handleMenuClick(e, campaign)}>
                                            <MoreVertIcon />
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

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={() => { navigate(`/admin/campaigns/${selectedCampaign?.id}/edit`); handleCloseMenu(); }}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={() => handleStatusUpdate('approved')}>
                    <CheckIcon fontSize="small" color="success" sx={{ mr: 1 }} /> Approve & Activate
                </MenuItem>
                <MenuItem onClick={() => handleStatusUpdate('rejected')}>
                    <CancelIcon fontSize="small" color="error" sx={{ mr: 1 }} /> Reject
                </MenuItem>
                <MenuItem onClick={() => { setDeleteId(selectedCampaign?.id || null); handleCloseMenu(); }} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>

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
