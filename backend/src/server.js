const express = require('express');
const cors = require('cors');

require("./config/database");

const errorHandler = require("./middlewares/errorHandler");

const tasksRoutes = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API DevTasks!' });
    });
    
app.use('/tasks', tasksRoutes);
app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});