import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button } from "antd";
import moment from "moment";
import TaskTable from "./TaskTable";
import AddTaskModal from "./AddTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import { AuthContext } from "../context/AuthContext";

const TaskList = () => {
    const { user } = useContext(AuthContext);
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
        console.log("User context:", user);
        if (user) {
            console.log("Fetching tasks for user:", user);
            fetchTasks();
        }
    }, [user]);

    const fetchTasks = () => {
        const token = localStorage.getItem("token");
        console.log("Fetching tasks with token:", token);
        axios
            .get(myRoute, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setTasks(response.data))
            .catch((error) => console.log("Error fetching tasks:", error));
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

        const token = localStorage.getItem("token");
        console.log(
            "Adding task with token:",
            token,
            "and task data:",
            newTask
        );

        axios
            .post(myRoute, newTask, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                fetchTasks();
                reset();
            })
            .catch((error) => console.log("Error adding task:", error));
    };

    const updateTask = (id, updatedTask) => {
        console.log(`Updating task with id: ${id}`, updatedTask); // Log the data
        const token = localStorage.getItem("token");
        axios
            .put(`${myRoute}/${id}`, updatedTask, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                fetchTasks();
                reset();
            })
            .catch((error) => console.log(error));
    };

    const updateStatus = (id, status) => {
        const token = localStorage.getItem("token");
        console.log(`Updating status for task with id: ${id} to ${status}`);
        axios
            .put(
                `${myRoute}/${id}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then(() => fetchTasks())
            .catch((error) => console.log("Error updating status:", error));
    };

    const handleUpdateClick = (task) => {
        console.log("Handling update click for task:", task);
        setNewTask(task);
        setIsUpdateModalVisible(true);
    };

    const handleAddClick = () => {
        console.log("Handling add click");
        reset();
        setIsAddModalVisible(true);
    };

    const deleteTask = (id) => {
        const token = localStorage.getItem("token");
        console.log(`Deleting task with id: ${id}`);
        axios
            .delete(`${myRoute}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => fetchTasks())
            .catch((error) => console.log("Error deleting task:", error));
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
                <Button type="primary" onClick={handleAddClick}>
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
