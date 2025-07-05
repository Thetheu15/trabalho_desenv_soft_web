import React from 'react';
import './EditarLivro.css';

function EditarLivro() {
  return (
    <div className="editar-container">
      <div className="editar-bloco">
        <h1 className="titulo-editar-livro">Edição de Livros</h1>
        <form className="editar-form">
          <div className="form-left">
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input type="text" id="titulo" name="titulo" />
            </div>
            <div className="form-group">
              <label htmlFor="autor">Autor</label>
              <input type="text" id="autor" name="autor" />
            </div>
            <div className="form-group">
              <label htmlFor="ano">Ano de Publicação</label>
              <input type="number" id="ano" name="ano" />
            </div>
            <div className="form-group">
              <label htmlFor="editora">Editora</label>
              <input type="text" id="editora" name="editora" />
            </div>
            <div className="form-group">
              <label htmlFor="situacao">Situação</label>
              <input type="text" id="situacao" name="situacao" />
            </div>
          </div>
          <div className="form-right">
            <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" name="descricao" rows={8} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-confirmar">Confirmar</button>
            <button type="button" className="btn-voltar">Voltar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarLivro;
