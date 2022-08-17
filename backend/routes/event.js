const express = require("express");
const router = express.Router();
const {
	getEventsByDay,
	createEvent,
	deleteEvent,
	updateEvent,
} = require("../controllers/eventController");

router.get("/:day", getEventsByDay);

router.post("/", createEvent);

router.delete("/:id", deleteEvent);

router.patch("/:id", updateEvent);

module.exports = router;
