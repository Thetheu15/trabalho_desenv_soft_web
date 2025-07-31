import express from 'express'
import cors    from 'cors'
import dotenv  from 'dotenv'
import { conectarBanco } from './config/db.js'
import { swaggerUi, specs } from './config/swagger.js'

import rotasAut from './rotas/autenticacao.js'
import rotasLiv from './rotas/livros.js'
import rotasEmp from './rotas/emprestimos.js'

dotenv.config()
await conectarBanco()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/api/auth',       rotasAut)
app.use('/api/livros',      rotasLiv)
app.use('/api/emprestimos', rotasEmp)

app.listen(process.env.PORT, () =>
  console.log(`🚀 Servidor rodando na porta ${process.env.PORT}`)
)

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(specs)
})
