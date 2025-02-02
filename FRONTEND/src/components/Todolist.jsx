import React from 'react';
import Todo from './Todo';

const Todolist = ({ todos, setTodos }) => {

    const onComplete = (id) => {
        fetch(`${import.meta.env.VITE_API_URL}/todos/${id}/toggle`, {
            method: 'PATCH'
        })
            .then((res) => res.json())
            .then((updatedTodo) => {
                setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
            })
            .catch((error) => console.error('Error toggling todo completion:', error));
    };

    const onDelete = (id) => {
        fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
            method: 'DELETE'
        })
            .then((res) => {
                if (res.ok) {
                    setTodos(todos.filter((todo) => todo._id !== id));
                }
            })
            .catch((error) => console.error('Error deleting todo:', error));
    };

    const onEditSave = (id, newName) => {
        fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name: newName }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((updatedTodo) => {
                setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
            })
            .catch((error) => console.error('Error updating todo:', error));
    };

    return (
        <div className="p-6 bg-gray-900 text-white rounded-xl shadow-xl">
            <ul className="space-y-4">
                {todos.map((todo) => (
                    <Todo
                        key={todo._id}
                        todo={todo}
                        onComplete={onComplete}
                        onDelete={onDelete}
                        onEditSave={onEditSave}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Todolist;
