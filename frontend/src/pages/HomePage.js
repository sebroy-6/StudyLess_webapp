import React from "react";
import { FullTopBar, FullSideBar } from "../components/NavBarComponents";
import { TasksList } from "../components/TasksComponents";


const HomePage = () => {

    return (
        <div>
            <FullTopBar pageTitle={`${Date().split(" ")[1]} ${Date().split(" ")[2]} tasks`}/>
            <FullSideBar/>
            <div className="app-container">
                <TasksList page="homePage"/>
            </div>
        </div>
    );

}

export default HomePage;