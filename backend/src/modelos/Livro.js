import mongoose from 'mongoose'

const livroSchema = new mongoose.Schema({
  titulo:      { type: String, required: true },
  autor:       { type: String, required: true },
  ano:         { type: Number },
  editora:     { type: String },
  descricao:   { type: String },
  situacao:    { type: String, default: 'Disponível' }
}, { timestamps: true })

export default mongoose.model('Livro', livroSchema)
