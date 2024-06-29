import React from "react";
import { Form, Input, DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const AddTaskForm = ({ newTask, setNewTask }) => {
    return (
        <Form initialValues={{ status: newTask.status || "Pending" }}>
            <Form.Item label="Title" required>
                <Input
                    value={newTask.title}
                    onChange={(e) =>
                        setNewTask({
                            ...newTask,
                            title: e.target.value,
                        })
                    }
                />
            </Form.Item>
            <Form.Item label="Description" required>
                <Input
                    value={newTask.description}
                    onChange={(e) =>
                        setNewTask({
                            ...newTask,
                            description: e.target.value,
                        })
                    }
                />
            </Form.Item>
            <Form.Item label="Due Date" required>
                <DatePicker
                    value={newTask.dueDate ? moment(newTask.dueDate) : null}
                    onChange={(date) =>
                        setNewTask({
                            ...newTask,
                            dueDate: date ? date.toDate() : null,
                        })
                    }
                />
            </Form.Item>
            <Form.Item label="Priority" required>
                <Select
                    value={newTask.priority}
                    onChange={(value) =>
                        setNewTask({ ...newTask, priority: value })
                    }
                >
                    <Option value="low">Low</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="high">High</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Status" required>
                <Select
                    value={newTask.status}
                    onChange={(value) =>
                        setNewTask({ ...newTask, status: value })
                    }
                >
                    <Option value="Pending">Pending</Option>
                    <Option value="In Progress">In Progress</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="Withdrawn">Withdrawn</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Category" required>
                <Select
                    value={newTask.category}
                    onChange={(value) =>
                        setNewTask({ ...newTask, category: value })
                    }
                >
                    <Option value="Work">Work</Option>
                    <Option value="Personal">Personal</Option>
                    <Option value="Urgent">Urgent</Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export default AddTaskForm;
