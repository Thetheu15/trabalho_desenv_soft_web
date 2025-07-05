import bcrypt from 'bcryptjs'
import jwt    from 'jsonwebtoken'
import Usuario from '../modelos/Usuario.js'

// Cadastra um novo usuário
export async function cadastrar(req, res) {
  const { nome, login, email, senha } = req.body

  const hash = await bcrypt.hash(senha, 10)

  try {
    const user = await Usuario.create({ nome, login, email, senha: hash })

    res.status(201).json({ id: user._id, nome: user.nome, isAdmin: user.isAdmin })
  } catch (err) {
    res.status(400).json({ mensagem: err.message })
  }
}

// Faz login de um usuário existente
export async function entrar(req, res) {
  const { login, senha } = req.body

  const user = await Usuario.findOne({ login })
  if (!user) return res.status(400).json({ mensagem: 'Usuário não encontrado' })

  const ok = await bcrypt.compare(senha, user.senha)
  if (!ok) return res.status(400).json({ mensagem: 'Senha incorreta' })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

  res.json({
    token,
    usuario: { id: user._id, nome: user.nome, isAdmin: user.isAdmin }
  })
}
