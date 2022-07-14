const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if(req.session.userid)
        res.render("studySchedule");
    else
        res.redirect("/");
});

module.exports = router;