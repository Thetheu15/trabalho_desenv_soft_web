import React, { Component } from 'react';
import './desktop6.css';

class Desktop6 extends Component {
    render() {
        return (
            <div className="desktop6_container_principal">
                <div className="container2">
                    <div className="texto_container1">Edição de Livros</div>
                    <div className="sub_container2">
                        <div className="coluna-esquerda">
                            <div className="usuario-group">
                                <label>Título</label>
                                <input className="input_container2" type="text" />
                            </div>
                            <div className="usuario-group">
                                <label>Autor</label>
                                <input className="input_container2" type="text" />
                            </div>
                            <div className="usuario-group">
                                <label>Ano de Publicação</label>
                                <input className="input_container2" type="text" />
                            </div>
                            <div className="usuario-group">
                                <label>Editora</label>
                                <input className="input_container2" type="text" />
                            </div>
                            <div className="usuario-group">
                                <label>Situação</label>
                                <input className="input_container2" type="text" />
                            </div>
                        </div>

                        <div className="coluna-direita">
                            <textarea className="textarea_container2" placeholder="Descrição" />
                            <div className="botoes_container3">
                                <button className="confirmar">Confirmar</button>
                                <button className="voltar">Voltar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Desktop6;
