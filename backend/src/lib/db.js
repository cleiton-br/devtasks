import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://devtasks_user:123456@localhost:5432/devtasks' });

export default pool;