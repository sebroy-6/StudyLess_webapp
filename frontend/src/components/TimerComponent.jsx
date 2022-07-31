import React from "react";
import { StartStopButton } from "./ClickableComponents";
import { useTimer } from "./hooks/useTimer.jsx";
import "./css/TimerComponent.modules.css";

const TimerTopMenu = (props) => {
    
    
    return (
        <div className="timerTopMenu-container">
            <button>Study</button>
            <button>Break</button>
            <button>timeout</button>
        </div>
    );
};

export const Timer = (props) => {
    const [time, toggleTimer] = useTimer(props?.hours, props?.minutes, props?.seconds);

    return (
        <div className="bubble mainColor">
            <TimerTopMenu/>
            <h1>{time}</h1>
            <StartStopButton onClick={toggleTimer}/>
		</div>
    );
};