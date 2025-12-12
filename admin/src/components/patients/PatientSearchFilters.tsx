import { Box, TextField, MenuItem, Select, FormControl, InputLabel, Stack, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Search } from '@mui/icons-material';

interface PatientSearchFiltersProps {
    onSearch: (filters: any) => void;
}

export const PatientSearchFilters = ({ onSearch }: PatientSearchFiltersProps) => {
    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // logic to collect filter data
        const formData = new FormData(e.target as HTMLFormElement);
        onSearch({
            search: formData.get('search'),
            cancer_type: formData.get('cancer_type'),
            district: formData.get('district'),
            sort: formData.get('sort')
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 6, p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                    name="search"
                    label={t('common.search', 'Search')}
                    placeholder="Name or Code..."
                    variant="outlined"
                    fullWidth
                    InputProps={{ endAdornment: <Search color="action" /> }}
                />

                <FormControl fullWidth sx={{ minWidth: 200 }}>
                    <InputLabel>{t('patient.cancer_type', 'Cancer Type')}</InputLabel>
                    <Select name="cancer_type" label={t('patient.cancer_type', 'Cancer Type')} defaultValue="">
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="Leukemia">Leukemia</MenuItem>
                        <MenuItem value="Breast Cancer">Breast Cancer</MenuItem>
                        <MenuItem value="Lung Cancer">Lung Cancer</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ minWidth: 200 }}>
                    <InputLabel>{t('patient.location', 'District')}</InputLabel>
                    <Select name="district" label={t('patient.location', 'District')} defaultValue="">
                        <MenuItem value="">All Districts</MenuItem>
                        <MenuItem value="Dhaka">Dhaka</MenuItem>
                        <MenuItem value="Chittagong">Chittagong</MenuItem>
                        <MenuItem value="Sylhet">Sylhet</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ minWidth: 200 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select name="sort" label="Sort By" defaultValue="newest">
                        <MenuItem value="newest">Newest</MenuItem>
                        <MenuItem value="oldest">Oldest</MenuItem>
                        <MenuItem value="goal_high">Goal: High to Low</MenuItem>
                        <MenuItem value="goal_low">Goal: Low to High</MenuItem>
                        <MenuItem value="raised_high">Most Funded</MenuItem>
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" size="large" sx={{ minWidth: 120 }}>
                    {t('common.filter', 'Filter')}
                </Button>
            </Stack>
        </Box>
    );
};
