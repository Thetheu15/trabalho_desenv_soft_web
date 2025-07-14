import React from 'react'
import './BookCard.css'
import { useNavigate } from 'react-router-dom'

export default function BookCard({ book }) {
  const navigate = useNavigate()

  const statusClass =
    book.situacao === 'Disponível'
      ? 'bookcard--disponivel'
      : 'bookcard--indisponivel'

  return (
    <div
      className={`bookcard ${statusClass}`}
      onClick={() => navigate(`/livros/${book._id}`)}
    >
      <div className="bookcard__info">
        <h3 className="bookcard__titulo">{book.titulo}</h3>
        <p className="bookcard__autor">{book.autor}</p>
        <span className="bookcard__situacao">{book.situacao}</span>
      </div>
    </div>
  )
}
