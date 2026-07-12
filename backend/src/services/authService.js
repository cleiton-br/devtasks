import bcrypt from 'bcryptjs';
import { userModel } from '../models/userModel.js';
import { generateToken } from '../utils/jwt.js';
import appError from '../utils/appError.js';

export const authService = {
  register: async ({ name, email, password }) => {
    const existing = await userModel.findByEmail(email);
    if (existing) {
      throw appError('Email já cadastrado', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });
    const token = generateToken(user.id);

    return { user, token };
  },

  login: async ({ email, password }) => {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw appError('Email ou senha inválidos', 401);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw appError('Email ou senha inválidos', 401);
    }

    const token = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  },
};