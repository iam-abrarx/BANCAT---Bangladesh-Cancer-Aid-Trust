import { useDonationDrawer } from '../../contexts/DonationDrawerContext';
import {
    Drawer, Box, IconButton, Typography, TextField, Button, FormControl,
    InputLabel, Select, MenuItem, Divider, InputAdornment, Alert, Autocomplete,
    LinearProgress, Chip, CircularProgress
} from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { campaignService } from '../../services/campaignService';
import { patientService } from '../../services/patientService';
import { programService } from '../../services/programService';
import { donationService } from '../../services/donationService';
import type { Patient } from '../../types';

export const DonationDrawer = () => {
    const { isOpen, closeDrawer, initialData } = useDonationDrawer();
    const [donorName, setDonorName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [donationType, setDonationType] = useState<'general' | 'campaign' | 'patient' | 'program' | 'zakat'>('general');
    const [selectedCampaign, setSelectedCampaign] = useState<string | number>('');
    const [selectedProgram, setSelectedProgram] = useState<string | number>('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Fetch campaigns
    const { data: campaignsData } = useQuery({
        queryKey: ['campaigns'],
        queryFn: () => campaignService.getAll(),
    });

    // Fetch programs
    const { data: programsData } = useQuery({
        queryKey: ['programs'],
        queryFn: () => programService.getAll(),
    });

    // Fetch patients for selection
    const { data: patientsData } = useQuery({
        queryKey: ['patients-for-donation'],
        queryFn: () => patientService.getAll({ per_page: 100 }),
        enabled: donationType === 'patient',
    });

    const campaigns = campaignsData?.data || [];
    const programs = Array.isArray(programsData) ? programsData : (programsData?.data || []);
    const patients = patientsData?.data || [];

    // Donation mutation
    const donationMutation = useMutation({
        mutationFn: donationService.initiate,
        onSuccess: (data) => {
            // Redirect to payment URL (mock payment callback)
            window.location.href = data.payment_url;
        },
        onError: (err: any) => {
            setError(err.response?.data?.message || err.response?.data?.errors?.patient_id?.[0] || 'Failed to process donation');
        }
    });

    // Set preselected data when drawer opens
    useEffect(() => {
        if (isOpen && initialData) {
            if (initialData.type) setDonationType(initialData.type as any);
            if (initialData.amount) setAmount(initialData.amount.toString());
            if (initialData.campaignId) setSelectedCampaign(initialData.campaignId);
            if (initialData.programId) setSelectedProgram(initialData.programId);
            if (initialData.patientId) {
                // For patient, we might need to fetch the patient details if not already loaded, 
                // but for now we just handle the ID if we had a mechanism, 
                // simply setting ID might not be enough for the Autocomplete if it expects an object.
                // We will skip complex patient object hydration for now unless requested.
            }
        } else if (!isOpen) {
            // Reset form on close if needed, but usually controlled by user interaction
            // We can clear errors
            setError('');
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const donationData: any = {
            amount: Number(amount),
            payment_method: 'bkash',
            donor_name: donorName,
            donor_email: email,
            donor_phone: phone || undefined,
            message: message || undefined,
            donation_type: 'one_time',
            category: donationType,
        };

        // Add campaign or patient or program ID
        if (donationType === 'campaign' && selectedCampaign) {
            donationData.campaign_id = Number(selectedCampaign);
        } else if (donationType === 'patient' && selectedPatient) {
            donationData.patient_id = selectedPatient.id;
        } else if (donationType === 'program' && selectedProgram) {
            donationData.program_id = Number(selectedProgram);
        }

        // Submit donation
        donationMutation.mutate(donationData);
    };

    const quickAmounts = [500, 1000, 2000, 5000];

    // Calculate patient funding percentage
    const getPatientProgress = (patient: Patient) => {
        const raised = patient.raised_amount || patient.treatment_cost_raised || 0;
        return Math.min((raised / patient.treatment_cost_required) * 100, 100);
    };

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={closeDrawer}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 480 },
                    p: 0,
                }
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{ p: 3, borderBottom: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5" fontWeight="bold">
                        Make a Donation
                    </Typography>
                    <IconButton onClick={closeDrawer} edge="end">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Form Content */}
                <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
                    <form onSubmit={handleSubmit}>
                        {/* Error Alert */}
                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                                {error}
                            </Alert>
                        )}

                        {/* Donation Type Selection */}
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Donation Type</InputLabel>
                            <Select
                                value={donationType}
                                onChange={(e) => {
                                    setDonationType(e.target.value as any);
                                    setSelectedCampaign('');
                                    setSelectedPatient(null);
                                    setSelectedProgram('');
                                }}
                                label="Donation Type"
                                required
                            >
                                <MenuItem value="general">General Donation</MenuItem>
                                <MenuItem value="zakat">Zakat</MenuItem>
                                <MenuItem value="campaign">Support a Campaign</MenuItem>
                                <MenuItem value="program">Support a Program</MenuItem>
                                <MenuItem value="patient">Donate to a Patient</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Zakat Calculator Helper */}
                        {donationType === 'zakat' && (
                            <Box sx={{ mb: 3, p: 2, bgcolor: '#F4FBF7', borderRadius: 2, border: '1px dashed', borderColor: 'success.main', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="subtitle2" color="success.dark" fontWeight={600}>
                                        Calculate your Zakat
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Use our precise calculator to determine your obligation.
                                    </Typography>
                                </Box>
                                <Button
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                    onClick={() => {
                                        closeDrawer();
                                        window.location.href = '/zakat-calculator';
                                    }}
                                    sx={{ bgcolor: 'white' }}
                                >
                                    Calculator
                                </Button>
                            </Box>
                        )}

                        {/* Campaign Selection */}
                        {donationType === 'campaign' && (
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Select Campaign</InputLabel>
                                <Select
                                    value={selectedCampaign}
                                    onChange={(e) => setSelectedCampaign(e.target.value)}
                                    label="Select Campaign"
                                    required
                                >
                                    {campaigns.map((campaign: any) => (
                                        <MenuItem key={campaign.id} value={campaign.id}>
                                            {campaign.title_en}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        {/* Program Selection */}
                        {donationType === 'program' && (
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Select Program</InputLabel>
                                <Select
                                    value={selectedProgram}
                                    onChange={(e) => setSelectedProgram(e.target.value)}
                                    label="Select Program"
                                    required
                                >
                                    {programs.map((program: any) => (
                                        <MenuItem key={program.id} value={program.id}>
                                            {program.title_en}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        {/* Patient Selection with Search */}
                        {donationType === 'patient' && (
                            <Box sx={{ mb: 3 }}>
                                <Autocomplete
                                    options={patients}
                                    getOptionLabel={(option) => `${option.name_en} (${option.code})`}
                                    value={selectedPatient}
                                    onChange={(_, newValue) => setSelectedPatient(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search and Select Patient"
                                            required
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: (
                                                    <>
                                                        <InputAdornment position="start">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                        {params.InputProps.startAdornment}
                                                    </>
                                                ),
                                            }}
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.id}>
                                            <Box sx={{ width: '100%' }}>
                                                <Typography variant="body1" fontWeight="600">
                                                    {option.name_en}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {option.code} • {option.cancer_type} • {option.location}
                                                </Typography>
                                            </Box>
                                        </li>
                                    )}
                                />

                                {/* Patient Progress Bar */}
                                {selectedPatient && (
                                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" fontWeight="600">
                                                {selectedPatient.name_en}
                                            </Typography>
                                            <Chip
                                                label={selectedPatient.cancer_type}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                <Typography variant="caption" color="primary" fontWeight="600">
                                                    ৳{(selectedPatient.raised_amount || selectedPatient.treatment_cost_raised || 0).toLocaleString()} raised
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    of ৳{selectedPatient.treatment_cost_required.toLocaleString()}
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={getPatientProgress(selectedPatient)}
                                                sx={{ height: 6, borderRadius: 3 }}
                                            />
                                            <Typography variant="caption" color="text.secondary" align="right" display="block" sx={{ mt: 0.5 }}>
                                                {getPatientProgress(selectedPatient).toFixed(1)}% funded
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        )}

                        <Divider sx={{ my: 3 }} />

                        {/* Quick Amount Selection */}
                        <Typography variant="subtitle2" gutterBottom fontWeight="600" color="text.secondary">
                            Quick Select Amount
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                            {quickAmounts.map((quickAmount) => (
                                <Button
                                    key={quickAmount}
                                    variant={amount === quickAmount.toString() ? 'contained' : 'outlined'}
                                    onClick={() => setAmount(quickAmount.toString())}
                                    size="small"
                                    sx={{ flex: '1 1 auto', minWidth: '90px' }}
                                >
                                    ৳{quickAmount}
                                </Button>
                            ))}
                        </Box>

                        {/* Custom Amount */}
                        <TextField
                            fullWidth
                            label="Donation Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            InputProps={{
                                startAdornment: <InputAdornment position="start">৳</InputAdornment>,
                            }}
                            sx={{ mb: 3 }}
                        />

                        <Divider sx={{ my: 3 }} />

                        {/* Personal Information */}
                        <Typography variant="subtitle2" gutterBottom fontWeight="600" color="text.secondary">
                            Your Information
                        </Typography>

                        <TextField
                            fullWidth
                            label="Full Name"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+880-XXX-XXXXXX"
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Message (Optional)"
                            multiline
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Leave a message of hope..."
                            sx={{ mb: 3 }}
                        />

                        <Alert severity="info" sx={{ mb: 3 }}>
                            Your donation will help save lives and bring hope to cancer patients.
                        </Alert>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={donationMutation.isPending}
                            sx={{ py: 1.5 }}
                        >
                            {donationMutation.isPending ? (
                                <>
                                    <CircularProgress size={20} sx={{ mr: 1 }} />
                                    Processing...
                                </>
                            ) : (
                                'Proceed to Payment'
                            )}
                        </Button>
                    </form>
                </Box>
            </Box>
        </Drawer>
    );
};
