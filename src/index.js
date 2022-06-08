const express = require("express");
const cors = require("cors");
//const morgan = require("morgan");
//const router = require("./routes/tasks.routes.js");
const {appServer} = require("./config.json");
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const route = require("./routes/tasks.routes")(app);
route.configure();

app.listen(appServer.appPort, () => {
	console.log("Servidor inicializado", appServer.appPort);
});