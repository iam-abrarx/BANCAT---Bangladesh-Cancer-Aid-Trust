import { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
    Typography,
    TextField,
    Button,
    Container
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { RichTextEditor } from '../RichTextEditor';

interface Page {
    id: number;
    slug: string;
    title_en: string;
    content_en: string;
    is_published: boolean;
}

const API_URL = 'http://localhost:8000/api/v1/admin/pages';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
        },
    };
};

export const PageEditor = () => {
    const [pages, setPages] = useState<Page[]>([]);
    const [selectedPage, setSelectedPage] = useState<Page | null>(null);
    const { register, handleSubmit, setValue, reset, control } = useForm();
    const [isSaving, setIsSaving] = useState(false);

    const fetchPages = async () => {
        try {
            const response = await axios.get(API_URL, getAuthHeader());
            setPages(response.data.data || response.data);
        } catch (error) {
            console.error('Error fetching pages:', error);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handlePageSelect = (page: Page) => {
        setSelectedPage(page);
        setValue('title_en', page.title_en);
        setValue('content_en', page.content_en);
    };

    const onSubmit = async (data: any) => {
        if (!selectedPage) return;
        setIsSaving(true);
        try {
            await axios.put(`${API_URL}/${selectedPage.id}`, {
                ...data,
                slug: selectedPage.slug // Ensure slug is preserved
            }, getAuthHeader());

            // Update local state
            const updatedPages = pages.map(p =>
                p.id === selectedPage.id ? { ...p, ...data } : p
            );
            setPages(updatedPages);
            setSelectedPage({ ...selectedPage, ...data });
            alert('Page updated successfully');
        } catch (error) {
            console.error('Error updating page:', error);
            alert('Failed to update page');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '600px', border: 1, borderColor: 'divider', borderRadius: 1 }}>
            {/* Sidebar List */}
            <Box sx={{ width: 250, borderRight: 1, borderColor: 'divider', overflowY: 'auto' }}>
                <List>
                    {pages.map((page) => (
                        <ListItem key={page.id} disablePadding>
                            <ListItemButton
                                selected={selectedPage?.id === page.id}
                                onClick={() => handlePageSelect(page)}
                            >
                                <ListItemText
                                    primary={page.title_en}
                                    secondary={page.slug}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Editor Area */}
            <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
                {selectedPage ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6">Editing: {selectedPage.title_en}</Typography>
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                type="submit"
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </Box>

                        <TextField
                            label="Page Title"
                            fullWidth
                            sx={{ mb: 3 }}
                            {...register('title_en', { required: true })}
                        />

                        <Box sx={{ mb: 3 }}>
                            <Typography gutterBottom>Content</Typography>
                            <Controller
                                name="content_en"
                                control={control}
                                render={({ field }) => (
                                    <RichTextEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                        height={400}
                                    />
                                )}
                            />
                        </Box>
                    </form>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.secondary' }}>
                        <Typography>Select a page from the left to edit</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
