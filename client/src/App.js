import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import CalendarWithTasks from "./components/CalendarWithTasks";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import { UserOutlined, CalendarOutlined, UnorderedListOutlined } from "@ant-design/icons";
import axios from "axios";
import { Badge } from "antd";
import moment from "moment";



const { Header, Content, Footer } = Layout;

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Layout>
                    <HeaderWithUser />
                    <Content style={{ padding: "0 50px" }}>
                        <div
                            style={{
                                background: "#fff",
                                padding: 24,
                                minHeight: "100vh",
                            }}
                        >
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute element={Profile} />
                                    }
                                />
                                
                                <Route
                                    path="/calendar"
                                    element={
                                        <ProtectedRoute
                                            element={CalendarWithTasks}
                                        />
                                    }
                                />
                                <Route
                                    path="/"
                                    element={
                                        <ProtectedRoute element={TaskList} />
                                    }
                                />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        ©{new Date().getFullYear()} Developed by{" "}
                        <a href="https://www.cngsoftware.com">CNG Software</a>.
                        All rights reserved.
                    </Footer>
                </Layout>
            </AuthProvider>
        </Router>
    );
};

const HeaderWithUser = () => {
    const { user, logout } = useContext(AuthContext);
    const [upcomingTasksCount, setUpcomingTasksCount] = useState(0);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get("/api/tasks", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const upcomingTasks = response.data.filter(
                    (task) => moment(task.dueDate).isAfter(moment())
                );

                setUpcomingTasksCount(upcomingTasks.length);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        if (user) {
            fetchTasks();
        }
    }, [user])

    return (
        <Header style={headerStyle}>
            <div style={titleStyle}>TaskMaster</div>
            <Menu theme="dark" mode="horizontal" style={menuStyle}>
                {user ? (
                    <>
                        <Menu.Item key="tasks">
                            <Link to="/">
                                <UnorderedListOutlined />
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="calendar">
                            <Link to="/calendar" onClick={(() => setUpcomingTasksCount(0))}>
                                <Badge count={upcomingTasksCount}>
                                    <CalendarOutlined style={{ color: "#7A8590"}}/>
                                </Badge>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="profile">
                            <Link to="/profile">
                                <UserOutlined />
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="logout" onClick={logout}>
                            Logout
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item key="login">
                            <Link to="/login">Login</Link>
                        </Menu.Item>
                        <Menu.Item key="register">
                            <Link to="/register">Register</Link>
                        </Menu.Item>
                    </>
                )}
            </Menu>
        </Header>
    );
};

const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
};

const titleStyle = {
    color: "#FFF",
    fontSize: "20px",
    flexShrink: 0,
};

const menuStyle = {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
};

export default App;
