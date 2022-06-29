const jsonScript = require("../scripts/json_scripts");
const express = require("express");
const router = express.Router();
const pagesRoute = "../public/pages";
const bodyParser = require('body-parser'); // Middleware 

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
    res.render(pagesRoute + "/signIn");
  });

router.post("/", (req, res) => {
  // Insert Login Code Here
  let username = req.body.uname;
  let password = req.body.psw;
  jsonScript.addUser(username, password);
  res.render(pagesRoute + "/signIn");
});

module.exports = router;
