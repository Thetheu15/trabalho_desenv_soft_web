import React, { Component } from 'react';
import './desktop5.css';

class Desktop5 extends Component {
  render() {
    return (
      <div className="desktop5_container_principal">
        <div className="container1">
          <p className="texto_container1">PREENCHA SUAS INFORMAÇÕES ABAIXO</p>
        </div>

        <div className="form_box">
          <div className="container2">
            <div className="form_linha">
              <label className="texto_container2">ENDEREÇO</label>
              <input className="input_container2" type="text" />
            </div>
            <div className="form_linha">
              <label className="texto_container2">NOME COMPLETO</label>
              <input className="input_container2" type="text" />
            </div>
            <div className="form_linha">
              <label className="texto_container2">CPF</label>
              <input className="input_container2" type="text" />
            </div>
            <div className="form_linha">
              <label className="texto_container2">TELEFONE</label>
              <input className="input_container2" type="text" />
            </div>
          </div>
          <div className='container3_externo'>
          <div className='container_enchimento'></div>
          <div className="container3">
            <button className="confirmar">CONFIRMAR</button>
            <button className="voltar">VOLTAR</button>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Desktop5;
