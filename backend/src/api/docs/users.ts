import { getError, propertiesError } from './objects'

const sampleErros = {
    400: getError(
        'Estrutura da requisição inválida. { Corpo da Mensagem incorreto }'
    ),
    401: getError(
        'Usuário não possui permissão para esta ação. { (Função: Membro) }'
    ),
    404: getError('Usuário não encontrado.')
}

export const pathUsersBase = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['users'],
        summary: 'Criação de um novo usuário',
        operationId: 'createUser',
        parameters: [
            {
                in: 'body',
                name: 'user',
                schema: {
                    $ref: '#/definitions/UserCreate'
                }
            }
        ],
        responses: {
            201: {
                description: 'Usuário cadastrado com sucesso',
                schema: {
                    $ref: '#/definitions/User'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + ' { (details) }',
                schema: sampleErros[401]
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual '
                    + 'não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    },
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['users'],
        summary: 'Retorna todos os usuários conforme login',
        operationId: 'getUsers',
        parameters: [],
        responses: {
            200: {
                description: 'Lista de usuários cadastrados',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/User'
                    }
                }
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + ' { (details) }',
                schema: sampleErros[401]
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual'
                    + ' não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    }
}

export const pathUsersId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['users'],
        summary: 'Retorna o usuário conforme ID',
        operationId: 'getUser',
        parameters: [
            {
                name: 'userId',
                in: 'path',
                description: 'ID do usuário',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Usuário selecionado',
                schema: {
                    $ref: '#/definitions/User'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + ' { (details) }',
                schema: sampleErros[401]
            },
            404: {
                description: 'Usuário não encontrado.',
                schema: sampleErros[404]
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual'
                    + ' não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    },
    put: {
        security: [{ BearerJWT: [] }],
        tags: ['users'],
        summary: 'Alteração de um usuário conforme ID',
        operationId: 'updateUser',
        parameters: [
            {
                name: 'userId',
                in: 'path',
                description: 'ID do usuário',
                required: true,
                type: 'integer',
                format: 'int64'
            },
            {
                in: 'body',
                name: 'user',
                schema: {
                    $ref: '#/definitions/UserUpdate'
                }
            }
        ],
        responses: {
            200: {
                description: 'Usuário alterado com sucesso',
                schema: {
                    $ref: '#/definitions/User'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + ' { (details) }',
                schema: sampleErros[401]
            },
            404: {
                description: 'Usuário não encontrado.',
                schema: sampleErros[404]
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual'
                    + ' não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    },
    delete: {
        security: [{ BearerJWT: [] }],
        tags: ['users'],
        summary: 'Delete o usuário conforme ID',
        operationId: 'deleteUser',
        parameters: [
            {
                name: 'userId',
                in: 'path',
                description: 'ID do usuário',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Usuário excluído',
                schema: {
                    $ref: '#/definitions/User'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Usuário não possui permissão para esta ação.'
                    + ' { (details) }',
                schema: sampleErros[401]
            },
            404: {
                description: 'Usuário não encontrado.',
                schema: sampleErros[404]
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual'
                    + ' não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    }
}

export const userDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'Id do Usuário'
        },
        firstName: {
            type: 'string',
            example: 'Dolores',
            description: 'Primeiro nome do Usuário'
        },
        lastName: {
            type: 'string',
            example: 'Marcela da Mata',
            description: 'Nome final do Usuário'
        },
        email: {
            type: 'string',
            example: 'dolores.mata@domain.com',
            description: 'Email do Usuário'
        },
        password: {
            type: 'string',
            example:
                '$2a$12$C3ImsyO8dwLu7YcPuzjY8OGG7O1SOorplAASONk8PqKuqyFu2yylG',
            description: 'Senha Criptografada do Usuário'
        },
        role: {
            type: 'string',
            description: 'Função de Usuário',
            enum: ['owner', 'admin', 'member'],
            example: 'owner'
        },
        organizationId: {
            type: 'integer',
            format: 'int64',
            description: 'Organização na qual compõe o Usuário'
        }
    },
    required: [
        'id',
        'firstName',
        'lastName',
        'email',
        'password',
        'role',
        'organizationId'
    ]
}

export const userCreateDefinition = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            example: 'Dolores',
            description: 'Primeiro nome do Usuário'
        },
        lastName: {
            type: 'string',
            example: 'Marcela da Mata',
            description: 'Nome final do Usuário'
        },
        email: {
            type: 'string',
            example: 'dolores.mata@domain.com',
            description: 'Email do Usuário'
        },
        plainPassword: {
            type: 'string',
            example: '123456',
            description: 'Senha em texto planificado.'
        },
        plainPasswordConfirmation: {
            type: 'string',
            example: '123456',
            description: 'Confirmação de senha em texto planificado.'
        }
    },
    required: [
        'firstName',
        'lastName',
        'email',
        'plainPassword',
        'plainPasswordConfirmation'
    ]
}

export const userUpdateDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'Id do Usuário'
        },
        firstName: {
            type: 'string',
            example: 'Dolores',
            description: 'Primeiro nome do Usuário'
        },
        lastName: {
            type: 'string',
            example: 'Marcela da Mata',
            description: 'Nome final do Usuário'
        },
        email: {
            type: 'string',
            example: 'dolores.mata@domain.com',
            description: 'Email do Usuário'
        },
        plainPassword: {
            type: 'string',
            example: '123456',
            description: 'Senha em texto planificado.'
        },
        plainPasswordConfirmation: {
            type: 'string',
            example: '123456',
            description: 'Confirmação de senha em texto planificado.'
        }
    },
    required: ['id']
}
