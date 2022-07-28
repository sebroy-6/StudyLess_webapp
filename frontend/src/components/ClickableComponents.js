import React, { useState } from "react";
import "./css/ClickableComponents.modules.css";
import settingsImage from "../images/gearPicture.png";
import profileImage from "../images/defaultProfilePicture.png";


export const SettingsButton = () => {
    const [isRotated, setIsRotated] = useState("");

    const toggleIsRotated = () => {
        if (!isRotated) setIsRotated("rotated");
        else setIsRotated("");
        console.log(isRotated);
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

    };

    return (
        <button className="addButton top-right">
            {"Add " + props?.type + ""}<span className="symbole">+</span>
        </button>
    );
};