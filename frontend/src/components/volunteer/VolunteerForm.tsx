import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Paper, Typography, TextField, Button, Box, Alert, MenuItem, Checkbox, ListItemText, OutlinedInput, Select, InputLabel, FormControl } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { volunteerService, type VolunteerData } from '../../services/volunteerService';
import { LoadingSpinner } from '../common/LoadingSpinner';

const SKILLS_LIST = [
    'Medical Support', 'Fundraising', 'Event Management', 'Social Media',
    'Content Writing', 'Graphic Design', 'Translation', 'Counseling', 'Driver', 'Other'
];

export const VolunteerForm = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { control, handleSubmit, reset, formState: { errors } } = useForm<VolunteerData>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            bio: '',
            skills: [],
            availability: ''
        }
    });

    const mutation = useMutation({
        mutationFn: volunteerService.apply,
        onSuccess: () => {
            setSuccessMsg('Your application has been submitted successfully! We will contact you soon.');
            setErrorMsg('');
            reset();
            window.scrollTo(0, 0);
        },
        onError: (err: any) => {
            setErrorMsg(err.response?.data?.message || 'Failed to submit application. Please try again.');
            setSuccessMsg('');
            window.scrollTo(0, 0);
        }
    });

    const onSubmit = (data: VolunteerData) => {
        mutation.mutate(data);
    };

    if (mutation.isPending) return <LoadingSpinner />;

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" align="center" color="primary">
                    Become a Volunteer
                </Typography>
                <Typography variant="body1" align="center" color="text.secondary" paragraph>
                    Join our team of dedicated individuals making a difference in the lives of cancer patients.
                </Typography>

                {successMsg && <Alert severity="success" sx={{ mb: 3 }}>{successMsg}</Alert>}
                {errorMsg && <Alert severity="error" sx={{ mb: 3 }}>{errorMsg}</Alert>}

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                                label="Full Name"
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
                        name="phone"
                        control={control}
                        rules={{ required: 'Phone number is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                label="Phone Number"
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        )}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Skills & Interests</InputLabel>
                        <Controller
                            name="skills"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    multiple
                                    input={<OutlinedInput label="Skills & Interests" />}
                                    renderValue={(selected) => (selected as string[]).join(', ')}
                                >
                                    {SKILLS_LIST.map((skill) => (
                                        <MenuItem key={skill} value={skill}>
                                            <Checkbox checked={(field.value as string[]).indexOf(skill) > -1} />
                                            <ListItemText primary={skill} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>

                    <Controller
                        name="availability"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                label="Availability (e.g., Weekends, Evenings)"
                            />
                        )}
                    />

                    <Controller
                        name="bio"
                        control={control}
                        rules={{ required: 'Please tell us why you want to join' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                label="Why do you want to volunteer?"
                                multiline
                                rows={4}
                                error={!!errors.bio}
                                helperText={errors.bio?.message}
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
                        Submit Application
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};
