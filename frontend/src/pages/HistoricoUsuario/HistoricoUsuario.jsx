import React, { useEffect, useState } from "react";
import "./HistoricoUsuario.css";

const API_URL = "http://localhost:3001";

// O componente agora recebe 'user' e 'onVoltar' como props
export default function HistoricoUsuario({ user, onVoltar }) {
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }

    const fetchHistorico = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/emprestimos/meus`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!resp.ok) {
          const json = await resp.json();
          throw new Error(json.mensagem || "Erro ao buscar histórico.");
        }
        
        const json = await resp.json();
        setEmprestimos(json);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, []); // O array de dependências vazio garante que isso rode apenas uma vez

  if (loading) return <p>Carregando histórico...</p>;
  if (error) return <p className="erro">{error}</p>;

  return (
    <div className="historico-container">
      {/* Usamos o nome do usuário vindo da prop */}
      <h1>HISTÓRICO DE SOLICITAÇÕES DE "{user?.nome?.toUpperCase() || 'USUÁRIO'}"</h1>

      <table className="historico-table">
        <thead>
          <tr>
            <th>TÍTULO DO LIVRO</th>
            <th>DATA DE SOLICITAÇÃO</th>
            <th>DATA DA ENTREGA</th>
            <th>ID DA SOLICITAÇÃO</th>
            <th>SITUAÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.length === 0 ? (
            <tr>
              <td colSpan="5">Nenhum empréstimo encontrado.</td>
            </tr>
          ) : (
            emprestimos.map((emp) => (
              <tr key={emp._id}>
                {/* Opcional chaining '?' previne erros se o livro for removido */}
                <td>{emp.livro?.titulo || "Livro não disponível"}</td>
                <td>{emp.dataEmprestimo || "-"}</td>
                <td>{emp.dataDevolucao || "-"}</td>
                <td>{emp._id}</td>
                <td>{emp.dataDevolucao ? "Devolvido ✅" : "Pendente ⏳"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="buttons">
        <button className="back" onClick={onVoltar}>VOLTAR</button>
      </div>
    </div>
  );
}