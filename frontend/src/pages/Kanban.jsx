import TaskForm from '../components/TaskForm';
import KanbanColumn from '../components/KanbanColumn';
import { useTasks } from '../contexts/TaskContext';

export default function Kanban() {
  const { tasks, loading } = useTasks();

  if (loading) {
    return <div className="loading">Carregando tarefas...</div>;
  }

  return (
    <>
      <TaskForm />
      <div className="kanban-board">
        <KanbanColumn title="Pendente" tasks={tasks} status="pending" />
        <KanbanColumn title="Em andamento" tasks={tasks} status="in_progress" />
        <KanbanColumn title="Concluído" tasks={tasks} status="done" />
      </div>
    </>
  );
}