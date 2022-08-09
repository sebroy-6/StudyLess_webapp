import React, { useState, useEffect } from "react";
import "./css/TasksComponents.modules.css";
import checkIcon from "../images/checkIcon.png";
import deleteIcon from "../images/garbageIcon.png";

export const Task = (props) => {
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
        fetch(`/api/task/${props.task._id}`, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
                "authentication": token
            }
        }).then((response) => {
            if (response.ok) { console.log(`task ${props.task._id} has been deleted`); }
        })
    }

    async function completeTask() {
        const token = localStorage.getItem("authentication");
        props.task.isCompleted = true;
        console.log(props.task);
        fetch(`/api/task/${props.task._id}`, {
            method: "PATCH",
            body: JSON.stringify({ "task": props.task }),
            headers: {
                "content-Type": "application/json",
                "authentication": token
            }
        }).then((response) => {
            if (response.ok) { console.log(`task ${props.task._id} has been completed`); }
        }).catch((error) => {
            props.task.isCompleted = false;
            console.log(error.message);
        });
    }

    return (
        <div className="task">
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

