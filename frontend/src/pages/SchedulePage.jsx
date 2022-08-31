import React, { useEffect, useContext } from "react";
import { FullSideBar, FullTopBar } from "../components/NavBarComponents";
import { ScheduleDay } from "../components/ScheduleComponents";
import { ScheduleEvents } from "../components/EventComponents";
import { TasksContext } from "../contexts/TasksContext";

const SchedulePage = () => {
    const { tasks, dispatch } = useContext(TasksContext);

    const getTasks = async () => {
        const token = localStorage.getItem("authentication");
        const response = await fetch("/api/task", {
            method: "GET",
            headers: {
                authentication: token
            }
        });
        const json = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                localStorage.removeItem("authentication");
                return window.location = "/login";
            }
        }
        dispatch({ type: "SET_TASKS", payload: json });
        return json;
    };

    useEffect(() => {
        if (!tasks) {
            getTasks();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                    <ScheduleDay nbRows={20} date={"2022/08/29"} />
                    <ScheduleDay nbRows={20} date={"2022/08/30"} />
                </div>

            </div >
        </div >
    );
}

export default SchedulePage;