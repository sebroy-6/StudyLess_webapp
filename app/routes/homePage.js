const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    console.log(req.session);
    if(req.session.userid)
        res.render("homePage");
    else
        res.redirect("/");
});

module.exports = router;