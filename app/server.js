const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const sessions = require("express-session");
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(sessions);

const mongodbURI = "mongodb://localhost:27017/PolyStudy";

const app = express();
const PORT = 5000;

const viewsRoute = "../public/views";
const sessionKey = "secretTestKey";
const maxSessionTime = 12 * 60 * 60 * 1000; // 12 hours

mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((res) => {
    console.log("MongoDB Connected");
});

const store = new MongoDBSession({
    uri: mongodbURI,
    collection: "sessions",
    saveUninitialized: false,
    useUnifiedTopology: true
}); 


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, viewsRoute));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
    secret: sessionKey,
    saveUninitialized: false,
    cookie: { maxAge: maxSessionTime },
    resave: false, 
    store: store
}));


app.get("/", (req, res) => {
    if(req.session.userid) {
        res.redirect("homePage"); 
    }
    else {
        res.render("index"); 
    }
});


const signInRouter = require("./routes/signIn");
app.use("/signIn", signInRouter);

const homePageRouter = require("./routes/homePage");
app.use("/homePage", homePageRouter);

const accountRouter = require("./routes/account");
app.use("/account", accountRouter);

const studyTimerRouter = require("./routes/studyTimer");
app.use("/studyTimer", studyTimerRouter);

const studyScheduleRouter = require("./routes/studySchedule");
app.use("/studySchedule", studyScheduleRouter);

app.listen(PORT, console.log(`Running server on port ${PORT}`));