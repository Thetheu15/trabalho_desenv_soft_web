import { useState } from 'react';
import './CadastroInicial.css';

export default function CadastroInicial({ onCadastroInicial, switchToLogin }) {
  const [form, setForm] = useState({
    nome: '',
    login: '',
    email: '',
    senha: '',
    cpf: '',
    endereco: '',
    telefone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Apenas chama a função do componente pai passando os dados do formulário
    onCadastroInicial(form);
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1>CADASTRO</h1>
        {/* Adicionado 'required' para validação básica */}
        <input name="nome"     placeholder="Nome Completo" value={form.nome}     onChange={handleChange} required />
        <input name="login"    placeholder="Login"         value={form.login}    onChange={handleChange} required />
        <input name="email"    type="email"    placeholder="E-mail"        value={form.email}    onChange={handleChange} required />
        <input name="senha"    type="password" placeholder="Senha"         value={form.senha}    onChange={handleChange} required />
        <input name="cpf"      placeholder="CPF"           value={form.cpf}      onChange={handleChange} required />
        <input name="endereco" placeholder="Endereço"      value={form.endereco} onChange={handleChange} required />
        <input name="telefone" placeholder="Telefone"      value={form.telefone} onChange={handleChange} required />

        <div className="btn-group">
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={switchToLogin}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}