import React from "react";
import { StartStopButton } from "./ClickableComponents";
import "./css/TimerComponent.modules.css";
import { useStudyTimer } from "../hooks/useStudyTimer";

const TimerTopMenu = (props) => {

    return (
        <div className="timerTopMenu-container">
            <button className={props.timerMode === "study" ? "selected" : ""}>Study</button>
            <button className={props.timerMode === "break" ? "selected" : ""}>Break</button>
            <button className={props.timerMode === "timeout" ? "selected" : ""}>Timeout</button>
        </div>
    );
};

export const Timer = () => {
    const [time, toggleTimer, timerMode, reps] = useStudyTimer({ "minutes": 25 }, { "minutes": 5 }, { "minutes": 30 }, 2);

    return (
        <div className="bubble mainColor">
            <TimerTopMenu timerMode={timerMode} />
            <h1 className="time">{time}</h1>
            <StartStopButton onClick={toggleTimer} />
            <button className="cycleCount" >
                Cycles left: {reps} <div className="arrow down"></div>
            </button>
        </div >
    );
};