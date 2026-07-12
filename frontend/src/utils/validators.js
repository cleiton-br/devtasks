export const validateRegister = (name, email, password) => {
  const errors = {};

  if (!name || name.trim().length < 3) {
    errors.name = 'Nome deve ter pelo menos 3 caracteres';
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    errors.email = 'Email inválido';
  }

  if (!password || password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export const validateLogin = (email, password) => {
  const errors = {};

  if (!email || !email.trim()) {
    errors.email = 'Email é obrigatório';
  }

  if (!password) {
    errors.password = 'Senha é obrigatória';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};