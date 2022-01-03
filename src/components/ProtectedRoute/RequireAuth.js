import { CircularProgress } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsLoading } from '../../features/isloadingSlice';
import { selectUser } from '../../features/userSlice';

const RequireAuth = ({ children }) => {
    const user = useSelector(selectUser)
    const isLoading = useSelector(selectIsLoading);
    const location = useLocation();
    if (isLoading)
        return <CircularProgress color="inherit" />
    if (!user.email) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children;
};

export default RequireAuth;