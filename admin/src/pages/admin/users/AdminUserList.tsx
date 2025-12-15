import { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Avatar,
    Select,
    MenuItem,
    Chip,
    CircularProgress,
    Alert,
    FormControl,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { userService } from '../../../services/userService';
import { useAuth } from '../../../contexts/AuthContext';
import type { User } from '../../../services/authService';
import { motion } from 'framer-motion';

const roles = [
    { value: 'super_admin', label: 'Super Admin', color: 'error' },
    { value: 'admin', label: 'Admin', color: 'error' },
    { value: 'moderator', label: 'Moderator', color: 'warning' },
    { value: 'editor', label: 'Editor', color: 'info' },
    { value: 'publisher', label: 'Publisher', color: 'success' },
    { value: 'user', label: 'User', color: 'default' },
];

export const AdminUserList = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState<number | null>(null);

    // Create User Dialog State
    const [openDialog, setOpenDialog] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await userService.getUsers();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err: any) {
            console.error('Failed to fetch users:', err);
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: number, newRole: string) => {
        setUpdating(userId);
        try {
            await userService.updateUserRole(userId, newRole);
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        } catch (err: any) {
            console.error('Failed to update role:', err);
            if (err.response?.status === 403) {
                alert(err.response.data.message || 'Unauthorized action.');
            }
        } finally {
            setUpdating(null);
        }
    };

    const handleCreateUser = async () => {
        setCreating(true);
        try {
            const createdUser = await userService.createUser(newUser);
            setUsers([...users, createdUser]);
            setOpenDialog(false);
            setNewUser({ name: '', email: '', password: '', role: 'user' });
        } catch (err: any) {
            console.error('Failed to create user:', err);
            if (err.response?.status === 403) {
                alert(err.response.data.message || 'Unauthorized action.');
            } else {
                alert('Failed to create user. Please check inputs.');
            }
        } finally {
            setCreating(false);
        }
    };

    const getRoleColor = (role: string) => {
        const found = roles.find(r => r.value === role);
        return (found?.color || 'default') as "default" | "error" | "warning" | "info" | "success" | "primary" | "secondary";
    };

    const canEditRole = (targetUser: User) => {
        if (!currentUser) return false;
        if (currentUser.role === 'super_admin') return true;
        if (currentUser.role === 'admin') {
            // Admin cannot edit Super Admin
            return targetUser.role !== 'super_admin';
        }
        return false;
    };

    const canCreateUser = () => {
        return currentUser?.role === 'super_admin' || currentUser?.role === 'admin';
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    User Management
                </Typography>
                {canCreateUser() && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenDialog(true)}
                        sx={{ borderRadius: '10px', textTransform: 'none' }}
                    >
                        Add User
                    </Button>
                )}
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '20px', overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Current Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover component={motion.tr} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 'bold' }}>
                                            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                        </Avatar>
                                        <Typography variant="body1" fontWeight={600}>
                                            {user.name}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role ? user.role.replace('_', ' ').toUpperCase() : 'USER'}
                                        color={getRoleColor(user.role || 'user')}
                                        size="small"
                                        variant="filled"
                                        sx={{ fontWeight: 600, borderRadius: '8px' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormControl size="small" sx={{ minWidth: 140 }}>
                                        <Select
                                            value={user.role || 'user'}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            disabled={updating === user.id || !canEditRole(user)}
                                            sx={{ borderRadius: '10px' }}
                                        >
                                            {roles.filter(role => {
                                                // Hide super_admin option if current user is not super_admin
                                                if (role.value === 'super_admin' && currentUser?.role !== 'super_admin') return false;
                                                return true;
                                            }).map((role) => (
                                                <MenuItem key={role.value} value={role.value}>
                                                    {role.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {updating === user.id && <CircularProgress size={20} sx={{ ml: 2 }} />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Create User Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Create New User
                    <IconButton onClick={() => setOpenDialog(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField
                            label="Full Name"
                            fullWidth
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <TextField
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <FormControl fullWidth>
                            <Select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                displayEmpty
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenDialog(false)} disabled={creating}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateUser}
                        disabled={creating || !newUser.email || !newUser.password || !newUser.name}
                    >
                        {creating ? 'Creating...' : 'Create User'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
