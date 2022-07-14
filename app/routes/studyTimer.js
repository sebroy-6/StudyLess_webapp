const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if(req.session.userid)
        res.render("studyTimer");
    else
        res.redirect("/");
});

module.exports = router;