import Livro from '../modelos/Livro.js'

// Listar todos os livros
export async function listarLivros(req, res) {
  try {
    const livros = await Livro.find().select('-__v')
    res.json(livros)
  } catch (err) {
    res.status(500).json({ mensagem: err.message })
  }
}

// Obter um livro por ID
export async function obterLivro(req, res) {
  try {
    const livro = await Livro.findById(req.params.id).select('-__v')
    if (!livro) return res.status(404).json({ mensagem: 'Livro não encontrado' })
    res.json(livro)
  } catch (err) {
    res.status(400).json({ mensagem: err.message })
  }
}

// Criar um novo livro
export async function criarLivro(req, res) {
  try {
    // Destruture apenas os campos permitidos
    const { titulo, autor, ano, editora, descricao, situacao } = req.body
    const livro = await Livro.create({ titulo, autor, ano, editora, descricao, situacao })
    res.status(201).json(livro)
  } catch (err) {
    res.status(400).json({ mensagem: err.message })
  }
}

// Atualizar um livro existente
export async function atualizarLivro(req, res) {
  try {
    const { titulo, autor, ano, editora, descricao, situacao } = req.body
    const dados = { titulo, autor, ano, editora, descricao, situacao }
    const liv = await Livro.findByIdAndUpdate(
      req.params.id,
      dados,
      { new: true, runValidators: true }
    ).select('-__v')
    if (!liv) return res.status(404).json({ mensagem: 'Livro não encontrado' })
    res.json(liv)
  } catch (err) {
    res.status(400).json({ mensagem: err.message })
  }
}

// Deletar um livro
export async function deletarLivro(req, res) {
  try {
    const liv = await Livro.findByIdAndDelete(req.params.id)
    if (!liv) return res.status(404).json({ mensagem: 'Livro não encontrado' })
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ mensagem: err.message })
  }
}
