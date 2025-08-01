import React from 'react'
import './BookCard.css'

export default function BookCard({ book, onClick, onEmprestar }) {
  const statusClass =
    book.situacao === 'Disponível'
      ? 'bookcard--disponivel'
      : 'bookcard--indisponivel'

  return (
    <div
      className={`bookcard ${statusClass}`}
      onClick={onClick}                          // ← dispara a navegação para detalhes
    >
      <div className="bookcard__info">
        <h3 className="bookcard__titulo">{book.titulo}</h3>
        <p className="bookcard__autor">{book.autor}</p>
        <span className="bookcard__situacao">{book.situacao}</span>
      </div>
      {onEmprestar && book.situacao === 'Disponível' && (
        <button
          className="bookcard__btn-emprestar"
          onClick={e => {
            e.stopPropagation()                  // evita também disparar onClick do card
            onEmprestar()
          }}
        >
          Emprestar
        </button>
      )}
    </div>
  )
}