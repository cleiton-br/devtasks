import { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';

export default function SearchBar({ filters, setFilters }) {
  const { tasks } = useTasks();
  const [isOpen, setIsOpen] = useState(false);

  const allTags = [...new Set(tasks.flatMap(t => t.tags || []))].sort();

  const clearFilters = () => {
    setFilters({ search: '', priority: '', status: '', tag: '' });
  };

  const hasActiveFilters = filters.search || filters.priority || filters.status || filters.tag;

  return (
    <div className="search-bar">
      <div className="search-row">
        <input
          type="text"
          placeholder="Buscar tarefas..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="search-input"
        />
        <button
          className="btn-filter-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          ⚙️ Filtros {hasActiveFilters && '●'}
        </button>
      </div>

      {isOpen && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Prioridade</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            >
              <option value="">Todas</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Todos</option>
              <option value="pending">Pendente</option>
              <option value="in_progress">Em andamento</option>
              <option value="done">Concluído</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Tag</label>
            <select
              value={filters.tag}
              onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            >
              <option value="">Todas</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button className="btn-clear" onClick={clearFilters}>
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}