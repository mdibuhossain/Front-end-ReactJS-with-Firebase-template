import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsLoading } from '../../features/isloadingSlice';
import { selectUser } from '../../features/userSlice';
import useAuth from '../../Hooks/useAuth';
import { useFirebase } from '../../Hooks/useFirebase';

const RequireAuth = ({ children }) => {
    const { user, isLoading } = useAuth();
    // const { } = useFirebase(); // necessary for RequireAuth
    // const user = useSelector(selectUser)
    // const isLoading = useSelector(selectIsLoading);
    const location = useLocation();
    if (isLoading)
        return <Box sx={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
            <CircularProgress color="inherit" />
        </Box>
    if (!user.email) {
        return <Navigate to="/login" state={{ from: location }} />
    }
    return children;
};

export default RequireAuth;