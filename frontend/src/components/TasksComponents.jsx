import React, { useState, useEffect, useContext } from "react";
import "./css/TasksComponents.css";
import optionsIcon from "../images/optionsIcon.png";
import sortIcon from "../images/sortIcon.png";
import { TasksContext } from "../contexts/TasksContext";
import { useDrag } from "react-dnd";

export const Task = ({ task }) => {
    const { dispatch } = useContext(TasksContext);
    const [difficulty, setdifficulty] = useState("");

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
        <div className="task" draggable>
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


export const ReducedTask = ({ task }) => {
    const [difficulty, setdifficulty] = useState("");
    const [{ isDragging }, dragRef] = useDrag({ // eslint-disable-line
        type: "task",
        item: task,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

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

    return (
        <div className="task reduced" ref={dragRef}>
            <h3>{task.title}</h3>
            <p className="duration">{task.duration}</p>
            <p className={"difficulty " + difficulty}>{difficulty}</p>
        </div >
    );
}

export const TaskList = ({ taskType, title, tasks }) => {

    if (taskType === "reduced") {
        return (
            <div className="leftTask-container">
                <h1>{title}</h1>
                {tasks && tasks.length ? tasks.map((task) => (
                    !task.isCompleted && <ReducedTask key={task._id} task={task} />
                )) : <h2>There is no tasks yet</h2>
                }
            </div>
        );
    }

    return (
        <div className="taskList">
            <h1>{title}</h1>
            <button className="sortButton">
                <img className="sortIcon" src={sortIcon} alt="v^"></img>
            </button>
            <div className="content">
                {tasks && tasks.length ? tasks.map((task) => (
                    !task.isCompleted && <Task key={task._id} task={task} />
                )) : <h2>There is no tasks yet</h2>
                }
            </div>
        </div >
    );
}
