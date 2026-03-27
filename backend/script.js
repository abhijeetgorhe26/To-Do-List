import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __fileName = fileURLToPath(import.meta.url);
console.log(__fileName);
const __dirName = path.dirname(__fileName);
console.log(__dirName);

const app = express();
const port = 3000;
const DB_FILE = path.join(__dirName, 'data', 'tasks.json');
console.log(DB_FILE);



// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirName, 'public')));



// Helper: read / write JSON "Database"
function readTask() {
    if (!fs.existsSync(DB_FILE)) {
        return [];
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    console.log(raw);
}


function writeTasks(tasks) {
    fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
}



// Routes

// GET /api/tasks -> return all tasks
app.get('/api/tasks', (req, res) => {
    const tasks = readTask();
    res.json(tasks);
})


// POST /api/tasks -> add a new task
app.post('/api/tasks', (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Task text is required' });
    }

    const tasks = readTask();

    const newTask = {
        id: Date.now().toString(), // unique id using timestamp
        text: text.trim(),
        completed: false,
        createAt: new Date().toISOString()
    };

    tasks.push(newTask);
    writeTasks(tasks);

    res.status(201).json(newTask);
});

// PATCH /api/tasks/:id -> toggle completed status
app.patch('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const tasks = readTask();

    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    tasks.splice(index, 1);
    writeTasks(tasks);


    res.json({ message: 'Task deleted successfully' });
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})