import express from 'express'
import { proteger, somenteAdmin } from '../middleware/autenticar.js'
import * as C from '../controladores/emprestimosController.js'

const rotas = express.Router()

rotas.use(proteger)

rotas.post('/solicitar/:livroId',      C.solicitarEmprestimo)
rotas.post('/devolver/:emprestimoId',  C.devolverEmprestimo)
rotas.get('/meus',                     C.meusEmprestimos)
rotas.get('/',        somenteAdmin,    C.todosEmprestimos)

export default rotas
