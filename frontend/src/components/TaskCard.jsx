import { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskEditModal from './TaskEditModal';

const STATUS_MAP = {
  pending: 'Pendente',
  in_progress: 'Em andamento',
  done: 'Concluído'
};

export default function TaskCard({ task }) {
  const { updateTask, deleteTask } = useTasks();
  const [showModal, setShowModal] = useState(false);

  const moveTask = async (newStatus) => {
    await updateTask(task.id, { status: newStatus });
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id.toString());
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
  };

  const nextStatus = {
    pending: 'in_progress',
    in_progress: 'done',
    done: null
  };

  const prevStatus = {
    pending: null,
    in_progress: 'pending',
    done: 'in_progress'
  };

  return (
    <>
      <div
        className="task-card"
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={() => setShowModal(true)}
      >
        <h3>{task.title}</h3>
        <div className="task-meta">
          <span className={`priority-badge priority-${task.priority || 'media'}`}>
            {task.priority || 'média'}
          </span>
          {task.tags && task.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <div className="move-buttons" onClick={e => e.stopPropagation()}>
          {prevStatus[task.status] && (
            <button
              className="btn-move"
              onClick={() => moveTask(prevStatus[task.status])}
            >
              ← {STATUS_MAP[prevStatus[task.status]]}
            </button>
          )}
          {nextStatus[task.status] && (
            <button
              className="btn-move"
              onClick={() => moveTask(nextStatus[task.status])}
            >
              {STATUS_MAP[nextStatus[task.status]]} →
            </button>
          )}
          <button
            className="btn-move"
            onClick={() => deleteTask(task.id)}
            style={{ background: '#da3633', color: '#fff' }}
          >
            🗑
          </button>
        </div>
      </div>
      
      {showModal && (
        <TaskEditModal
          task={task}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}