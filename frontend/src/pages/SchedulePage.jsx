import React, { useEffect, useContext } from "react";
import { FullSideBar, FullTopBar } from "../components/NavBarComponents";
import { WorkWeekSchedule, WeekEndSchedule } from "../components/ScheduleComponents";
import { TasksContext } from "../contexts/TasksContext";
import { ReducedTask } from "../components/TasksComponents";

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
    }, []);

    return (
        <div>
            <FullSideBar hasAppContainer={true} />
            <FullTopBar />
            <div className="app-container">
                <div className="leftTask-container">
                    {tasks && tasks.length ? tasks.map((task) => (
                        !task.isCompleted && <ReducedTask key={task._id} task={task} />
                    )) : <h1>There is no tasks yet</h1>
                    }
                </div>
                <div className="schedule-container">
                    <WorkWeekSchedule />
                    <WeekEndSchedule />
                </div>
            </div>
        </div>
    );
}

export default SchedulePage;