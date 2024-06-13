// UpdateTaskForm.js
import React from "react";
import { Form, Input, DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const UpdateTaskForm = ({ task, setTask }) => (
    <Form>
        <Form.Item label="Title" required>
            <Input
                value={task.title}
                onChange={(e) =>
                    setTask({
                        ...task,
                        title: e.target.value,
                    })
                }
            />
        </Form.Item>
        <Form.Item label="Description" required>
            <Input
                value={task.description}
                onChange={(e) =>
                    setTask({
                        ...task,
                        description: e.target.value,
                    })
                }
            />
        </Form.Item>
        <Form.Item label="Due Date" required>
            <DatePicker
                value={task.dueDate ? moment(task.dueDate) : null}
                onChange={(date) =>
                    setTask({
                        ...task,
                        dueDate: date,
                    })
                }
            />
        </Form.Item>
        <Form.Item label="Priority" required>
            <Select
                value={task.priority}
                onChange={(value) =>
                    setTask({
                        ...task,
                        priority: value,
                    })
                }
            >
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
            </Select>
        </Form.Item>
        <Form.Item label="Status" required>
            <Select
                value={task.status}
                onChange={(value) =>
                    setTask({
                        ...task,
                        status: value,
                    })
                }
            >
                <Option value="Pending">Pending</Option>
                <Option value="In-Progress">In-Progress</Option>
                <Option value="Completed">Completed</Option>
                <Option value="Withdrawn">Withdrawn</Option>
            </Select>
        </Form.Item>
    </Form>
);

export default UpdateTaskForm;