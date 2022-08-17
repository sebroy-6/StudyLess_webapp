import React, { useState, useEffect, useContext } from "react";
import "./css/TasksComponents.css";
import checkIcon from "../images/checkIcon.png";
import deleteIcon from "../images/garbageIcon.png";
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
        <div className="task">
            <h3><b>{task.title}</b></h3>
            <span className="taskProps">
                <p className="duration">{task?.duration}</p>
                <p className={"difficulty " + difficulty}>{difficulty}</p>
                <p className="subject"><b>{task.subject}</b></p>
            </span>
            <button className="complete" onClick={completeTask}>
                <img src={checkIcon} alt="☑" className="icon" />
            </button>
            <button className="delete" onClick={deleteTask} >
                <img src={deleteIcon} alt="delete" className="icon" />
            </button>
        </div>
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

export const TaskList = ({ type }) => {
    const { tasks, dispatch } = useContext(TasksContext);

    const getTasks = async () => {
        const token = localStorage.getItem("authentication");
        const response = await fetch("/api/task", {
            method: "GET",
            headers: {
                authentication: token
            }
        });
        const json = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                localStorage.removeItem("authentication");
                return window.location = "/login";
            }
        }
        dispatch({ type: "SET_TASKS", payload: json });
        return json;
    };

    useEffect(() => {
        if (!tasks) {
            getTasks();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (type === "reduced") {
        return (
            <div className="leftTask-container">
                {tasks && tasks.length ? tasks.map((task) => (
                    !task.isCompleted && <ReducedTask key={task._id} task={task} />
                )) : <h1>There is no tasks yet</h1>
                }
            </div>
        );
    }

    return (
        <div>
            {tasks && tasks.length ? tasks.map((task) => (
                !task.isCompleted && <Task key={task._id} task={task} />
            )) : <h1>There is no tasks yet</h1>
            }
        </div>
    );
}
