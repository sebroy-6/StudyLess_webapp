import React, { useContext, useEffect } from "react";
import { FullTopBar, FullSideBar } from "../components/NavBarComponents";
import { TaskList } from "../components/TasksComponents";
import { TaskForm } from "../components/FormComponents";
import { TasksContext } from "../contexts/TasksContext";


const HomePage = () => {
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

    return (
        <div>
            <FullTopBar pageTitle={`${Date().split(" ")[1]} ${Date().split(" ")[2]} tasks`} />
            <FullSideBar hasAppContainer={true} />
            <div className="app-container">
                < TaskList id="todo" title="TODO" />
                < TaskList id="inProgress" title="for today" />
                < TaskList id="completed" title="completed this week" />
            </div>
            <TaskForm />
        </div>
    );
}

export default HomePage;