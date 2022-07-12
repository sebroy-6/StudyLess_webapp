const jsonScript = require("../scripts/json_scripts");
const express = require("express"); 
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", (req, res) => {
    if (req.session.userid)
        res.redirect("homePage");
    else
        res.render("signIn", {errorMsg : ""});
});

router.post("/", async (req, res) => {
    if (req.body.Button === "signUp"){
        let username = req.body.uname;
        let password = req.body.psw;

        if (!jsonScript.getUser(username)){

            if(username !== "" && password !== "") {
                jsonScript.addUser(username, password);
                res.render("signIn");
            }
            else
                res.render("signIn", { errorMsg : "please enter a username and password"});

        } 
        else 
            res.render("signIn", { errorMsg : "This user already exists" });
    }

    else if (req.body.Button === "logIn") {
        let user = jsonScript.getUser(req.body.uname);
        if (user){
            if (await bcrypt.compare(req.body.psw, user.password)) {
                req.session.userid = req.body.uname;
                res.redirect("/homePage");
            }
            else res.render("signIn", { errorMsg : "Incorrect password, please try again"});
        }
        else res.render("signIn", { errorMsg : "This user does not exist" });
    }
});

module.exports = router;
