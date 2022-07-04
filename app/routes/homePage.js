const jsonScript = require("../scripts/json_scripts");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser'); // Middleware 

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.render("homePage");
});

module.exports = router;