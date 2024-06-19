import React, { useState, useContext, useEffect } from "react";
import { Calendar, Badge, Popover, List } from "antd";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";

const CalendarWithTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

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
            (task) =>
                moment(task.dueDate).format("YYYY-MM-DD") === dateStr &&
                task.status !== "Completed" &&
                task.status !== "Withdrawn"
        );
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        const taskCount = listData.length;

        if (taskCount > 0) {
            const content = (
                <List
                    size="small"
                    dataSource={listData}
                    renderItem={(item) => <List.Item>{item.title}</List.Item>}
                />
            );

            return (
                <Popover content={content} title={`${taskCount} Tasks`}>
                    <Badge
                        count={taskCount}
                        style={{ backgroundColor: "#52c41a" }}
                    />
                </Popover>
            );
        } else {
            return null;
        }
    };

    return <Calendar dateCellRender={dateCellRender} />;
};

export default CalendarWithTasks;
