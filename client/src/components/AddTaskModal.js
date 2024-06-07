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
}) => (
    <Modal
        title="Add task"
        visible={isModalVisible}
        onOk={addTask}
        onCancel={() => setIsAddModalVisible(false)}
    >
        <AddTaskForm newTask={newTask} setNewTask={setNewTask} />
    </Modal>
);

export default AddTaskModal;
