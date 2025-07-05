import jwt from 'jsonwebtoken'
import Usuario from '../modelos/Usuario.js'


export async function proteger(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') && auth.split(' ')[1]
  if (!token) return res.status(401).json({ mensagem: 'Não autorizado' })

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = await Usuario.findById(id).select('-senha')
    next()
  } catch (err) {
    res.status(401).json({ mensagem: 'Token inválido' })
  }
}

export function somenteAdmin(req, res, next) {
  if (!req.usuario?.isAdmin) {
    return res.status(403).json({ mensagem: 'Acesso restrito a administradores' })
  }
  next()
}
