import React, { useContext, useEffect } from "react";
import { FullTopBar, FullSideBar } from "../components/NavBarComponents";
import { TaskList } from "../components/TasksComponents";
import { TaskForm } from "../components/FormComponents";
import { TasksContext } from "../contexts/TasksContext";
import { getTasks } from "../utils/TaskAPIRequests";


const HomePage = () => {
    const { tasks, dispatch } = useContext(TasksContext);

    useEffect(() => {
        if (!tasks) {
            getTasks(dispatch);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <FullTopBar pageTitle={`${Date().split(" ")[1]} ${Date().split(" ")[2]} tasks`} />
            <FullSideBar hasAppContainer={true} />
            <div className="app-container">
                < TaskList id="todo" title="TODO" sortParam="subject" />
                < TaskList id="inProgress" title="Today" sortParam="subject" />
                < TaskList id="completed" title="Completed" sortParam="subject" />
            </div>
            <TaskForm />
        </div>
    );
}

export default HomePage;