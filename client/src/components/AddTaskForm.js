import React from "react";
import { Form, Input, DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const AddTaskForm = ({ newTask, setNewTask }) => {

    return (
        <Form>
            <Form.Item label="Title">
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
            <Form.Item label="Description">
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
            <Form.Item label="Due Date">
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
            <Form.Item label="Priority">
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
        </Form>
    );
};

export default AddTaskForm;
