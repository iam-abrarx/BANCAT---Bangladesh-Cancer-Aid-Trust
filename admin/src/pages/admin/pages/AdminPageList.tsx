import { useState } from 'react';
import {
    Box, Paper, Typography, Button, IconButton, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Public as PublicIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { pageService } from '../../../services/pageService';
import type { Page } from '../../../services/pageService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const AdminPageList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data: pages, isLoading } = useQuery({
        queryKey: ['admin-pages'],
        queryFn: () => pageService.getAll(),
    });

    const deleteMutation = useMutation({
        mutationFn: pageService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-pages'] });
            setDeleteId(null);
        }
    });

    const handleDeleteConfirm = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    const list = (pages as any) || [];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Pages</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/pages/new')}
                >
                    Add Page
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Slug</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((page: Page) => (
                            <TableRow key={page.id}>
                                <TableCell sx={{ fontWeight: 600 }}>{page.title_en}</TableCell>
                                <TableCell sx={{ fontFamily: 'monospace' }}>/{page.slug}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={page.is_published ? 'Published' : 'Draft'}
                                        color={page.is_published ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="info"
                                        href={`/pages/${page.slug}`}
                                        target="_blank"
                                        title="View Live"
                                    >
                                        <PublicIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/admin/pages/${page.id}`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => setDeleteId(page.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {list.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">No pages found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this page?
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
