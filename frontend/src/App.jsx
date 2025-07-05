import React, { useState } from 'react'
import Login             from './pages/login/Login'
import CadastroInicial   from './pages/cadastro_inicial/CadastroInicial'
import Sidebar           from './components/Sidebar/Sidebar'
import CatalogoLivros    from './pages/catalogo_livros/CatalogoLivros'

// telas de admin
import EditarLivro       from './pages/editar_livro/EditarLivro'
import RemoverLivro      from './pages/remover_livro/RemoverLivro'
import CadastroUsuario   from './pages/cadastro_usuario/CadastroUsuario'
import EditarUsuario     from './pages/editar_usuario/EditarUsuario'
import RemoverUsuario    from './pages/remover_usuario/RemoverUsuario'

function App() {
  const [user, setUser] = useState(null)
  const [tela, setTela] = useState('login')

  if (!user) {
    return tela === 'CadastroInicial' ? (
      <CadastroInicial
        onCadastroInicial={u => { setUser(u); setTela('catalogoLivros') }}
        switchToLogin={() => setTela('login')}
      />
    ) : (
      <Login
        onLogin={u => { setUser(u); setTela('catalogoLivros') }}
        switchToCadastroInicial={() => setTela('CadastroInicial')}
      />
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        isAdmin={user.isAdmin}
        onSelect={action => {
          if (action === 'logout') {
            setUser(null)
            setTela('login')
          } else {
            setTela(action)
          }
        }}
      />

      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Tela principal - catálogo de livros */}
        {tela === 'catalogoLivros' && (
          <CatalogoLivros />
        )}

        {/* telas de admin */}
        {tela === 'editarLivro'     && <EditarLivro />}
        {tela === 'removerLivro'    && <RemoverLivro />}
        {tela === 'cadastroUsuario' && <CadastroUsuario />}
        {tela === 'editarUsuario'   && <EditarUsuario />}
        {tela === 'removerUsuario'  && <RemoverUsuario />}
      </div>
    </div>
  )
}

export default App;