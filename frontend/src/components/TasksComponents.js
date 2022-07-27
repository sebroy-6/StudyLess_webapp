import React, { useEffect, useState } from "react";
import "./css/TasksComponents.css";

export const Task = (props) => {
    return (
        <div className="task">
            <b>{props.task.name}</b>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
        </div>
    );
}

export const TasksList = (props) => {
    const [tasks, setTasks] = useState(null);

    const getTasks = async () => {
        const token = localStorage.getItem("authentication");
        const response  = await fetch("/api/task", {
            method : "GET",
            headers: {
                "authentication" : token
            }
        });
        const json = await response.json();
        
        if (!response.ok) {
            if (response.status === 403) {
                return window.location = "/login";
            }
        }
        setTasks(json);
        return json;
    };

    useEffect( () => { getTasks(); });

    return (
        <div className={"tasksList " + props.page}>
            { tasks && tasks.map((task) => (
                <Task key={task._id} task={task}/>
            )) }
        </div>
    );
};

