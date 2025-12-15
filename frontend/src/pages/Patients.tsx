import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { usePatients } from '../hooks/usePatients';
import { PatientGrid } from '../components/patients/PatientGrid';
import { PatientSearchFilters } from '../components/patients/PatientSearchFilters';
import { useTranslation } from 'react-i18next';

export const Patients = () => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({});

    const { data, isLoading, error } = usePatients(filters);

    if (error) return <Typography color="error">Error loading patients</Typography>;

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box mb={6} textAlign="center">
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
                    {t('nav.patients', 'Patient Support')}
                </Typography>
                <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
                    Browse through the patients who urgently need your support.
                </Typography>
            </Box>

            <PatientSearchFilters onSearch={setFilters} />
            <PatientGrid patients={data?.data || []} loading={isLoading} />
        </Container>
    );
};
