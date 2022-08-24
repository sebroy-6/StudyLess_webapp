import React, { useState, useEffect, useContext } from "react";
import "./css/TasksComponents.css";
import optionsIcon from "../images/optionsIcon.png";
import sortIcon from "../images/sortIcon.png";
import { TasksContext } from "../contexts/TasksContext";
import { useDrag, useDrop } from "react-dnd";
import { updateTask } from "../utils/TaskAPIRequests";

export const Task = ({ task }) => {
    const [difficulty, setdifficulty] = useState("");
    const [{ }, dragRef] = useDrag({ // eslint-disable-line
        type: "task",
        item: task,
        collect: (monitor) => {
            return { isDragging: monitor.isDragging() };
        }
    })

    useEffect(() => {
        if (task.difficulty) {
            if (task.difficulty <= 2)
                setdifficulty("easy");
            else if (task.difficulty <= 4)
                setdifficulty("medium");
            else
                setdifficulty("hard");
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="task" ref={dragRef}>
            <h3><b>{task.title}</b></h3>
            <p className="duration">{task?.duration}</p>
            <p className={"difficulty " + difficulty}>{difficulty}</p>
            <p className="subject">{task.subject}</p>
            <button className="options">
                <img src={optionsIcon} alt="..." className="icon" />
            </button>
        </div >
    );
}

export const TaskList = ({ id, title }) => {
    const { tasks, dispatch } = useContext(TasksContext);
    const [{ }, dropRef] = useDrop({ // eslint-disable-line
        accept: 'task',
        drop: (task) => {
            dispatch({ type: "REMOVE_TASK", payload: task });
            task.progress = id;
            dispatch({ type: "ADD_TASK", payload: task });
            const token = localStorage.getItem("authentication");
            updateTask(token, task);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div className="taskList" ref={dropRef}>
            <h1>{title}</h1>
            <button className="sortButton">
                <img className="sortIcon" src={sortIcon} alt="v^"></img>
            </button>
            <div className="content">
                {tasks && tasks?.length ? tasks.map((task) => (
                    task.progress === id && <Task key={task._id} task={task} />
                )) : <h2>There are no tasks yet</h2>
                }
            </div>
        </div >
    );
}
