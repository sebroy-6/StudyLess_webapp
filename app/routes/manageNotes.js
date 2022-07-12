const jsonScript = require("../scripts/json_scripts");
const express = require("express");
const router = express.Router();

const fileUpload = require("express-fileupload");


router.use(fileUpload());


router.get("/", (req, res) => {
  res.render("manageNotes");
  res.redirect("/");
});

router.post("/", (req, res) => {
  if (req.files)
    res.render("manageNotes", { posServerRes : "File is uploaded"});
  else 
    res.render("manageNotes", { errorMsg : "There was a problem"});
});

module.exports = router;