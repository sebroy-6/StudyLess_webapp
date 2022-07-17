const PORT = 5000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;

const ACTIVE_COLOR = "grey";
const DEFAULT_COLOR = "white";

const STUDY_MODE = "study";
const BREAK_MODE = "break";
const TIMEOUT_MODE = "time-out";

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
        return BREAK_MODE;
    else if (timeoutTagColor === ACTIVE_COLOR)
        return TIMEOUT_MODE;
    else 
        return STUDY_MODE;
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
    switch (getCurrentTimerState()) {
        case STUDY_MODE:
            nextState = BREAK_MODE;
            document.getElementById("breakTag").style.color = ACTIVE_COLOR;
            document.getElementById("studyTag").style.color = DEFAULT_COLOR;
            break;
        case BREAK_MODE:
            nextState = TIMEOUT_MODE;
            document.getElementById("time-outTag").style.color = ACTIVE_COLOR;
            document.getElementById("breakTag").style.color = DEFAULT_COLOR;
            break;
        case TIMEOUT_MODE:
            nextState = STUDY_MODE;
            document.getElementById("studyTag").style.color = ACTIVE_COLOR;
            document.getElementById("time-outTag").style.color = DEFAULT_COLOR;
            break;
    }
    return nextState;
}


function setTimerByState(timerState) {
    document.getElementById("start").innerHTML = "START";
    if (timerState === STUDY_MODE) {
        document.getElementById("studyTag").style.color = ACTIVE_COLOR;
        document.getElementById("breakTag").style.color = DEFAULT_COLOR;
        document.getElementById("time-outTag").style.color = DEFAULT_COLOR;
    }
    else if (timerState === BREAK_MODE) {
        document.getElementById("studyTag").style.color = DEFAULT_COLOR;
        document.getElementById("breakTag").style.color = ACTIVE_COLOR;
        document.getElementById("time-outTag").style.color = DEFAULT_COLOR;
    }
    else if (timerState === TIMEOUT_MODE) {
        document.getElementById("studyTag").style.color = DEFAULT_COLOR;
        document.getElementById("breakTag").style.color = DEFAULT_COLOR;
        document.getElementById("time-outTag").style.color = ACTIVE_COLOR;
    }

    const data = { timerState };
    fetch(`/studyTimer`, { 
        method : 'POST', 
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    }).then((resp) => resp.json()).then((resp) => {
        document.getElementById("browserTab").innerHTML = `${resp.newTime} - POLYSTUDY`;
        document.getElementById("clock").innerHTML = resp.newTime;
    });
}


function toggleTimer(seconds, outputId, buttonId) {
    if (typeof(outputId) === "string" && typeof(buttonId) === "string") {
        let start = new Date();
        document.getElementById(outputId).innerHTML = secondsToOrderedTime(seconds);

        if (document.getElementById(buttonId).innerHTML.toLowerCase() === "stop") {
            let timer = setInterval(() => {
                let timeLeft = seconds - Math.floor((new Date() - start) / 1000);
                let buttonState = document.getElementById(buttonId).innerHTML;

                if (timeLeft && buttonState.toLowerCase() === "stop") {
                    let orderedTimeLeft = secondsToOrderedTime(timeLeft);
                    document.getElementById(outputId).innerHTML = orderedTimeLeft;
                    document.getElementById("browserTab").innerHTML = `${orderedTimeLeft} - POLYSTUDY`;
                }
                else if (buttonState.toLowerCase() === "start"){
                    clearInterval(timer);
                }
                else {
                    clearInterval(timer);
                    console.log(new Date() - start);
                    document.getElementById("browserTab").innerHTML = `0 - POLYSTUDY`;
                    document.getElementById(outputId).innerHTML = "0"; 
                    setTimerByState(shuffleTimerState());
                }
            }, 50);
        }
    }
}

