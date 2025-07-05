import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  nome:     { type: String, required: true },
  login:    { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  senha:    { type: String, required: true },
  isAdmin:  { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.model('Usuario', usuarioSchema)
