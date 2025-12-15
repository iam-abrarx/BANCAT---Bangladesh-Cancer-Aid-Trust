import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Avatar
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../services/testimonialService';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    image: string | null;
}

interface TestimonialForm {
    name: string;
    role: string;
    quote: string;
    image: FileList | null;
}

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const { register, handleSubmit, reset, setValue } = useForm<TestimonialForm>();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const data = await getTestimonials();
            setTestimonials(data);
        } catch (error) {
            console.error('Failed to fetch testimonials', error);
        }
    };

    const handleOpen = (testimonial?: Testimonial) => {
        if (testimonial) {
            setEditingId(testimonial.id);
            setValue('name', testimonial.name);
            setValue('role', testimonial.role);
            setValue('quote', testimonial.quote);
            setPreviewImage(testimonial.image);
        } else {
            setEditingId(null);
            setPreviewImage(null);
            reset();
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
        setEditingId(null);
    };

    const onSubmit = async (data: TestimonialForm) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('role', data.role);
            formData.append('quote', data.quote);
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);
            }

            if (editingId) {
                await updateTestimonial(editingId, formData);
            } else {
                await createTestimonial(formData);
            }
            fetchTestimonials();
            handleClose();
        } catch (error) {
            console.error('Failed to save testimonial', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await deleteTestimonial(id);
                fetchTestimonials();
            } catch (error) {
                console.error('Failed to delete testimonial', error);
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Testimonials</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpen()}
                >
                    Add Testimonial
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Quote</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {testimonials.map((testimonial) => (
                            <TableRow key={testimonial.id}>
                                <TableCell>
                                    <Avatar src={testimonial.image ? `http://localhost:8000${testimonial.image}` : undefined} alt={testimonial.name} />
                                </TableCell>
                                <TableCell>{testimonial.name}</TableCell>
                                <TableCell>{testimonial.role}</TableCell>
                                <TableCell>{testimonial.quote.substring(0, 50)}...</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpen(testimonial)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(testimonial.id)} color="error">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <TextField
                            {...register('name', { required: true })}
                            label="Name"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            {...register('role', { required: true })}
                            label="Role"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            {...register('quote', { required: true })}
                            label="Quote"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Upload Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                {...(() => {
                                    const { onChange, ...rest } = register('image');
                                    return {
                                        ...rest,
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                            onChange(e); // Call hook-form's onChange
                                            if (e.target.files && e.target.files[0]) {
                                                setPreviewImage(URL.createObjectURL(e.target.files[0]));
                                            }
                                        }
                                    };
                                })()}
                            />
                        </Button>
                        {previewImage && (
                            <Box display="flex" justifyContent="center" mb={2}>
                                <Avatar
                                    src={previewImage.startsWith('blob:') ? previewImage : `http://localhost:8000${previewImage}`}
                                    sx={{ width: 100, height: 100 }}
                                />
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};

export default Testimonials;
