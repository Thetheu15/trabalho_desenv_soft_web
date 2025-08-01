import bcrypt from 'bcryptjs'
import jwt    from 'jsonwebtoken'
import Usuario from '../modelos/Usuario.js'

// Cadastra um novo usuário
export async function cadastrar(req, res) {
  const { nome, login, email, senha, cpf, endereco, telefone } = req.body

  const hash = await bcrypt.hash(senha, 10)

  try {
    const user = await Usuario.create({ nome, login, email, senha: hash, cpf, endereco, telefone  })

    res.status(201).json({ id: user._id, nome: user.nome, isAdmin: user.isAdmin })
  } catch (err) {
    if(err == 400){
      res.status(400).json({ mensagem: err.message })
    }
    else if (err.code === 11000) {
    const campoDuplicado = Object.keys(err.keyPattern || {})[0] || 'campo único'
    return res.status(400).json({
      mensagem: `Já existe um usuário com esse ${campoDuplicado}.`
    })
    } else {
      res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' })
    }
    
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
    usuario: { id: user._id, nome: user.nome, email: user.email, isAdmin: user.isAdmin }
  })
}

// Retorna registros de usuários
export async function listarUsuarios(req, res) {
  try {
    // pega todos os usuários, omitindo a senha
    const users = await Usuario.find().select('-senha')
    res.json(users)
  } catch (err) {
    res.status(500).json({ mensagem: err.message })
  }
}

// retorna um usuário específico pelo ID
export async function obterUsuario(req, res) {
  try {
    const user = await Usuario.findById(req.params.id).select('-senha')
    if (!user) return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    res.json(user)
  } catch (err) {
    res.status(400).json({ mensagem: err.message })
  }
}

// Edição de usuário existente
export async function atualizarUsuario(req, res) {
  try {
    const { nome, email, senha, cpf, endereco, telefone } = req.body

    const dadosAtualizados = {}
    if (nome  !== undefined) dadosAtualizados.nome  = nome
    if (email !== undefined) dadosAtualizados.email = email

    if (senha) {
      dadosAtualizados.senha = await bcrypt.hash(senha, 10)
    }
    if (cpf!== undefined)  dadosAtualizados.cpf = cpf
    if (endereco !== undefined)  dadosAtualizados.endereco  = endereco
    if (telefone!== undefined)  dadosAtualizados.telefone = telefone

    const user = await Usuario.findByIdAndUpdate(
      req.params.id,
      dadosAtualizados,
      { new: true, runValidators: true }
    ).select('-senha')

    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    }
    res.json(user)
  } catch (err) {
    res.status(400).json({ mensagem: err.message })
  }
}

// Deleção de usuário existente(apenas para admin)
export async function deletarUsuario(req, res) {
  try {
    const user = await Usuario.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ mensagem: err.message })
  }
}
