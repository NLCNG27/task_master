import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button, Input, Select } from "antd";
import moment from "moment";
import TaskTable from "./TaskTable";
import KanbanBoard from "./KanbanBoard";
import AddTaskModal from "./AddTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import { AuthContext } from "../context/AuthContext";

const { Option } = Select;

const TaskList = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: moment().toDate(),
        priority: "",
        status: "Pending",
        category: "Work",
    });
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [filterCategory, setFilterCategory] = useState("");
    const [searchText, setSearchText] = useState("");
    const [viewMode, setViewMode] = useState("list");

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

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
            .get(`${apiUrl}/tasks`, {
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
            category: "Work",
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
            !newTask.status || 
            !newTask.category
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
            .post(`${apiUrl}/tasks`, newTask, {
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
            .put(`${apiUrl}/tasks/${id}`, updatedTask, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                fetchTasks(); // ensure the tasks are refreshed after update
                reset();
            })
            .catch((error) => console.log(error));
    };

    const updateStatus = (id, status) => {
        const token = localStorage.getItem("token");
        console.log(`Updating status for task with id: ${id} to ${status}`);
        axios
            .put(
                `${apiUrl}/tasks/${id}`,
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
            .delete(`${apiUrl}/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => fetchTasks())
            .catch((error) => console.log("Error deleting task:", error));
    };

    const filteredTasks = tasks.filter(
        (task) =>
            (filterCategory === "" || task.category === filterCategory) &&
            (searchText === "" ||
                task.title.toLowerCase().includes(searchText.toLowerCase()))
    );

    const toggleViewMode = () => {
        setViewMode(viewMode === "list" ? "kanban" : "list");
    };

    const updateTaskStatus = (id, status) => {
        const token = localStorage.getItem("token");
        console.log(`Updating status for task with id: ${id} to ${status}`);
        axios
            .put(
                `${apiUrl}/tasks/${id}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then(() => fetchTasks())
            .catch((error) => console.log("Error updating status:", error));
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <h1 style={{ marginRight: "30px" }}>My Tasks</h1>
                <Button type="primary" onClick={handleAddClick} style={{ marginLeft: "850px" }}>
                    Add
                </Button>
                <Button onClick={toggleViewMode}>
                    Switch to {viewMode === "list" ? "Kanban" : "List"} View
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <Select
                    style={{ width: "200px", marginRight: "20px" }}
                    placeholder="Filter by Category"
                    value={filterCategory}
                    onChange={(value) => setFilterCategory(value)}
                >
                    <Option value="">All</Option>
                    <Option value="Work">Work</Option>
                    <Option value="Personal">Personal</Option>
                    <Option value="Urgent">Urgent</Option>
                </Select>
                <Input
                    placeholder="Search by title"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
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

            {viewMode === "list" ? (
                <TaskTable
                    tasks={filteredTasks}
                    updateTask={handleUpdateClick}
                    deleteTask={deleteTask}
                    updateStatus={updateStatus}
                />
            ) : (
                <KanbanBoard tasks={filteredTasks} updateTaskStatus={updateTaskStatus} updateTask={handleUpdateClick} deleteTask={deleteTask} />
            )}
            
        </div>
    );
};

export default TaskList;
