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


export const SymboleButton = ({ onClick, text, logo1, logo2 }) => {
    const toggleAddButton = () => {
        onClick();
        let symbole = document.getElementById("symbole");
        if (symbole.innerHTML === logo1) {
            symbole.innerHTML = logo2;
        }
        else {
            symbole.innerHTML = logo1;
        }
    };

    return (
        <button className="addButton top-right" onClick={toggleAddButton}>
            {"Add " + text + ""}<span className="symbole" id="symbole">{logo1}</span>
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


