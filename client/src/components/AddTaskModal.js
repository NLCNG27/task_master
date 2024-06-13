// TaskModal.js
import React from "react";
import { Modal } from "antd";
import AddTaskForm from "./AddTaskForm";

const AddTaskModal = ({
    isModalVisible,
    setIsAddModalVisible,
    addTask,
    newTask,
    setNewTask,
}) => {
    const handleOk = () => {
        if (
            !newTask.title ||
            !newTask.description ||
            !newTask.dueDate ||
            !newTask.priority ||
            !newTask.status
        ) {
            alert("Please fill in all fields");
            return;
        }
        addTask();
    };

    const handleCancel = () => {
        setIsAddModalVisible(false);
    }

    return (
        <Modal
            title="Add task"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Add"
        >
            <AddTaskForm newTask={newTask} setNewTask={setNewTask} />
        </Modal>
    );
};

export default AddTaskModal;
