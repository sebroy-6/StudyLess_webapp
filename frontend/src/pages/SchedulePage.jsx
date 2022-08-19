import React from "react";
import { FullSideBar, FullTopBar } from "../components/NavBarComponents";
//import { TaskList } from "../components/TasksComponents";
import { WeekSchedule } from "../components/ScheduleComponents";

const SchedulePage = () => {
    return (
        <div>
            <FullSideBar hasAppContainer={true} />
            <FullTopBar />
            <div className="app-container" style={{ "height": "calc(100vh - 105px)" }}>
                <div id="4"
                    style={{
                        minWidth: "700px",
                        width: "70%",
                        minHeight: "500px",
                        height: "97%",
                        fontSize: "calc(0.7vw + 0.8vh)",
                        float: "right",
                        padding: "10px",
                        backgroundColor: "var(--secondaryColor)",
                        borderRadius: "20px",
                    }}>
                    <WeekSchedule />
                </div>
            </div>
        </div >
    );
}

export default SchedulePage;