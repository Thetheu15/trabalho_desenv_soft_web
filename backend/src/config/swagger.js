// src/config/swagger.js
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação da API - Sistema de Empréstimo de Livros',
      version: '1.0.0',
        description: 'API para gerenciamento de empréstimos de livros, incluindo autenticação, cadastro de usuários e operações com livros.',
    },

    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
        security: [{
        bearerAuth: [],
        }],
  },
  apis: ['./src/rotas/*.js'],
}

const specs = swaggerJsdoc(options)

export { swaggerUi, specs }
