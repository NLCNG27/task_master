// TaskModal.js
import React from "react";
import { Modal } from "antd";
import TaskForm from "./TaskForm";

const TaskModal = ({
    isModalVisible,
    setIsModalVisible,
    addTask,
    newTask,
    setNewTask,
}) => (
    <Modal
        title="Add Task"
        visible={isModalVisible}
        onOk={addTask}
        onCancel={() => setIsModalVisible(false)}
    >

        <TaskForm newTask={newTask} setNewTask={setNewTask} />
    </Modal>
);

export default TaskModal;
