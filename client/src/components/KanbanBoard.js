import React from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, Col, Row, Button, Popconfirm } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import '../assets/css/KanbanBoard.css';

const statusCycle = ["Pending", "In Progress", "Completed", "Withdrawn"];
const ItemType = "TASK";

const KanbanBoard = ({ tasks, updateTaskStatus, updateTask, deleteTask }) => {
    const getColumnTasks = (status) => {
        return tasks.filter((task) => task.status === status);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Row gutter={16}>
                {statusCycle.map((status) => (
                    <Col span={6} key={status}>
                        <h3>{status}</h3>
                        <TaskColumn
                            status={status}
                            tasks={getColumnTasks(status)}
                            updateTaskStatus={updateTaskStatus}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />
                    </Col>
                ))}
            </Row>
        </DndProvider>
    );
};

const TaskColumn = ({ status, tasks, updateTaskStatus, updateTask, deleteTask }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemType,
        drop: (item) => {
            if (item.status !== status) {
                updateTaskStatus(item._id, status);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;

    return (
        <div
            ref={drop}
            className={`task-column ${isActive ? 'active' : ''}`}
            style={{
                background: isActive ? "#e6f7ff" : "#f4f4f4",
                padding: "8px",
                minHeight: "400px",
                border: isActive ? "2px solid #1890ff" : "none",
            }}
        >
            {tasks.map((task) => (
                <DraggableTask 
                    key={task._id} 
                    task={task} 
                    updateTask={updateTask} 
                    deleteTask={deleteTask} 
                />
            ))}
        </div>
    );
};

const DraggableTask = ({ task, updateTask, deleteTask }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { ...task },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className="draggable-task"
            style={{
                marginBottom: "8px",
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Card 
                title={task.title}
                extra={
                    <>
                        <Button 
                            type="link" 
                            icon={<EditOutlined />} 
                            onClick={() => updateTask(task)}
                        />
                        <Popconfirm
                            title="Are you sure you want to delete this task?"
                            onConfirm={() => deleteTask(task._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button 
                                type="link" 
                                icon={<DeleteOutlined />} 
                                danger 
                            />
                        </Popconfirm>
                    </>
                }
            >
                <p>{task.description}</p>
                <p>Due: {moment(task.dueDate).format("YYYY-MM-DD")}</p>
                <p>Priority: {task.priority}</p>
                <p>Category: {task.category}</p>
            </Card>
        </div>
    );
};

export default KanbanBoard;
