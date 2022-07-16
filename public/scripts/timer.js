const PORT = 5000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;

const ACTIVE_COLOR = "lightgrey";
const DEFAULT_COLOR = "white";

function isOrderedTime(time) {
    if (typeof(time) === "string") {
        let timeElem = time.split(":");
        if (3 >= timeElem.length && timeElem.length >= 1){
            let areNumbers = true;

            for (let elem in timeElem) {
                if (!(/^[0-9]+$/.test(elem))) {
                    areNumbers = false;
                }
            }
            // TODO : add verification to see if minutes and seconds dont go past 60
            if (areNumbers) {
                if (timeElem.length === 3) {
                    return timeElem[0].length >= 2 && 
                           timeElem[1].length === 2 &&
                           timeElem[2].length === 2;
                }
                else if (timeElem.length === 2) {
                    return timeElem[0].length === 2 &&
                           timeElem[1].length === 2;
                }
                else 
                    return timeElem[0].length === 2;
            }
        }
    }
    return false;
}


function secondsToOrderedTime(seconds) {
    if (typeof(seconds) !== "number" || (seconds <= 0 && seconds % 1 === 0))
        return "00:00:00";

    let hours = Math.floor(seconds / SECONDS_IN_HOUR);
    seconds -= hours * SECONDS_IN_HOUR;
    let minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
    seconds -= minutes * SECONDS_IN_MINUTE;

    if (hours) {
        hours = hours > 9 ? hours.toString() : `0${hours}`;
        minutes = minutes > 9 ? minutes.toString() : `0${minutes}`;
        seconds = seconds > 9 ? seconds.toString() : `0${seconds}`;
        return `${hours}:${minutes}:${seconds}`;
    }
    if (minutes) {
        minutes = minutes > 9 ? minutes.toString() : `0${minutes}`;
        seconds = seconds > 9 ? seconds.toString() : `0${seconds}`;
        return `${minutes}:${seconds}`;
    }
    seconds = seconds > 9 ? seconds.toString() : `0${seconds}`;
    return `${seconds}`;
}


function getCurrentTimerState() {
    let breakTagColor = document.getElementById("breakTag").style.color;
    let timeoutTagColor = document.getElementById("time-outTag").style.color;
    
    if (breakTagColor === ACTIVE_COLOR)
        return "break";
    else if (timeoutTagColor === ACTIVE_COLOR)
        return "time-out";
    else 
        return "study";
}


function orderedTimeToSeconds(time) {
    if (!isOrderedTime(time))
        return -1;
    let seconds = 0;
    let timeElem = time.split(":");
    if (timeElem.length >= 1) {
        if (timeElem.length >= 2){
            if (timeElem.length === 3) {
                seconds += Number(timeElem.shift()) * SECONDS_IN_HOUR;
            }
            seconds += Number(timeElem.shift()) * SECONDS_IN_MINUTE;
        }
        seconds += Number(timeElem.shift());
    }
    return seconds;
}


function shuffleTimerState() {
    let nextState;
    switch(getCurrentTimerState()) {
        case "study":
            nextState = "break";
            document.getElementById("breakTag").style.color = ACTIVE_COLOR;
            document.getElementById("studyTag").style.color = DEFAULT_COLOR;
            break;
        case "break":
            nextState = "time-out";
            document.getElementById("time-outTag").style.color = ACTIVE_COLOR;
            document.getElementById("breakTag").style.color = DEFAULT_COLOR;
            break;
        case "time-out":
            nextState = "study";
            document.getElementById("studyTag").style.color = ACTIVE_COLOR;
            document.getElementById("time-outTag").style.color = DEFAULT_COLOR;
            break;
    }
    document.getElementById("start").innerHTML = "START";
    return nextState;
}


function toggleTimer(seconds, outputId, buttonId) {
    if (typeof(outputId) === "string" && typeof(buttonId) === "string") {
        let start = new Date();
        document.getElementById(outputId).innerHTML = secondsToOrderedTime(seconds);

        if (document.getElementById(buttonId).innerHTML.toLowerCase() === "stop") {
            let timer = setInterval(() => {
                let timeLeft = seconds - Math.floor((new Date() - start) / 1000);
                let buttonState = document.getElementById(buttonId).innerHTML;

                if (timeLeft && buttonState.toLowerCase() === "stop")
                    document.getElementById(outputId).innerHTML = secondsToOrderedTime(timeLeft);
                else if (buttonState.toLowerCase() === "start"){
                    clearInterval(timer);
                }
                else {
                    clearInterval(timer);
                    document.getElementById(outputId).innerHTML = "0"; 
                    let timerState = shuffleTimerState();
                    const data = { timerState };
                    fetch(`/studyTimer`, { 
                        method : 'POST', 
                        headers : {
                            'Content-Type': 'application/json'
                        },
                        body : JSON.stringify(data)
                    }).then((resp) => resp.json()).then((resp) => {
                        document.getElementById(outputId).innerHTML = resp.newTime;
                    });
                }
            }, 50);
        }
    }
}

