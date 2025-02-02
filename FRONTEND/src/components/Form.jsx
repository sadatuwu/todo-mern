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
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setTodos([...todos, data])
            })
            .catch((error) => {
                console.error('Error:', error);
            });


        setInput('');
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
