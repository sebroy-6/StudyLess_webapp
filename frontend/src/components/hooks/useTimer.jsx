import { useState, useEffect } from "react";

function secondsToTimestring(time) {
    const hours = Math.floor(time / 3600);
    time -= hours * 3600;
    const minutes = Math.floor(time / 60);
    time -= minutes * 60;
    const seconds = time;

    const hoursString = hours ?  `${hours}:` : "";
    const minutesString = minutes ? `${hours && minutes < 10? "0" : ""}${minutes}:` : "";
    const secondsString = minutes && seconds < 10 ? `0${seconds}` : seconds;

    return `${hoursString}${minutesString}${secondsString}`;
}

export const useTimer = ({hours = 0, minutes = 0, seconds = 0}) => {
    const [time, setTime] = useState(hours * 3600 + minutes * 60 + seconds);
    const [isRunning, setIsRunning] = useState(false);

    const resetTime = () => {
        setTime(hours * 3600 + minutes * 60 + seconds);
    };
    
    useEffect(() => {
        const timeout = setTimeout( () => {
            if (isRunning && time > 0) {
                setTime(time - 1); 
            }
        }, 1000);

        return () => { clearTimeout(timeout); };
    });

    const toggleIsRunning = () => {
        setIsRunning(!isRunning);
    }

    let timeString = secondsToTimestring(time);
    return [timeString, toggleIsRunning, resetTime];
}