const pool = require("../config/database");

const getAllTasks = async () => {
    const res = await pool.query("SELECT * FROM tasks ORDER BY id");
    return res.rows;
};

const getTaskById = async (id) => {
    const res = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return res.rows[0];
};

const createTask = async (title) => {
    const res = await pool.query(
        "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
        [title]
    );
    return res.rows[0];
};

const updateTask = async (id, data) => {
    const res = await pool.query(
        "UPDATE tasks SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *",
        [data.title, data.completed, id]
    );
    return res.rows[0];
};

const deleteTask = async (id) => {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};