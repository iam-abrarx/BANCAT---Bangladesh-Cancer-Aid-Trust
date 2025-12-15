import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    height?: number | string;
    width?: number | string;
    borderRadius?: number | string;
}

export const LazyImage = ({ src, alt, height, width, borderRadius = 0, style, ...props }: LazyImageProps) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Box sx={{ position: 'relative', height, width, borderRadius, overflow: 'hidden' }}>
            {/* Skeleton Placeholder */}
            {!loaded && (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{ position: 'absolute', top: 0, left: 0 }}
                />
            )}

            {/* Actual Image */}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    ...style
                }}
                {...props}
            />
        </Box>
    );
};
