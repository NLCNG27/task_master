import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, DatePicker, Select, Table } from "antd";
import moment from "moment";
import TaskTable from "./TaskTable";
import AddTaskModal from "./AddTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: moment().toDate(),
        priority: "",
        status: "Pending",
    });
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

    const myRoute = "http://localhost:5001/api/tasks";

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios
            .get(myRoute)
            .then((response) => setTasks(response.data))
            .catch((error) => console.log(error));
    };

    const reset = () => {
        setNewTask({
            title: "",
            description: "",
            dueDate: moment().toDate(),
            priority: "",
            status: "Pending",
        });
        setIsAddModalVisible(false);
        setIsUpdateModalVisible(false);
    };

    const addTask = () => {
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

        axios
            .post(myRoute, newTask)
            .then(() => {
                fetchTasks();
                reset();
            })
            .catch((error) => console.log(error));
    };

    const updateTask = (id, updatedTask) => {
        console.log(`Updating task with id: ${id}`, updatedTask); // Log the data
        axios
            .put(`${myRoute}/${id}`, updatedTask)
            .then(() => {
                fetchTasks();
                reset();
            })
            .catch((error) => console.log(error));
    };

    const updateStatus = (id, status) => {
        axios
            .put(`${myRoute}/${id}`, { status })
            .then(() => fetchTasks())
            .catch((error) => console.log(error));
    };

    const handleUpdateClick = (task) => {
        setNewTask(task);
        setIsUpdateModalVisible(true);
    };

    const handleAddClick = () => {
        reset();
        setIsAddModalVisible(true);
    };

    const deleteTask = (id) => {
        axios
            .delete(`${myRoute}/${id}`)
            .then(() => fetchTasks())
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <h1 style={{ marginRight: "30px" }}>All Tasks</h1>
                <Button
                    type="primary"
                    onClick={handleAddClick}
                >
                    Add
                </Button>
            </div>
            <UpdateTaskModal
                isUpdateModalVisible={isUpdateModalVisible}
                setIsUpdateModalVisible={setIsUpdateModalVisible}
                task={newTask}
                updateTask={updateTask}
            />
            <AddTaskModal
                isModalVisible={isAddModalVisible}
                setIsAddModalVisible={setIsAddModalVisible}
                newTask={newTask}
                setNewTask={setNewTask}
                addTask={addTask}
            />
            <TaskTable
                tasks={tasks}
                updateTask={handleUpdateClick}
                deleteTask={deleteTask}
                updateStatus={updateStatus}
            />
        </div>
    );
};

export default TaskList;
