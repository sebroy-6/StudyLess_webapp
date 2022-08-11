import React from "react";
import "./css/ScheduleComponents.css";

const ScheduleTimeColumn = ({ nbRows }) => {
    const rows = [<tr key={-1}><td></td></tr>];
    const time = [
        "7:00", "7:15", "7:30", "7:45", "8:00", "8:15", "8:30", "8:45", "9:00", "9:15", "9:30",
        "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00",
        "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30",
        "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00",
        "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30",
        "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00"
    ];
    for (let i = 0; i < nbRows; i++) {
        rows.push(<tr key={i}><td>{time[i]}</td></tr>);
    }

    console.log(rows);

    return (
        <table className="timeColumn">
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

export const WorkWeekSchedule = () => {
    return (
        <div className="workWeekSchedule">
            <ScheduleTimeColumn nbRows={3} />
            <table className="weekSchedule">
                <tbody>
                    <tr>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export const WeekEndSchedule = () => {
    return (
        <div className="workWeekSchedule">
            <ScheduleTimeColumn nbRows={3} />
            <table className="weekSchedule">
                <tbody>
                    <tr className="weekend">
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


export const FullWeekSchedule = () => {
    return (
        <div className="schedule-container">
            <WorkWeekSchedule />
            <WeekEndSchedule />
        </div>
    );
}

