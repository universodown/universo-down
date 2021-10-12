import {
    propertiesError
} from './objects'

export const pathLogin = {
    parameters: [],
    post: {
        security: [],
        tags: ['auth'],
        summary: 'Gerar token para autenticação do usuário',
        operationId: 'login',
        parameters: [
            {
                in: 'body',
                name: 'auth',
                schema: {
                    $ref: '#/definitions/LoginCreate'
                }
            }
        ],
        responses: {
            201: {
                description: 'Usuário autenticado com sucesso',
                schema: {
                    $ref: '#/definitions/Login'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: propertiesError
            },
            404: {
                description: 'Usuário não encontrado.',
                schema: propertiesError
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual'
                    + ' não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    }
}

export const loginDefinition = {
    type: 'object',
    properties: {
        auth: {
            type: 'boolean',
            example: true,
            description: 'Indica se realizou a autenticação corretamente'
        },
        token: {
            type: 'string',
            example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3'
                + 'ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.S'
                + 'flKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            description: 'Token de acesso JWT'
        }
    }
}

export const loginCreate = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            example: 'dolores.mata@domain.com',
            description: 'Email de acesso do usuário'
        },
        plainPassword: {
            type: 'string',
            example: '123456',
            description: 'Senha de acesso planificada do usuário'
        }
    },
    required: ['email', 'plainPassword']
}
