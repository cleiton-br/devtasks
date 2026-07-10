import { TaskProvider } from './contexts/TaskContext';
import Kanban from './pages/Kanban';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <header className="app-header">
          <h1>🚀 DevTasks</h1>
          <p>Gerenciador de tarefas para desenvolvedores</p>
        </header>
        <Kanban />
      </div>
    </TaskProvider>
  );
}

export default App;