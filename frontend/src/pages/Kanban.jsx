import { useState, useMemo } from 'react';
import TaskForm from '../components/TaskForm';
import KanbanColumn from '../components/KanbanColumn';
import SearchBar from '../components/SearchBar';
import SortBar from '../components/SortBar';
import { useTasks } from '../contexts/TaskContext';

const PRIORITY_ORDER = { high: 3, medium: 2, low: 1 };

export default function Kanban() {
  const { tasks, loading } = useTasks();
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    status: '',
    tag: '',
  });
  const [sortBy, setSortBy] = useState('newest');

  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks.filter(task => {
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

    switch (sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'priority-high':
        result.sort((a, b) => (PRIORITY_ORDER[b.priority] || 0) - (PRIORITY_ORDER[a.priority] || 0));
        break;
      case 'priority-low':
        result.sort((a, b) => (PRIORITY_ORDER[a.priority] || 0) - (PRIORITY_ORDER[b.priority] || 0));
        break;
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [tasks, filters, sortBy]);

  if (loading) {
    return <div className="loading">Carregando tarefas...</div>;
  }

  return (
    <>
      <TaskForm />
      <div className="toolbar">
        <SearchBar filters={filters} setFilters={setFilters} />
        <SortBar sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      {filters.search && (
        <p className="search-results">
          {filteredAndSortedTasks.length} tarefa(s) encontrada(s) para "{filters.search}"
        </p>
      )}
      <div className="kanban-board">
        <KanbanColumn title="Pendente" tasks={filteredAndSortedTasks} status="pending" />
        <KanbanColumn title="Em andamento" tasks={filteredAndSortedTasks} status="in_progress" />
        <KanbanColumn title="Concluído" tasks={filteredAndSortedTasks} status="done" />
      </div>
    </>
  );
}