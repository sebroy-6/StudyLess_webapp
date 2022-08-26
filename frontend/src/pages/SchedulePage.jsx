import React from "react";
import { FullSideBar, FullTopBar } from "../components/NavBarComponents";
import { ScheduleDay } from "../components/ScheduleComponents";

const SchedulePage = () => {
    return (
        <div>
            <FullSideBar hasAppContainer={true} />
            <FullTopBar />
            <div className="app-container" style={{ "height": "calc(100vh - 105px)" }}>
                <div
                    style={{
                        "position": "absolute",
                        "left": "25%",
                        "top": "2%",
                    }}>
                    <ScheduleDay nbRows={20} date={"2022/08/29"} />
                    <ScheduleDay nbRows={20} date={"2022/08/30"} />
                </div>
            </div>
        </div >
    );
}

export default SchedulePage;