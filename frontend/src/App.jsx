import React, { useState, useEffect } from 'react';
import Login from './pages/login/Login';
import CadastroInicial from './pages/cadastro_inicial/CadastroInicial';
import Sidebar from './components/Sidebar/Sidebar';
import CatalogoLivros from './pages/catalogo_livros/CatalogoLivros';
import Desktop5 from './pages/form_emprestimo/desktop5';


// Telas de admin
import EditarLivro from './pages/editar_livro/EditarLivro';
import RemoverLivro from './pages/remover_livro/RemoverLivro';
import CadastroUsuario from './pages/cadastro_usuario/CadastroUsuario';
import EditarUsuario from './pages/editar_usuario/EditarUsuario';
import RemoverUsuario from './pages/remover_usuario/RemoverUsuario';
import CadastroLivros from './pages/CadastroLivros/CadastroLivros';

// URL base da sua API
const API_URL = 'http://localhost:3001'; // Ajuste a porta se for diferente

function App() {
  const [user, setUser] = useState(null);
  const [tela, setTela] = useState('login');
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento inicial

  // Efeito para verificar o token no carregamento da página
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch(`${API_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(userData => {
        setUser(userData);
        setTela('catalogoLivros');
      })
      .catch(() => {
        // Se o token for inválido, limpa o localStorage
        localStorage.removeItem('authToken');
        setUser(null);
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false); // Não há token, encerra o carregamento
    }
  }, []); // O array vazio [] garante que isso só rode uma vez

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
      alert(error.message); // Exibe o erro para o usuário
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

  if (loading) {
    return <div>Carregando...</div>; // Tela de loading enquanto verifica o token
  }

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
          if (action === 'logout') {
            handleLogout();
          } else {
            setTela(action);
          }
        }}
      />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {tela === 'catalogoLivros' && <CatalogoLivros />}
        {tela === 'editarLivro'    && <EditarLivro />}
        {tela === 'removerLivro'   && <RemoverLivro />}
        {tela === 'cadastroUsuario'&& <CadastroUsuario />}
        {tela === 'editarUsuario'  && <EditarUsuario />}
        {tela === 'removerUsuario' && <RemoverUsuario />}
        {tela === 'formularioEmprestimo' && <Desktop5 />}
        {tela === 'cadastroLivros' && <CadastroLivros />}
      </div>
    </div>
  );
}

export default App;