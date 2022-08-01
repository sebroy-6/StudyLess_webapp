import { useEffect } from "react";
import { useState } from "react";
import { useTimer } from "./useTimer";

const TIMER_END_VALUE = "0";

export const useStudyTimer = (totalStudyTime, totalBreakTime, totalTimeoutTime, totalReps = 1) => {
    
    let [studyTime, toggleStudyTimer, resetStudyTime] = useTimer(totalStudyTime);
    const [breakTime, toggleBreakTimer, resetBreakTime] = useTimer(totalBreakTime);
    const [timeoutTime, toggleTimeoutTimer, resetTimeoutTime] = useTimer(totalTimeoutTime);
    const [timerMode, setTimerMode] = useState("study");
    const [reps, setReps] = useState(totalReps);

    useEffect( () => {
        if (reps >= 1) {
            if (timerMode === "study") {
                if (studyTime ===  TIMER_END_VALUE) {
                    toggleStudyTimer();
                    resetStudyTime();
                    toggleBreakTimer();
                    setTimerMode("break"); 
                }
            }
            else if (timerMode === "break") {
                if (breakTime ===  TIMER_END_VALUE) {
                    resetBreakTime();
                    if (reps === 1) { 
                        toggleTimeoutTimer();
                        setTimerMode("timeout"); 
                    }
                    else {
                        toggleBreakTimer();
                        resetBreakTime();
                        toggleStudyTimer();
                        setTimerMode("study");
                    }
                    setReps(reps - 1);
                }
            }
        }
        else if (reps === 0){
            if (timerMode === "timeout" && timeoutTime === TIMER_END_VALUE) {
                setTimerMode("end");
            }
        }
    },[studyTime, breakTime, timeoutTime]);

    const toggleIsRunning = () => {
        if (timerMode === "study") { toggleStudyTimer(); }
        else if (timerMode === "break") { toggleBreakTimer(); }
        else { toggleTimeoutTimer(); }
    };

    if (timerMode === "study") { return [studyTime, toggleIsRunning, timerMode, reps]; }
    else if (timerMode === "break") { return [breakTime, toggleIsRunning, timerMode, reps]; }
    else if (timerMode === "timeout") { return [timeoutTime, toggleIsRunning, timerMode, reps]; }
    else if (timerMode === "end") { return ["end of \n session", toggleIsRunning, timerMode, reps]; }
}