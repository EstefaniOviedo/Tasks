const db = require("../db");

class Task{
    constructor() { }

    async getAllTasks(req, res) {
        try {
            //await conection.connect()
            await db.query("Select * from task where active=1")
                .then(result => {
                    res.send({ status: 0, message: "OK",tasks: result.rows || [] });
    
                }).catch(e => {
                    console.error(e);
                    res.send({status: 1, message: "Error"});
                });

        } catch (err) {
            res.send("ERROR 2");
            console.log(err);
        }
    }
    
    async getTask (req, res) {
        let id = parseInt(req.params.id || 0, 10) || 0;
        db.query("Select * from task where id=$1", [
            id
        ])
            .then(result => {
                if(result.rows.length>0){
                    res.send({ status: 0, message: "OK", task: result.rows[0] });
                }else{
                    res.send({status: 1, message:"Tarea no encontrada"});
                }
            })
            .catch(e => {
                console.error(e.stack)
            });
    }
    
     async createTask(req, res){
        const { title, description } = req.body;
        db.query("INSERT INTO task(title, description, active) VALUES($1 , $2, 1) RETURNING *", [
            title,
            description
        ], (err, result) => {
            if (err) {
                console.log(err);
                res.send({status: 1, message:"Error en Query"})
            } else {
                console.log(result);
                res.send({status: 0, message: "Registro creado", task:result.rows[0] || {}});
            }
    
        });
    
    }
    
   async updateTask(req, res){
        console.log("Task--->", req?.params.id);
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
                res.send({status: 1, message:"Error en Query"})
            } else {
                //console.log(result)
                res.send({status: 0, message:"Registro actualizado"});
                // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
            }
    
        });
    }
    
    async deleteTask(req, res){
        let id = parseInt(req?.params.id || 0, 10);
        db.query("UPDATE task SET active = 0 WHERE id=$1", [
            id
        ], (err, result) => {
            if (err) {
                console.log(err);
                res.send("Error en Query")
            } else {
                console.log(result)
                res.send({status: 0, message: "Registro eliminado"});
            }
    
        });
    }
    
}

module.exports = ()=>{
    return new Task();
}