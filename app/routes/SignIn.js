const express = require("express");
const router = express.Router();
const pagesRoute = "../public/pages"
const bodyParser = require('body-parser'); // Middleware 

router.use(bodyParser.urlencoded({ extended: false }));


function verifyLogin(uname, psw) {
  if (uname.length > 0 && psw.length > 0)
    return true;
  else 
    return false
}

router.get("/", (req, res) => {
    res.render(pagesRoute + "/signIn");
  });

router.post("/", (req, res) => {
  // Insert Login Code Here
  let username = req.body.uname;
  let password = req.body.psw;
  res.send(verifyLogin(username, password));
});

module.exports = router;
