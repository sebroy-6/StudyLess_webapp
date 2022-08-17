import React from "react";
import { FullSideBar, FullTopBar } from "../components/NavBarComponents";
import { FullWeekPlanner } from "../components/ScheduleComponents";
import { TaskList } from "../components/TasksComponents";

const SchedulePage = () => {
    return (
        <div>
            <FullSideBar hasAppContainer={true} />
            <FullTopBar />
            <div className="app-container">
                < TaskList type="reduced" />
                <div className="schedule-container">
                    <FullWeekPlanner />
                </div>
            </div>
        </div>
    );
}

export default SchedulePage;