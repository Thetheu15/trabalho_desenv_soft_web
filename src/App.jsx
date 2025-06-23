import React, { useState } from 'react';
import EditarLivro from './pages/EditarLivro/EditarLivro';
import RemoverLivro from './pages/RemoverLivro/RemoverLivro';
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario';
import EditarUsuario from './pages/EditarUsuario/EditarUsuario';
import RemoverUsuario from './pages/RemoverUsuario/RemoverUsuario';

function App() {
  const [tela, setTela] = useState('editarLivro');

  return (
    <div>
      {/* Menu simples, centralizado */}
      <nav className="admin-menu centralizado">
        <button onClick={() => setTela('editarLivro')}>Edição de Livro</button>
        <button onClick={() => setTela('removerLivro')}>Remoção de Livro</button>
        <button onClick={() => setTela('cadastroUsuario')}>Cadastro de Usuário</button>
        <button onClick={() => setTela('editarUsuario')}>Edição de Usuário</button>
        <button onClick={() => setTela('removerUsuario')}>Remoção de Usuário</button>
      </nav>

      {/* Renderização condicional das telas */}
      <div className="admin-content">
        {tela === 'editarLivro' && <EditarLivro />}
        {tela === 'removerLivro' && <RemoverLivro />}
        {tela === 'cadastroUsuario' && <CadastroUsuario />}
        {tela === 'editarUsuario' && <EditarUsuario />}
        {tela === 'removerUsuario' && <RemoverUsuario />}
      </div>
    </div>
  );
}

export default App;
