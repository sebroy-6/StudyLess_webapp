import React from "react";
import { ShortTopBar } from "../components/NavBarComponents.jsx";
import { Timer } from "../components/TimerComponent.jsx"


const TimerPage = () => {

    return (
        <div className="library palle">
            <ShortTopBar/>
            <Timer/>
        </div>
    );

}

export default TimerPage;