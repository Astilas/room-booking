import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from '../context/auth';


const ProtectedRoute = () => {
    const { user } = useAuthState();

    return user ? <Outlet context={user}/> : <Navigate to="/login" />;
}

export default ProtectedRoute;