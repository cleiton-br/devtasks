import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validateLogin } from '../utils/validators';

export default function Login({ onSwitch }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const { errors: validationErrors, isValid } = validateLogin(email, password);
    setErrors(validationErrors);
    if (!isValid) return;

    try {
      await login(email.trim(), password);
    } catch (err) {
      setServerError(err.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>🔐 Login</h2>
        {serverError && <div className="auth-error">{serverError}</div>}
        <form onSubmit={handleSubmit} noValidate>
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
              placeholder="Sua senha"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </form>
        <p className="auth-switch">
          Não tem conta?{' '}
          <button onClick={onSwitch} className="link-btn">
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}