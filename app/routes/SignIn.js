const jsonScript = require("../scripts/json_scripts");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser'); // Middleware 

router.use(bodyParser.urlencoded({ extended: false }));


function signInNewUser(req_body, res) {
    let username = req_body.uname;
    let password = req_body.psw;
    if (!jsonScript.getUser(username)){
      if(username !== "" && password !== "") {
        jsonScript.addUser(username, password);
        res.render("signIn");
      }
      else {
        res.render("signIn", { errorMsg : "please enter a username and password"})
      }
    }
    else {
      res.render("signIn", { errorMsg : "This user already exists" });
    }
}

function logInUser(req_body, res) {
  let user = jsonScript.getUser(req_body.uname);
  if (user){
    if (req_body.psw === user.password) {
      res.redirect("/homePage");
    }
    else {
      res.render("signIn", { errorMsg : "Incorrect password, please try again"});
    }
  }
  else {
    res.render("signIn", { errorMsg : "This user does not exist" });
  }
}


router.get("/", (req, res) => {
  res.render("signIn", {errorMsg : ""});
});

router.post("/", (req, res) => {
  if (req.body.Button === "signUp"){
    signInNewUser(req.body, res);
  }
  else if (req.body.Button === "logIn") {
    logInUser(req.body, res);
  }
});

module.exports = router;
