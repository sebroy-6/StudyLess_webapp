import React from "react";
import "./css/TimerComponent.modules.css";

const TimerTopMenu = () => {
    return (
        <div className="timerTopMenu-container">
            <button>start</button>
            <button>pause</button>
            <button>timeout</button>
        </div>
    );
};

export const Timer = () => {
    return (
        <div className="bubble mainColor">
            <TimerTopMenu/>
		</div>
    );
};