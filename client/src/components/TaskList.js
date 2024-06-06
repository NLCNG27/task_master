import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, DatePicker, Select, Table } from "antd";
import moment from 'moment';
import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";


const TaskList = () => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: null,
        priority: "",
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const addTask = () => {
        console.log('adding')
        if (!newTask.title || !newTask.description || !newTask.dueDate || !newTask.priority) {
            alert("Please fill in all fields");
            return;
        }

        axios
            .post(myRoute, newTask)
            .then(() => {
                setNewTask({ title: "", description: "", dueDate: null, priority: ""});
                fetchTasks();
                setIsModalVisible(false);
            })
            .catch((error) => console.log(error));
    };

    const deleteTask = (id) => {
        console.log("id: ", id);
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
                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                    Add
                </Button>
            </div>

            <TaskModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
            <TaskTable tasks={tasks} deleteTask={deleteTask} />

        </div>
    );
};

export default TaskList;
