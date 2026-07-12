import { verifyToken } from '../utils/jwt.js';
import appError from '../utils/appError.js';

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    throw appError('Token não fornecido', 401);
  }

  const token = header.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    throw appError('Token inválido ou expirado', 401);
  }
};