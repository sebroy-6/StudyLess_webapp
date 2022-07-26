import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/NavBarComponents.css"
import profileImage from "../images/defaultProfilePicture.png";
import settingsImage from "../images/gearPicture.png";

export const FullSideBar = () => {
    const [isHidden, setIsHidden] = useState("");
    const [isShown, setIsShown] = useState("hidden");

    const navigate = useNavigate();
    const goToTimer = () => {
        navigate("/timer");
    }

    const toggleIsHidden = () => {
        if (isHidden === "") setIsHidden("hidden");
        else setIsHidden("");
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


export const FullTopBar = () => {
    const [isRotated, setIsRotated] = useState();

    const toggleIsRotated = () => {
        if(!isRotated) setIsRotated("rotated");
        else setIsRotated("");
        console.log(isRotated);
    }
    
    return (
        <div className="bar-top">
			<ul className="bar-top">
				<li className="bar-top">
					<a href="/account" className="image">
						<img src={profileImage} alt="Profile"/>
					</a>
				</li>
				<li className="bar-top">
					<button onClick={toggleIsRotated} className="image">
						<img id="gearImg" className={isRotated} src={settingsImage} alt="settings" />
					</button>
				</li>
				<li className="bar-top">
					<a href="" className="text"><b>CONTACT</b></a>
				</li>
			</ul>
        </div>
    );
}