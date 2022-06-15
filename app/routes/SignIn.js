const express = require("express");
const router = express.Router();
const pagesRoute = "../public/pages"

router.get("/", (req, res) => {
    res.render(pagesRoute + "/signIn");
  });

module.exports = router;
