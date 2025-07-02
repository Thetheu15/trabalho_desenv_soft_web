import { useState } from 'react'
import './CadastroInicial.css'

export default function CadastroInicial({ onCadastroInicial, switchToLogin }) {
  const [form, setForm] = useState({
    nome: '', login: '', email: '', senha: '', cpf: ''
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: chamar API e, se OK:
    onCadastroInicial({ ...form, isAdmin: false })
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1>CADASTRO</h1>
        <input name="nome"   placeholder="Nome"  value={form.nome}   onChange={handleChange} />
        <input name="login"  placeholder="Login" value={form.login}  onChange={handleChange} />
        <input name="email"  placeholder="E‑mail" value={form.email}  onChange={handleChange} />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
        />
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} />

        <div className="btn-group">
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={switchToLogin}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  )
}
