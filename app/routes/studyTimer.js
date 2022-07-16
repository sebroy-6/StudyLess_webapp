const express = require("express");
const router = express.Router();

const STUDY_TIME = "00:10";
const BREAK_TIME = "00:05";
const TIME_OUT_TIME = "00:10";

router.get("/", (req, res) => {
    if(req.session.userid)
        res.render("studyTimer", { time: STUDY_TIME });
    else
        res.redirect("/");
});

router.post("/", (req, res) => {
    if(req.session.userid === undefined)
        res.redirect("/");
    else {
        let timerMode;
        if (req.body.timerState) {
            timerMode = req.body.timerState;
            let responseJson = {};
            switch (timerMode) {
                case "study":
                    responseJson.newTime = STUDY_TIME;
                    break;
                case "break":
                    responseJson.newTime = BREAK_TIME;
                    break;
                case "time-out":
                    responseJson.newTime = TIME_OUT_TIME;
                    break;
                default:
                    responseJson.newTime = "00:00:00";
            }
            res.json(responseJson);
        }
        else if (req.body.button) {
            timerMode = req.body.button;
            switch (timerMode) {
                case "study":
                    res.render("studyTimer", { time: STUDY_TIME });
                    break;
                case "break":
                    res.render("studyTimer", { time: BREAK_TIME });
                    break;
                case "time-out":
                    res.render("studyTimer", { time: TIME_OUT_TIME });
                    break;
                default:
                    res.render("studyTimer", { time: "00:00:00"});
            } 
        }
    }
});

module.exports = router;