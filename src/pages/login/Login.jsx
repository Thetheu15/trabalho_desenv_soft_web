import { useState } from 'react'
import './Login.css'

export default function Login({ onLogin, switchToCadastroInicial }) {
  const [login,    setLogin] = useState('')
  const [password, setPass ] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: chamar API e, se OK:
    onLogin({ id: 1, nome: login, isAdmin: false })
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPass(e.target.value)}
        />
        <button type="submit">Entrar</button>
        <p className="switch">
          Não tem conta?{' '}
          <span onClick={switchToCadastroInicial}>Cadastre‑se</span>
        </p>
      </form>
    </div>
  )
}
