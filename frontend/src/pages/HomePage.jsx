import React from "react";
import { FullTopBar, FullSideBar } from "../components/NavBarComponents";
import { TaskList } from "../components/TasksComponents";
import { TaskForm } from "../components/FormComponents";


const HomePage = () => {

    return (
        <div>
            <FullTopBar pageTitle={`${Date().split(" ")[1]} ${Date().split(" ")[2]} tasks`} />
            <FullSideBar hasAppContainer={true} />
            <div className="app-container">
                < TaskList />
            </div>
            <TaskForm />
        </div>
    );
}

export default HomePage;