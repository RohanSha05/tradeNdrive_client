import { auth } from '@/config/firebase.init';
import React from 'react';
import { useLocation } from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth'

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    if (!user) {
        return <Navigate to='/' state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;