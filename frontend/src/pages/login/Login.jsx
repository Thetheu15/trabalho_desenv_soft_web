import { useState } from 'react';
import './Login.css';

export default function Login({ onLogin, switchToCadastroInicial }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login || !senha) {
      alert('Por favor, preencha o login e a senha.');
      return;
    }
    onLogin({ login, senha });
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <p className="switch">
          Não tem conta?{' '}
          <span onClick={switchToCadastroInicial}>Cadastre‑se</span>
        </p>
      </form>
    </div>
  );
}