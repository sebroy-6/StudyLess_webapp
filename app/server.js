const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;
const viewsRoute = "../public/views";

app.set("view engine", "ejs");
//set the path to the views
app.set('views', path.join(__dirname, viewsRoute));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

const signInRouter = require("./routes/signIn");
app.use("/signIn", signInRouter);

const homePageRouter = require("./routes/homePage");
app.use("/homePage", homePageRouter);

app.listen(PORT);
