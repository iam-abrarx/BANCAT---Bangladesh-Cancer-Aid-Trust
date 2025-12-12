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
    Avatar,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface TeamMember {
    id: number;
    name_en: string;
    role_en: string;
    category: string;
    photo: string;
    is_active: boolean;
    order: number;
}

const API_URL = 'http://localhost:8000/api/v1/admin/team-members';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
        },
    };
};

export const TeamManager = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [open, setOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { register, handleSubmit, reset, setValue } = useForm();

    const fetchMembers = async () => {
        try {
            const response = await axios.get(API_URL, getAuthHeader());
            setMembers(response.data.data || response.data);
        } catch (error) {
            console.error('Error fetching team members:', error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleOpen = (member?: TeamMember) => {
        if (member) {
            setEditingMember(member);
            setPreviewImage(member.photo ? (member.photo.startsWith('http') ? member.photo : `http://localhost:8000${member.photo}`) : null);
            setValue('name_en', member.name_en);
            setValue('role_en', member.role_en);
            setValue('category', member.category);
            setValue('order', member.order);
            setValue('is_active', member.is_active);
        } else {
            setEditingMember(null);
            setPreviewImage(null);
            reset();
            setValue('is_active', true);
            setValue('order', 0);
            setValue('category', 'member');
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingMember(null);
        reset();
    };

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('name_en', data.name_en);
        formData.append('role_en', data.role_en);
        formData.append('category', data.category);
        formData.append('order', data.order);
        formData.append('is_active', data.is_active ? '1' : '0');

        if (data.photo && data.photo[0]) {
            formData.append('photo', data.photo[0]);
        }

        try {
            if (editingMember) {
                formData.append('_method', 'PUT');
                await axios.post(`${API_URL}/${editingMember.id}`, formData, {
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
            fetchMembers();
            handleClose();
        } catch (error) {
            console.error('Error saving team member:', error);
            alert('Failed to save team member');
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`${API_URL}/${id}`, getAuthHeader());
                fetchMembers();
            } catch (error) {
                console.error('Error deleting member:', error);
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
                    Add Member
                </Button>
            </Box>

            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Photo</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell>
                                    <Avatar
                                        src={member.photo?.startsWith('http') ? member.photo : `http://localhost:8000${member.photo}`}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{member.name_en}</TableCell>
                                <TableCell>{member.role_en}</TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            px: 1,
                                            py: 0.5,
                                            bgcolor: 'secondary.light',
                                            color: 'secondary.contrastText',
                                            borderRadius: 1,
                                            fontSize: '0.75rem',
                                            display: 'inline-block',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {member.category}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" onClick={() => handleOpen(member)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => handleDelete(member.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{editingMember ? 'Edit Member' : 'New Team Member'}</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                {previewImage && (
                                    <Avatar
                                        src={previewImage}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                )}
                            </Box>

                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                            >
                                Upload Photo
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    {...register('photo', {
                                        onChange: (e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setPreviewImage(URL.createObjectURL(e.target.files[0]));
                                            }
                                        }
                                    })}
                                />
                            </Button>

                            <TextField
                                label="Name"
                                fullWidth
                                {...register('name_en', { required: true })}
                            />

                            <TextField
                                label="Role"
                                fullWidth
                                {...register('role_en', { required: true })}
                            />

                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    defaultValue="member"
                                    label="Category"
                                    {...register('category')}
                                >
                                    <MenuItem value="board">Board Member</MenuItem>
                                    <MenuItem value="member">Core Member</MenuItem>
                                    <MenuItem value="volunteer">Volunteer</MenuItem>
                                </Select>
                            </FormControl>

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
