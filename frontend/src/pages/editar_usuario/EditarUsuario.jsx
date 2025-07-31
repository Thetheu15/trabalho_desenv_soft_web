import React, { useState, useEffect } from 'react';
import './EditarUsuario.css';

const API_URL = 'http://localhost:3001';

function EditarUsuario() {
  // Estados para a lista de usuários, ID selecionado e dados do formulário
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionadoId, setUsuarioSelecionadoId] = useState('');
  const [formData, setFormData] = useState({
    nome: '', login: '', email: '', senha: '', cpf: '', endereco: '', telefone: '',
  });

  // Estados de controle da interface
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. useEffect para buscar a lista de usuários ao montar o componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(`${API_URL}/api/auth/usuarios`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Falha ao carregar a lista de usuários.');
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  // 2. Handler para quando um usuário é selecionado no dropdown
  const handleSelecaoChange = (e) => {
    const id = e.target.value;
    setUsuarioSelecionadoId(id);

    if (id) {
      const usuarioParaEditar = usuarios.find(u => u._id === id);
      // Popula o formulário, mas deixa a senha em branco por segurança
      setFormData({ ...usuarioParaEditar, senha: '' });
    } else {
      setFormData({ nome: '', login: '', email: '', senha: '', cpf: '', endereco: '', telefone: '' });
    }
  };

  // 3. Handler genérico para atualizar os dados do formulário
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Handler para submeter as alterações para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuarioSelecionadoId) {
      alert('Por favor, selecione um usuário para editar.');
      return;
    }
    
    const token = localStorage.getItem('authToken');
    
    // Cria uma cópia dos dados do formulário para manipulação
    const dadosParaEnviar = { ...formData };

    // Se a senha estiver vazia, removemos a chave para que o backend não a altere
    if (!dadosParaEnviar.senha) {
      delete dadosParaEnviar.senha;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/auth/usuario/${usuarioSelecionadoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosParaEnviar)
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.mensagem || 'Falha ao atualizar o usuário.');
      }
      alert('Usuário atualizado com sucesso!');
      setUsuarioSelecionadoId('');
      setFormData({ nome: '', login: '', email: '', senha: '', cpf: '', endereco: '', telefone: '' });
    } catch (err) {
      alert(err.message);
    }
  };
  
  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="usuario-container">
      <h1 className="titulo-edicao-usuario">Edição de usuários</h1>

      <div className="selecao-usuario-group">
        <label htmlFor="selecao-usuario">Selecione um Usuário para Editar</label>
        <select id="selecao-usuario" value={usuarioSelecionadoId} onChange={handleSelecaoChange}>
          <option value="">-- Selecione --</option>
          {usuarios.map(user => (
            <option key={user._id} value={user._id}>{user.nome} ({user.login})</option>
          ))}
        </select>
      </div>

      {usuarioSelecionadoId && (
        <form className="usuario-form" onSubmit={handleSubmit}>
          <div className="usuario-form-linhas">
            <div className="usuario-col-esq">
              <div className="usuario-group">
                <label htmlFor="login">Login</label>
                <input type="text" id="login" name="login" value={formData.login} onChange={handleFormChange} required />
              </div>
              <div className="usuario-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} required />
              </div>
              <div className="usuario-group">
                <label htmlFor="senha">Nova Senha (deixe em branco para não alterar)</label>
                <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleFormChange} />
              </div>
              <div className="usuario-group">
                <label htmlFor="telefone">Telefone</label>
                <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleFormChange} required />
              </div>
              <div className="usuario-group">
                <label htmlFor="endereco">Endereço</label>
                <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleFormChange} required />
              </div>
            </div>
            <div className="usuario-col-dir">
              <div className="usuario-group">
                <label htmlFor="cpf">CPF</label>
                <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleFormChange} required />
              </div>
              <div className="usuario-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleFormChange} required />
              </div>
            </div>
          </div>
          <div className="usuario-actions">
            <button type="submit" className="btn-confirmar">Confirmar Alterações</button>
            <button type="button" className="btn-voltar" onClick={() => window.history.back()}>Voltar</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditarUsuario;