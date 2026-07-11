import { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskCard from './TaskCard';

export default function KanbanColumn({ title, tasks, status }) {
  const { updateTask } = useTasks();
  const [isDragOver, setIsDragOver] = useState(false);
  const filteredTasks = tasks.filter(task => task.status === status);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    if (taskId) {
      await updateTask(taskId, { status });
    }
  };

  return (
    <div
      className={`kanban-column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">{filteredTasks.length}</span>
      </div>
      <div className="task-list">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        {filteredTasks.length === 0 && (
          <p className="empty-column">
            {isDragOver ? 'Solte aqui!' : 'Nenhuma tarefa'}
          </p>
        )}
      </div>
    </div>
  );
}