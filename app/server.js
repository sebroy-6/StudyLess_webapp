const express = require("express");
const path = require('path');
const app = express();
const PORT = 5000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile("../pages/index.html");
});

app.listen(PORT);
