import React, { useState, useEffect } from 'react';
import './RemoverLivro.css';

const API_URL = 'http://localhost:3001';

function RemoverLivro() {
  // Estados para a lista de livros, termo de busca e ID do livro selecionado
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState('');
  const [livroSelecionadoId, setLivroSelecionadoId] = useState(null);

  // Estados de controle da interface
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Busca inicial de todos os livros
  useEffect(() => {
    const fetchLivros = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(`${API_URL}/api/livros`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Falha ao carregar livros.');
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

  // 2. Filtra os livros com base na busca
  const livrosFiltrados = busca.length > 0
    ? livros.filter(livro =>
        livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        livro._id.toLowerCase().includes(busca.toLowerCase())
      )
    : [];

  // 3. Handler para a remoção do livro
  const handleRemover = async (e) => {
    e.preventDefault();
    if (!livroSelecionadoId) {
      alert('Por favor, selecione um livro da lista para remover.');
      return;
    }

    // Janela de confirmação para evitar remoções acidentais
    if (!window.confirm("Você tem certeza que deseja remover este livro? Esta ação não pode ser desfeita.")) {
      return;
    }

    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_URL}/api/livros/${livroSelecionadoId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.mensagem || "Falha ao remover o livro.");
      }

      // Atualiza a UI removendo o livro da lista local
      setLivros(livros.filter(livro => livro._id !== livroSelecionadoId));
      setLivroSelecionadoId(null); // Limpa a seleção
      alert('Livro removido com sucesso!');

    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="remover-container">
      <h1 className="titulo-painel">Remoção de Livros</h1>
      <form className="remover-form" onSubmit={handleRemover}>
        <div className="pesquisa-livro">
          <label htmlFor="busca">Pesquisar livro:</label>
          <input
            type="text"
            id="busca"
            name="busca"
            placeholder="Digite o título ou ID..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="resultado-busca">
          <h3>Resultado da busca</h3>
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Ano</th>
                  <th>ID</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                {busca.length > 0 && livrosFiltrados.length > 0 ? (
                  livrosFiltrados.map(livro => (
                    <tr
                      key={livro._id}
                      onClick={() => setLivroSelecionadoId(livro._id)}
                      className={livro._id === livroSelecionadoId ? 'selecionado' : ''}
                    >
                      <td>{livro.titulo}</td>
                      <td>{livro.autor}</td>
                      <td>{livro.ano}</td>
                      <td>{livro._id}</td>
                      <td>{livro.situacao}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      {busca.length > 0 ? "Nenhum livro encontrado." : "Digite na busca para ver os resultados."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="remover-actions">
          <button type="submit" className="btn-confirmar">Confirmar Remoção</button>
          <button type="button" className="btn-voltar" onClick={() => window.history.back()}>Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default RemoverLivro;