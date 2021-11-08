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

export const pathSpecialityBase = {
    parameters: [],
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['speciality'],
        summary: 'Criação de umaa nova especialidade',
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
                description: 'Especialidade cadastrada com sucesso',
                schema: {
                    $ref: '#/definitions/Speciality'
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
    },
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['speciality'],
        summary: 'Retorna todas as especialidades conforme login',
        operationId: 'getSpecialities',
        parameters: [],
        responses: {
            200: {
                description: 'Lista de especialidades cadastradas',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Speciality'
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

export const pathSpecialityName = {
    parameters: [],
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['speciality'],
        summary: 'Retorna todas as especialidades por nome',
        operationId: 'getSpecialitiesByName',
        parameters: [
            {
                name: 'name',
                in: 'path',
                description: 'Nome da especialidade',
                required: true,
                type: 'string'
            }
        ],
        responses: {
            200: {
                description: 'Lista de especialidades cadastradas',
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/Speciality'
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

export const pathSpecialityId = {
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
                description: 'Usuário não possui permissão para esta ação.'
                    + ' { (details) }',
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
        summary: 'Alteração de uma especialidade conforme ID',
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
                description: 'Especialidade alterada com sucesso',
                schema: {
                    $ref: '#/definitions/Speciality'
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
        summary: 'Deleta a especialidade conforme ID',
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
                description: 'Especialidade excluída.',
                schema: {
                    $ref: '#/definitions/Speciality'
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
                description: 'Especialidade não encontrada.',
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
            description: 'ID da Especialidade'
        },
        name: {
            type: 'string',
            example: 'Pedagogo',
            description: 'Nome da Especialidade'
        },
        organizationId: {
            type: 'integer',
            format: 'int64',
            description: 'Organização na qual compõe a Especialidade'
        }
    },
    required: [
        'id',
        'name',
        'organizationId'
    ]
}

export const specialityCreateDefinition = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'Pedagogo',
            description: 'Nome da Especialidade'
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
            description: 'Nome da Especialidade'
        }
    }
}
