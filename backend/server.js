require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { authenticateJWT } = require("./controllers/JWTController");

const mongodbURI = process.env.MONGO_URI;

const app = express();

mongoose
	.connect(mongodbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB Connected");
	});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require("./routes/user");
app.use("/api/user", userRouter);

const taskRouter = require("./routes/task");
app.use("/api/task", authenticateJWT, taskRouter);

const eventRouter = require("./routes/event");
app.use("/api/event", authenticateJWT, eventRouter);

app.listen(
	process.env.PORT,
	console.log(`Running server on port ${process.env.PORT}`)
);
