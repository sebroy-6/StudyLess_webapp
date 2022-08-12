import React, { useState, useEffect, useContext } from "react";
import "./css/TasksComponents.css";
import checkIcon from "../images/checkIcon.png";
import deleteIcon from "../images/garbageIcon.png";
import { TasksContext } from "../contexts/TasksContext";

export const Task = (props) => {
    const { dispatch } = useContext(TasksContext);
    const [difficulty, setdifficulty] = useState("");

    useEffect(() => {
        if (props.task.difficulty) {

            if (props.task.difficulty <= 2)
                setdifficulty("easy");
            else if (props.task.difficulty <= 4)
                setdifficulty("medium");
            else
                setdifficulty("hard");
        }
    }, []);

    async function deleteTask() {
        const token = localStorage.getItem("authentication");
        const response = await fetch(`/api/task/${props.task._id}`, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
                "authentication": token
            }
        });

        if (response.ok) {
            dispatch({ type: "REMOVE_TASK", payload: props.task });
            console.log(`task ${props.task._id} has been deleted`);
        }
    }

    async function completeTask() {
        const token = localStorage.getItem("authentication");
        props.task.isCompleted = true;
        const response = await fetch(`/api/task/${props.task._id}`, {
            method: "PATCH",
            body: JSON.stringify({ "task": props.task }),
            headers: {
                "content-Type": "application/json",
                "authentication": token
            }
        });
        if (response.ok) {
            dispatch({ type: "REMOVE_TASK", payload: props.task });
            console.log(`task ${props.task._id} has been completed`);
        }
        else {
            props.task.isCompleted = false;
        }
    }

    return (
        <div className="task" draggable>
            <h3><b>{props.task.title}</b></h3>
            <span className="taskProps">
                <p className={"duration"}>{props.task?.duration}</p>
                <p className={"difficulty " + difficulty}>{difficulty}</p>
                <p className="subject"><b>{props.task.subject}</b></p>
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
    return (
        <div className="task reduced" draggable>
            <h3><b>{task.title}</b></h3>
        </div>
    );
}

