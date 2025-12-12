import { Breadcrumbs, Link, Typography, Container, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';

export const BreadcrumbsComponent = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Don't show on home page
    if (pathnames.length === 0) {
        return null;
    }

    return (
        <Box sx={{ bgcolor: 'grey.50', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Container>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
                    <Link component={RouterLink} to="/" color="inherit" underline="hover">
                        Home
                    </Link>
                    {pathnames.map((value, index) => {
                        const last = index === pathnames.length - 1;
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                        // Decode URI component to handle spaces/special chars in URLs if any
                        const formattedValue = decodeURIComponent(value).replace(/-/g, ' ');
                        const capitalizedValue = formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);

                        return last ? (
                            <Typography color="text.primary" key={to}>
                                {capitalizedValue}
                            </Typography>
                        ) : (
                            <Link component={RouterLink} to={to} color="inherit" underline="hover" key={to}>
                                {capitalizedValue}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            </Container>
        </Box>
    );
};
