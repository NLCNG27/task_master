import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Spin } from 'antd';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [hasRedirected, setHasRedirected] = useState(false);

    useEffect(() => {
        if (!loading && !user && !hasRedirected) {
            navigate('/login');
            setHasRedirected(true);
        }
    }, [loading, user, navigate, hasRedirected]);

    if (loading) {
        return <Spin />;  // Or some loading spinner
    }

    if (!user) {
        return null;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;