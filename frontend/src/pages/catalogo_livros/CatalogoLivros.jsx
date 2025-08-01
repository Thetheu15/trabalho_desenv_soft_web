import React, { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard/BookCard';
import './CatalogoLivros.css';

const API_URL = 'http://localhost:3001';

export default function CatalogoLivros({ onEmprestar, onViewDetails }) {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLivros = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/livros`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Falha ao buscar os livros.');

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

  // Função para atualizar o livro no estado 'livros'
  const atualizarLivroNoEstado = (livroAtualizado) => {
    setLivros((oldLivros) =>
      oldLivros.map((l) => (l._id === livroAtualizado._id ? livroAtualizado : l))
    );
  };

  const livrosFiltrados = livros.filter(l =>
    l.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) return <p className="catalogo-mensagem">Carregando livros...</p>;
  if (error) return <p className="catalogo-mensagem erro">{error}</p>;

  return (
    <div className="catalogo-container">
      <div className="catalogo-header">
        <input
          type="text"
          id="busca-livro"
          name="buscaLivro"
          placeholder="Buscar por título..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="catalogo-busca"
        />
      </div>

      {livrosFiltrados.length === 0 ? (
        <p className="catalogo-mensagem">Nenhum livro encontrado.</p>
      ) : (
        <div className="catalogo-grid">
          {livrosFiltrados.map(book => (
            <BookCard
              key={book._id}
              book={book}
              onEmprestar={() => onEmprestar(book, atualizarLivroNoEstado)} // Passa livro + callback para atualizar estado
              onClick={() => onViewDetails(book)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
