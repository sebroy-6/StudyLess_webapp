const Task = require("../models/taskModel");

async function getAllTasks(req, res) {
    try {
        const allTasks = await Task.getAll(req.user);
        return res.status(200).json(allTasks);
    }
    catch(error) {
        return res.status(400).json(error.message);
    }
};

async function getTask(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.getOneById(req.user, id);
        return res.status(200).json(task);
    }
    catch(error) {
        return res.status(400).json(error.message);
    }
};

async function createTask(req, res) {
    //try {
        const createdTask = await Task.createOne(req.user, req.body.task);
        return res.status(200).json(createdTask);
    //}
    //catch(error) {
        //console.log
        return res.status(400).json(error.message);
    //}
    return res.status(400).json(error.message);

};

async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const deletedTask = await Task.deleteOneById(req.user, id);
        return res.status(200).json(deletedTask);
    }
    catch(error) {
        return res.status(400).json(error.message);
    }
};

async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const updatedTask = await Task.updateOneById(req.user, id, req.body.task);
        return res.status(200).json(updatedTask);
    }
    catch(error) {
        return res.status(400).json(error.message);
    }
    // return res.status(200).json("UPDATE one task");
};

module.exports = { getAllTasks, getTask, createTask, deleteTask, updateTask };