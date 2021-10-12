import {
    propertiesError
} from './objects'

export const pathLogout = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['auth'],
        summary: 'Desconecta a autenticação do usuário',
        operationId: 'logout',
        parameters: [],
        responses: {
            200: {
                description: 'Usuário desconectado com sucesso',
                schema: {
                    $ref: '#/definitions/Logout'
                }
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + ' { (details) }',
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

export const logoutDefinition = {
    type: 'object',
    properties: {
        auth: {
            type: 'boolean',
            example: false,
            description: 'Indica se realizou a desconexão corretamente'
        },
        token: {
            type: 'string',
            example: null,
            description: 'Token de acesso JWT limpo'
        }
    }
}
