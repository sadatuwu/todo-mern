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
        <div className="App min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
            <div className="header max-w-4xl mx-auto py-12 px-6">
                <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300">
                    Todolist-App
                </h1>
                <Form todos={todos} setTodos={setTodos} />
                <Todolist todos={todos} setTodos={setTodos} />
            </div>
        </div>
    );
}

export default App;
