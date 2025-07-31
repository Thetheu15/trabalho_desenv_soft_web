import React, { useState, useEffect } from 'react';
import './RemoverUsuario.css';

const API_URL = 'http://localhost:3001';

function RemoverUsuario() {
  // Estados para a lista de usuários, termo de busca e ID do usuário selecionado
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState('');
  const [usuarioSelecionadoId, setUsuarioSelecionadoId] = useState(null);

  // Estados para controle da interface
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Busca a lista de usuários quando o componente é montado
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

  // 2. Filtra a lista de usuários com base no termo de busca
  const usuariosFiltrados = busca.length > 0
    ? usuarios.filter(user =>
        user.nome.toLowerCase().includes(busca.toLowerCase()) ||
        user.login.toLowerCase().includes(busca.toLowerCase()) ||
        user.email.toLowerCase().includes(busca.toLowerCase())
      )
    : [];

  // 3. Função para lidar com a remoção do usuário
  const handleRemover = async (e) => {
    e.preventDefault();
    if (!usuarioSelecionadoId) {
      alert('Por favor, selecione um usuário da lista para remover.');
      return;
    }

    if (!window.confirm(`Você tem certeza que deseja remover este usuário?`)) {
      return;
    }

    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_URL}/api/auth/usuario/${usuarioSelecionadoId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.mensagem || "Falha ao remover o usuário.");
      }

      // Atualiza a UI removendo o usuário da lista local
      setUsuarios(usuarios.filter(user => user._id !== usuarioSelecionadoId));
      setUsuarioSelecionadoId(null); // Limpa a seleção
      alert('Usuário removido com sucesso!');

    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="remover-usuario-container">
      <h1 className="titulo-remocao-usuario">Remoção de usuários</h1>
      <form className="remover-usuario-form" onSubmit={handleRemover}>
        <div className="pesquisa-usuario">
          <label htmlFor="buscaUsuario">Pesquisar usuário:</label>
          <input
            type="text"
            id="buscaUsuario"
            name="buscaUsuario"
            placeholder="Digite nome, login ou email..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="resultado-busca-usuario">
          <h3>Resultado da busca</h3>
          <div className="tabela-container-usuario">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Login</th>
                  <th>Email</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {busca.length > 0 && usuariosFiltrados.length > 0 ? (
                  usuariosFiltrados.map(user => (
                    <tr
                      key={user._id}
                      onClick={() => setUsuarioSelecionadoId(user._id)}
                      className={user._id === usuarioSelecionadoId ? 'selecionado' : ''}
                    >
                      <td>{user.nome}</td>
                      <td>{user.login}</td>
                      <td>{user.email}</td>
                      <td>{user.telefone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
                      {busca.length > 0 ? "Nenhum usuário encontrado." : "Digite na busca para ver os resultados."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="remover-usuario-actions">
          <button type="submit" className="btn-confirmar">Confirmar Remoção</button>
          <button type="button" className="btn-voltar" onClick={() => window.history.back()}>Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default RemoverUsuario;