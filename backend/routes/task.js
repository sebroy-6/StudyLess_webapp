const express = require("express");
const {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
} = require("../controllers/taskController");
const router = express.Router();


router.get("/", getAllTasks);

router.get("/:id", getTask);      // get specific task by task.id

router.post("/", createTask);        // create new task

router.delete("/:id", deleteTask);   // delete task

router.patch("/:id", updateTask);    // update task

module.exports = router;