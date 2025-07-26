import React from "react";
import "./HistoricoGeral.css";

export default function HistoricoGeral() {
  return (
    <div className="historico-container">
      <h1>HISTÓRICO DE SOLICITAÇÕES GERAL</h1>

      {/* Tabela do histórico */}
      <table className="historico-table">
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DATA DE SOLICITAÇÃO</th>
            <th>DATA DA ENTREGA</th>
            <th>ID DA SOLICITAÇÃO</th>
            <th>SITUAÇÃO</th>
            <th>NOME DO USUÁRIO</th>
          </tr>
        </thead>
        <tbody>
          {/* Exemplo de linhas fictícias */}
          <tr>
            <td>Livro A</td>
            <td>01/07/2025</td>
            <td>15/07/2025</td>
            <td>12345</td>
            <td>Devolvido</td>
            <td>Maria Silva</td>
          </tr>
          <tr>
            <td>Livro B</td>
            <td>05/07/2025</td>
            <td>20/07/2025</td>
            <td>67890</td>
            <td>Pendente</td>
            <td>João Souza</td>
          </tr>
          {/* Outras linhas podem vir de um array de dados */}
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
