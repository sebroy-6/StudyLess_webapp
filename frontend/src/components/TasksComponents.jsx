import React, { useState, useEffect } from "react";
import "./css/TasksComponents.modules.css";

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
    
    return (
        <div className="task">
            <h3><b>{props.task.title}</b></h3>
            <div className="taskProps">
                <p className={"duration"}>{props.task?.duration}</p>
                <p className={"difficulty " + difficulty}>{difficulty}</p>
                <p className="subject"><b>{props.task.subject}</b></p>
            </div>
        </div>
    );
}

