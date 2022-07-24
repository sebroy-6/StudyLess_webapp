const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({"message" : "show account settings"});
});

router.post("/", (req, res) => {
});

module.exports = router;