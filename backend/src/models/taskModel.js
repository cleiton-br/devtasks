import pool from '../lib/db.js';

export const taskModel = {
  getAllTasks: async (userId) => {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  },

  getTaskById: async (id, userId) => {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0] || null;
  },

  createTask: async (taskData, userId) => {
    const result = await pool.query(
      `INSERT INTO tasks (title, status, priority, tags, completed, user_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        taskData.title,
        taskData.status || 'pending',
        taskData.priority || 'media',
        taskData.tags || [],
        taskData.completed || false,
        userId
      ]
    );
    return result.rows[0];
  },

  updateTask: async (id, taskData, userId) => {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (taskData.title) {
      fields.push(`title = $${paramCount++}`);
      values.push(taskData.title);
    }
    if (taskData.status) {
      fields.push(`status = $${paramCount++}`);
      values.push(taskData.status);
    }
    if (taskData.priority) {
      fields.push(`priority = $${paramCount++}`);
      values.push(taskData.priority);
    }
    if (taskData.tags) {
      fields.push(`tags = $${paramCount++}`);
      values.push(taskData.tags);
    }
    if (taskData.completed !== undefined) {
      fields.push(`completed = $${paramCount++}`);
      values.push(taskData.completed);
    }

    values.push(id, userId);

    const result = await pool.query(
      `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${paramCount++} AND user_id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0];
  },

  deleteTask: async (id, userId) => {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    return result.rows[0];
  }
};