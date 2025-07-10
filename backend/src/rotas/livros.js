import express from 'express'
import { proteger, somenteAdmin } from '../middleware/autenticar.js'
import * as C from '../controladores/livrosController.js'

const rotas = express.Router()

// Todas as rotas de livro exigem usuário autenticado
rotas.use(proteger)

// GET /api/livros            → listar todos (qualquer usuário)
rotas.get('/', C.listarLivros)

// GET /api/livros/:id        → obter um (qualquer usuário)
rotas.get('/:id', C.obterLivro)

// Rotas restritas a admin
rotas.use(somenteAdmin)
rotas.post('/', C.criarLivro)
rotas.put('/:id', C.atualizarLivro)
rotas.delete('/:id', C.deletarLivro)

export default rotas
