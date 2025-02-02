import React, { useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { BsCheckSquare, BsSquare } from 'react-icons/bs';

const Todo = ({ todo, onComplete, onDelete, onEditSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(todo.name);

    const handleEdit = () => setIsEditing(true);
    const handleSave = () => {
        onEditSave(todo._id, newName);
        setIsEditing(false);
    };
    const handleCancel = () => {
        setIsEditing(false);
        setNewName(todo.name);
    };
    const handleKeyDown = (e) => e.key === 'Enter' && handleSave();

    return (
        <li className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${todo.completed ? 'bg-gray-800 text-gray-400 line-through' : 'bg-gray-900 text-white'}`}> 
            {isEditing ? (
                <div className="flex items-center space-x-3">
                    <input
                        className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-gray-500 outline-none"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-all" onClick={handleSave}>Save</button>
                    <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white transition-all" onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            className="p-2"
                            onClick={() => onComplete(todo._id)}
                        >
                            {todo.completed ? (
                                <BsCheckSquare className="text-green-200 w-6 h-6" />
                            ) : (
                                <BsSquare className="text-gray-400 w-6 h-6" />
                            )}
                        </button>
                        <span className="text-lg font-medium flex-1 truncate">{todo.name}</span>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <button className="px-4 py-2 bg-gray-600 hover:bg-blue-500 rounded-lg text-white transition-all" onClick={handleEdit}>
                            <FiEdit className="w-5 h-5" />
                        </button>
                        <button className="px-4 py-2 bg-gray-600 hover:bg-red-500 rounded-lg text-white transition-all" onClick={() => onDelete(todo._id)}>
                            <FiTrash className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default Todo;
