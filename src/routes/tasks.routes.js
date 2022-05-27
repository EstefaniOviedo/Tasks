const { Router } = require("express");
const db = require("../db");
const router = Router();
const { getAllTasks, getTask,createTask,updateTask, deleteTask} = require("../controllers/tasks.controllers");

router.get("/tasks", getAllTasks);

router.get("/tasks/:id", getTask);

router.post("/tasks", createTask);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);


module.exports = router;
