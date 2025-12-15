import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock components to avoid full render overhead
vi.mock('./pages/Home', () => ({ Home: () => <div>Home Page</div> }));
vi.mock('./pages/auth/Login', () => ({ Login: () => <div>Login Page</div> }));
vi.mock('./components/layout/Layout', () => ({ Layout: ({ children }: any) => <div>{children}</div> }));

const queryClient = new QueryClient();

describe('App Routing', () => {
    it('renders Home page on default route', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText('Home Page')).toBeInTheDocument();
    });

    it('navigates to Login page', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/login']}>
                    <App />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
});
