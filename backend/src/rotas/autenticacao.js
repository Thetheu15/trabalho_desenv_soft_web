import express from 'express'
import { cadastrar, entrar } from '../controladores/autenticacaoController.js'

const rotas = express.Router()

// POST /api/auth/cadastrar para criar novo usuário
rotas.post('/cadastrar', cadastrar)

// POST /api/auth/entrar para login e gerar token
rotas.post('/entrar', entrar)

export default rotas
