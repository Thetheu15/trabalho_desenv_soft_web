import React, { useState, useEffect } from 'react';
import './EditarLivro.css';

const API_URL = 'http://localhost:3001';

function EditarLivro() {
  // Estados para a lista completa de livros, o ID do livro selecionado, e os dados do formulário
  const [livros, setLivros] = useState([]);
  const [livroSelecionadoId, setLivroSelecionadoId] = useState('');
  const [formData, setFormData] = useState({
    titulo: '', autor: '', ano: '', editora: '', situacao: '', descricao: ''
  });
  
  // Estados de controle da UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. useEffect para buscar a lista de todos os livros ao montar o componente
  useEffect(() => {
    const fetchLivros = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(`${API_URL}/api/livros`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Falha ao carregar a lista de livros.');
        const data = await response.json();
        setLivros(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLivros();
  }, []);

  // 2. Handler para quando um livro é selecionado no dropdown
  const handleSelecaoChange = (e) => {
    const id = e.target.value;
    setLivroSelecionadoId(id);

    if (id) {
      // Encontra o livro completo na lista e preenche o formulário
      const livroParaEditar = livros.find(l => l._id === id);
      setFormData(livroParaEditar);
    } else {
      // Se o usuário desmarcar, limpa o formulário
      setFormData({ titulo: '', autor: '', ano: '', editora: '', situacao: '', descricao: '' });
    }
  };

  // 3. Handler genérico para atualizar os dados do formulário enquanto o usuário digita
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // 4. Handler para submeter as alterações para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!livroSelecionadoId) {
      alert('Por favor, selecione um livro para editar.');
      return;
    }
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_URL}/api/livros/${livroSelecionadoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.mensagem || 'Falha ao atualizar o livro.');
      }
      alert('Livro atualizado com sucesso!');
      // Opcional: recarregar a lista ou limpar a seleção
      setLivroSelecionadoId('');
      setFormData({ titulo: '', autor: '', ano: '', editora: '', situacao: '', descricao: '' });
    } catch (err) {
      alert(err.message);
    }
  };
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="editar-container">
      <div className="editar-bloco">
        <h1 className="titulo-editar-livro">Edição de Livros</h1>

        {/* Dropdown para selecionar o livro a ser editado */}
        <div className="selecao-livro-group">
          <label htmlFor="selecao-livro">Selecione um Livro para Editar</label>
          <select id="selecao-livro" value={livroSelecionadoId} onChange={handleSelecaoChange}>
            <option value="">-- Selecione --</option>
            {livros.map(livro => (
              <option key={livro._id} value={livro._id}>{livro.titulo}</option>
            ))}
          </select>
        </div>

        {/* O formulário só aparece após um livro ser selecionado */}
        {livroSelecionadoId && (
          <form className="editar-form" onSubmit={handleSubmit}>
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleFormChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="autor">Autor</label>
                <input type="text" id="autor" name="autor" value={formData.autor} onChange={handleFormChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="ano">Ano de Publicação</label>
                <input type="number" id="ano" name="ano" value={formData.ano} onChange={handleFormChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="editora">Editora</label>
                <input type="text" id="editora" name="editora" value={formData.editora} onChange={handleFormChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="situacao">Situação</label>
                <select id="situacao" name="situacao" value={formData.situacao} onChange={handleFormChange}>
                  <option value="Disponível">Disponível</option>
                  <option value="Emprestado">Emprestado</option>
                </select>
              </div>
            </div>
            <div className="form-right">
              <label htmlFor="descricao">Descrição</label>
              <textarea id="descricao" name="descricao" rows={8} value={formData.descricao} onChange={handleFormChange}/>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-confirmar">Confirmar Alterações</button>
              <button type="button" className="btn-voltar" onClick={() => window.history.back()}>Voltar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditarLivro;