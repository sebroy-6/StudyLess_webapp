import React from "react";
import "./css/ScheduleComponents.css";

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
            <ScheduleTimeColumn nbRows={22} />
            <table className="weekSchedule">
                <tbody>
                    <tr>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                    {[...Array(22)].map((_, i) => (
                        <tr key={i}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
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
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

