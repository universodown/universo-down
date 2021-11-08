import { getError, propertiesError } from './objects'

const sampleErros = {
    400: getError(
        'Estrutura da requisição inválida. { Corpo da Mensagem incorreto }'
    ),
    401: getError(
        'Usuário não possui permissão para esta ação. { (Função: Membro) }'
    ),
    404: getError('Especialidade não encontrado.')
}

export const pathSpecialitiesBase = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['specialities'],
        summary: 'Criação de uma nova especialidade',
        operationId: 'createSpecialities',
        parameters: [
            {
                in: 'body',
                name: 'specialities',
                schema: {
                    $ref: '#/definitions/SpecialitiesCreate'
                }
            }
        ],
        responses: {
            201: {
                description: 'Necessidade cadastrada com sucesso',
                schema: {
                    $ref: '#/definitions/Specialities'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Usuário não possui permissão para esta'
                    + ' ação. { (details) }',
                schema: sampleErros[401]
            },
            500: {
                description: 'O servidor encontrou uma situação com a qual '
                    + 'não sabe lidar. { (details) }',
                schema: propertiesError
            }
        }
    }
}

export const pathSpecialitiesByUser = {
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['specialities'],
        summary: 'Retorna todas os especialistas conforme evolução',
        operationId: 'getSpecialities',
        parameters: [
            {
                name: 'userId',
                in: 'path',
                description: 'ID do Usuário',
                required: true,
                type: 'string'
            }
        ],
        responses: {
            200: {
                description: 'Lista de especialistas cadastradas',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Specialities'
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

export const pathSpecialitiesId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['specialities'],
        summary: 'Retorna a especialidade conforme ID',
        operationId: 'getSpecialities',
        parameters: [
            {
                name: 'specialitiesId',
                in: 'path',
                description: 'ID da especialidade',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Especialista selecionado',
                schema: {
                    $ref: '#/definitions/Specialities'
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
                description: 'Especialista não encontrado.',
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
        tags: ['specialities'],
        summary: 'Deleta a necessidade conforme ID',
        operationId: 'deleteSpecialities',
        parameters: [
            {
                name: 'specialitiesId',
                in: 'path',
                description: 'ID da necessidade',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Especialista excluído.',
                schema: {
                    $ref: '#/definitions/Specialities'
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
                description: 'Especialista não encontrado.',
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

export const specialitiesDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'ID da Especialidade do Usuário'
        },
        userId: {
            type: 'integer',
            format: 'int64',
            description: 'ID do Usuário'
        },
        specialityId: {
            type: 'integer',
            format: 'int64',
            description: 'ID da Especialidade'
        },
        organizationId: {
            type: 'integer',
            format: 'int64',
            description: 'Organização na qual compõe a Especialidade'
        }
    },
    required: [
        'id',
        'userId',
        'specialityId',
        'organizationId'
    ]
}

export const specialitiesCreateDefinition = {
    type: 'object',
    properties: {
        userId: {
            type: 'integer',
            format: 'int64',
            description: 'ID do Usuário'
        },
        specialityId: {
            type: 'integer',
            format: 'int64',
            description: 'ID da Especialidade'
        }
    },
    required: [
        'userId',
        'specialityId'
    ]
}
