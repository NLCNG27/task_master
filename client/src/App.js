import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import TaskList from "./components/TaskList";
import Task from "./components/AddTaskForm";

const { Header, Content, Footer } = Layout;

const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="demo-logo" />

                <h1 style={{ color: "#FFF", marginRight: "50px" }}>
                    TaskMaster
                </h1>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">About</Menu.Item>
                    <Menu.Item key="3">Contact</Menu.Item>
                </Menu>
            </Header>
            <Content
                style={{
                    padding: "0 48px",
                }}
            >
                <Breadcrumb
                    style={{
                        margin: "16px 0",
                    }}
                >
                    {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item> */}
                </Breadcrumb>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <TaskList />
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: "center",
                }}
            >
                ©{new Date().getFullYear()} Developed by CNG Software. All
                rights reserved.
            </Footer>
        </Layout>
    );
};
export default App;
