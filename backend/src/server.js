import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import tasksRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API DevTasks!' });
});

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});