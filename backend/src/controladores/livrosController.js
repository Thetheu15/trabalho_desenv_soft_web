import Livro from '../modelos/Livro.js'

// Listar todos os livros
export async function listarLivros(req, res) {
  const livros = await Livro.find()
  res.json(livros)
}

// Obter um livro por ID
export async function obterLivro(req, res) {
  const livro = await Livro.findById(req.params.id)
  if (!livro) return res.status(404).json({ mensagem: 'Livro não encontrado' })
  res.json(livro)
}

// Criar um novo livro
export async function criarLivro(req, res) {
  try {
    const livro = await Livro.create(req.body)
    res.status(201).json(livro)
  } catch (err) {
    res.status(400).json({ mensagem: err.message })
  }
}

// Atualizar um livro existente
export async function atualizarLivro(req, res) {
  try {
    const liv = await Livro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
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
