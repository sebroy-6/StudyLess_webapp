import React from "react";
import "./css/DividerComponent.css";
import { Task } from "./TasksComponents.jsx";
import { useSwitch } from "../hooks/useSwitch";

export const Divider = ({ title, filterFunc = () => { return true; }, tasks }) => {
    const [isOpen, toggleOpen] = useSwitch(true);
    const filteredTasks = tasks.filter(filterFunc);

    return (
        < div>
            {
                filteredTasks && filteredTasks?.length ?
                    <div className="divider">
                        <button onClick={toggleOpen}>
                            <h3>{title ? title : "Others"}</h3>
                            {isOpen ? <div className="arrow down" /> : <div className="arrow up" />}
                        </button>
                        <div className="divider-content">
                            {isOpen ?
                                filteredTasks.map((task) => {
                                    return <Task key={task.id} task={task} />
                                }) : null
                            }
                        </div>
                    </div> : null
            }
        </div >
    );

}