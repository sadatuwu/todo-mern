import React from 'react';
import Todo from './Todo';

const Todolist = ({ todos, setTodos }) => {
  const onComplete = async (id) => {
    try {
    
      // Send a PATCH request to toggle the 'completed' status
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}/toggle`, { method: 'PATCH' });
      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
      }
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  const onDelete = async (id) => {
    try {
      // Send a DELETE request to remove the todo
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== id)); // Remove the deleted todo
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const onEditSave = async (id, newName) => {
    try {
      // Send a PATCH request to update the todo
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name: newName }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className='todo-ul'>
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
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
