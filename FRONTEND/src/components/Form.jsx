import React, { useState } from 'react';

const Form = ({ todos, setTodos }) => {
    const [input, setInput] = useState('');

    const onchange = (e) => {
        setInput(e.target.value);
    };

    const onsubmit = (e) => {
        e.preventDefault();

        // Create a new todo object
        const newTodo = { name: input, completed: false };

        // Send a POST request to the backend to add the new todo
        fetch(import.meta.env.VITE_API_URL + "/todos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
            .then((res) => res.json())
            .then((data) => setTodos([...todos, data]))
            .catch((error) => console.error('Error:', error));

        setInput('');
    };

    return (
        <form onSubmit={onsubmit} className="flex items-center bg-gray-800 p-4 rounded-lg shadow-lg">
            <input
                className="flex-grow bg-gray-700 text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
                type='text'
                placeholder='Enter a todo'
                autoComplete='off'
                value={input}
                onChange={onchange}
            />
            <button className="ml-4 bg-yellow-500 hover:bg-green-300 px-4 py-2 rounded-lg text-black font-semibold transition-all" type='submit'>
                Add
            </button>
        </form>
    );
};

export default Form;
