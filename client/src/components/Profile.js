import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
    const { user, updateProfile } = useContext(AuthContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                username: user.username,
                email: user.email,
            });
        }
    }, [user, form]);

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            await updateProfile(values);
            message.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            message.error("Profile update failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Edit Profile" style={{ maxWidth: 400, margin: "auto" }}>
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{ username: user?.username, email: user?.email }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                    ]}
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Profile;
