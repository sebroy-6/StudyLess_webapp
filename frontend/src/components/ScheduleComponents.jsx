import React, { useState } from "react";
import { useDrop } from "react-dnd";
import "./css/ScheduleComponents.css";

const TimeSlot = () => {
    const [events, setEvents] = useState([])
    const [{ isOver }, dropRef] = useDrop({
        accept: "task",
        drop: (item) => setEvents((event) =>
            !events.includes(item) ? [...events, item] : events),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <tr className="timeSlot" ref={dropRef}>
            <td>
                {events.map((event) => {
                    return `${event.title} \n`
                })}
                {isOver && "HERE"}
            </td>
        </tr>
    );
}

export const DayPlanner = ({ date, nbRows = 1, type = "" }) => {
    const rows = [];
    for (let i = 0; i < nbRows; i++) {
        rows.push(<TimeSlot key={i} />);
    }
    return (
        <table className="schedule">
            <tbody>
                <tr className={type}><th>{date}</th></tr>
                {rows}
            </tbody>
        </table>
    );
}

export const FullWeekPlanner = () => {
    return (
        <div className="fullWeek">
            <DayPlanner date={"9 monday"} nbRows={12} />
            <DayPlanner date={"10 tuesday"} nbRows={12} />
            <DayPlanner date={"11 wednesday"} nbRows={12} />
            <DayPlanner date={"12 thursday"} nbRows={12} />
            <DayPlanner date={"13 friday"} nbRows={12} />
            <DayPlanner date={"14 saturday"} nbRows={12} type={"weekend"} />
            <DayPlanner date={"15 sunday"} nbRows={12} type={"weekend"} />
        </div>
    );
}

export const WorkWeekPlanner = () => {
    return (
        <div className="workWeek">
            <ScheduleTimeColumn nbRows={12} />
            <DayPlanner date={"9 monday"} nbRows={12} />
            <DayPlanner date={"10 tuesday"} nbRows={12} />
            <DayPlanner date={"11 wednesday"} nbRows={12} />
            <DayPlanner date={"12 thursday"} nbRows={12} />
            <DayPlanner date={"13 friday"} nbRows={12} />
        </div>
    );
}

const ScheduleTimeColumn = ({ nbRows }) => {
    const rows = [<tr key={-1}><td></td></tr>];
    const time = [
        "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00",
        "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
        "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
        "21:00", "21:30", "22:00"
    ];
    for (let i = 0; i < nbRows; i++) {
        rows.push(<tr key={i}><td>{time[i]}</td></tr>);
    }

    return (
        <table className="timeColumn">
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

export const WeekEndSchedule = () => {
    return (
        <div className="weekendSchedule">
            <ScheduleTimeColumn nbRows={22} />
            <table className="weekSchedule">
                <tbody>
                    <tr className="weekend">
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                    {[...Array(22)].map((_, i) => (
                        <tr key={i}>
                            <TimeSlot />
                            <TimeSlot />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

