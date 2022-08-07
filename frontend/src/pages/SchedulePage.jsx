import React from "react";
import { FullSideBar, FullTopBar } from "../components/NavBarComponents";

const SchedulePage = () => {
    return (
        
        <div>
            <FullSideBar hasAppContainer={true} />
            <FullTopBar />
            <div className="app-container">
                Schedule
            </div>
        </div>
    );
}

export default SchedulePage;