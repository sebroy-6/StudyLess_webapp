const express = require("express"); 
const { signIn, logIn } = require("../controllers/authNController");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", (req, res) => {
    if (!req.session.userid)
        return res.render("signIn", {errorMsg : ""});

    res.redirect("homePage");
});

router.post("/", async (req, res) => {
    if (req.body.Button === "signUp"){
        signIn(req, res);
    }
    
    else if (req.body.Button === "logIn") {
        logIn(req, res);
    }
});

module.exports = router;
