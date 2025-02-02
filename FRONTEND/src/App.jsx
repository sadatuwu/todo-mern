import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Todolist from './components/Todolist';

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend using chain syntax
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/todos/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching todos');
        }
        return response.json();  // Parse JSON if the response is ok
      })
      .then((todosData) => {
        setTodos(todosData);  // Set the todos state with the fetched data
      })
      .catch((error) => {
        console.error('Error:', error);  // Log any errors that occur
      });
  }, []);  // Empty dependency array means this effect runs only once after the initial render

  return (
    <div className="App">
      <div className='header'>
        <h1>Todolist-App</h1>
        <Form todos={todos} setTodos={setTodos} />
        <Todolist todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default App;
