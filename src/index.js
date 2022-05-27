const express = require("express");

const taskRoutes = require("./routes/tasks.routes.js");

const app = express();
app.use(express.json());
app.use(taskRoutes);
app.listen(3000);
console.log("Server on port 3000");