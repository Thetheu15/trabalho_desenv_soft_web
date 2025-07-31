import React, { useState, useEffect } from 'react';
import './DevolverLivro.css'; // Você precisará criar um arquivo CSS para ele

const API_URL = 'http://localhost:3001';

export default function DevolverLivro() {
  const [emprestimosAtivos, setEmprestimosAtivos] = useState([]);
  const [selecionadoId, setSelecionadoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Busca os empréstimos do usuário e filtra apenas os ativos
  useEffect(() => {
    const fetchEmprestimos = async () => {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(`${API_URL}/api/emprestimos/meus`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Falha ao buscar seus empréstimos.');
        
        const data = await response.json();
        // Filtra para mostrar apenas os empréstimos sem data de devolução (pendentes)
        setEmprestimosAtivos(data.filter(emp => !emp.dataDevolucao));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmprestimos();
  }, []); // O array vazio garante que a busca ocorra apenas uma vez

  // 2. Função para confirmar a devolução
  const handleDevolver = async () => {
    if (!selecionadoId) {
      alert('Por favor, selecione um livro da lista para devolver.');
      return;
    }
    
    // Adiciona uma confirmação extra para o usuário
    if (!window.confirm("Você tem certeza que deseja devolver este livro?")) {
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_URL}/api/emprestimos/devolver/${selecionadoId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.mensagem || 'Ocorreu um erro na devolução.');

      alert('Livro devolvido com sucesso!');
      
      // Remove o livro da lista da tela para feedback imediato
      setEmprestimosAtivos(emprestimosAtivos.filter(emp => emp._id !== selecionadoId));
      setSelecionadoId(null); // Limpa a seleção
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Carregando seus empréstimos pendentes...</p>;
  if (error) return <p className="erro">{error}</p>;

  return (
    <div className="devolver-container">
      <h1>Devolver Livro</h1>
      <p>Selecione o empréstimo que você deseja encerrar:</p>
      
      <div className="tabela-devolucao">
        <table>
          <thead>
            <tr>
              <th>Título do Livro</th>
              <th>Data do Empréstimo</th>
            </tr>
          </thead>
          <tbody>
            {emprestimosAtivos.length > 0 ? (
              emprestimosAtivos.map(emp => (
                // 3. A linha da tabela é clicável para selecionar o item
                <tr
                  key={emp._id}
                  onClick={() => setSelecionadoId(emp._id)}
                  className={emp._id === selecionadoId ? 'selecionado' : ''}
                >
                  <td>{emp.livro?.titulo || 'Livro indisponível'}</td>
                  <td>{emp.dataEmprestimo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Você não possui livros para devolver.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="devolver-actions">
        {/* O botão é desabilitado se nenhum item estiver selecionado */}
        <button onClick={handleDevolver} disabled={!selecionadoId || isSubmitting}>
          {isSubmitting ? 'Processando...' : 'Confirmar Devolução'}
        </button>
      </div>
    </div>
  );
}