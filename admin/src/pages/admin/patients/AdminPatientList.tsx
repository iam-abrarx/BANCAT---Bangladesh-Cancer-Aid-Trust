import { useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TablePagination } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { patientService } from '../../../services/patientService';
import type { Patient } from '../../../types';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { PatientDetailModal } from '../../../components/patients/PatientDetailModal';

export const AdminPatientList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [viewPatient, setViewPatient] = useState<Patient | null>(null);

    // Fetch patients
    const { data: patientsData, isLoading } = useQuery({
        queryKey: ['admin-patients', page],
        queryFn: () => patientService.getAll({ page: page + 1 }),
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

    const patients = patientsData?.data || [];
    const total = patientsData?.meta?.total || patients.length;
    console.log('AdminPatientList patients:', patients);

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
                            <TableCell>Photo</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Donor</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Goal</TableCell>
                            <TableCell align="right">Raised</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((patient: Patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.id}</TableCell>
                                <TableCell>
                                    <Box
                                        component="img"
                                        src={patient.photo ? (patient.photo.startsWith('http') ? patient.photo : `${import.meta.env.VITE_API_URL?.replace('/api/v1', '')}${patient.photo}`) : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Crect fill='%23e0e0e0' width='50' height='50'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='8' font-family='sans-serif'%3ENo Img%3C/text%3E%3C/svg%3E"}
                                        alt={patient.name_en}
                                        sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                                        onError={(e: any) => { if (!e.target.dataset.errored) { e.target.dataset.errored = 'true'; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Crect fill='%23ffebee' width='50' height='50'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23c62828' font-size='8' font-family='sans-serif'%3EError%3C/text%3E%3C/svg%3E"; } }}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{patient.name_en}</TableCell>
                                <TableCell>{patient.code}</TableCell>
                                <TableCell>{(patient as any).phone || '-'}</TableCell>
                                <TableCell>{(patient as any).email || '-'}</TableCell>
                                <TableCell>{(patient as any).donor_name || '-'}</TableCell>
                                <TableCell>{patient.cancer_type}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={patient.is_active ? 'Active' : 'Inactive'}
                                        color={patient.is_active ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">৳{patient.treatment_cost_required.toLocaleString()}</TableCell>
                                <TableCell align="right">৳{Number((patient as any).treatment_cost_raised || (patient as any).raised_amount || 0).toLocaleString()}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="info"
                                        onClick={() => setViewPatient(patient)}
                                        size="small"
                                        title="View Details"
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/admin/patients/${patient.id}/edit`)}
                                        size="small"
                                        title="Edit"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => setDeleteId(patient.id)}
                                        size="small"
                                        title="Delete"
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

            {/* Patient Detail Modal */}
            <PatientDetailModal
                open={!!viewPatient}
                onClose={() => setViewPatient(null)}
                patient={viewPatient}
            />

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
