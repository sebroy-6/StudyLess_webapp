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
            else if (props.task.difficulty === 5)
                setdifficulty("hard");
        }
    }, [props.task.difficulty]);
    
    return (
        <div className="task">
            <h3><b>{props.task.name}</b></h3>
            <div className="taskProps">
                <p className={"difficulty " + difficulty}>{difficulty}</p>
                <p className="subject">{props.task.subject}</p>
            </div>
        </div>
    );
}

