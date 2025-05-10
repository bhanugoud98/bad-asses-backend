const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Schema
const taskSchema = new mongoose.Schema({
    name: String,
    task: String,
    date: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.post('/log-task', async (req, res) => {
    const { name, task } = req.body;
    const newTask = new Task({ name, task });
    await newTask.save();
    res.send({ message: "Task logged" });
});

app.get('/stats', async (req, res) => {
    const tasks = await Task.find();
    const stats = {};

    tasks.forEach(t => {
        if (!stats[t.name]) stats[t.name] = {};
        if (!stats[t.name][t.task]) stats[t.name][t.task] = 0;
        stats[t.name][t.task]++;
    });

    res.json(stats);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
mongoose.connect(process.env.MONGO_URI)
