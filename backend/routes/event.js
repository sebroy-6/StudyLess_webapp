const express = require("express");
const router = express.Router();
const {
	getEventsByDay,
	createEvent,
	deleteEvent,
} = require("../controllers/eventController");

router.get("/:day", getEventsByDay);

router.post("/", createEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
