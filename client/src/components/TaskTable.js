import React from "react";
import { Table, Button } from "antd";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const TaskTable = ({ tasks, deleteTask, updateTask }) => {
    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (dueDate) =>
                dueDate ? moment(dueDate).format("YYYY-MM-DD") : null,
        },
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            render: (priority) => {
                let color;
                switch (priority) {
                    case "low":
                        color = "green";
                        break;
                    case "medium":
                        color = "orange";
                        break;
                    case "high":
                        color = "red";
                        break;
                    default:
                        color = "black";
                }
                return (
                    <span style={{ color }}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </span>
                );
            },
        },

        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => updateTask(record)}
                        icon={<EditOutlined />}
                        style={{ marginRight: "10px" }}
                    />
                    <Button
                        type="primary"
                        danger
                        onClick={() => deleteTask(record._id)}
                        icon={<DeleteOutlined />}
                    />
                </>
            ),
        },
    ];

    return <Table columns={columns} dataSource={tasks} rowKey="_id" />;
};

export default TaskTable;
