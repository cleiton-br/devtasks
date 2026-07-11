import { useState } from 'react';
import { TaskProvider } from './contexts/TaskContext';
import Kanban from './pages/Kanban';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('kanban');

  return (
    <TaskProvider>
      <div className="app">
        <header className="app-header">
          <h1>🚀 DevTasks</h1>
          <p>Gerenciador de tarefas para desenvolvedores</p>
          <nav className="app-nav">
            <button
              className={`nav-btn ${currentPage === 'kanban' ? 'active' : ''}`}
              onClick={() => setCurrentPage('kanban')}
            >
              📋 Kanban
            </button>
            <button
              className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              📊 Dashboard
            </button>
          </nav>
        </header>
        {currentPage === 'kanban' ? <Kanban /> : <Dashboard />}
      </div>
    </TaskProvider>
  );
}

export default App;