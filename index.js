require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 3001;

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory task storage (can later be replaced with a database)
let tasks = [];

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API!');
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Create a new task
app.post('/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(task);
    res.status(201).json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send();
});

// Mark a task as completed
app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = true;
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
