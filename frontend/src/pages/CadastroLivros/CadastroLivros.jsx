import React from "react";
import "./CadastroLivros.css";

export default function CadastroLivros() {
  return (
    <div className="book-container">
      <h1>Cadastro de Livros</h1>

      <div className="book-content">
        {/* Parte esquerda com campos */}
        <div className="left-fields">
          <label>
            TÍTULO
            <input type="text" placeholder="Digite o título" />
          </label>

          <label>
            AUTOR
            <input type="text" placeholder="Digite o autor" />
          </label>

          <label>
            ANO DE PUBLICAÇÃO
            <input type="text" placeholder="Ex: 2024" />
          </label>

          <label>
            EDITORA
            <input type="text" placeholder="Digite a editora" />
          </label>

          <label>
            SITUAÇÃO
            <input type="text" placeholder="Disponível / Indisponível" />
          </label>
        </div>

        {/* Parte direita com descrição e botões */}
        <div className="right-section">
          <div className="description-box">
            <label>DESCRIÇÃO</label>
            <textarea placeholder="Digite a descrição do livro"></textarea>
          </div>

          <div className="buttons">
            <button className="confirm">CONFIRMAR</button>
            <button className="back">VOLTAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
