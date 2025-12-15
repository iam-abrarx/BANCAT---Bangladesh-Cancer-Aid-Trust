import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    CircularProgress,
    Alert,
    Paper,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Share as ShareIcon,
    Article as FooterIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { settingsService, type CompanySettings, type SocialProfile } from '../../../services/settingsService';
import toast from 'react-hot-toast';

const socialPlatforms = [
    'Facebook',
    'Twitter',
    'Instagram',
    'LinkedIn',
    'YouTube',
    'TikTok',
    'WhatsApp',
    'Telegram',
];

export const AdminCompanySettings = () => {
    const [settings, setSettings] = useState<CompanySettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await settingsService.getCompanySettings();
            setSettings(data);
        } catch (err: unknown) {
            console.error('Failed to fetch company settings:', err);
            setError('Failed to load company settings');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: keyof CompanySettings, value: string) => {
        if (!settings) return;
        setSettings({ ...settings, [field]: value });
    };

    const handleSocialChange = (index: number, field: keyof SocialProfile, value: string) => {
        if (!settings) return;
        const newProfiles = [...settings.social_profiles];
        newProfiles[index] = { ...newProfiles[index], [field]: value };
        setSettings({ ...settings, social_profiles: newProfiles });
    };

    const addSocialProfile = () => {
        if (!settings) return;
        setSettings({
            ...settings,
            social_profiles: [...settings.social_profiles, { platform: '', url: '' }],
        });
    };

    const removeSocialProfile = (index: number) => {
        if (!settings) return;
        const newProfiles = settings.social_profiles.filter((_, i) => i !== index);
        setSettings({ ...settings, social_profiles: newProfiles });
    };

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        try {
            await settingsService.updateCompanySettings(settings);
            toast.success('Company settings saved successfully!');
        } catch (err: unknown) {
            console.error('Failed to save company settings:', err);
            toast.error('Failed to save company settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>;
    }

    if (!settings) return null;

    return (
        <Box>
            {/* Address Section */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }} elevation={0} variant="outlined">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <LocationIcon color="primary" />
                    <Typography variant="h6" fontWeight={600}>Address</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Add your organization's address information
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Street Address"
                            value={settings.street}
                            onChange={(e) => handleChange('street', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="City"
                            value={settings.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="State/Division"
                            value={settings.state}
                            onChange={(e) => handleChange('state', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="ZIP/Postal Code"
                            value={settings.zip}
                            onChange={(e) => handleChange('zip', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            value={settings.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Contact Section */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }} elevation={0} variant="outlined">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <PhoneIcon color="primary" />
                    <Typography variant="h6" fontWeight={600}>Contact Information</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Contact Number"
                            value={settings.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="+880 1XXX-XXXXXX"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={settings.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Website"
                            value={settings.website}
                            onChange={(e) => handleChange('website', e.target.value)}
                            placeholder="https://bancat.org"
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Social Profiles Section */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }} elevation={0} variant="outlined">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <ShareIcon color="primary" />
                    <Typography variant="h6" fontWeight={600}>Social Profiles</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Add your social media profiles
                </Typography>

                {settings.social_profiles.map((profile, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
                        <FormControl sx={{ minWidth: 150 }} size="small">
                            <InputLabel>Platform</InputLabel>
                            <Select
                                value={profile.platform}
                                label="Platform"
                                onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                            >
                                {socialPlatforms.map((p) => (
                                    <MenuItem key={p} value={p}>{p}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            size="small"
                            label="Profile URL"
                            value={profile.url}
                            onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                            placeholder="https://..."
                        />
                        <IconButton
                            onClick={() => removeSocialProfile(index)}
                            color="error"
                            sx={{ mt: 0.5 }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}

                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={addSocialProfile}
                    sx={{ mt: 1, textTransform: 'none' }}
                >
                    Add New Social Profile
                </Button>
            </Paper>

            {/* Footer Section */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }} elevation={0} variant="outlined">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <FooterIcon color="primary" />
                    <Typography variant="h6" fontWeight={600}>Footer</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Change your footer information
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Site Link"
                            value={settings.footer_site_link}
                            onChange={(e) => handleChange('footer_site_link', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Copyright Text"
                            value={settings.footer_copyright}
                            onChange={(e) => handleChange('footer_copyright', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="External Text"
                            value={settings.footer_external_text}
                            onChange={(e) => handleChange('footer_external_text', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="External Link"
                            value={settings.footer_external_link}
                            onChange={(e) => handleChange('footer_external_link', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Save Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                    disabled={saving}
                    sx={{ borderRadius: '10px', px: 4, textTransform: 'none' }}
                >
                    {saving ? 'Saving...' : 'Save Settings'}
                </Button>
            </Box>
        </Box>
    );
};
