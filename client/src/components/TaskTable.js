import React from "react";
import { Table, Button } from "antd";
import moment from "moment";

const TaskTable = ({ tasks, deleteTask }) => {
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
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Button
                    type="primary"
                    danger
                    onClick={() => deleteTask(record._id)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return <Table columns={columns} dataSource={tasks} rowKey="_id" />;
};

export default TaskTable;
