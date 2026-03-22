import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { withAuth } from '@/components/hoc/withAuth';

const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const TaskList = lazy(() => import('@/pages/Tasks'));

const ProtectedTaskList = withAuth(TaskList);

export type RoutesType = {
    [key in 'DEFAULT' | 'LOGIN' | 'REGISTER' | 'TASKS' | 'NOT_FOUND']: {
        path: string;
        element: RouteObject['element'];
    }
};

export const ROUTES: RoutesType = {
    DEFAULT: {
        path: '/',
        element: <Navigate to="/tasks" replace />
    },
    LOGIN: {
        path: '/login',
        element: <Login />
    },
    REGISTER: {
        path: '/register',
        element: <Register />
    },
    TASKS: {
        path: '/tasks',
        element: <ProtectedTaskList />
    },
    NOT_FOUND: {
        path: '*',
        element: <Navigate to="/tasks" replace />
    }
} as const;

const routeObjects = Object.values(ROUTES).map(route => ({
    path: route.path,
    element: (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-gray-50 text-gray-500">Loading...</div>}>
            {route.element}
        </Suspense>
    )
}));

export const router = createBrowserRouter(routeObjects);
