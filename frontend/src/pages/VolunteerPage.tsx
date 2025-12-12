import { VolunteerForm } from '../components/volunteer/VolunteerForm';
import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export const VolunteerPage = () => {
    return (
        <Box>
            <Helmet>
                <title>Volunteer - BANcat</title>
            </Helmet>

            {/* Hero Section Placeholder if needed, for now just the form container */}
            <Box sx={{ bgcolor: 'background.default', minHeight: '80vh', py: 4 }}>
                <Container maxWidth="lg">
                    <VolunteerForm />
                </Container>
            </Box>
        </Box>
    );
};
