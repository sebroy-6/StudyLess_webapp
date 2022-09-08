import React from "react";
import { FullSideBar, FullTopBar } from "../components/NavBarComponents";
import { ScheduleDay } from "../components/ScheduleComponents";
import { ScheduleEvents } from "../components/EventComponents";

const SchedulePage = () => {

    return (
        <div>
            <FullSideBar hasAppContainer={true} />
            <FullTopBar />
            <div className="app-container" style={{ "height": "calc(100vh - 105px)" }}>

                <div style={{
                    "display": "inline-block",
                    "height": "90%",
                    "width": "fitContent",
                    "margin": "4%",
                    "marginBottom": "0",
                    "marginTop": "3%"
                }}>
                    <ScheduleEvents />
                </div>

                <div
                    style={{
                        "display": "inline-block",
                        "marginTop": "5px",
                        "verticalAlign": "top"
                    }}>
                    <ScheduleDay nbRows={20} date={"2022-08-16"} />
                    <ScheduleDay nbRows={20} date={"2022-08-17"} />
                </div>
            </div >
        </div >
    );
}

export default SchedulePage;