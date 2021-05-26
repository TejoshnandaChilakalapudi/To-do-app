import React,{ useState, useEffect } from 'react';
import Todo from './Todo'
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import db from'./firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // When the app loads, we need to listen to the database and fetch new todos as they get add/ removed
  useEffect(() => {
    // This code here, fires when App.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data()))
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, [])

  const addTodo = (event ) => {
    event.preventDefault(); //Dont let the screen refresh after submitting
    //This will fire off when we click the button

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    //...todos means push the new todo KEEPING the original contents
    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello World! {124+1}</h1>

      <form>
      <FormControl>
        <InputLabel>Write a Todo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
      </FormControl>

      {/* <button type="submit" onClick={addTodo}>Add Todo</button> */}
      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
       Add Todo
      </Button>
      </form>


      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
