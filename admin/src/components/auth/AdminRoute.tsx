import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const AdminRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner fullScreen />;
    }

    // Check if user is authenticated and has admin role
    if (user && user.role === 'admin') {
        return <Outlet />;
    }

    // Redirect to login if not authenticated or not admin
    return !user || user.role !== 'admin' ? <Navigate to="/login" replace /> : <Outlet />;
};
