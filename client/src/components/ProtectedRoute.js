import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Spin } from "antd";

const ProtectedRoute = ({ component: Component }) => {
    const { user, loading } = useContext(AuthContext);
    console.log("ProtectedRoute user context:", user);
    console.log("ProtectedRoute loading state:", loading);

    if (loading) {
        return <Spin size="large" />;
    }

    if (!user) {
        console.log("User not authenticated, redirecting to login");
        return <Navigate to="/login" />;
    }

    return <Component />
};


export default ProtectedRoute;