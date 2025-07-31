import React, { useState } from 'react';
import './CadastroUsuario.css';

const API_URL = 'http://localhost:3001';

function CadastroUsuario() {
  // 1. Estado para gerenciar todos os campos do formulário
  const [form, setForm] = useState({
    nome: '',
    login: '',
    email: '',
    senha: '',
    cpf: '',
    endereco: '',
    telefone: '',
  });

  // Handler genérico para atualizar o estado
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler para submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // A rota de cadastro é pública, mas a UI é de admin.
    // O token é necessário para acessar a página, mas não para esta rota específica.
    try {
      const response = await fetch(`${API_URL}/api/auth/cadastrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || "Erro ao cadastrar usuário.");
      }

      alert('Usuário cadastrado com sucesso!');
      // Limpa o formulário
      setForm({
        nome: '', login: '', email: '', senha: '', cpf: '', endereco: '', telefone: '',
      });

    } catch (error) {
      console.error("Falha no cadastro:", error);
      alert(error.message);
    }
  };

  return (
    <div className="usuario-container">
      <h1 className="titulo-cadastro-usuario">Cadastro de usuários</h1>
      <form className="usuario-form" onSubmit={handleSubmit}>
        <div className="usuario-form-linhas">
          <div className="usuario-col-esq">
            {/* Adicionado name, value, onChange e required a todos os inputs */}
            <div className="usuario-group">
              <label htmlFor="login">Login</label>
              <input type="text" id="login" name="login" value={form.login} onChange={handleChange} required />
            </div>
            <div className="usuario-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="usuario-group">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" name="senha" value={form.senha} onChange={handleChange} required />
            </div>
            <div className="usuario-group">
              <label htmlFor="telefone">Telefone</label>
              <input type="tel" id="telefone" name="telefone" value={form.telefone} onChange={handleChange} required />
            </div>
            <div className="usuario-group">
              <label htmlFor="endereco">Endereço</label>
              <input type="text" id="endereco" name="endereco" value={form.endereco} onChange={handleChange} required />
            </div>
          </div>
          <div className="usuario-col-dir">
            <div className="usuario-group">
              <label htmlFor="cpf">CPF</label>
              <input type="text" id="cpf" name="cpf" value={form.cpf} onChange={handleChange} required />
            </div>
            <div className="usuario-group">
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} required />
            </div>
          </div>
        </div>
        <div className="usuario-actions">
          <button type="submit" className="btn-confirmar">Confirmar</button>
          <button type="button" className="btn-voltar" onClick={() => window.history.back()}>Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastroUsuario;