import { useState, useMemo } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    Paper,
    Grid,
    Divider,
    Button,
    LinearProgress,
    InputAdornment,
    Tooltip,
    Stack,
    Alert,
    IconButton,
    Collapse,
} from '@mui/material';
import {
    InfoOutlined,
    RestartAlt,
    VolunteerActivism,
    KeyboardArrowDown,
} from '@mui/icons-material';
import { useDonationDrawer } from '../contexts/DonationDrawerContext';

// Constants
const GOLD_PRICE_PER_GRAM = 9000;
const SILVER_PRICE_PER_GRAM = 150;
const NISAB_GOLD_GRAMS = 85;
const NISAB_SILVER_GRAMS = 595;
const NISAB_GOLD = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM;
const NISAB_SILVER = NISAB_SILVER_GRAMS * SILVER_PRICE_PER_GRAM;
const ZAKAT_RATE = 0.025;

interface WealthData {
    cash: number;
    gold: number;
    silver: number;
    businessInventory: number;
    savings: number;
    investments: number;
    rentIncome: number;
    debts: number;
}

// Sub-components moved outside to prevent re-mounting on every render
const InputField = ({ label, field, tooltip, placeholder, value, onChange }: {
    label: string,
    field: keyof WealthData,
    tooltip?: string,
    placeholder?: string,
    value: number,
    onChange: (field: keyof WealthData) => (event: React.ChangeEvent<HTMLInputElement>) => void
}) => (
    <Grid item xs={12} sm={6}>
        <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {label}
            </Typography>
            {tooltip && (
                <Tooltip title={tooltip} arrow placement="top">
                    <InfoOutlined sx={{ fontSize: 14, color: 'text.disabled', cursor: 'help', '&:hover': { color: 'primary.main' } }} />
                </Tooltip>
            )}
        </Box>
        <TextField
            fullWidth
            placeholder={placeholder || "0"}
            variant="outlined"
            size="small"
            type="number"
            value={value || ''}
            onChange={onChange(field)}
            InputProps={{
                startAdornment: <InputAdornment position="start"><Typography color="text.disabled" fontSize="0.9rem">৳</Typography></InputAdornment>,
                sx: {
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    fontSize: '0.95rem',
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&:hover fieldset': { borderColor: '#bdbdbd' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                }
            }}
        />
    </Grid>
);

const SectionHeader = ({ title, isOpen, onToggle }: { title: string, isOpen: boolean, onToggle: () => void }) => (
    <Box
        onClick={onToggle}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            userSelect: 'none',
            py: 1.5,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' }
        }}
    >
        <Typography variant="h6" fontSize="1.1rem" fontWeight={600} color="text.primary">
            {title}
        </Typography>
        <IconButton size="small" sx={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>
            <KeyboardArrowDown />
        </IconButton>
    </Box>
);

export const ZakatCalculator = () => {
    const [wealth, setWealth] = useState<WealthData>({
        cash: 0,
        gold: 0,
        silver: 0,
        businessInventory: 0,
        savings: 0,
        investments: 0,
        rentIncome: 0,
        debts: 0,
    });

    // UI State for categories (all open by default for visibility)
    const [openSections, setOpenSections] = useState({
        metals: true,
        cash: true,
        business: true,
        debts: true
    });

    const { openDrawer } = useDonationDrawer();

    const calculations = useMemo(() => {
        const totalWealth =
            wealth.cash +
            wealth.gold +
            wealth.silver +
            wealth.businessInventory +
            wealth.savings +
            wealth.investments +
            wealth.rentIncome;

        const eligibleWealth = Math.max(0, totalWealth - wealth.debts);
        const nisabThreshold = NISAB_SILVER;
        const nisabMet = eligibleWealth >= nisabThreshold;
        const zakatAmount = nisabMet ? eligibleWealth * ZAKAT_RATE : 0;
        const nisabProgress = Math.min((eligibleWealth / nisabThreshold) * 100, 100);

        return { totalWealth, eligibleWealth, nisabThreshold, nisabMet, zakatAmount, nisabProgress };
    }, [wealth]);

    const handleInputChange = (field: keyof WealthData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value) || 0;
        setWealth(prev => ({ ...prev, [field]: Math.max(0, value) }));
    };

    const handleReset = () => {
        setWealth({
            cash: 0, gold: 0, silver: 0, businessInventory: 0,
            savings: 0, investments: 0, rentIncome: 0, debts: 0,
        });
    };

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency', currency: 'BDT',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F8F9FA', py: { xs: 4, md: 8 } }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 5, textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        fontWeight={800}
                        sx={{
                            letterSpacing: '-1px',
                            color: '#1a1a1a',
                            fontSize: { xs: '2.5rem', md: '3rem' }
                        }}
                    >
                        Zakat Calculator
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 600, mx: 'auto' }}>
                        Establish your annual Zakat obligation with clarity and precision.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* LEFT COLUMN: Input Form */}
                    <Grid item xs={12} md={8}>
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                overflow: 'hidden'
                            }}
                        >
                            <Box sx={{ p: 4 }}>
                                {/* Section 1: Cash & Liquid Assets */}
                                <SectionHeader
                                    title="01. Cash & Savings"
                                    isOpen={openSections.cash}
                                    onToggle={() => toggleSection('cash')}
                                />
                                <Collapse in={openSections.cash}>
                                    <Grid container spacing={3} sx={{ mb: 2, mt: 0 }}>
                                        <InputField
                                            field="cash"
                                            label="Cash in Hand & Bank"
                                            tooltip="Value of all cash balances in hand and bank accounts"
                                            placeholder="e.g. 50,000"
                                            value={wealth.cash}
                                            onChange={handleInputChange}
                                        />
                                        <InputField
                                            field="savings"
                                            label="Savings & Deposits"
                                            tooltip="Value of FDR, DPS, and other liquid savings"
                                            placeholder="e.g. 100,000"
                                            value={wealth.savings}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Collapse>

                                <Divider sx={{ my: 2, opacity: 0.6 }} />

                                {/* Section 2: Precious Metals */}
                                <SectionHeader
                                    title="02. Precious Metals"
                                    isOpen={openSections.metals}
                                    onToggle={() => toggleSection('metals')}
                                />
                                <Collapse in={openSections.metals}>
                                    <Grid container spacing={3} sx={{ mb: 2, mt: 0 }}>
                                        <InputField
                                            field="gold"
                                            label="Gold Value"
                                            tooltip="Current market value of all gold jewelry, bars, or coins"
                                            placeholder={`Rate ≈ ${formatCurrency(GOLD_PRICE_PER_GRAM)}/g`}
                                            value={wealth.gold}
                                            onChange={handleInputChange}
                                        />
                                        <InputField
                                            field="silver"
                                            label="Silver Value"
                                            tooltip="Current market value of all silver items"
                                            placeholder={`Rate ≈ ${formatCurrency(SILVER_PRICE_PER_GRAM)}/g`}
                                            value={wealth.silver}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Collapse>

                                <Divider sx={{ my: 2, opacity: 0.6 }} />

                                {/* Section 3: Business & Investments */}
                                <SectionHeader
                                    title="03. Business & Investments"
                                    isOpen={openSections.business}
                                    onToggle={() => toggleSection('business')}
                                />
                                <Collapse in={openSections.business}>
                                    <Grid container spacing={3} sx={{ mb: 2, mt: 0 }}>
                                        <InputField
                                            field="investments"
                                            label="Stock & Investments"
                                            tooltip="Current value of shares and other investments"
                                            value={wealth.investments}
                                            onChange={handleInputChange}
                                        />
                                        <InputField
                                            field="businessInventory"
                                            label="Business Inventory"
                                            tooltip="Market value of trade goods and raw materials"
                                            value={wealth.businessInventory}
                                            onChange={handleInputChange}
                                        />
                                        <InputField
                                            field="rentIncome"
                                            label="Accumulated Rent Income"
                                            tooltip="Rent income currently held in hand"
                                            value={wealth.rentIncome}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Collapse>

                                <Divider sx={{ my: 2, opacity: 0.6 }} />

                                {/* Section 4: Liabilities */}
                                <SectionHeader
                                    title="04. Deductible Liabilities"
                                    isOpen={openSections.debts}
                                    onToggle={() => toggleSection('debts')}
                                />
                                <Collapse in={openSections.debts}>
                                    <Grid container spacing={3} sx={{ mt: 0 }}>
                                        <InputField
                                            field="debts"
                                            label="Immediate Debts"
                                            tooltip="Debts payable immediately. Do not include future living expenses."
                                            value={wealth.debts}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Alert severity="info" variant="standard" sx={{ mt: 2, borderRadius: 2, '& .MuiAlert-message': { fontSize: '0.85rem' } }}>
                                        Only deduct debts that are due immediately or within the current Zakat year. Long-term housing loans are typically not fully deductible.
                                    </Alert>
                                </Collapse>
                            </Box>

                            <Box sx={{ bgcolor: '#F8F9FA', px: 4, py: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    onClick={handleReset}
                                    startIcon={<RestartAlt />}
                                    size="small"
                                    sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: 'transparent' } }}
                                >
                                    Clear All Values
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* RIGHT COLUMN: Summary & Action */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ position: 'sticky', top: 24, zIndex: 10 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: calculations.nisabMet ? 'primary.main' : 'divider',
                                    bgcolor: calculations.nisabMet ? '#F4FBF7' : 'white',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <Typography variant="overline" color="text.secondary" fontWeight={700} letterSpacing={1}>
                                    Calculation Summary
                                </Typography>

                                <Stack spacing={2} sx={{ mt: 3, mb: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" color="text.secondary">Total Assets</Typography>
                                        <Typography variant="body1" fontWeight={500}>{formatCurrency(calculations.totalWealth)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" color="text.secondary">Liabilities</Typography>
                                        <Typography variant="body1" color="error.main">-{formatCurrency(wealth.debts)}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>Net Eligible Wealth</Typography>
                                            <Typography variant="caption" color="text.secondary" display="block">
                                                Nisab: {formatCurrency(NISAB_SILVER)}
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6" fontWeight={700}>{formatCurrency(calculations.eligibleWealth)}</Typography>
                                    </Box>
                                </Stack>

                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="caption" fontWeight={600} color={calculations.nisabMet ? 'success.main' : 'text.disabled'} sx={{ mb: 1, display: 'block' }}>
                                        {calculations.nisabMet ? '✓ ELIGIBLE FOR ZAKAT' : 'BELOW THRESHOLD'}
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={calculations.nisabProgress}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            bgcolor: 'rgba(0,0,0,0.05)',
                                            '& .MuiLinearProgress-bar': {
                                                bgcolor: calculations.nisabMet ? 'success.main' : 'text.disabled',
                                                borderRadius: 4
                                            }
                                        }}
                                    />
                                </Box>

                                <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'white', borderRadius: 2, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px rgba(0,0,0,0.02)' }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
                                        ESTIMATED ZAKAT PAYABLE
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                        fontWeight={700}
                                        color={calculations.nisabMet ? 'primary.main' : 'text.disabled'}
                                        sx={{
                                            letterSpacing: '-1px',
                                            fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' },
                                            wordBreak: 'break-word',
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {formatCurrency(calculations.zakatAmount)}
                                    </Typography>
                                </Box>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => openDrawer({ amount: calculations.zakatAmount, type: 'zakat' })}
                                    disabled={!calculations.nisabMet || calculations.zakatAmount <= 0}
                                    startIcon={<VolunteerActivism />}
                                    sx={{
                                        mt: 3,
                                        py: 1.8,
                                        borderRadius: 2,
                                        boxShadow: 'none',
                                        fontWeight: 600,
                                        '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
                                    }}
                                >
                                    Pay Zakat Now
                                </Button>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>

                {/* Footer Info */}
                <Box sx={{ mt: 8, borderTop: '1px solid', borderColor: 'divider', pt: 4 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" fontWeight={700} gutterBottom>About Calculation</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                Calculations are based on the Silver Nisab threshold ({NISAB_SILVER_GRAMS}g silver).
                                Value of assets should be determined based on their current market price.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" fontWeight={700} gutterBottom>Zakat Rate</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                The standard Zakat rate is 2.5% (1/40th) of your total eligible wealth once it exceeds the Nisab threshold.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" fontWeight={700} gutterBottom>Our Methodology</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                BANCAT uses the Silver Nisab to ensure maximum inclusivity for charitable giving, helping more patients access life-saving treatment.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};
