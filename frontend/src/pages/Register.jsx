import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validateRegister } from '../utils/validators';

export default function Register({ onSwitch }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const { errors: validationErrors, isValid } = validateRegister(name, email, password);
    setErrors(validationErrors);
    if (!isValid) return;

    try {
      await register(name.trim(), email.trim(), password);
    } catch (err) {
      setServerError(err.response?.data?.error || 'Erro ao cadastrar');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>📝 Cadastro</h2>
        {serverError && <div className="auth-error">{serverError}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
            <span className="field-hint">Mínimo 6 caracteres</span>
          </div>
          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </form>
        <p className="auth-switch">
          Já tem conta?{' '}
          <button onClick={onSwitch} className="link-btn">
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}