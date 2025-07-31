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

// Rota raiz para autenticação

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Rotas de login, cadastro e gerenciamento de usuários
 */

/**
 * @swagger
 * /api/auth/cadastrar:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - login
 *               - email
 *               - senha
 *               - cpf
 *               - endereco
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *               login:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               cpf:
 *                 type: string
 *               endereco:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */

/**
 * @swagger
 * /api/auth/entrar:
 *   post:
 *     summary: Faz login e retorna um token
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Retorna os dados do usuário logado
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário autenticado
 */

/**
 * @swagger
 * /api/auth/usuarios:
 *   get:
 *     summary: Lista todos os usuários (admin)
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */

/**
 * @swagger
 * /api/auth/usuario/{id}:
 *   get:
 *     summary: Retorna os dados de um usuário (admin)
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do usuário

 *   put:
 *     summary: Atualiza os dados de um usuário (admin)
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
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
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado

 *   delete:
 *     summary: Remove um usuário (admin)
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 */

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
