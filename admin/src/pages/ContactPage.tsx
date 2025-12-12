import { useState } from 'react';
import { Box, Container, Typography, Tab, Tabs, Paper } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { ContactForm } from '../components/contact/ContactForm';
import { PartnershipForm } from '../components/contact/PartnershipForm';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`contact-tabpanel-${index}`}
            aria-labelledby={`contact-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export const ContactPage = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box>
            <Helmet>
                <title>Contact Us - BANcat</title>
            </Helmet>

            <Box sx={{ bgcolor: 'secondary.main', py: 8, color: 'white', textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Get in Touch
                    </Typography>
                    <Typography variant="h6">
                        Have questions or want to partner with us? We'd love to hear from you.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ py: 6 }}>
                <Paper elevation={3} sx={{ borderRadius: 2 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            centered
                            sx={{
                                '& .MuiTab-root': { py: 2, fontSize: '1rem', fontWeight: 600 }
                            }}
                        >
                            <Tab label="General Inquiry" />
                            <Tab label="Partnership Proposal" />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabValue} index={0}>
                        <ContactForm />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <PartnershipForm />
                    </CustomTabPanel>
                </Paper>
            </Container>
        </Box>
    );
};
