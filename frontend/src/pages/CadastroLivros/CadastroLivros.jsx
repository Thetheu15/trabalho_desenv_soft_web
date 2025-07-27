import React, { useState } from "react";
import "./CadastroLivros.css";

// A URL base da API pode ser definida aqui ou importada de um arquivo de configuração
const API_URL = 'http://localhost:3001';

export default function CadastroLivros() {
  // 1. Estado para gerenciar todos os campos do formulário
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    ano: "",
    editora: "",
    situacao: "Disponível", // Valor padrão conforme o schema
    descricao: "",
  });

  // 2. Handler genérico para atualizar o estado quando um campo muda
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 3. Handler para o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pega o token de autenticação do localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("Erro de autenticação. Faça o login novamente.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/livros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // A rota de criação de livro é protegida e exige o token
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || "Erro ao cadastrar o livro.");
      }

      alert("Livro cadastrado com sucesso!");
      // Limpa o formulário após o sucesso
      setForm({
        titulo: "",
        autor: "",
        ano: "",
        editora: "",
        situacao: "Disponível",
        descricao: "",
      });

    } catch (error) {
      console.error("Falha no cadastro do livro:", error);
      alert(error.message);
    }
  };

  return (
    // 4. Adiciona o onSubmit ao formulário
    <form className="book-container" onSubmit={handleSubmit}>
      <h1>Cadastro de Livros</h1>
      <div className="book-content">
        <div className="left-fields">
          {/* 5. Adiciona os atributos 'name', 'value' e 'onChange' a cada input.
               O 'name' deve corresponder exatamente à chave no objeto de estado 'form'.
          */}
          <label>
            TÍTULO
            <input name="titulo" type="text" placeholder="Digite o título" value={form.titulo} onChange={handleChange} required />
          </label>
          <label>
            AUTOR
            <input name="autor" type="text" placeholder="Digite o autor" value={form.autor} onChange={handleChange} required />
          </label>
          <label>
            ANO DE PUBLICAÇÃO
            <input name="ano" type="number" placeholder="Ex: 2024" value={form.ano} onChange={handleChange} />
          </label>
          <label>
            EDITORA
            <input name="editora" type="text" placeholder="Digite a editora" value={form.editora} onChange={handleChange} />
          </label>
          <label>
            SITUAÇÃO
            {/* O ideal aqui seria um <select> para evitar erros de digitação */}
            <select name="situacao" value={form.situacao} onChange={handleChange}>
              <option value="Disponível">Disponível</option>
              <option value="Emprestado">Emprestado</option>
            </select>
          </label>
        </div>
        <div className="right-section">
          <div className="description-box">
            <label>DESCRIÇÃO</label>
            <textarea name="descricao" placeholder="Digite a descrição do livro" value={form.descricao} onChange={handleChange}></textarea>
          </div>
          <div className="buttons">
            {/* O botão de confirmar deve ser do tipo 'submit' para acionar o onSubmit do formulário */}
            <button type="submit" className="confirm">CONFIRMAR</button>
            {/* O botão de voltar pode usar o histórico do navegador para retornar à página anterior */}
            <button type="button" className="back" onClick={() => window.history.back()}>VOLTAR</button>
          </div>
        </div>
      </div>
    </form>
  );
}