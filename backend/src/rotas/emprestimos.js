import express from 'express'
import { proteger, somenteAdmin } from '../middleware/autenticar.js'
import * as C from '../controladores/emprestimosController.js'

const rotas = express.Router()

// Rota raiz para listar empréstimos
/**
 * @swagger
 * tags:
 *   name: Empréstimos
 *   description: Rotas para controle de empréstimos de livros
 */

/**
 * @swagger
 * /api/emprestimos/solicitar/{livroId}:
 *   post:
 *     summary: Solicita o empréstimo de um livro
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: livroId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Empréstimo realizado com sucesso
 *       404:
 *         description: Livro não encontrado
 */

/**
 * @swagger
 * /api/emprestimos/devolver/{emprestimoId}:
 *   patch:
 *     summary: Devolve um livro emprestado
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: emprestimoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livro devolvido com sucesso
 *       400:
 *         description: Empréstimo já foi devolvido
 *       404:
 *         description: Empréstimo não encontrado
 */

/**
 * @swagger
 * /api/emprestimos/meus:
 *   get:
 *     summary: Lista os empréstimos do usuário autenticado
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empréstimos pessoais
 */

/**
 * @swagger
 * /api/emprestimos/todos:
 *   get:
 *     summary: Lista todos os empréstimos (admin)
 *     tags: [Empréstimos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os empréstimos
 */

rotas.use(proteger)

rotas.post('/solicitar/:livroId',      C.solicitarEmprestimo)
rotas.post('/devolver/:emprestimoId',  C.devolverEmprestimo)
rotas.get('/meus',                     C.meusEmprestimos)
rotas.get('/',        somenteAdmin,    C.todosEmprestimos)

export default rotas
