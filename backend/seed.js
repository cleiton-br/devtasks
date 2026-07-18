import pkg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://devtasks_user:123456@localhost:5432/devtasks',
});

const seed = async () => {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    await pool.query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING`,
      ['User Test', 'test@devtasks.com', hashedPassword]
    );
    
    console.log('Usuário padrão criado: test@devtasks.com / 123456');
  } catch (err) {
    console.error('Erro ao criar seed:', err.message);
  } finally {
    await pool.end();
  }
};

seed();