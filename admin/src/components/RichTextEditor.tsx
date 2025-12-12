import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, FormHelperText } from '@mui/material';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
    height?: string | number;
}

export const RichTextEditor = ({
    value,
    onChange,
    placeholder,
    error,
    helperText,
    height = 400
}: RichTextEditorProps) => {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <Box sx={{
            '& .quill': {
                borderRadius: 1,
                border: error ? `1px solid #d32f2f` : 'none',
            },
            '& .ql-container': {
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                height: height, // Fixed height for scrolling
                bgcolor: 'background.paper',
            },
            '& .ql-toolbar': {
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                bgcolor: '#f5f5f5',
            }
        }}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
            />
            {helperText && (
                <FormHelperText error={error}>{helperText}</FormHelperText>
            )}
        </Box>
    );
};
