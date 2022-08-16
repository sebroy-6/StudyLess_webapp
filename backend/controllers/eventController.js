const Event = require("../models/eventModel");

async function getEventsByDay(req, res) {
	try {
		const { day } = req.params;
		const events = await Event.getByDay(req.user, day);
		return res.status(200).json(events);
	} catch (error) {
		return res.status(400).json(error.message);
	}
}

async function createEvent(req, res) {
	try {
		const events = await Event.createOne(req.user, req.body.event);
		return res.status(200).json(events);
	} catch (error) {
		return res.status(400).json(error.message);
	}
}

async function deleteEvent(req, res) {
	try {
		const { id } = req.params;
		const deletedEvent = await Event.deleteOneById(req.user, id);
		return res.status(200).json(deletedEvent);
	} catch (error) {
		return res.status(400).json(error.message);
	}
}

module.exports = { getEventsByDay, createEvent, deleteEvent };
