import React from 'react';
import './RemoverLivro.css';

function RemoverLivro() {
  return (
    <div className="remover-container">
      <h1 className="titulo-painel">Remoção de Livros</h1>
      <form className="remover-form">
        <div className="pesquisa-livro">
          <label htmlFor="busca">Pesquisar livro:</label>
          <input type="text" id="busca" name="busca" placeholder="Digite o nome ou ID..." />
        </div>

        <div className="resultado-busca">
          <h3>Resultado da busca</h3>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano de Publicação</th>
                <th>Número de Identificação</th>
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemplo de linha estática */}
              <tr>
                <td>Exemplo</td>
                <td>Autor X</td>
                <td>2024</td>
                <td>00123</td>
                <td>Disponível</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="remover-actions">
          <button type="submit" className="btn-confirmar">Confirmar</button>
          <button type="button" className="btn-voltar">Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default RemoverLivro;
// This code defines a React component for removing books, including a search form and a table to display search results.