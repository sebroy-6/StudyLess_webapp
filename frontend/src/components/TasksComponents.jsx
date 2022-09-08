import React, { useState, useContext } from "react";
import "./css/TasksComponents.css";
import optionsIcon from "../images/optionsIcon.png";
import sortIcon from "../images/sortIcon.png";
import deleteIcon from "../images/garbageIcon.png";
import { CollapsibleDivider } from "./ClickableComponents";
import { TasksContext } from "../contexts/TasksContext";
import { useDrag, useDrop } from "react-dnd";
import { deleteTask, updateTask } from "../utils/TaskAPIRequests";
import { useSwitch } from "../hooks/useSwitch";

export const Task = ({ task }) => {
    const { dispatch } = useContext(TasksContext);
    const [menuDisplay, toggleMenuDisplay] = useSwitch("none", "inline-block");
    const [{ isDragging }, dragRef] = useDrag({ // eslint-disable-line
        type: "task",
        item: task,
        collect: (monitor) => {
            return { isDragging: monitor.isDragging() };
        }
    })

    return (
        <div className="taskContainer" > {!isDragging ?
            <div className="task" ref={dragRef}>
                <h3><b>{task.title}</b></h3>
                <p className="duration">{task?.duration}</p>
                <p className={"difficulty " + task.difficulty}>{task.difficulty}</p>
                <p className="subject">{task.subject}</p>
                <button className="options" onClick={toggleMenuDisplay}>
                    <img src={optionsIcon} alt="..." className="icon" />
                </button>
            </div > : null
        }
            <div
                id={task._id + "menu"}
                className="taskMenu"
                style={
                    { "display": menuDisplay }}
            >
                <button onClick={() => {
                    deleteTask(dispatch, task);
                }}>
                    <img src={deleteIcon} alt="delete" className="icon" />
                </button>
            </div>
        </div >
    );
}


export const TaskDivider = ({ title, filterFunc, tasks }) => {
    const filteredTasks = filterFunc ? tasks.filter(filterFunc) : tasks;
    return (
        <div>
            <CollapsibleDivider title={title}>
                {
                    filteredTasks && filteredTasks?.length ? filteredTasks.map((task) => {
                        return <Task key={task._id} task={task} />
                    }) : null
                }
            </CollapsibleDivider>
        </div >
    );

}


export const TaskList = ({ id, title, sortParam }) => {
    const [menuDisplay, toggleMenuDisplay] = useSwitch("none", "inline-block");
    const [firstSortParam, setFirstSortParam] = useState(sortParam);
    const { tasks, dispatch } = useContext(TasksContext);
    const [{ }, dropRef] = useDrop({ // eslint-disable-line
        accept: 'task',
        drop: async (task) => {
            if (task.progress !== id) {
                const newTask = task;
                newTask.progress = id;
                updateTask(dispatch, task, newTask);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    function getAllSubjects() {
        const subjects = [];
        if (tasks?.length) {
            tasks.forEach((task) => {
                if (!subjects.includes(task.subject)) {
                    subjects.push(task.subject);
                }
            });
        }
        return subjects;
    }

    function getAllDifficulty() {
        const diffLevels = [];
        if (tasks?.length) {
            tasks.forEach((task) => {
                if (!diffLevels.includes(task.difficulty)) {
                    diffLevels.push(task.difficulty);
                }
            });
        }
        return diffLevels;
    }

    return (
        <div className="taskList" ref={dropRef} >
            <h1>{title}</h1>
            <button className="sortButton" onClick={toggleMenuDisplay}>
                <img className="sortIcon" src={sortIcon} alt="v^"></img>
            </button>

            <button
                className="appContainer_curtain"
                style={{ "display": menuDisplay }}
                onClick={toggleMenuDisplay}
            ></button>
            <div className="sortMenu" id={`sortMenu${id}`} style={{ "display": menuDisplay }}>
                <h1>{"Sort - " + title}</h1>

                <button className="default block" onClick={
                    () => { setFirstSortParam(""); }
                }>remove sort</button>

                <button className="default block" onClick={
                    () => { setFirstSortParam("subject"); }
                }>Sort by subject</button>

                <button className="default block" onClick={
                    () => { setFirstSortParam("difficulty"); }
                }>Sort by difficulty</button>
            </div>

            <div className="content">
                {
                    firstSortParam === "subject" ?
                        getAllSubjects().map((subject) => {
                            return <TaskDivider
                                key={subject + title}
                                title={subject}
                                filterFunc={(task) => task.subject === subject}
                                tasks={tasks.filter((task) => task.progress === id)}
                            />
                        })
                        : firstSortParam === "difficulty" ?
                            getAllDifficulty().map((diffLevel) => {
                                return <TaskDivider
                                    id={diffLevel + title}
                                    title={diffLevel}
                                    filterFunc={(task) => task.difficulty === diffLevel}
                                    tasks={tasks.filter((task) => task.progress === id)}
                                />
                            })
                            : tasks && tasks?.length ?
                                tasks.filter((task) => task.progress === id).map((task) => {
                                    return <Task key={task._id} task={task} />
                                }) : null
                }
            </div>
        </div >
    );
}
