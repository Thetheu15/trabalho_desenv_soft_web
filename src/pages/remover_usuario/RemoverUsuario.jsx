import React from 'react';
import './RemoverUsuario.css';

function RemoverUsuario() {
  return (
    <div className="remover-usuario-container">
      <h1 className="titulo-remocao-usuario">Remoção de usuários</h1>
      <form className="remover-usuario-form">
        <div className="pesquisa-usuario">
          <label htmlFor="buscaUsuario">Pesquisar usuário:</label>
          <input
            type="text"
            id="buscaUsuario"
            name="buscaUsuario"
            placeholder="Digite nome, login ou email..."
          />
        </div>

        <div className="resultado-busca-usuario">
          <h3>Resultado da busca</h3>
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
              {/* Exemplo de linha estática */}
              <tr>
                <td>Maria</td>
                <td>maria123</td>
                <td>maria@email.com</td>
                <td>(81) 99999-0000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="remover-usuario-actions">
          <button type="submit" className="btn-confirmar">Confirmar</button>
          <button type="button" className="btn-voltar">Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default RemoverUsuario;
