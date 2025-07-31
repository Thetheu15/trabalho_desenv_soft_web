import React, { useState } from 'react';
import './desktop5.css';

const API_URL = 'http://localhost:3001';

export default function FormularioEmprestimo({ user, book, onClose, onBookUpdated }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!book) {
      alert("Nenhum livro selecionado.");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch(`${API_URL}/api/emprestimos/solicitar/${book._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || 'Falha na solicitação.');
      }

      alert(`✅ Empréstimo do livro "${book.titulo}" solicitado com sucesso!`);

      // Atualiza o livro no catálogo com os dados retornados da API
      if (data.livroAtualizado) {
        onBookUpdated(data.livroAtualizado);
      } else {
        // Se a API não retornar o livro atualizado, pelo menos podemos atualizar a situação manualmente:
        onBookUpdated({ ...book, situacao: 'Emprestado' });
      }

      onClose();

    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!book) {
    return (
      <div className="desktop5_container_principal">
        <h1>Erro</h1>
        <p>Nenhum livro foi selecionado para empréstimo.</p>
        <button onClick={onClose}>Voltar ao Catálogo</button>
      </div>
    );
  }

  return (
    <div className="desktop5_container_principal">
      <div className="container1">
        <p className="texto_container1">CONFIRME SEUS DADOS PARA O EMPRÉSTIMO</p>
      </div>

      <div className="form_box">
        <div className="info_section">
          <p><strong>Usuário:</strong> {user?.nome}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Livro:</strong> {book?.titulo}</p>
          <p><strong>Autor:</strong> {book?.autor}</p>
        </div>

        <div className="container3">
          <button className="confirmar" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'ENVIANDO...' : 'CONFIRMAR EMPRÉSTIMO'}
          </button>
          <button className="voltar" onClick={onClose} disabled={isSubmitting}>
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
}
