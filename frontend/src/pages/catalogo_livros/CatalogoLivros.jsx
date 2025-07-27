import React, { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard/BookCard';
import './CatalogoLivros.css';

// A URL base da API
const API_URL = 'http://localhost:3001';

export default function CatalogoLivros() {
  // 1. Estados para os livros, busca, carregamento e erros
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect para buscar os dados da API quando o componente montar
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
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar os livros.');
        }

        const data = await response.json();
        setLivros(data); // Atualiza o estado com os livros recebidos
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Finaliza o carregamento, com sucesso ou erro
      }
    };

    fetchLivros();
  }, []); // O array vazio [] garante que esta função rode apenas uma vez

  // Lógica de filtro permanece a mesma, agora aplicada sobre o estado 'livros'
  const livrosFiltrados = livros.filter(l =>
    l.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  // 3. Renderização condicional para loading e erro
  if (loading) {
    return <p className="catalogo-mensagem">Carregando livros...</p>;
  }

  if (error) {
    return <p className="catalogo-mensagem erro">{error}</p>;
  }

  return (
    <div className="catalogo-container">
      <div className="catalogo-header">
        <input
          type="text"
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
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}