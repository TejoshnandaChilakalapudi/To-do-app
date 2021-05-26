import { List,ListItem, ListItemText, ListItemAvatar, Button, Modal} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase'
import './Todo.css'
import { makeStyles } from '@material-ui/core/styles'
import React,{ useState } from 'react'

const useStyles = makeStyles((theme) =>({
    paper:{
        position: 'absolute',
        width:400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxshadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [input,setInput] = useState('');

    const handleOpen = () =>{
        setOpen(true);
    };

    const updateTodo = () =>{
        // Update the todo with the new inout text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true} )
        setOpen(true);
    }

    return (
        <>
        <Modal
        open={open}
        onClose={e => setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>I am a modal</h1>
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                <Button onClick={e => setOpen(false)}>Update Todo</Button>
            </div>
        </Modal>
        <List className="todo__list">
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Dummy deadline"/>
            </ListItem>
            <Button onClick={updateTodo} >Edit Me</Button>
            <DeleteForeverIcon className="btn" onClick={event => {db.collection('todos').doc(props.todo.id).delete()}} />
        </List>
        </>
    )
}

export default Todo
