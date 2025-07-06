import express from 'express'
import {
  cadastrar,
  entrar,
  listarUsuarios,
  obterUsuario,
  atualizarUsuario,
  deletarUsuario
} from '../controladores/autenticacaoController.js'
import { proteger, somenteAdmin } from '../middleware/autenticar.js'

const rotas = express.Router()

// Rotas públicas
rotas.post('/cadastrar', cadastrar)
rotas.post('/entrar',    entrar)

// Rotas de usuário autenticado
rotas.use(proteger)
rotas.get('/me', (req, res) => res.json(req.usuario))

// Rotas de administrador
rotas.use(somenteAdmin)
rotas.get('/usuarios', listarUsuarios)
rotas
  .route('/usuario/:id')
  .get(obterUsuario)
  .put(atualizarUsuario)
  .delete(deletarUsuario)

export default rotas
