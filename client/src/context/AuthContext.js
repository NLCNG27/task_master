import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const [user, setUser] = useState(
        storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null
    );

    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log("Fetched user on initial load:", response.data);
                    setUser(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });
            console.log("Setting token and user:", response.data);
            localStorage.setItem("token", response.data.token);
            setUser((prevUser) => response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // navigate("/");

            return Promise.resolve();
        } catch (error) {
            console.error("Login failed:", error);
            return Promise.reject(error);
        }
    };
    
    // ensure the user is set before navigating, use the useEffect hook to watch for changes to the user state
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    const register = async (username, email, password) => {
        try {
            const response = await axios.post("/api/auth/register", {
                username,
                email,
                password,
            });
            console.log("Registration successful:", response.data);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const updateProfile = async (updatedProfile) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put("/api/auth/profile", updatedProfile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log("Profile updated successfully:", response.data);

        } catch (error) {
            console.error("Profile update failed:", error);
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, login, logout, register, updateProfile }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
