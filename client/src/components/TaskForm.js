import { Card, CardContent, Grid, Typography,TextField, Button } from "@mui/material"

export default function TaskForm() {
    return (
        <Grid 
            container 
            direction='column' 
            alignItems='center' 
            justifyContent='center'>
            <Grid item xs={3}>
                <Card
                    sx={{mt:5}}>
                    <Typography
                    >Create task</Typography>
                    <CardContent>
                        <form>
                            <TextField
                                variant='filled'
                                label='Write your title'
                                sx={{
                                    display: "block",
                                    margin: '.5rem 0'
                                }}
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
                            ></TextField>
                            <Button
                                variant='contained'
                                type='submit'
                            >
                                Save
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}