const jsonScript = require("../scripts/json_scripts");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser'); // Middleware 

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.render("signIn", {errorMsg : ""});
});

router.post("/", (req, res) => {
  // Insert Login Code Here
  if (req.body.Button === "signUp"){
    let username = req.body.uname;
    let password = req.body.psw;
    if (!jsonScript.getUser(username)){
      jsonScript.addUser(username, password);
      res.render("signIn");    // The object passed as a parameter can be referenced by locals
    }
    else {
      res.render("signIn", { errorMsg : "This user already exists" });
    }
  }
  else if (req.body.Button === "logIn") {
    if (jsonScript.getUser(req.body.uname)){
      res.redirect("/homePage");
    }
    else {
      res.render("signIn", { errorMsg : "This user does not exist" });
    }
  }
});

module.exports = router;
