import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import type { Program } from '../../services/programService';

interface ProgramCardProps {
    program: Program;
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
    const { t, i18n } = useTranslation();
    const isBn = i18n.language === 'bn';

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="200"
                image={program.banner_image || 'https://placehold.co/600x400?text=Program'}
                alt={isBn ? program.name_bn : program.name_en}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" fontWeight={600}>
                    {isBn ? program.name_bn : program.name_en}
                </Typography>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                    {isBn ? program.tagline_bn : program.tagline_en}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                }}>
                    {isBn ? program.description_bn : program.description_en}
                </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    variant="outlined"
                    fullWidth
                    component={RouterLink}
                    to={`/programs/${program.slug}`}
                >
                    {t('action.learn_more', 'Learn More')}
                </Button>
            </CardActions>
        </Card>
    );
};
