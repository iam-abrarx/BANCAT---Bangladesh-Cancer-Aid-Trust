import { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    initialValue?: string;
    fullWidth?: boolean;
}

export const SearchBar = ({ placeholder = "Search...", onSearch, initialValue = "", fullWidth = false }: SearchBarProps) => {
    const [query, setQuery] = useState(initialValue);
    const navigate = useNavigate();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (onSearch) {
                onSearch(query);
            } else {
                // Default behavior: navigate to results page
                if (query.trim()) {
                    navigate(`/search?q=${encodeURIComponent(query)}`);
                }
            }
        }
    };

    const handleClear = () => {
        setQuery('');
        if (onSearch) onSearch('');
    };

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: fullWidth ? '100%' : 400,
                borderRadius: '50px',
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                },
                transition: 'all 0.3s'
            }}
        >
            <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search' }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            {query && (
                <IconButton size="small" onClick={handleClear} sx={{ mr: 0.5 }}>
                    <ClearIcon fontSize="small" />
                </IconButton>
            )}
            <IconButton
                type="button"
                sx={{ p: '10px', color: 'primary.main' }}
                aria-label="search"
                onClick={() => {
                    if (onSearch) {
                        onSearch(query);
                    } else if (query.trim()) {
                        navigate(`/search?q=${encodeURIComponent(query)}`);
                    }
                }}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};
