
const { Client } = require("pg");
const db = require("../db");
//const client = new db.Client()

const getAllTasks = async (req, res) => {
    //res.send("retriven a list of task");
    console.log("En getAllTasks");
    try {
        //await conection.connect()
        await db.query("Select * from task")
            .then(result => {
                db.end()
                console.log(result.rows) // ['brianc']
                res.send({ tasks: result.rows || [] });

            }).catch(e => {
                db.end()
                console.error(e);
                res.send("Error");
            });
        db.end()
    } catch (err) {
        console.log(err);
    }
    /*await client.query("Select * from task", (err, result) => {
        //Client.end();
        if (err) {
            console.log(err);
            res.send("Error en Query")
        } else {
            console.log(result)
            res.send({ tasks: result.rows || [] });
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        }

        db.end();
    });*/

}

const getTask = async (req, res) => {
    let id = parseInt(req.params.id || 0, 10) || 0;
    db.query("Select * from task where id=$1", [
        id
    ])
        .then(result => {
            if(result.rows.length>0){
                res.send({ task: result.rows[0] });
            }else{
                res.send("Tarea no encontrada");
            }
        })
        .catch(e => {
            console.error(e.stack)
        });
}

const createTask = (req, res) => {
    const { title, description } = req.body;
    db.query("INSERT INTO task(title, description, active) VALUES($1 , $2, 1)", [
        title,
        description
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error en Query")
        } else {
            //console.log(result)
            res.send("Registro agregado");
        }

    });

}

const updateTask = async (req, res) => {
    let id = parseInt(req?.params.id || 0, 10);
    const { title, description } = req.body;
    console.log(id, title, description);
    db.query("UPDATE task SET title=$1, description=$2 WHERE id= $3", [
        title,
        description,
        id
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error en Query")
        } else {
            console.log(result)
            res.send("Registro actualizado");
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        }

    });
}

const deleteTask = async (req, res) => {
    let id = parseInt(req?.params.id || 0, 10);
    db.query("UPDATE task SET active = 0 WHERE id=$1", [
        id
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error en Query")
        } else {
            console.log(result)
            res.send("Registro eliminado");
        }

    });
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}