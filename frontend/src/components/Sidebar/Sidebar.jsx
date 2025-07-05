import React from 'react'
import './Sidebar.css'

function Sidebar({ isAdmin, onSelect }) {
  return (
    <nav className="sidebar">
      <ul>
        {isAdmin ? (
          <>
            <li onClick={() => onSelect('catalogoLivros')}>Catálogo de Livros</li>
            <li onClick={() => onSelect('editarLivro')}>Edição de Livro</li>
            <li onClick={() => onSelect('removerLivro')}>Remoção de Livro</li>
            <li onClick={() => onSelect('cadastroUsuario')}>Cadastro de Usuário</li>
            <li onClick={() => onSelect('editarUsuario')}>Edição de Usuário</li>
            <li onClick={() => onSelect('removerUsuario')}>Remoção de Usuário</li>
          </>
        ) : (
          <>
            <li onClick={() => onSelect('catalogoLivros')}>Catálogo de Livros</li>
            <li onClick={() => onSelect('historico')}>Meu Histórico</li>
            <li onClick={() => onSelect('retornar')}>Devolver Livro</li>
          </>
        )}
        <li className="logout" onClick={() => onSelect('logout')}>Sair</li>
      </ul>
    </nav>
  )
}

export default Sidebar;