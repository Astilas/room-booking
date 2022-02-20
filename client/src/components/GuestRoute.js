import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from '../context/auth';


const GuestRoute = () => {
    const { user } = useAuthState();

    return !user ? <Outlet context={user}/> : <Navigate to="/" replace/>;
}

export default GuestRoute;