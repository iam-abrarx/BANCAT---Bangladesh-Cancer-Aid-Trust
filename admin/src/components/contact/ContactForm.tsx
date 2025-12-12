import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Alert } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { contactService, type ContactData } from '../../services/contactService';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const ContactForm = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { control, handleSubmit, reset, formState: { errors } } = useForm<ContactData>({
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    });

    const mutation = useMutation({
        mutationFn: contactService.sendContact,
        onSuccess: (data) => {
            setSuccessMsg(data.message || 'Message sent successfully!');
            setErrorMsg('');
            reset();
        },
        onError: (err: any) => {
            setErrorMsg(err.response?.data?.message || 'Failed to send message.');
            setSuccessMsg('');
        }
    });

    const onSubmit = (data: ContactData) => {
        mutation.mutate(data);
    };

    if (mutation.isPending) return <LoadingSpinner />;

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}
            {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

            <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Your Name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
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
                name="subject"
                control={control}
                rules={{ required: 'Subject is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Subject"
                        error={!!errors.subject}
                        helperText={errors.subject?.message}
                    />
                )}
            />

            <Controller
                name="message"
                control={control}
                rules={{ required: 'Message is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        label="Message"
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
                Send Message
            </Button>
        </Box>
    );
};
