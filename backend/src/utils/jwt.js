import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'devtasks-secret-key';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};