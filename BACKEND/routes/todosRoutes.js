import express from "express";
import Todo from "../models/todo.js";


const todoRouter = express.Router();


// Add a new to-do
todoRouter.post('/todos', async (req, res) => {
    const { name, completed } = req.body; // Destructure the request body

    try {
        const newTodo = new Todo({ name, completed });
        await newTodo.save();
        res.status(201).json(newTodo);  // Send back the new to-do
    } catch (error) {
        res.status(500).json({ message: 'Error adding to-do' });
    }
});


// PATCH request to update the name of a to-do
todoRouter.patch('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { name },
            { new: true }  // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'To-do not found' });
        }

        res.json(updatedTodo);  // Return the updated to-do
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PATCH request to toggle the 'completed' status of a to-do
todoRouter.patch('/todos/:id/toggle', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedTodo = await Todo.findById(id);

        if (!updatedTodo) {
            return res.status(404).json({ message: 'To-do not found' });
        }

        // Toggle the completed value (if true, make false; if false, make true)
        updatedTodo.completed = !updatedTodo.completed;
        await updatedTodo.save();

        res.json(updatedTodo);  // Return the updated to-do
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Delete a to-do
todoRouter.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;  // Get to-do ID

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'To-Do not found' });
        }
        res.status(200).json({ message: 'To-Do deleted successfully' });  // Success message
    } catch (error) {
        res.status(500).json({ message: 'Error deleting to-do' });
    }
});


// Get all to-dos
todoRouter.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);  // Return all to-dos
    } catch (error) {
        res.status(500).json({ message: 'Error fetching to-dos' });
    }
});


export default todoRouter;