import React from "react";
import { FullSideBar, ShortTopBar } from "../components/NavBarComponents.jsx";
import { Timer } from "../components/TimerComponent.jsx"


const TimerPage = () => {

    return (
        <div className="library palle">
            <FullSideBar isHidden={true}/>
            <ShortTopBar/>
            <Timer/>
        </div>
    );

}

export default TimerPage;