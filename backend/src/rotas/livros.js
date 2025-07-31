import express from 'express'
import { proteger, somenteAdmin } from '../middleware/autenticar.js'
import * as C from '../controladores/livrosController.js'

const rotas = express.Router()

// Rota raiz para listar livros
/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Rotas para gerenciamento de livros
 */

/**
 * @swagger
 * /api/livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 *
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - autor
 *               - ano
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               editora:
 *                 type: string
 *               descricao:
 *                 type: string
 *               situacao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 */

/**
 * @swagger
 * /api/livros/{id}:
 *   get:
 *     summary: Retorna um livro específico
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livro encontrado
 *       404:
 *         description: Livro não encontrado
 *
 *   put:
 *     summary: Atualiza um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               ano:
 *                 type: integer
 *               editora:
 *                 type: string
 *               descricao:
 *                 type: string
 *               situacao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado
 *       404:
 *         description: Livro não encontrado
 *
 *   delete:
 *     summary: Remove um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Livro removido com sucesso
 *       404:
 *         description: Livro não encontrado
 */

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
