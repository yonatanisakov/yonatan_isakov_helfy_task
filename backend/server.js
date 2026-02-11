const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // default vite port, its may vary
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use(express.json());

// Rotues
app.use('/api/tasks', require('./routes/taskRoutes'));

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});