import React from "react";
import { FullSideBar, FullTopBar } from "../components/NavBarComponents";
import { ScheduleDay } from "../components/ScheduleComponents";
import { EventContainer } from "../components/EventComponents";

const SchedulePage = () => {
    return (
        <div>
            <FullSideBar hasAppContainer={true} />
            <FullTopBar />
            <div className="app-container" style={{ "height": "calc(100vh - 105px)" }}>
                <EventContainer><button className="default">Event</button></EventContainer>
                <div
                    style={{
                        "display": "inline-block",
                        "marginTop": "5px",
                        "verticalAlign": "top"
                    }}>
                    <ScheduleDay nbRows={20} date={"2022/08/29"} />
                    <ScheduleDay nbRows={20} date={"2022/08/30"} />
                </div>
            </div>
        </div >
    );
}

export default SchedulePage;