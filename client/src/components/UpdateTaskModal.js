import React, { useEffect, useState } from "react";

import { Modal, Form, Input, DatePicker, Select } from "antd";
import UpdateTaskForm from "./UpdateTaskForm";

const UpdateTaskModal = ({
    isUpdateModalVisible,
    setIsUpdateModalVisible,
    task,
    updateTask,
}) => {
    const [updatedTask, setUpdatedTask] = useState(task);

    useEffect(() => {
        setUpdatedTask(task);
    }, [task]);

    const handleCancel = () => {
        setIsUpdateModalVisible(false);
    };

    return (
        <Modal
            title="Update task"
            visible={isUpdateModalVisible}
            onOk={() => updateTask(task._id, updatedTask)}
            onCancel={handleCancel}
        >
            <UpdateTaskForm task={updatedTask} setTask={setUpdatedTask} />
        </Modal>
    );
};

export default UpdateTaskModal;
