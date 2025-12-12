import { useState } from 'react';
import {
    Box, Paper, Typography, Button, IconButton, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { teamService } from '../../../services/teamService';
import type { TeamMember } from '../../../services/teamService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const AdminTeamList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data: teamMembers, isLoading } = useQuery({
        queryKey: ['admin-team'],
        queryFn: () => teamService.getAll(),
    });

    const deleteMutation = useMutation({
        mutationFn: teamService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-team'] });
            setDeleteId(null);
        }
    });

    const handleDeleteConfirm = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    const list = (teamMembers as any) || [];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Team Members</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/team/new')}
                >
                    Add Member
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((member: TeamMember) => (
                            <TableRow key={member.id}>
                                <TableCell>{member.order}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        {member.photo && (
                                            <img
                                                src={member.photo.startsWith('http') ? member.photo : `http://localhost:8000${member.photo}`}
                                                alt={member.name_en}
                                                style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                                            />
                                        )}
                                        {member.name_en}
                                    </Box>
                                </TableCell>
                                <TableCell>{member.role_en}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={member.category.replace('_', ' ')}
                                        size="small"
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={member.is_active ? 'Active' : 'Inactive'}
                                        color={member.is_active ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/admin/team/${member.id}`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => setDeleteId(member.id)}
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
                        Are you sure you want to delete this team member?
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
