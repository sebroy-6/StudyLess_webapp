const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    if(req.session.userid)
        res.render("account");
    else
        res.redirect("/");
});

router.post("/", (req, res) => {
    if (req.body.button === "logout") {
        req.session.destroy();
        res.redirect("/");
    }
    else {
        res.redirect("/account");
    }

});

module.exports = router;