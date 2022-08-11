import React, { useContext } from "react";
import { FullSideBar, FullTopBar } from "../components/NavBarComponents";
import { FullWeekSchedule } from "../components/ScheduleComponents";
import { TasksContext } from "../contexts/TasksContext";
import { reducedTask } from "../components/TasksComponents";

const SchedulePage = () => {
    const { tasks, dispatch } = useContext(TasksContext);

    return (
        <div>
            <FullSideBar hasAppContainer={true} />
            <FullTopBar />
            <div className="app-container">
                <FullWeekSchedule />
            </div>
        </div>
    );
}

/*
{tasks && tasks.length ? tasks.map((task) => {
    !task.isCompleted && <reducedTask key={task._id} task={task} />
}) : <h1>There is no tasks yet</h1>}
                    */

export default SchedulePage;