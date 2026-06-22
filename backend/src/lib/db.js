import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: "devtasks_user",
  host: "localhost",
  database: "devtasks",
  password: "123456",
  port: 5432,
});

export default pool;