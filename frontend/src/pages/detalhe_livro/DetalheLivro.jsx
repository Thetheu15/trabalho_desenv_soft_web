// src/pages/detalhe_livro/DetalheLivro.jsx
import React from 'react'
import './DetalheLivro.css'

export default function DetalheLivro({ book, onBack, onEmprestar }) {
  if (!book) return <p>Livro não encontrado.</p>

  return (
    <div className="detalhe-container">
      <h1 className="detalhe-titulo">{book.titulo}</h1>
      <div className="detalhe-grid">
        <div className="detalhe-info">
          <p><strong>Autor:</strong> {book.autor}</p>
          <p><strong>Ano:</strong> {book.ano ?? '—'}</p>
          <p><strong>Editora:</strong> {book.editora ?? '—'}</p>
          <p>
            <strong>Situação:</strong>{' '}
            <span
              className={
                book.situacao === 'Disponível'
                  ? 'badge disponivel'
                  : 'badge emprestado'
              }
            >
              {book.situacao}
            </span>
          </p>
        </div>
        <div className="detalhe-desc">
          <strong>Descrição:</strong>
          <p>{book.descricao || 'Sem descrição.'}</p>
        </div>
      </div>
      <div className="detalhe-buttons">
        {book.situacao === 'Disponível' && (
          <button className="btn confirmar" onClick={onEmprestar}>
            Solicitar Empréstimo
          </button>
        )}
        <button className="btn voltar" onClick={onBack}>
          Voltar
        </button>
      </div>
    </div>
  )
}
