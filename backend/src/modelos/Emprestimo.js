import mongoose from 'mongoose'

const emprestimoSchema = new mongoose.Schema({
  usuario:        { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  livro:          { type: mongoose.Schema.Types.ObjectId, ref: 'Livro',   required: true },
  dataEmprestimo: { type: Date,     default: Date.now },
  dataDevolucao:  { type: Date,     default: null }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      // Formata data de empréstimo
      if (ret.dataEmprestimo) {
        ret.dataEmprestimo = new Date(ret.dataEmprestimo)
          .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }

      // Formata data de devolução, quando existir
      if (ret.dataDevolucao) {
        ret.dataDevolucao = new Date(ret.dataDevolucao)
          .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }

      // Formata createdAt / updatedAt
      if (ret.createdAt) {
        ret.createdAt = new Date(ret.createdAt)
          .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }
      if (ret.updatedAt) {
        ret.updatedAt = new Date(ret.updatedAt)
          .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }

      return ret
    }
  }
})

export default mongoose.model('Emprestimo', emprestimoSchema)
