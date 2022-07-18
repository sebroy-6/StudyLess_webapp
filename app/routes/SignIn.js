const express = require("express"); 
const bcrypt = require("bcrypt");
const mdbScripts = require("../scripts/editMongodb");

const router = express.Router();

router.get("/", (req, res) => {
    if (req.session.userid)
        res.redirect("homePage");
    else
        res.render("signIn", {errorMsg : ""});
});

router.post("/", async (req, res) => {
    if (req.body.Button === "signUp"){
        if (await mdbScripts.getModel("user").findOne({ username: req.body.uname })){
            res.render("signIn", { errorMsg : "This user already exists" });
        } 
        else {
            if (req.body.uname !== "" && req.body.psw !== "") {
                const hashedPassword = (await bcrypt.hash(req.body.psw, 10)).toString();
                let newUser = new mdbScripts.getModel("user")({
                    username: req.body.uname,
                    password: hashedPassword,
                });
                newUser.save();
                res.render("signIn");
            }
            else
                res.render("signIn", { errorMsg : "please enter a username and password"});
        }
    }

    else if (req.body.Button === "logIn") {
        let user = await mdbScripts.getModel("user").findOne({ username: req.body.uname });
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
