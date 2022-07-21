const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if(!req.session.userid)
        return res.redirect("/");
        
    res.render("homePage");
});

module.exports = router;