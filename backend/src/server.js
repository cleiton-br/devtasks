import express from 'express';
import cors from 'cors';

import errorHandler from "./middlewares/errorHandler.js";
import tasksRoutes from "./routes/tasks.js";

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