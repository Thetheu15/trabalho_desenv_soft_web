import { useEffect, useState } from 'react'
import './CatalogoLivros.css'

export default function CatalogoLivros({ onViewDetail }) {
  const [books,       setBooks]       = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    // TODO: buscar da API
    setBooks([
      { id: 1, title: 'Dom Casmurro', author: 'Machado de Assis', year: 1899, status: 'Disponível' },
      { id: 2, title: 'O Cortiço', author: 'Aluísio Azevedo', year: 1890, status: 'Emprestado' },
      // …
    ])
  }, [])

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="books-page">
      <div className="books-header">
        <h1>Catálogo de Livros</h1>
        <input
          type="text"
          placeholder="Pesquisar por título..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
      <table className="books-table">
        <thead>
          <tr>
            <th>Título</th><th>Autor</th><th>Ano</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(b => (
            <tr key={b.id} onClick={() => onViewDetail(b.id)}>
              <td className="link">{b.title}</td>
              <td>{b.author}</td>
              <td>{b.year}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
