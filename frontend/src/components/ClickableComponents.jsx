import React, { useState } from "react";
import { useSwitch } from "../hooks/useSwitch";
import "./css/ClickableComponents.css";
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
            <img src={profileImage} alt="Profile" />
        </a>
    );
};


export const AddButton = ({ onClick, type }) => {
    const toggleAddButton = () => {
        onClick();
        let symbole = document.getElementById("symbole");
        if (symbole.innerHTML === "+") {
            symbole.innerHTML = "-";
        }
        else {
            symbole.innerHTML = "+";
        }
    };

    return (
        <button className="addButton top-right" onClick={toggleAddButton}>
            {"Add " + type + ""}<span className="symbole" id="symbole">+</span>
        </button>
    );
};


export const StartStopButton = ({ onClick }) => {
    const [innerHtml, toggleInnerHtml] = useSwitch("Start", "Stop");

    const whenClicked = () => {
        toggleInnerHtml();
        onClick();
    };

    return (
        <button onClick={whenClicked} className="default">
            {innerHtml}
        </button>
    );
}


