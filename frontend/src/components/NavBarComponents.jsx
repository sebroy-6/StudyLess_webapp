import React, { useEffect } from "react";
import { useSwitch } from "../hooks/useSwitch";
import { useNavigate } from "react-router-dom";
import "./css/NavBarComponents.css"
import { SettingsButton, ProfileLink } from "./ClickableComponents";


export const FullSideBar = (props) => {
    const [barIsHidden, toggleBarIsHidden] = useSwitch("", "hidden");
    const [optionIsHidden, toggleOptionIsHidden] = useSwitch("hidden", "");
    const navigate = useNavigate();

    const goToTimer = () => { navigate("/timer"); }
    const goToDailyTasks = () => { navigate("/homePage"); }
    const goToSchedule = () => { navigate("/schedule"); }

    const toggleBarDisplay = () => {
        toggleBarIsHidden();
        if (props?.hasAppContainer) {
            let appContainer = document.getElementsByClassName("app-container")[0];
            if (!barIsHidden) {
                appContainer.style.marginLeft = "0px";
                appContainer.style.width = "100%";
            }
            else {
                appContainer.style.marginLeft = "280px";
                appContainer.style.width = "calc(100% - 280px)";
            }
        }
    }

    useEffect(() => { if (props?.isHidden) { toggleBarDisplay(); } }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={"bar-side " + barIsHidden}>
            <a href="homePage" ><h1>POLYSTUDY</h1></a>
            <button className="option " onClick={goToDailyTasks}>See daily tasks</button>
            <button className="option " onClick={goToSchedule}>See Schedule</button>
            <button className="option " onClick={toggleOptionIsHidden}>Study tools</button>
            <button className={"option secondary " + optionIsHidden} onClick={goToTimer}>Timer</button>
            <button className="rightPullTag" onClick={toggleBarDisplay}><div></div></button>
        </div>
    );
}


export const FullTopBar = (props) => {

    return (
        <div className="bar-top">
            <ul className="bar-top">
                <li className="bar-top">
                    <ProfileLink />
                </li>
                <li className="bar-top">
                    <SettingsButton />
                </li>
                <li className="bar-top">
                    <a href="/contactMe"><b>CONTACT</b></a>
                </li>
            </ul>
        </div>
    );
}


export const ShortTopBar = () => {
    const [topBarIsHidden, toggleTopBarIsHidden] = useSwitch("", "hidden");

    return (
        <div className={"bar-top reduced " + topBarIsHidden}>
            <ul className="bar-top">
                <li className="bar-top">
                    <ProfileLink />
                </li>
                <li className="bar-top">
                    <SettingsButton />
                </li>
                <li className="bar-top">
                    <a href="/contactMe" className="text"><b>CONTACT</b></a>
                </li>
            </ul>
            <button className="bottomPullTag" onClick={toggleTopBarIsHidden}>
                <div></div>
            </button>
        </div>
    );
};