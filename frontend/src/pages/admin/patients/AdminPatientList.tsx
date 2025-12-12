import { useState } from 'react';
import {
    Box, Paper, Typography, Button, IconButton, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { patientService } from '../../../services/patientService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import type { Patient } from '../../../types';

export const AdminPatientList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // Fetch patients
    const { data: patientsData, isLoading } = useQuery({
        queryKey: ['admin-patients', page],
        queryFn: () => patientService.getAll({ page: page + 1 }), // Adjust for API pagination if needed
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: patientService.deletePatient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-patients'] });
            setDeleteId(null);
        }
    });

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDeleteConfirm = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    // Handling API structure which might return paginated data differently
    const patients = patientsData?.data || [];
    const total = patientsData?.meta?.total || patients.length;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Patients</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/patients/new')}
                >
                    Add Patient
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Goal</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((patient: Patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.id}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{patient.name_en}</TableCell>
                                <TableCell>{patient.code}</TableCell>
                                <TableCell>{patient.cancer_type}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={patient.is_active ? 'Active' : 'Inactive'}
                                        color={patient.is_active ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">৳{patient.treatment_cost_required.toLocaleString()}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/admin/patients/${patient.id}/edit`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => setDeleteId(patient.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!deleteId}
                onClose={() => setDeleteId(null)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this patient? This action cannot be undone.
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
