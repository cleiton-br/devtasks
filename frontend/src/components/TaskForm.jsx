import { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';

export default function TaskForm() {
  const { createTask } = useTasks();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('media');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);

    await createTask({
      title: title.trim(),
      priority,
      tags: tagsArray
    });

    setTitle('');
    setPriority('media');
    setTags('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nova tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className="form-row">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
        <input
          type="text"
          placeholder="Tags (separadas por vírgula)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        + Adicionar Tarefa
      </button>
    </form>
  );
}