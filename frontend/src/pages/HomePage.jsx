import React, { useEffect, useContext } from "react";
import { FullTopBar, FullSideBar } from "../components/NavBarComponents";
import { TaskList } from "../components/TasksComponents";
import { TaskForm } from "../components/FormComponents";
import { TasksContext } from "../contexts/TasksContext";


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