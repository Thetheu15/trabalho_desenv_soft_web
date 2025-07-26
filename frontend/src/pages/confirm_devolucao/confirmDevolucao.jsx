import React, { Component } from "react";
import "./confirmDevolucao.css";

class ConfirmDevolucao extends Component {
  render(){ 
    return (
    <div className="container">
      <h1>Ficha de empréstimo</h1>

      <div className="content">
        {/* Seção de dados */}
        <div className="data-section">
          <div className="box">
            <h2>DADOS DO USUÁRIO</h2>
            <div className="placeholder"></div>
          </div>

          <div className="box">
            <h2>DADOS DA OBRA</h2>
            <div className="placeholder"></div>
          </div>
        </div>

        {/* Seção de datas e botões */}
        <div className="form-section">
          <div className="inputs">
            <label>
              DATA DE SOLICITAÇÃO
              <input type="text" placeholder="__/__/____" />
            </label>

            <label>
              DATA DE ENTREGA
              <input type="text" placeholder="__/__/____" />
            </label>

            <label>
              NÚMERO DE REGISTRO DA FICHA
              <input type="text" placeholder="000000" />
            </label>
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
}
export default ConfirmDevolucao;