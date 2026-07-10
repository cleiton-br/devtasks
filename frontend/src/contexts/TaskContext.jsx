import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    try {
      console.log('Enviando para API:', taskData);
      const response = await api.post('/tasks', taskData);
      console.log('Resposta:', response.data);
      setTasks(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    setTasks(prev => prev.map(task => task.id === id ? response.data : task));
    return response.data;
  }, []);

  const deleteTask = useCallback(async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const value = {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de um TaskProvider');
  }
  return context;
}