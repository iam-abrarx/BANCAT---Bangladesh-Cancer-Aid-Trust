import { Box, Button, Container, Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

export const Hero = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: { xs: 8, md: 12 },
                pb: { xs: 8, md: 12 },
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
                    <Typography
                        variant="h1"
                        color="text.primary"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            mb: 3,
                        }}
                    >
                        {t('hero.headline')}
                    </Typography>

                    <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ mb: 5, lineHeight: 1.6 }}
                    >
                        {t('hero.subtext')}
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            size="large"
                            component={RouterLink}
                            to="/donate"
                            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                        >
                            {t('nav.donate')}
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            component={RouterLink}
                            to="/programs"
                            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                        >
                            {t('nav.programs')}
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};
