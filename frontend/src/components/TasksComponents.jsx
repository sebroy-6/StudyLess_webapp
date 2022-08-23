import React, { useState, useEffect, useContext } from "react";
import "./css/TasksComponents.css";
import optionsIcon from "../images/optionsIcon.png";
import sortIcon from "../images/sortIcon.png";
import { TasksContext } from "../contexts/TasksContext";
import { useDrag, useDrop } from "react-dnd";

export const Task = ({ task }) => {
    const { dispatch } = useContext(TasksContext);
    const [difficulty, setdifficulty] = useState("");
    const [{ }, dragRef] = useDrag({
        type: "task",
        item: task,
        collect: (monitor) => {
            return { isDragging: monitor.isDragging() };
        }
    })

    useEffect(() => {
        if (task.difficulty) {

            if (task.difficulty <= 2)
                setdifficulty("easy");
            else if (task.difficulty <= 4)
                setdifficulty("medium");
            else
                setdifficulty("hard");
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function deleteTask() {
        const token = localStorage.getItem("authentication");
        const response = await fetch(`/api/task/${task._id}`, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
                "authentication": token
            }
        });

        if (response.ok) {
            dispatch({ type: "REMOVE_TASK", payload: task });
            console.log(`task ${task._id} has been deleted`);
        }
    }

    async function completeTask() {
        const token = localStorage.getItem("authentication");
        task.isCompleted = true;
        const response = await fetch(`/api/task/${task._id}`, {
            method: "PATCH",
            body: JSON.stringify({ "task": task }),
            headers: {
                "content-Type": "application/json",
                "authentication": token
            }
        });
        if (response.ok) {
            dispatch({ type: "REMOVE_TASK", payload: task });
            console.log(`task ${task._id} has been completed`);
        }
        else {
            task.isCompleted = false;
        }
    }

    return (
        <div className="task" ref={dragRef}>
            <h3><b>{task.title}</b></h3>
            <p className="duration">{task?.duration}</p>
            <p className={"difficulty " + difficulty}>{difficulty}</p>
            <p className="subject">{task.subject}</p>
            <button className="options">
                <img src={optionsIcon} alt="..." className="icon" />
            </button>
        </div >
    );
}

export const TaskList = ({ title, tasks, onDrop }) => {
    const [currentTasks, setTasks] = useState(tasks);
    const [{ }, dropRef] = useDrop({
        accept: 'task',
        drop: (item) => {
            console.log(tasks?.length)
            if (tasks?.length !== undefined) {
                return setTasks(!currentTasks.includes(item) ? [...currentTasks, item] : currentTasks);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div className="taskList" ref={dropRef}>
            <h1>{title}</h1>
            <button className="sortButton">
                <img className="sortIcon" src={sortIcon} alt="v^"></img>
            </button>
            <div className="content">
                {currentTasks && currentTasks?.length ? currentTasks.map((task) => (
                    !task.isCompleted && <Task key={task._id} task={task} />
                )) : tasks && tasks?.length ? tasks.map((task) => (
                    !task.isCompleted && <Task key={task._id} task={task} />
                )) :
                    <h2>There are no tasks yet</h2>
                }
            </div>
        </div >
    );
}
