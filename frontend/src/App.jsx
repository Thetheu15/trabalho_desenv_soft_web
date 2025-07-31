import React, { useState, useEffect } from 'react';
import Login from './pages/login/Login';
import CadastroInicial from './pages/cadastro_inicial/CadastroInicial';
import Sidebar from './components/Sidebar/Sidebar';
import CatalogoLivros from './pages/catalogo_livros/CatalogoLivros';
import FormularioEmprestimo from './pages/form_emprestimo/desktop5';
import HistoricoUsuario from './pages/HistoricoUsuario/HistoricoUsuario';
import DevolverLivro from './pages/DevolverLivro/DevolverLivro';


// Telas de admin
import EditarLivro from './pages/editar_livro/EditarLivro';
import RemoverLivro from './pages/remover_livro/RemoverLivro';
import CadastroUsuario from './pages/cadastro_usuario/CadastroUsuario';
import EditarUsuario from './pages/editar_usuario/EditarUsuario';
import RemoverUsuario from './pages/remover_usuario/RemoverUsuario';
import CadastroLivros from './pages/CadastroLivros/CadastroLivros';

// URL base da sua API
const API_URL = 'http://localhost:3001';

function App() {
  const [user, setUser] = useState(null);
  const [tela, setTela] = useState('login');
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null); // livro selecionado para empréstimo
  const [bookUpdateCallback, setBookUpdateCallback] = useState(null); // callback para atualizar livro no catálogo
  const [emprestimoParaDevolver, setEmprestimoParaDevolver] = useState(null);

  const handleDevolver = (emprestimo) => {
    setEmprestimoParaDevolver(emprestimo);
    setTela('confirmarDevolucao');
  };

  // Verifica token no carregamento
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
        fetch(`${API_URL}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })

        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(userData => {
          setUser(userData);
          setTela('catalogoLivros');
        })
        .catch(() => {
          localStorage.removeItem('authToken');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/entrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.mensagem || 'Erro ao fazer login');
      }

      const { token, usuario } = await response.json();
      localStorage.setItem('authToken', token);
      setUser(usuario);
      setTela('catalogoLivros');
    } catch (error) {
      console.error("Falha no login:", error);
      alert(error.message);
    }
  };

  const handleCadastro = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/cadastrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.mensagem || 'Erro ao cadastrar');
      }

      alert('Cadastro realizado com sucesso! Faça o login para continuar.');
      setTela('login');
    } catch (error) {
      console.error("Falha no cadastro:", error);
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setTela('login');
  };

  // Função para abrir o formulário de empréstimo com o livro selecionado e uma callback para atualizar o catálogo
  const handleEmprestimo = (book, atualizarLivro) => {
    setSelectedBook(book);
    setBookUpdateCallback(() => atualizarLivro); // guardamos a função para depois usar
    setTela('formularioEmprestimo');
  };

  // Função para atualizar o livro no catálogo após empréstimo
  const handleLivroAtualizado = (livroAtualizado) => {
    if (bookUpdateCallback) {
      bookUpdateCallback(livroAtualizado);
    }
  };

  if (loading) return <div>Carregando...</div>;

  if (!user) {
    return tela === 'CadastroInicial' ? (
      <CadastroInicial
        onCadastroInicial={handleCadastro}
        switchToLogin={() => setTela('login')}
      />
    ) : (
      <Login
        onLogin={handleLogin}
        switchToCadastroInicial={() => setTela('CadastroInicial')}
      />
    );

    

  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        isAdmin={user.isAdmin}
        onSelect={action => {
          if (action === 'logout') handleLogout();
          else setTela(action);
        }}
      />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {tela === 'catalogoLivros' && (
          <CatalogoLivros onEmprestar={handleEmprestimo} />
        )}
    
        {tela === 'historico' && (
          <HistoricoUsuario 
            user={user} 
            onVoltar={() => setTela('catalogoLivros')} 
        />
        )}

        {tela === 'devolverLivro' && (
          <DevolverLivro
            emprestimo={emprestimoParaDevolver}
            onClose={() => setTela('historico')} // Volta para o histórico
          />
        )}
        
        

        {tela === 'editarLivro' && <EditarLivro />}
        {tela === 'removerLivro' && <RemoverLivro />}
        {tela === 'cadastroUsuario' && <CadastroUsuario />}
        {tela === 'editarUsuario' && <EditarUsuario />}
        {tela === 'removerUsuario' && <RemoverUsuario />}
        {tela === 'cadastroLivros' && <CadastroLivros />}

        {tela === 'formularioEmprestimo' && (
          <FormularioEmprestimo
            user={user}
            book={selectedBook}
            onClose={() => setTela('catalogoLivros')}
            onBookUpdated={handleLivroAtualizado}
          />
        )}
      </div>
    </div>
  );
}

export default App;
