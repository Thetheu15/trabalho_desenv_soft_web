import React from "react";
import "./HistoricoUsuario.css";

export default function HistoricoUsuario() {
  const nomeUsuario = "Maria Silva"; // Exemplo, pode vir de props ou contexto

  return (
    <div className="historico-container">
      <h1>HISTÓRICO DE SOLICITAÇÕES DE "{nomeUsuario.toUpperCase()}"</h1>

      {/* Tabela do histórico */}
      <table className="historico-table">
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DATA DE SOLICITAÇÃO</th>
            <th>DATA DA ENTREGA</th>
            <th>ID DA SOLICITAÇÃO</th>
            <th>SITUAÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {/* Exemplo de linhas fictícias */}
          <tr>
            <td>Livro X</td>
            <td>01/07/2025</td>
            <td>15/07/2025</td>
            <td>98765</td>
            <td>Devolvido</td>
          </tr>
          <tr>
            <td>Livro Y</td>
            <td>10/07/2025</td>
            <td>25/07/2025</td>
            <td>54321</td>
            <td>Pendente</td>
          </tr>
        </tbody>
      </table>

      {/* Botões */}
      <div className="buttons">
        <button className="confirm">CONFIRMAR</button>
        <button className="back">VOLTAR</button>
      </div>
    </div>
  );
}
