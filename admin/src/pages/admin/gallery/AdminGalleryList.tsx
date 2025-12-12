import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    IconButton, Chip, TablePagination
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { galleryService, type Gallery } from '../../../services/galleryService';

const AdminGalleryList = () => {
    const navigate = useNavigate();
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);

    const fetchGalleries = async () => {
        try {
            const data = await galleryService.getAdminAll(page + 1);
            setGalleries(data.data);
            setTotal(data.total);
        } catch (error) {
            console.error('Failed to fetch galleries', error);
        }
    };

    useEffect(() => {
        fetchGalleries();
    }, [page]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this gallery?')) {
            await galleryService.delete(id);
            fetchGalleries();
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    Galleries
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/gallery/new')}
                >
                    Create New Gallery
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Views</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {galleries.map((gallery) => (
                            <TableRow key={gallery.id}>
                                <TableCell>{gallery.title_en}</TableCell>
                                <TableCell>{gallery.date ? new Date(gallery.date).toLocaleDateString() : '-'}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={gallery.is_published ? 'Published' : 'Draft'}
                                        color={gallery.is_published ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{gallery.view_count}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/admin/gallery/${gallery.id}`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(gallery.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {galleries.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No galleries found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={total}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[10]}
                />
            </TableContainer>
        </Box>
    );
};

export default AdminGalleryList;
