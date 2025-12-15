import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Alert, MenuItem } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { contactService, type PartnershipData } from '../../services/contactService';
import { LoadingSpinner } from '../common/LoadingSpinner';

const PARTNERSHIP_TYPES = [
    'CSR Initiative', 'Medical Support', 'Logistics/Transport',
    'Fundraising Partner', 'Media/Press', 'Other'
];

export const PartnershipForm = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { control, handleSubmit, reset, formState: { errors } } = useForm<PartnershipData>({
        defaultValues: {
            organization_name: '',
            contact_person: '',
            email: '',
            phone: '',
            type: '',
            message: ''
        }
    });

    const mutation = useMutation({
        mutationFn: contactService.sendPartnership,
        onSuccess: (data) => {
            setSuccessMsg(data.message || 'Proposal sent successfully!');
            setErrorMsg('');
            reset();
        },
        onError: (err: any) => {
            setErrorMsg(err.response?.data?.message || 'Failed to send proposal.');
            setSuccessMsg('');
        }
    });

    const onSubmit = (data: PartnershipData) => {
        mutation.mutate(data);
    };

    if (mutation.isPending) return <LoadingSpinner />;

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}
            {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

            <Controller
                name="organization_name"
                control={control}
                rules={{ required: 'Organization Name is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Organization Name"
                        error={!!errors.organization_name}
                        helperText={errors.organization_name?.message}
                    />
                )}
            />

            <Controller
                name="contact_person"
                control={control}
                rules={{ required: 'Contact Person is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Contact Person Name"
                        error={!!errors.contact_person}
                        helperText={errors.contact_person?.message}
                    />
                )}
            />

            <Controller
                name="email"
                control={control}
                rules={{
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                )}
            />

            <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        fullWidth
                        label="Phone Number"
                    />
                )}
            />

            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        select
                        margin="normal"
                        fullWidth
                        label="Partnership Type"
                    >
                        {PARTNERSHIP_TYPES.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <Controller
                name="message"
                control={control}
                rules={{ required: 'Message/Proposal is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Proposal / Message"
                        multiline
                        rows={4}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                    />
                )}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
            >
                Submit Proposal
            </Button>
        </Box>
    );
};
