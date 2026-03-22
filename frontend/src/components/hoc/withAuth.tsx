import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';

export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return (props: P) => {
        const navigate = useNavigate();
        const [isChecking, setIsChecking] = useState(true);
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setIsChecking(false);
        }, []);

        useEffect(() => {
            if (!isChecking && !isAuthenticated) {
                navigate(ROUTES.LOGIN.path, { replace: true });
            }
        }, [isChecking, isAuthenticated, navigate]);

        if (isChecking) {
            return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
        }

        if (!isAuthenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};
