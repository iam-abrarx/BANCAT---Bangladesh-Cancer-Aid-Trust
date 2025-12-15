import {
    Dialog, DialogTitle, DialogContent,
    TextField, Button, Box, Select, MenuItem,
    InputLabel, FormControl, Typography, Stack, Grid
} from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { donationService } from '../../services/donationService';

interface DonationModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    targetId: number;
    targetType: 'patient' | 'campaign';
}

const PRESET_AMOUNTS = [100, 500, 1000, 5000];

export const DonationModal = ({ open, onClose, title, targetId, targetType }: DonationModalProps) => {
    const [amount, setAmount] = useState<number | string>(500);
    const [method, setMethod] = useState('bkash');

    const mutation = useMutation({
        mutationFn: donationService.initiate,
        onSuccess: (data) => {
            // Redirect to payment gateway mock
            window.location.href = data.payment_url;
        },
        onError: (error) => {
            console.error('Donation failed', error);
            alert('Failed to initiate donation');
        }
    });

    const handleSubmit = () => {
        if (!amount || Number(amount) < 10) return;

        mutation.mutate({
            amount: Number(amount),
            payment_method: method,
            patient_id: targetType === 'patient' ? targetId : undefined,
            campaign_id: targetType === 'campaign' ? targetId : undefined,
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Donate to {title}</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <Typography gutterBottom variant="subtitle2">Select Amount (BDT)</Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        {PRESET_AMOUNTS.map((preset) => (
                            <Grid item xs={3} key={preset}>
                                <Button
                                    variant={Number(amount) === preset ? 'contained' : 'outlined'}
                                    fullWidth
                                    onClick={() => setAmount(preset)}
                                >
                                    ৳{preset}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>

                    <TextField
                        label="Custom Amount"
                        type="number"
                        fullWidth
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        sx={{ mb: 3 }}
                        InputProps={{ inputProps: { min: 10 } }}
                    />

                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel>Payment Method</InputLabel>
                        <Select value={method} label="Payment Method" onChange={(e) => setMethod(e.target.value)}>
                            <MenuItem value="bkash">Bkash</MenuItem>
                            <MenuItem value="nagad" disabled>Nagad (Coming Soon)</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSubmit}
                            disabled={mutation.isPending || Number(amount) < 10}
                        >
                            {mutation.isPending ? 'Processing...' : 'Proceed to Pay'}
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
