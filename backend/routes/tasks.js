const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if(!req.session.userid)
        return res.redirect("/");
    
    res.json([{ hello: "world"}]);

});


module.exports = router;