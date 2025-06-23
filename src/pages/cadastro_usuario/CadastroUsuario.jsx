import React from 'react';
import './CadastroUsuario.css';

function CadastroUsuario() {
  return (
    <div className="usuario-container">
      <h1 className="titulo-cadastro-usuario">Cadastro de usuários</h1>
      <form className="usuario-form">
        <div className="usuario-form-linhas">
          <div className="usuario-col-esq">
            <div className="usuario-group">
              <label htmlFor="login">Login</label>
              <input type="text" id="login" name="login" />
            </div>
            <div className="usuario-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="usuario-group">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" name="senha" />
            </div>
            <div className="usuario-group">
              <label htmlFor="telefone">Telefone</label>
              <input type="tel" id="telefone" name="telefone" />
            </div>
            <div className="usuario-group">
              <label htmlFor="endereco">Endereço</label>
              <input type="text" id="endereco" name="endereco" />
            </div>
          </div>
          <div className="usuario-col-dir">
            <div className="usuario-group">
              <label htmlFor="cpf">CPF</label>
              <input type="text" id="cpf" name="cpf" />
            </div>
            <div className="usuario-group">
              <label htmlFor="nome">Nome</label>
              <input type="text" id="nome" name="nome" />
            </div>
          </div>
        </div>
        <div className="usuario-actions">
          <button type="submit" className="btn-confirmar">Confirmar</button>
          <button type="button" className="btn-voltar">Voltar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastroUsuario;
