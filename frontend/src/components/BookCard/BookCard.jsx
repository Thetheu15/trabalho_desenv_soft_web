import React from 'react'
import './BookCard.css'
import { useNavigate } from 'react-router-dom'

export default function BookCard({ book, onEmprestar }) {
  const navigate = useNavigate()

  const statusDisponivel = book.situacao === 'Disponível'
  const statusClass = statusDisponivel
    ? 'bookcard--disponivel'
    : 'bookcard--indisponivel'

  return (
    <div className={`bookcard ${statusClass}`}>
      <div
        className="bookcard__info"
        onClick={() => navigate(`/livros/${book._id}`)}
        style={{ cursor: 'pointer' }}
      >
        <h3 className="bookcard__titulo">{book.titulo}</h3>
        <p className="bookcard__autor">{book.autor}</p>
        <span className="bookcard__situacao">{book.situacao}</span>
      </div>

      {/* Só mostra o botão se estiver disponível */}
      {statusDisponivel && (
        <button
          className="bookcard__btn-emprestar"
          onClick={(e) => {
            e.stopPropagation() // Evita navegar para os detalhes
            onEmprestar?.(book)
          }}
        >
          📚 Emprestar
        </button>
      )}
    </div>
  )
}
