const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if(!req.session.userid)
        return res.redirect("/");
    res.json({"message" : "show account settings"});   //res.render("account");
});

router.post("/", (req, res) => {
    
    if (req.body.button === "logout") {
        req.session.destroy();
        return res.redirect("/");
    }
    
    res.render("account");
});

module.exports = router;