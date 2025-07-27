import React from 'react';
import './Sidebar.css';

function Sidebar({ isAdmin, onSelect }) {
  return (
    <nav className="sidebar">
      <ul>
        {/*
          Melhora: Movido para fora da condição, pois é comum a ambos os perfis.
        */}
        <li onClick={() => onSelect('catalogoLivros')}>Catálogo de Livros</li>

        {isAdmin ? (
          // Bloco de links para Administradores
          <>
            <li onClick={() => onSelect('cadastroLivros')}>Cadastro de Livro</li>
            <li onClick={() => onSelect('editarLivro')}>Edição de Livro</li>
            <li onClick={() => onSelect('removerLivro')}>Remoção de Livro</li>
            <li onClick={() => onSelect('cadastroUsuario')}>Cadastro de Usuário</li>
            <li onClick={() => onSelect('editarUsuario')}>Edição de Usuário</li>
            <li onClick={() => onSelect('removerUsuario')}>Remoção de Usuário</li>
          </>
        ) : (
          // Bloco de links para Usuários Comuns
          <>
            {/* NOVO LINK ADICIONADO AQUI!
              Ele chama onSelect com 'formularioEmprestimo', que o App.jsx usará para renderizar o componente correto.
            */}
            <li onClick={() => onSelect('formularioEmprestimo')}>Fazer Empréstimo</li>
            
            <li onClick={() => onSelect('historico')}>Meu Histórico</li>
            <li onClick={() => onSelect('retornar')}>Devolver Livro</li>
          </>
        )}

        {/* Link de logout, comum a todos */}
        <li className="logout" onClick={() => onSelect('logout')}>Sair</li>
      </ul>
    </nav>
  );
}

export default Sidebar;