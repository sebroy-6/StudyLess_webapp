const express = require("express");
const router = express.Router();

const STUDY_TIME = "00:25";
const BREAK_TIME = "00:05";
const TIME_OUT_TIME = "00:15";

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
        let responseJson = {};
        switch (req.body.timerState) {
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
});

module.exports = router;