import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Switch,
    FormControlLabel,
    Typography,
    Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// Interfaces (you might want to move these to a types file)
interface Service {
    id: number;
    title_en: string;
    description_en: string;
    image: string;
    icon: string;
    is_active: boolean;
    order: number;
}

const API_URL = 'http://localhost:8000/api/v1/admin/services';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
        },
    };
};

export const ServiceManager = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [open, setOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);


    const { register, handleSubmit, reset, setValue } = useForm();

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin`, getAuthHeader()); // Note: using the admin endpoint we added
            setServices(response.data.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleOpen = (service?: Service) => {
        if (service) {
            setEditingService(service);
            setPreviewImage(service.image ? (service.image.startsWith('http') ? service.image : `http://localhost:8000${service.image}`) : null);
            setValue('title_en', service.title_en);
            setValue('description_en', service.description_en);
            setValue('icon', service.icon);
            setValue('order', service.order);
            setValue('is_active', service.is_active);
        } else {
            setEditingService(null);
            setPreviewImage(null);
            reset();
            setValue('is_active', true);
            setValue('order', 0);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingService(null);
        reset();
    };

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('title_en', data.title_en);
        formData.append('description_en', data.description_en || '');
        formData.append('icon', data.icon || '');
        formData.append('order', data.order);
        formData.append('is_active', data.is_active ? '1' : '0');

        if (data.image && data.image[0]) {
            formData.append('image', data.image[0]);
        }

        try {
            if (editingService) {
                formData.append('_method', 'PUT');
                await axios.post(`${API_URL}/${editingService.id}`, formData, {
                    headers: {
                        ...getAuthHeader().headers,
                        'Content-Type': 'multipart/form-data',
                    }
                });
            } else {
                await axios.post(API_URL, formData, {
                    headers: {
                        ...getAuthHeader().headers,
                        'Content-Type': 'multipart/form-data',
                    }
                });
            }
            fetchServices();
            handleClose();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Failed to save service');
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`${API_URL}/${id}`, getAuthHeader());
                fetchServices();
            } catch (error) {
                console.error('Error deleting service:', error);
            }
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                >
                    Add Service
                </Button>
            </Box>

            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell>
                                    <Avatar
                                        src={service.image?.startsWith('http') ? service.image : `http://localhost:8000${service.image}`}
                                        variant="rounded"
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{service.title_en}</TableCell>
                                <TableCell>{service.description_en?.substring(0, 50)}...</TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            px: 1, py: 0.5,
                                            bgcolor: service.is_active ? 'success.light' : 'grey.300',
                                            color: service.is_active ? 'success.dark' : 'grey.700',
                                            borderRadius: 1,
                                            display: 'inline-block',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {service.is_active ? 'ACTIVE' : 'INACTIVE'}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" onClick={() => handleOpen(service)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => handleDelete(service.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{editingService ? 'Edit Service' : 'New Service'}</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                {previewImage && (
                                    <Box
                                        component="img"
                                        src={previewImage}
                                        sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 2 }}
                                    />
                                )}
                            </Box>

                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    {...register('image', {
                                        onChange: (e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setPreviewImage(URL.createObjectURL(e.target.files[0]));
                                            }
                                        }
                                    })}
                                />
                            </Button>

                            <TextField
                                label="Title"
                                fullWidth
                                {...register('title_en', { required: true })}
                            />

                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                {...register('description_en')}
                            />

                            <TextField
                                label="Icon Class (e.g., fas fa-heart)"
                                fullWidth
                                {...register('icon')}
                                helperText="Optional font icon class"
                            />

                            <TextField
                                label="Order"
                                type="number"
                                fullWidth
                                {...register('order')}
                            />

                            <FormControlLabel
                                control={<Switch defaultChecked {...register('is_active')} />}
                                label="Active"
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};
