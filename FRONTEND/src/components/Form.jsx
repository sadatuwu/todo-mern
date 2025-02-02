import React, { useState } from 'react';

const Form = ({ todos, setTodos }) => {
    const [input, setInput] = useState('');

    const onchange = (e) => {
        setInput(e.target.value);
    };

    const onsubmit = async (e) => {
        e.preventDefault();

        // Create a new todo object
        const newTodo = { name: input, completed: false };

        try {
            // Send a POST request to the backend to add the new todo
            const response = await fetch(import.meta.env.VITE_API_URL + "/todos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });

            if (response.ok) {
                const createdTodo = await response.json();
                setTodos([...todos, createdTodo]); // Add the new todo to the state
                setInput(''); // Clear the input field
            } else {
                console.error('Failed to add todo');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={onsubmit}>
            <input
                className='form-input'
                type='text'
                placeholder='Enter a todo'
                autoComplete='off'
                value={input}
                onChange={onchange}
            />
            <button className='form-button' type='submit'>Add</button>
        </form>
    );
};

export default Form;
