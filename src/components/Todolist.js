import React from 'react'
import Todo from './Todo'

const Todolist = ({ todos, setTodos }) => {
  const todoItems = []; // Create an empty array to store JSX elements

  for (let i = 0; i < todos.length; i++) {
      todoItems.push(
          <Todo 
              key={todos[i].id} 
              id={todos[i].id} 
              todo={todos[i]} 
              todos={todos} 
              setTodos={setTodos} 
          />
      );
  }

  return (
      <div className='todo-ul'>
          <ul>{todoItems}</ul>
      </div>
  );
};


export default Todolist