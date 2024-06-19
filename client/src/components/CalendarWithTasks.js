import React, { useState, useContext, useEffect } from "react";
import { Calendar, Badge } from "antd";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";

const CalendarWithTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    console.log("here in calendar.......");
    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get("/api/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const getListData = (value) => {
        const dateStr = value.format("YYYY-MM-DD");
        return tasks.filter(
            (task) => moment(task.dueDate).format("YYYY-MM-DD") === dateStr
        );
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        const taskCount = listData.length;
        return taskCount > 0 ? (
            <Badge count={taskCount} style={{ backgroundColor: "#52c41a" }} />
        ) : null;
    };

    return <Calendar dateCellRender={dateCellRender} />;
};

export default CalendarWithTasks;
