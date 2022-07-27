import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/NavBarComponents.css"
import { SettingsButton, ProfileLink } from "./ClickableComponents";


export const FullSideBar = () => {
    const [isHidden, setIsHidden] = useState("");
    const [isShown, setIsShown] = useState("hidden");

    const navigate = useNavigate();
    const goToTimer = () => {
        navigate("/timer");
    }

    const toggleIsHidden = () => {
        let appContainer = document.getElementsByClassName("app-container")[0];
        if (isHidden === ""){
            setIsHidden("hidden");
            appContainer.style.marginLeft = "0px";
            appContainer.style.width = "100%";
        }
        else {
            setIsHidden("");
            appContainer.style.marginLeft = "280px";
            appContainer.style.width = "calc(100% - 280px)";
        }
    };

    const toggleIsShow= () => {
        if (isShown === "") setIsShown("hidden");
        else setIsShown("");
    };

    return (
        <div className={"bar-side " + isHidden}>
            <a href="homePage" ><h1>POLYSTUDY</h1></a>
            <button className="option " onClick={toggleIsShow}>Study tools</button>
            <button className={"option secondary " + isShown} onClick={goToTimer}>Timer</button>
            <button className="option " >See Schedule</button>
            <button className="option " >See daily tasks</button>
            <button className="rightPullTag" onClick={toggleIsHidden}><div></div></button>
        </div>
    );
}


export const FullTopBar = (props) => {
    
    return (
        <div className="bar-top">
			<ul className="bar-top">
				<li className="bar-top">
					<ProfileLink/>
				</li>
				<li className="bar-top">
					<SettingsButton/>
				</li>
				<li className="bar-top">
					<a href="/contactMe"><b>CONTACT</b></a>
				</li>
                <li className="bar-top">
                    <h1>{props.pageTitle}</h1>
                </li>
			</ul>
        </div>
    );
}