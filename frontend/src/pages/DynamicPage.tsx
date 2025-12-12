import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Paper, useTheme, alpha } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { motion } from 'framer-motion';

interface PageData {
    title_en: string;
    content_en: string;
    meta_title_en: string;
    meta_description_en: string;
}

interface DynamicPageProps {
    slug?: string;
}

export const DynamicPage = ({ slug: propSlug }: DynamicPageProps) => {
    const { slug: paramSlug } = useParams<{ slug: string }>();
    const [page, setPage] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(true);
            try {
                let fetchSlug = propSlug || paramSlug;

                if (!fetchSlug) {
                    const path = window.location.pathname.substring(1);
                    fetchSlug = path;
                }

                if (fetchSlug?.includes('/')) {
                    const parts = fetchSlug.split('/');
                    fetchSlug = parts[parts.length - 1];
                }

                const response = await axios.get(`/api/v1/pages/${fetchSlug}`);
                setPage(response.data);
                setError(null);
            } catch (err) {
                setError('Page not found');
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [propSlug, paramSlug]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '80vh', alignItems: 'center' }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    if (error || !page) {
        return (
            <Container sx={{ py: 20, textAlign: 'center' }}>
                <Typography variant="h3" color="error" fontWeight="bold">
                    {error || 'Page not found'}
                </Typography>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Helmet>
                <title>{page.meta_title_en || page.title_en} | BANcat</title>
                <meta name="description" content={page.meta_description_en || ''} />
            </Helmet>

            {/* Simple Elegant Hero for Pages */}
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                sx={{
                    bgcolor: 'secondary.main',
                    background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
                    py: { xs: 8, md: 12 },
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative Circles */}
                <Box sx={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'white', opacity: 0.05 }} />
                <Box sx={{ position: 'absolute', bottom: -30, right: 10, width: 100, height: 100, borderRadius: '50%', bgcolor: 'white', opacity: 0.1 }} />

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography
                        variant="h2"
                        component={motion.h1}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        fontWeight="800"
                        sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
                    >
                        {page.title_en}
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ mt: -6, position: 'relative', zIndex: 3, pb: 10 }}>
                <Paper
                    component={motion.div}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    elevation={3}
                    sx={{
                        p: { xs: 4, md: 8 },
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                    }}
                >
                    <div
                        className="dynamic-content-area"
                    />
                    <Box sx={{
                        '& .program-content, & .services-page, & .privacy-policy, & .terms-of-use, & .refund-policy': {
                            // Wrapper styles if needed
                        },
                        '& h2': { fontSize: '2rem', fontWeight: 700, color: 'secondary.main', mt: 4, mb: 2, borderLeft: `6px solid ${theme.palette.secondary.main}`, pl: 2 },
                        '& h3': { fontSize: '1.5rem', fontWeight: 600, color: 'text.primary', mt: 4, mb: 1.5 },
                        '& p': { fontSize: '1.15rem', lineHeight: 1.8, mb: 2.5, color: 'text.secondary' },
                        '& ul': { mb: 3, pl: 0, listStyle: 'none' },
                        '& li': { position: 'relative', pl: 4, mb: 1.5, fontSize: '1.1rem', color: 'text.secondary' },
                        '& li::before': { content: '"✓"', position: 'absolute', left: 0, color: 'success.main', fontWeight: 'bold' },
                        '& table': { width: '100%', borderCollapse: 'collapse', my: 4, boxShadow: theme.shadows[1], borderRadius: 2, overflow: 'hidden' },
                        '& th': { bgcolor: 'grey.100', p: 2, fontWeight: 700, textAlign: 'left', color: 'text.primary' },
                        '& td': { p: 2, borderBottom: '1px solid #eee' },
                        '& img': { maxWidth: '100%', height: 'auto', borderRadius: 4, my: 4, boxShadow: theme.shadows[3] },
                        '& .service-item': { mb: 5, p: 4, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid #eee' }
                    }}>
                        <div key={page.title_en} dangerouslySetInnerHTML={{ __html: page.content_en }} />
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};
