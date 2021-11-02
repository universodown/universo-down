import { getError, propertiesError } from './objects'

const sampleErros = {
    400: getError(
        'Estrutura da requisição inválida. { Corpo da Mensagem incorreto }'
    ),
    401: getError(
        'Especialidade não possui permissão para esta ação.'
            + ' { (Função: Secretária) }'
    ),
    404: getError('Especialidade não encontrado.')
}

export const pathSpecialitysBase = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['speciality'],
        summary: 'Criação de um nova especialidade',
        operationId: 'createSpeciality',
        parameters: [
            {
                in: 'body',
                name: 'speciality',
                schema: {
                    $ref: '#/definitions/SpecialityCreate'
                }
            }
        ],
        responses: {
            201: {
                description: 'Especialidade cadastrado com sucesso',
                schema: {
                    $ref: '#/definitions/Speciality'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Especialidade não possui permissão para esta'
                    + ' ação. { (details) }',
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
        tags: ['speciality'],
        summary: 'Retorna todos os especialidades conforme login',
        operationId: 'getSpecialitys',
        parameters: [],
        responses: {
            200: {
                description: 'Lista de especialidades cadastrados',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Speciality'
                    }
                }
            },
            401: {
                description: 'Especialidade não possui permissão para esta'
                    + ' ação. { (details) }',
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

export const pathSpecialitysId = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['speciality'],
        summary: 'Retorna a especialidade conforme ID',
        operationId: 'getSpeciality',
        parameters: [
            {
                name: 'specialityId',
                in: 'path',
                description: 'ID da especialidade',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Especialidade selecionado',
                schema: {
                    $ref: '#/definitions/Speciality'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Especialidade não possui permissão para esta'
                    + ' ação. { (details) }',
                schema: sampleErros[401]
            },
            404: {
                description: 'Especialidade não encontrado.',
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
        tags: ['speciality'],
        summary: 'Alteração de um usuário conforme ID',
        operationId: 'updateSpeciality',
        parameters: [
            {
                name: 'specialityId',
                in: 'path',
                description: 'ID da especialidade',
                required: true,
                type: 'integer',
                format: 'int64'
            },
            {
                in: 'body',
                name: 'speciality',
                schema: {
                    $ref: '#/definitions/SpecialityUpdate'
                }
            }
        ],
        responses: {
            200: {
                description: 'Especialidade alterado com sucesso',
                schema: {
                    $ref: '#/definitions/Speciality'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Especialidade não possui permissão para esta'
                    + ' ação. { (details) }',
                schema: sampleErros[401]
            },
            404: {
                description: 'Especialidade não encontrado.',
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
        tags: ['speciality'],
        summary: 'Delete a especialidade conforme ID',
        operationId: 'deleteSpeciality',
        parameters: [
            {
                name: 'specialityId',
                in: 'path',
                description: 'ID da especialidade',
                required: true,
                type: 'integer',
                format: 'int64'
            }
        ],
        responses: {
            200: {
                description: 'Especialidade excluído',
                schema: {
                    $ref: '#/definitions/Speciality'
                }
            },
            400: {
                description: 'Estrutura da requisição inválida. { (details) }',
                schema: sampleErros[400]
            },
            401: {
                description: 'Especialidade não possui permissão para esta'
                    + ' ação. { (details) }',
                schema: sampleErros[401]
            },
            404: {
                description: 'Especialidade não encontrado.',
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

export const specialityDefinition = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64',
            description: 'Id do Especialidade'
        },
        name: {
            type: 'string',
            example: 'Pedagogo',
            description: 'Descrição da Especialidade'
        }
    },
    required: [
        'id',
        'name'
    ]
}

export const specialityCreateDefinition = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'Pedagogo',
            description: 'Descrição da Especialidade'
        }
    },
    required: [
        'name'
    ]
}

export const specialityUpdateDefinition = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'Pedagogo',
            description: 'Descrição da Especialidade'
        }
    },
    required: []
}
