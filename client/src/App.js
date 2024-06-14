import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu } from "antd";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider, { AuthContext } from "./context/AuthContext";

const { Header, Content, Footer } = Layout;

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <HeaderWithUser />
                    <Content style={{ padding: "0 50px" }}>
                        <div
                            style={{
                                background: "#fff",
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route
                                    path="/"
                                    element={
                                        <ProtectedRoute component={TaskList} />
                                    }
                                />
                            </Routes>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        ©{new Date().getFullYear()} Developed by{" "}
                        <a href="https://www.cngsoftware.com">CNG Software</a>.
                        All rights reserved.
                    </Footer>
                </Layout>
            </Router>
        </AuthProvider>
    );
};

const HeaderWithUser = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div style={{ color: "#FFF", fontSize: "20px" }}>TaskMaster</div>
            <Menu theme="dark" mode="horizontal">
                {user ? (
                    <Menu.Item key="logout" onClick={logout}>
                        Logout
                    </Menu.Item>
                ) : (
                    <>
                        <Menu.Item key="login">
                            <a href="/login">Login</a>
                        </Menu.Item>
                        <Menu.Item key="register">
                            <a href="/register">Register</a>
                        </Menu.Item>
                    </>
                )}
            </Menu>
        </Header>
    );
};

export default App;
