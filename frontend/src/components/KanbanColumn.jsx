import TaskCard from './TaskCard';

export default function KanbanColumn({ title, tasks, status }) {
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div className="kanban-column">
      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">{filteredTasks.length}</span>
      </div>
      <div className="task-list">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        {filteredTasks.length === 0 && (
          <p style={{ color: '#484f58', textAlign: 'center', padding: '20px' }}>
            Nenhuma tarefa
          </p>
        )}
      </div>
    </div>
  );
}