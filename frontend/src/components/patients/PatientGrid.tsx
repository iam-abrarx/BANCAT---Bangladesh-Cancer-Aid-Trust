import { Grid, Box, Typography } from '@mui/material';
import { PatientCard } from './PatientCard';
import type { Patient } from '../../types';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface PatientGridProps {
    patients: Patient[];
    loading?: boolean;
}

export const PatientGrid = ({ patients, loading }: PatientGridProps) => {
    if (loading) return <LoadingSpinner />;

    if (patients.length === 0) {
        return (
            <Box textAlign="center" py={8}>
                <Typography variant="h6" color="text.secondary">
                    No patients found matching your criteria.
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={4}>
            {patients.map((patient) => (
                <Grid item xs={12} sm={6} md={4} key={patient.id}>
                    <PatientCard patient={patient} />
                </Grid>
            ))}
        </Grid>
    );
};
