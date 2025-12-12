import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box, Paper, Typography, Grid, Chip, Button, Divider, TextField,
    FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { volunteerService } from '../../../services/volunteerService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const AdminVolunteerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('');

    const { data: volunteer, isLoading } = useQuery({
        queryKey: ['volunteer', id],
        queryFn: () => volunteerService.getById(Number(id)),
        enabled: !!id,
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => volunteerService.updateStatus(Number(id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['volunteer', id] });
            queryClient.invalidateQueries({ queryKey: ['admin-volunteers'] });
        }
    });

    // Populate local state when data loads
    if (volunteer && status === '' && notes === '') {
        setStatus(volunteer.status);
        setNotes(volunteer.admin_notes || '');
    }

    const handleSave = () => {
        updateMutation.mutate({ status, admin_notes: notes });
    };

    if (isLoading || !volunteer) return <LoadingSpinner />;

    return (
        <Box>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/admin/volunteers')} sx={{ mb: 2 }}>
                Back to List
            </Button>

            <Paper sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold">{volunteer.name}</Typography>
                    <Chip
                        label={volunteer.status}
                        color={volunteer.status === 'approved' ? 'success' : volunteer.status === 'rejected' ? 'error' : 'warning'}
                        sx={{ textTransform: 'capitalize', px: 2 }}
                    />
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" gutterBottom>Application Details</Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                                <Typography variant="body1">{volunteer.email}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                                <Typography variant="body1">{volunteer.phone || 'N/A'}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="text.secondary">Bio</Typography>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{volunteer.bio || 'No bio provided.'}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>Skills</Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {volunteer.skills?.map((skill: string) => (
                                        <Chip key={skill} label={skill} />
                                    ))}
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="text.secondary">Availability</Typography>
                                <Typography variant="body1">{volunteer.availability || 'N/A'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper variant="outlined" sx={{ p: 3, bgcolor: 'grey.50' }}>
                            <Typography variant="h6" gutterBottom>Admin Actions</Typography>

                            <FormControl fullWidth sx={{ mb: 3, mt: 2 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={status || volunteer.status}
                                    label="Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="approved">Approved</MenuItem>
                                    <MenuItem value="rejected">Rejected</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label="Admin Notes"
                                multiline
                                rows={4}
                                fullWidth
                                value={notes !== '' ? notes : volunteer.admin_notes || ''}
                                onChange={(e) => setNotes(e.target.value)}
                                sx={{ mb: 3 }}
                                placeholder="Internal notes about this candidate..."
                            />

                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleSave}
                                disabled={updateMutation.isPending}
                            >
                                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};
