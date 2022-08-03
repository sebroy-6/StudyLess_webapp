import React, { useState, useEffect } from "react";
import { FullTopBar, FullSideBar } from "../components/NavBarComponents";
import { Task } from "../components/TasksComponents";
import { TaskForm } from "../components/FormComponents";


const HomePage = () => {

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

    useEffect( () => { getTasks(); }, []);

    return (
        <div>
            <FullTopBar pageTitle={`${Date().split(" ")[1]} ${Date().split(" ")[2]} tasks`}/>
            <FullSideBar hasAppContainer={true}/>
            <div className="app-container">
                { tasks && tasks.length ? tasks.map((task) => (
                    <Task key={task._id} task={task}/>
                    )) : <h1>There is no tasks yet</h1> 
                }
            </div>
            <TaskForm/>
        </div>
    );

}

export default HomePage;