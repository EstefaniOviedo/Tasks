const tasks = require("../controllers/task")();
class router {
    constructor(app = null) {
        this.app = app;
    }

    configure() {
        this.app.get("/tasks", (req, res) => {
            tasks.getAllTasks(req, res);
        });

        this.app.get("/tasks/:id", (req, res) => {
            tasks.getTask(req, res);
        });

        this.app.post("/tasks", (req, res) => {
            tasks.createTask(req, res);
        });

        this.app.put("/tasks/:id", (req, res) => {
            tasks.updateTask(req, res);
        });

        this.app.delete("/tasks/:id", (req, res) => {
            tasks.deleteTask(req, res);
        });
    }
}

module.exports = (app) => {
    return new router(app);
};





