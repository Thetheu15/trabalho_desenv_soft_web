import Emprestimo from '../modelos/Emprestimo.js'
import Livro      from '../modelos/Livro.js'

// Solicitar Empréstimo
export async function solicitarEmprestimo(req, res) {
  try {
    const { livroId } = req.params
    const livro = await Livro.findById(livroId)
    if (!livro) {
      return res.status(404).json({ mensagem: 'Livro não encontrado' })
    }
    const novo = await Emprestimo.create({
      usuario: req.usuario._id,
      livro:   livroId
    })
    return res.status(201).json(novo)
  } catch (err) {
    return res.status(400).json({ mensagem: err.message })
  }
}

// Devolver Empréstimo
export async function devolverEmprestimo(req, res) {
  try {
    const { emprestimoId } = req.params
    const emp = await Emprestimo.findById(emprestimoId)
    if (!emp) return res.status(404).json({ mensagem: 'Empréstimo não encontrado' })
    if (emp.dataDevolucao) {
      return res.status(400).json({ mensagem: 'Empréstimo já foi devolvido' })
    }
    emp.dataDevolucao = new Date()
    await emp.save()
    return res.json(emp)
  } catch (err) {
    return res.status(400).json({ mensagem: err.message })
  }
}

// Histórico do usuário
export async function meusEmprestimos(req, res) {
  try {
    const lista = await Emprestimo
      .find({ usuario: req.usuario._id })
      .populate('livro', 'titulo')
      .sort('-dataEmprestimo')
    return res.json(lista)
  } catch (err) {
    return res.status(500).json({ mensagem: err.message })
  }
}

// Histórico geral (admin)
export async function todosEmprestimos(req, res) {
  try {
    const lista = await Emprestimo
      .find()
      .populate('usuario', 'nome')
      .populate('livro',   'titulo')
      .sort('-dataEmprestimo')
    return res.json(lista)
  } catch (err) {
    return res.status(500).json({ mensagem: err.message })
  }
}
