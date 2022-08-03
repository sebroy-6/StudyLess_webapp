import React, { useState } from "react";
import { useSwitch } from "./hooks/useSwitch";
import "./css/ClickableComponents.modules.css";
import settingsImage from "../images/gearPicture.png";
import profileImage from "../images/defaultProfilePicture.png";


export const SettingsButton = () => {
    const [isRotated, setIsRotated] = useState("");

    const toggleIsRotated = () => {
        if (!isRotated) setIsRotated("rotated");
        else setIsRotated("");
    }

    return (
        <button onClick={toggleIsRotated} className="image">
            <img id="gearImg" className={isRotated} src={settingsImage} alt="settings" />
        </button>

    );
};


export const ProfileLink = () => {
    return (
        <a href="/account" className="image">
			<img src={profileImage} alt="Profile"/>
		</a>
    );
};


export const AddButton = (props) => {
    const toggleAddButton = () => {
        let symbole = document.getElementById("symbole");
        if (symbole.innerHTML === "+") { 
            symbole.innerHTML = "-"; 
            props.element.style.display = "inline-block";
        }
        else { 
            symbole.innerHTML = "+";
            props.element.style.display = "none";
        }
    };

    return (
        <button className="addButton top-right" onClick={toggleAddButton}>
            {"Add " + props?.type + ""}<span className="symbole" id="symbole">+</span>
        </button>
    );
};

export const StartStopButton = (props) => {
    const [innerHtml, toggleInnerHtml] = useSwitch("Start", "Stop");

    const whenClicked = () => {
        toggleInnerHtml();
        props?.onClick();
    };

    return (
        <button onClick={whenClicked} className="default">
            {innerHtml}
        </button>
    );
}


