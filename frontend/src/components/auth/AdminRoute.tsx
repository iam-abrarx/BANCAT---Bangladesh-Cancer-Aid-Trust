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

    // Redirect to login if not authenticated or dashboard if authenticated but not admin
    return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};
