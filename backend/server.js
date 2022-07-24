require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const sessions = require("express-session");
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(sessions);

const mongodbURI = process.env.MONGO_URI;

const app = express();

const viewsRoute = "./public/views";
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
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
    secret: process.env.SECRET_SESSIONS_KEY,
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


const userRouter = require("./routes/user");
app.use("/user", userRouter);

const homePageRouter = require("./routes/homePage");
app.use("/homePage", homePageRouter);

const accountRouter = require("./routes/account");
app.use("/account", accountRouter);

const studyTimerRouter = require("./routes/studyTimer");
app.use("/studyTimer", studyTimerRouter);

const studyScheduleRouter = require("./routes/studySchedule");
app.use("/studySchedule", studyScheduleRouter);

const tasksRouter = require("./routes/tasks");
app.use("/tasks", tasksRouter);

app.listen(process.env.PORT, console.log(`Running server on port ${process.env.PORT}`));