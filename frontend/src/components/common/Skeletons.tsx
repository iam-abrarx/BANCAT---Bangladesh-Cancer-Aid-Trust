import { Grid, Card, CardContent, Skeleton, Box } from '@mui/material';

interface ListSkeletonProps {
    count?: number;
}

export const CardSkeleton = () => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Image Skeleton */}
            <Skeleton variant="rectangular" height={200} />

            <CardContent sx={{ flexGrow: 1 }}>
                {/* Title and Meta */}
                <Box sx={{ mb: 2 }}>
                    <Skeleton variant="text" height={32} width="80%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={20} width="40%" />
                </Box>

                {/* Content Lines */}
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} width="80%" />

                {/* Progress Bar (if applicable) */}
                <Box sx={{ mt: 3 }}>
                    <Skeleton variant="text" height={20} width="30%" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={10} borderRadius={5} />
                </Box>
            </CardContent>
        </Card>
    );
};

export const ListSkeleton = ({ count = 6 }: ListSkeletonProps) => {
    return (
        <Grid container spacing={3}>
            {Array.from(new Array(count)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <CardSkeleton />
                </Grid>
            ))}
        </Grid>
    );
};
