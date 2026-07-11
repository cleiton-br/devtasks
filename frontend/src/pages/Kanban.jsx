import { useState, useMemo } from 'react';
import TaskForm from '../components/TaskForm';
import KanbanColumn from '../components/KanbanColumn';
import SearchBar from '../components/SearchBar';
import { useTasks } from '../contexts/TaskContext';

export default function Kanban() {
  const { tasks, loading } = useTasks();
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    status: '',
    tag: '',
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }
      if (filters.status && task.status !== filters.status) {
        return false;
      }
      if (filters.tag && (!task.tags || !task.tags.includes(filters.tag))) {
        return false;
      }
      return true;
    });
  }, [tasks, filters]);

  if (loading) {
    return <div className="loading">Carregando tarefas...</div>;
  }

  return (
    <>
      <TaskForm />
      <SearchBar filters={filters} setFilters={setFilters} />
      {filters.search && (
        <p className="search-results">
          {filteredTasks.length} tarefa(s) encontrada(s) para "{filters.search}"
        </p>
      )}
      <div className="kanban-board">
        <KanbanColumn title="Pendente" tasks={filteredTasks} status="pending" />
        <KanbanColumn title="Em andamento" tasks={filteredTasks} status="in_progress" />
        <KanbanColumn title="Concluído" tasks={filteredTasks} status="done" />
      </div>
    </>
  );
}