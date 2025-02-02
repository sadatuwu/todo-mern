import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Todolist from './components/Todolist';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/todos/`)
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);


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
