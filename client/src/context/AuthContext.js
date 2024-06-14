import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });
            console.log("Setting token and user:", response.data);
            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
        } catch (error) {
            console.log("Login failed:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const register = async (username, email, password) => {
        try {
            console.log("Registering user:", { username, email, password });
            const response = await axios.post("/api/auth/register", {
                username,
                email,
                password,
            });
            console.log("Registration successful:", response.data);
        } catch (error) {
            console.log("Registration failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
