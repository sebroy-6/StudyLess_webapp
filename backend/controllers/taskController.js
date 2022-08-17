const Task = require("../models/taskModel");

async function getAllTasks(req, res) {
	try {
		const allTasks = await Task.getAll(req.user);
		return res.status(200).json(allTasks);
	} catch (error) {
		return res.status(error.status).json(error.message);
	}
}

async function getTask(req, res) {
	try {
		const { id } = req.params;
		const task = await Task.getOneById(req.user, id);
		return res.status(200).json(task);
	} catch (error) {
		return res.status(error.status).json(error.message);
	}
}

async function createTask(req, res) {
	try {
		const createdTask = await Task.createOne(req.user, req.body.task);
		return res.status(200).json(createdTask);
	} catch (error) {
		return res.status(error.status).json(error.message);
	}
}

async function deleteTask(req, res) {
	try {
		const { id } = req.params;
		const result = await Task.deleteOneById(req.user, id);
		return res.status(200).json(result);
	} catch (error) {
		return res.status(error.status).json(error.message);
	}
}

async function updateTask(req, res) {
	try {
		const { id } = req.params;
		const result = await Task.updateOneById(req.user, id, req.body.task);
		return res.status(200).json(result);
	} catch (error) {
		return res.status(error.status).json(error.message);
	}
}

module.exports = { getAllTasks, getTask, createTask, deleteTask, updateTask };
