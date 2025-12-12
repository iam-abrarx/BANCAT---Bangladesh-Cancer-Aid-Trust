import React, { useRef, useState } from 'react';
import { Box, Button, Typography, IconButton, Grid } from '@mui/material';
import { CloudUpload as UploadIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface ImageUploadProps {
    onFileSelect: (files: File[]) => void;
    multiple?: boolean;
    previewUrls?: string[]; // Existing URLs to show
    onRemovePreview?: (index: number) => void;
    label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    onFileSelect,
    multiple = false,
    previewUrls = [],
    onRemovePreview,
    label = "Upload Image"
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [localPreviews, setLocalPreviews] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const files = Array.from(event.target.files);
            const newPreviews = files.map(file => URL.createObjectURL(file));

            if (multiple) {
                setLocalPreviews(prev => [...prev, ...newPreviews]);
                setSelectedFiles(prev => {
                    const updated = [...prev, ...files];
                    onFileSelect(updated); // Pass all accumulated files or just new ones? 
                    // Usually component users expect "current selection".
                    // But here we might be appending. Let's append internally but expose the full list?
                    // Actually, for simple use, let's just expose the *newly added* ones or manage full state parent side.
                    // To keep it simple: WE manage local state merge, parent gets full list.
                    return updated;
                });
            } else {
                setLocalPreviews(newPreviews);
                setSelectedFiles(files);
                onFileSelect(files);
            }
        }
    };

    const handleRemoveLocal = (index: number) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
        onFileSelect(newFiles);

        const newPreviews = [...localPreviews];
        newPreviews.splice(index, 1);
        setLocalPreviews(newPreviews);
    };

    return (
        <Box sx={{ border: '1px dashed #ccc', borderRadius: 2, p: 2, textAlign: 'center' }}>
            <input
                type="file"
                accept="image/*"
                multiple={multiple}
                hidden
                ref={inputRef}
                onChange={handleFileChange}
            />

            <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={() => inputRef.current?.click()}
                sx={{ mb: 2 }}
            >
                {label}
            </Button>

            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Supported formats: JPG, PNG, GIF (Max 2MB)
            </Typography>

            {/* Previews */}
            <Grid container spacing={2}>
                {/* Existing External Previews (e.g. from Server) */}
                {previewUrls.map((url, index) => (
                    <Grid item xs={4} md={3} key={`ext-${index}`}>
                        <Box sx={{ position: 'relative', height: 100, borderRadius: 1, overflow: 'hidden' }}>
                            <img src={url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            {onRemovePreview && (
                                <IconButton
                                    size="small"
                                    sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'rgba(255,255,255,0.8)' }}
                                    onClick={() => onRemovePreview(index)}
                                >
                                    <DeleteIcon fontSize="small" color="error" />
                                </IconButton>
                            )}
                        </Box>
                    </Grid>
                ))}

                {/* Local New Previews */}
                {localPreviews.map((url, index) => (
                    <Grid item xs={4} md={3} key={`loc-${index}`}>
                        <Box sx={{ position: 'relative', height: 100, borderRadius: 1, overflow: 'hidden' }}>
                            <img src={url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <IconButton
                                size="small"
                                sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'rgba(255,255,255,0.8)' }}
                                onClick={() => handleRemoveLocal(index)}
                            >
                                <DeleteIcon fontSize="small" color="error" />
                            </IconButton>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
