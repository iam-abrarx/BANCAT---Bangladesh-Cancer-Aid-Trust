import { useForm, Controller } from 'react-hook-form';
import { Box, Paper, TextField, Button, Grid, Typography, FormControlLabel, Switch, Alert, MenuItem } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { storyService } from '../../../services/storyService';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

interface StoryFormData {
    name_en: string;
    name_bn: string;
    subject_name_en: string;
    subject_name_bn: string;
    type: string;
    content_en: string;
    content_bn: string;
    excerpt_en: string;
    excerpt_bn: string;
    featured_image: string;
    video_url: string;
    is_published: boolean;
    is_featured: boolean;
}

export const AdminStoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditMode = !!id;

    const { control, handleSubmit, formState: { errors } } = useForm<StoryFormData>({
        defaultValues: {
            name_en: '',
            name_bn: '',
            subject_name_en: '',
            subject_name_bn: '',
            type: 'survivor',
            content_en: '',
            content_bn: '',
            excerpt_en: '',
            excerpt_bn: '',
            featured_image: '',
            video_url: '',
            is_published: true,
            is_featured: false,
        }
    });

    const mutation = useMutation({
        mutationFn: (data: StoryFormData) => {
            if (isEditMode) {
                return storyService.updateStory(Number(id), data);
            }
            return storyService.createStory(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-stories'] });
            navigate('/admin/stories');
        },
    });

    const onSubmit = (data: StoryFormData) => {
        mutation.mutate(data);
    };

    if (mutation.isPending) return <LoadingSpinner />;

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {isEditMode ? 'Edit Story' : 'Add New Story'}
            </Typography>

            <Paper sx={{ p: 4 }}>
                {mutation.isError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {(mutation.error as any)?.response?.data?.message || 'An error occurred'}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="name_en"
                                control={control}
                                rules={{ required: 'Title (English) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Title (English)" fullWidth required error={!!errors.name_en} helperText={errors.name_en?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="name_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Title (Bangla)" fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="subject_name_en"
                                control={control}
                                rules={{ required: 'Subject Name (English) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Subject Name (English)" fullWidth required error={!!errors.subject_name_en} helperText={errors.subject_name_en?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="subject_name_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Subject Name (Bangla)" fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="type"
                                control={control}
                                rules={{ required: 'Type is required' }}
                                render={({ field }) => (
                                    <TextField {...field} select label="Story Type" fullWidth required>
                                        <MenuItem value="survivor">Survivor</MenuItem>
                                        <MenuItem value="caregiver">Caregiver</MenuItem>
                                        <MenuItem value="volunteer">Volunteer</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="featured_image"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Featured Image URL" fullWidth placeholder="https://..." />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="content_en"
                                control={control}
                                rules={{ required: 'Content (English) is required' }}
                                render={({ field }) => (
                                    <TextField {...field} label="Content (English)" multiline rows={6} fullWidth required error={!!errors.content_en} helperText={errors.content_en?.message} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="content_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Content (Bangla)" multiline rows={6} fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="excerpt_en"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Excerpt (English) - Short Summary" multiline rows={2} fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="excerpt_bn"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Excerpt (Bangla)" multiline rows={2} fullWidth />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="video_url"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Video URL (Optional)" fullWidth placeholder="https://youtube.com/..." />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="is_published"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Switch checked={field.value} onChange={field.onChange} />}
                                        label="Published (Visible to public)"
                                    />
                                )}
                            />
                            <Controller
                                name="is_featured"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Switch checked={field.value} onChange={field.onChange} />}
                                        label="Featured Story"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button variant="outlined" onClick={() => navigate('/admin/stories')}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" size="large">
                                {isEditMode ? 'Update Story' : 'Create Story'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};
