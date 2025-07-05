import express from 'express'
import { cadastrar, entrar } from '../controladores/autenticacaoController.js'
import {
  cadastrar,
  entrar,
  atualizarUsuario,
  deletarUsuario
} from '../controladores/autenticacaoController.js'
import { proteger, somenteAdmin } from '../middleware/autenticar.js'

const rotas = express.Router()

// POST /api/auth/cadastrar para criar novo usuário
rotas.post('/cadastrar', cadastrar)

// POST /api/auth/entrar para login e gerar token
rotas.post('/entrar', entrar)

// GET /api/auth/me para leitura do perfil
 rotas.get('/me', proteger, (req, res) => res.json(req.usuario))

// PUT /api/auth/usuario/:id para atualizar usuário (admin)
rotas.put('/usuario/:id', proteger, somenteAdmin, atualizarUsuario)

// DELETE /api/auth/usuario/:id para deletar usuário (admin)
rotas.delete('/usuario/:id', proteger, somenteAdmin, deletarUsuario)

export default rotas
