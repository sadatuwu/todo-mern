import React,{useState} from 'react'
import Form from './components/Form';
import Todolist from './components/Todolist';

function App() {
  const [todos,setTodos] = useState([]);
  return (
  
    < div  className="App">
      <div className='header'>
        <h1>Todolist-App</h1>
        <Form todos={todos} setTodos={setTodos}/>
        <Todolist todos={todos} setTodos={setTodos}/>
       
      </div>
    </div>

  );
}

export default App;