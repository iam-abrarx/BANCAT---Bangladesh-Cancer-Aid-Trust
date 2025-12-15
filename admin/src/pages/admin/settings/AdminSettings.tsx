import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Paper,
    TextField,
    Button,
    Grid,
    Switch,
    FormControlLabel,
    Divider,
    CircularProgress,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Chip,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Settings as SettingsIcon,
    Search as SearchIcon,
    Share as ShareIcon,
    Analytics as AnalyticsIcon,
    Code as CodeIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { AdminUserList } from '../users/AdminUserList';
import { AdminCompanySettings } from './AdminCompanySettings';
import { settingsService, type SeoSettings } from '../../../services/settingsService';
import toast from 'react-hot-toast';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`settings-tabpanel-${index}`}
            aria-labelledby={`settings-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

interface AdminSettingsProps {
    defaultTab?: 'administration' | 'company' | 'seo';
}

export const AdminSettings = ({ defaultTab = 'administration' }: AdminSettingsProps) => {
    const getInitialTab = () => {
        if (defaultTab === 'company') return 1;
        if (defaultTab === 'seo') return 2;
        return 0;
    };
    const [tabValue, setTabValue] = useState(getInitialTab());
    const [seoSettings, setSeoSettings] = useState<SeoSettings | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [newSocialLink, setNewSocialLink] = useState('');

    useEffect(() => {
        if (tabValue === 2) {
            fetchSeoSettings();
        }
    }, [tabValue]);

    const fetchSeoSettings = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await settingsService.getSeoSettings();
            setSeoSettings(data);
        } catch (err: unknown) {
            console.error('Failed to fetch SEO settings:', err);
            setError('Failed to load SEO settings');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: keyof SeoSettings, value: string | boolean) => {
        if (!seoSettings) return;
        setSeoSettings({ ...seoSettings, [field]: value });
    };

    const handleOrgChange = (field: keyof SeoSettings['structured_data_org'], value: string | string[]) => {
        if (!seoSettings) return;
        setSeoSettings({
            ...seoSettings,
            structured_data_org: {
                ...seoSettings.structured_data_org,
                [field]: value,
            },
        });
    };

    const addSocialLink = () => {
        if (!newSocialLink.trim() || !seoSettings) return;
        const currentLinks = seoSettings.structured_data_org.sameAs || [];
        handleOrgChange('sameAs', [...currentLinks, newSocialLink.trim()]);
        setNewSocialLink('');
    };

    const removeSocialLink = (index: number) => {
        if (!seoSettings) return;
        const currentLinks = seoSettings.structured_data_org.sameAs || [];
        handleOrgChange('sameAs', currentLinks.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (!seoSettings) return;
        setSaving(true);
        try {
            await settingsService.updateSeoSettings(seoSettings);
            toast.success('SEO settings saved successfully!');
        } catch (err: unknown) {
            console.error('Failed to save SEO settings:', err);
            toast.error('Failed to save SEO settings');
        } finally {
            setSaving(false);
        }
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <SettingsIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Settings
                </Typography>
            </Box>

            <Paper sx={{ borderRadius: '16px', overflow: 'hidden' }} elevation={0}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="settings tabs"
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                minHeight: 56,
                            },
                        }}
                    >
                        <Tab label="Administration" id="settings-tab-0" aria-controls="settings-tabpanel-0" />
                        <Tab label="Company Information" id="settings-tab-1" aria-controls="settings-tabpanel-1" />
                        <Tab label="SEO" id="settings-tab-2" aria-controls="settings-tabpanel-2" />
                    </Tabs>
                </Box>

                <Box sx={{ p: 3 }}>
                    <TabPanel value={tabValue} index={0}>
                        <AdminUserList />
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <AdminCompanySettings />
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                                <CircularProgress />
                            </Box>
                        ) : error ? (
                            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
                        ) : seoSettings ? (
                            <Box>
                                {/* Basic SEO */}
                                <Accordion defaultExpanded sx={{ mb: 2, borderRadius: '12px !important', '&:before': { display: 'none' } }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <SearchIcon color="primary" />
                                            <Typography fontWeight={600}>Basic SEO</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Site Title"
                                                    value={seoSettings.site_title}
                                                    onChange={(e) => handleChange('site_title', e.target.value)}
                                                    helperText="Default title for pages without a custom title"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Locale"
                                                    value={seoSettings.locale}
                                                    onChange={(e) => handleChange('locale', e.target.value)}
                                                    helperText="e.g., en_US, bn_BD"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={2}
                                                    label="Site Description"
                                                    value={seoSettings.site_description}
                                                    onChange={(e) => handleChange('site_description', e.target.value)}
                                                    helperText="Default meta description (recommended: 150-160 characters)"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Keywords"
                                                    value={seoSettings.site_keywords}
                                                    onChange={(e) => handleChange('site_keywords', e.target.value)}
                                                    helperText="Comma-separated keywords"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={seoSettings.allow_indexing}
                                                            onChange={(e) => handleChange('allow_indexing', e.target.checked)}
                                                        />
                                                    }
                                                    label="Allow Search Engine Indexing"
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>

                                {/* Social Media */}
                                <Accordion sx={{ mb: 2, borderRadius: '12px !important', '&:before': { display: 'none' } }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <ShareIcon color="primary" />
                                            <Typography fontWeight={600}>Social Media & Open Graph</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Default OG Image URL"
                                                    value={seoSettings.og_image}
                                                    onChange={(e) => handleChange('og_image', e.target.value)}
                                                    helperText="Image shown when sharing on social media"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Twitter Handle"
                                                    value={seoSettings.twitter_handle}
                                                    onChange={(e) => handleChange('twitter_handle', e.target.value)}
                                                    placeholder="@yourhandle"
                                                    helperText="For Twitter Card attribution"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider sx={{ my: 1 }}><Typography variant="caption">Organization Schema</Typography></Divider>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Organization Name"
                                                    value={seoSettings.structured_data_org.name}
                                                    onChange={(e) => handleOrgChange('name', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Organization URL"
                                                    value={seoSettings.structured_data_org.url}
                                                    onChange={(e) => handleOrgChange('url', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Organization Logo URL"
                                                    value={seoSettings.structured_data_org.logo}
                                                    onChange={(e) => handleOrgChange('logo', e.target.value)}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Social Profiles</Typography>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                                    {(seoSettings.structured_data_org.sameAs || []).map((link, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={link}
                                                            onDelete={() => removeSocialLink(index)}
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <TextField
                                                        size="small"
                                                        placeholder="Add social profile URL"
                                                        value={newSocialLink}
                                                        onChange={(e) => setNewSocialLink(e.target.value)}
                                                        onKeyPress={(e) => e.key === 'Enter' && addSocialLink()}
                                                        sx={{ flex: 1 }}
                                                    />
                                                    <IconButton onClick={addSocialLink} color="primary">
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>

                                {/* Analytics */}
                                <Accordion sx={{ mb: 2, borderRadius: '12px !important', '&:before': { display: 'none' } }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <AnalyticsIcon color="primary" />
                                            <Typography fontWeight={600}>Analytics & Tracking</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Google Analytics ID"
                                                    value={seoSettings.google_analytics_id}
                                                    onChange={(e) => handleChange('google_analytics_id', e.target.value)}
                                                    placeholder="G-XXXXXXXXXX"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Google Tag Manager ID"
                                                    value={seoSettings.google_tag_manager_id}
                                                    onChange={(e) => handleChange('google_tag_manager_id', e.target.value)}
                                                    placeholder="GTM-XXXXXXX"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Facebook Pixel ID"
                                                    value={seoSettings.facebook_pixel_id}
                                                    onChange={(e) => handleChange('facebook_pixel_id', e.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>

                                {/* Technical SEO */}
                                <Accordion sx={{ mb: 2, borderRadius: '12px !important', '&:before': { display: 'none' } }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CodeIcon color="primary" />
                                            <Typography fontWeight={600}>Technical SEO</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Google Site Verification"
                                                    value={seoSettings.google_site_verification}
                                                    onChange={(e) => handleChange('google_site_verification', e.target.value)}
                                                    helperText="Google Search Console verification code"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Bing Site Verification"
                                                    value={seoSettings.bing_site_verification}
                                                    onChange={(e) => handleChange('bing_site_verification', e.target.value)}
                                                    helperText="Bing Webmaster verification code"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Canonical URL Base"
                                                    value={seoSettings.canonical_url_base}
                                                    onChange={(e) => handleChange('canonical_url_base', e.target.value)}
                                                    placeholder="https://bancat.org"
                                                    helperText="Base URL for canonical tags"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    label="Robots.txt Content"
                                                    value={seoSettings.robots_txt_content}
                                                    onChange={(e) => handleChange('robots_txt_content', e.target.value)}
                                                    helperText="Custom robots.txt directives"
                                                    sx={{ fontFamily: 'monospace' }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>

                                {/* Save Button */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleSave}
                                        disabled={saving}
                                        sx={{ borderRadius: '10px', px: 4, textTransform: 'none' }}
                                    >
                                        {saving ? 'Saving...' : 'Save SEO Settings'}
                                    </Button>
                                </Box>
                            </Box>
                        ) : null}
                    </TabPanel>
                </Box>
            </Paper>
        </Box>
    );
};
