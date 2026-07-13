import { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import Kanban from './pages/Kanban';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/global.css';
import './styles/header.css';
import './styles/kanban.css';
import './styles/modal.css';
import './styles/dashboard.css';
import './styles/search.css';
import './styles/auth.css';
import './styles/toast.css';
import './styles/dragdrop.css';
import './styles/responsive.css';

function AppContent() {
  const { user, loading, logout } = useAuth();
  const { addToast } = useToast();
  const [currentPage, setCurrentPage] = useState('kanban');
  const [authPage, setAuthPage] = useState('login');
  const prevUser = useRef(user);

  useEffect(() => {
    if (!prevUser.current && user) {
      addToast(`Bem-vindo!, ${user.name}!`);
    }
    prevUser.current = user;
  }, [user, addToast]);

  const handleLogout = () => {
    logout();
    addToast('Logout realizado com sucesso!');
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!user) {
    return authPage === 'login' 
      ? <Login onSwitch={() => setAuthPage('register')} />
      : <Register onSwitch={() => setAuthPage('login')} />;
  }

  return (
    <TaskProvider>
      <div className="app">
        <header className="app-header">
          <div className="header-top">
            <div className="user-menu">
              <span className="user-name">👤 {user.name}</span>
              <button className="btn-logout" onClick={handleLogout}>Sair</button>
            </div>
          </div>
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

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;