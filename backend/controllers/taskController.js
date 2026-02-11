let tasks = [];
let currentId = 1;

const getTasks = (req, res) => {
    res.status(200).json(tasks);
}

const createTask = (req, res) => {
    const { title, description, priority } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Please add a task title' });
    }
    const newTask = {
        id: currentId++,
        title,
        description: description || '',
        completed: false,
        createdAt: new Date(),
        priority: priority || 'medium', // if not included, medium will be the default priority
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

const updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = {
        ...tasks[taskIndex],
        ...req.body,
        id: id,
    };

    tasks[taskIndex] = updatedTask;
    res.status(200).json(updatedTask);
}

const deleteTask = (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the task from the array
    tasks = tasks.filter((task) => task.id !== id);

    res.status(200).json({ id: id, message: `Task ${id} deleted` });
};


const toggleTaskStatus = (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = !task.completed;

    res.status(200).json(task);
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
}