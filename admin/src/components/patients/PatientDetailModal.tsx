import {
    Dialog, DialogTitle, DialogContent, IconButton, Box, Grid,
    Typography, Avatar, Chip, Divider, Paper
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { Patient } from '../../../types';

interface PatientDetailModalProps {
    open: boolean;
    onClose: () => void;
    patient: Patient | null;
}

export const PatientDetailModal = ({ open, onClose, patient }: PatientDetailModalProps) => {
    if (!patient) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: '20px' }
            }}
        >
            <DialogTitle sx={{ pb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" fontWeight="bold">Patient Details</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 0 }}>
                {/* Header Section */}
                <Box sx={{ bgcolor: '#F4F7FE', p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <Avatar
                                src={patient.photo ? (patient.photo.startsWith('http') ? patient.photo : `${import.meta.env.VITE_API_URL?.replace('/api/v1', '')}${patient.photo}`) : ''}
                                sx={{ width: 80, height: 80 }}
                            >
                                {patient.name_en.charAt(0)}
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {patient.name_en}
                            </Typography>
                            <Box display="flex" gap={2} flexWrap="wrap">
                                <Typography variant="body2" color="text.secondary">
                                    {patient.gender || 'Not specified'} • Age {patient.age}
                                </Typography>
                                <Chip
                                    label={patient.code}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Chip
                                label={patient.is_active ? 'Active' : 'Inactive'}
                                color={patient.is_active ? 'success' : 'default'}
                                sx={{ fontWeight: 600 }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Contact Information */}
                <Box sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Contact Information
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Patient ID
                            </Typography>
                            <Typography variant="body1" fontWeight="500">
                                {patient.code}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Email
                            </Typography>
                            <Typography variant="body1" fontWeight="500">
                                {(patient as any).email || '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Phone
                            </Typography>
                            <Typography variant="body1" fontWeight="500">
                                {(patient as any).phone || '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Location
                            </Typography>
                            <Typography variant="body1" fontWeight="500">
                                {patient.location}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider />

                {/* Medical Details */}
                <Box sx={{ p: 3, bgcolor: '#FAFBFD' }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Medical Information
                    </Typography>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={0} sx={{ p: 2, bgcolor: 'white', borderRadius: '12px' }}>
                                <Typography variant="caption" color="text.secondary">
                                    Cancer Type
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                    {patient.cancer_type}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={0} sx={{ p: 2, bgcolor: 'white', borderRadius: '12px' }}>
                                <Typography variant="caption" color="text.secondary">
                                    Diagnosis Date
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    {patient.diagnosis_date ? new Date(patient.diagnosis_date).toLocaleDateString() : 'N/A'}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper elevation={0} sx={{ p: 2, bgcolor: 'white', borderRadius: '12px' }}>
                                <Typography variant="caption" color="text.secondary">
                                    Status
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    {patient.status || 'Active Treatment'}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Divider />

                {/* Treatment Costs */}
                <Box sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Treatment Costs
                    </Typography>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="caption" color="text.secondary">
                                Required Amount
                            </Typography>
                            <Typography variant="h5" fontWeight="bold" color="error.main">
                                ৳ {patient.treatment_cost_required.toLocaleString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="caption" color="text.secondary">
                                Amount Raised
                            </Typography>
                            <Typography variant="h5" fontWeight="bold" color="success.main">
                                ৳ {((patient as any).fund_raised || 0).toLocaleString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="caption" color="text.secondary">
                                Donor
                            </Typography>
                            <Typography variant="h6" fontWeight="500">
                                {(patient as any).donor_name || 'Anonymous'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Divider />

                {/* Medical Summary */}
                <Box sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Medical Summary
                    </Typography>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#F4F7FE', borderRadius: '12px', mt: 2 }}>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                            {patient.medical_summary_en || 'No medical summary available'}
                        </Typography>
                    </Paper>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
