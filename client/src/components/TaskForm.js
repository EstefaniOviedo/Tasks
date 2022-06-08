import { Card, CardContent, Grid, Typography, TextField, Button, CircularProgress } from "@mui/material"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
    const [task, setTask] = useState({
        title: "",
        description: "",
    })

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Editing--->", editing);
        if (editing) {
            console.log("PArmsss>>>", params.id);
             await fetch(`http://192.168.50.213:8000/tasks/${params.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(task),
                }
            );
            setLoading(false);
            //Te devuelve a el inicio de la pagina, cuando se crea una tarea
            navigate("/");
        } else {
            const res = await fetch('http://192.168.50.213:8000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log(data);
            setLoading(false);
            //Te devuelve a el inicio de la pagina, cuando se crea una tarea
            navigate("/");
        }
    }

    const handleChange = e => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const loadTask = async (id) => {
        
        //console.log("Editing 11--->", editing);
        const res = await fetch("http://192.168.50.213:8000/tasks/" + id);
        const data = await res.json();
        console.log("Data---", data.task);
        setTask({ title: data.task.title, description: data.task.description });   
        setEditing(true);
    }


    useEffect(() => {
        if (params.id) {
            loadTask(params.id);
        }
    }, [params.id]);

    return (
        <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'>
            <Grid item xs={3}>
                <Card
                    sx={{ mt: 5 }}
                    style={{
                        backgroundColor: "#1e272e",
                        padding: '1rem'
                    }}
                >
                    <Typography
                        variant='5'
                        textAlign='center'
                        color='white'
                    >{ editing ? "Edit Task": "Add Task"}
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label='Write your title'
                                sx={{
                                    display: "block",
                                    margin: '.5rem 0'
                                }}
                                name="title"
                                value={task.title}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            ></TextField>
                            <TextField
                                variant='filled'
                                label='Write your description'
                                multiline
                                row={4}
                                sx={{
                                    display: "block",
                                    margin: '.5rem 0'
                                }}
                                name="description"
                                value={task.description}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            ></TextField>
                            <Button
                                variant='contained'
                                type='submit'
                                disabled={!task.title || !task.description}
                            >
                                {loading ? (
                                    <CircularProgress color="inherit" size={24} />
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}