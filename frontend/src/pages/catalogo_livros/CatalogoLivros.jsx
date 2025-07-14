import React, { useState } from 'react'
import BookCard from '../../components/BookCard/BookCard'
import './CatalogoLivros.css'

export default function CatalogoLivros({ onViewDetail }) {
  const exemplos = [
    { _id: '1', titulo: 'Dom Casmurro',       autor: 'Machado de Assis',      situacao: 'Disponível' },
    { _id: '2', titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint‑Exupéry', situacao: 'Emprestado'   },
    { _id: '3', titulo: '1984',               autor: 'George Orwell',         situacao: 'Disponível' }
  ]
  const [busca, setBusca] = useState('')

  const livrosFiltrados = exemplos.filter(l =>
    l.titulo.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="catalogo-container">
      <div className="catalogo-header">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="catalogo-busca"
        />
      </div>
      {livrosFiltrados.length === 0 ? (
        <p className="catalogo-vazio">Nenhum livro encontrado.</p>
      ) : (
        <div className="catalogo-grid">
          {livrosFiltrados.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}