import React, { useState } from 'react';

const Todo = ({ todo, onComplete, onDelete, onEditSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(todo.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Call the onEditSave function passed from Todolist
    onEditSave(todo._id, newName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewName(todo.name); // Reset to original name if cancelled
  };

  // Handle keypress for Enter to trigger save
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <li className={`li-list ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input
            className="li-input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown} // Add this handler for Enter key
          />
          <button className="button-save" onClick={handleSave}>
            Save
          </button>
          <button className="button-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <input className="li-input" value={todo.name} readOnly />
          <button className="button-complete" onClick={() => onComplete(todo._id)}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button className="button-edit" onClick={handleEdit}>
            Edit
          </button>
          <button className="button-delete" onClick={() => onDelete(todo._id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default Todo;
